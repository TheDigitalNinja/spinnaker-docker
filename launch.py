#!/usr/bin/python

import os
import shutil
from distutils import spawn
import time
import socket
import commands

def run(descrip, cmd):
  print(descrip)
  os.system(cmd)

#local ip
ip = ""
vpc = ""
subnet = ""
awsacct = ""

run("install docker", "curl -sSL https://get.docker.com/ | sh")

run("start docker daemon", "service docker start")

run("start redis", "docker run -d -p 6379:6379 --name redis redis")

run("start cassandra", "docker run -d -p 7000:7000 -p 7001:7001 -p 7199:7199 -p 9042:9042 -p 9160:9160 -e CASSANDRA_START_RPC=true --name cassandra cassandra:2.2.5")

#wait for cassandra to start
time.sleep(15)
run("enabled thrift","docker exec cassandra nodetool enablethrift")
time.sleep(5)
run("add front50 keyspace","docker exec cassandra cqlsh -e \"CREATE KEYSPACE IF NOT EXISTS front50 WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };\"")
time.sleep(1)
run("add echo keyspace","docker exec cassandra cqlsh -e \"CREATE KEYSPACE IF NOT EXISTS echo WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };\"")
time.sleep(1)
run("add rush keyspace","docker exec cassandra cqlsh -e \"CREATE KEYSPACE IF NOT EXISTS rush WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };\"")

run("update nginx.conf","sed -i.bak s/LOCALIP/" + ip + "/g nginx.conf")
run("update clouddriver.yml","sed -i.bak s/AWSACCT/" + awsacct + "/g clouddriver.yml")

services = [['front50','8080'],['clouddriver','7002'],['rush','8085'],['rosco','8087'],['igor','8088'],['orca','8083'],['echo','8089'],['gate','8084']]

for service in services:
  run("update " + service[0] + ".yml","sed -i.bak s/LOCALIP/" + ip + "/g " + service[0]  + ".yml")
  run("start " + service[0],"docker run -e IP=" + ip + " -e AWS_SUBNET_ID=" + subnet + " -e AWS_VPC_ID=" + vpc + " -d -v `pwd`/" + service[0] + ".yml:/opt/" + service[0] + "/config/" + service[0] + ".yml -p " + service[1] + ":" + service[1] + " --name " + service[0] + " quay.io/spinnaker/" + service[0])
  time.sleep(10)

#run("clone deck", "git clone https://github.com/spinnaker/deck.git")
#run("build deck", "docker run -v `pwd`/deck:/deck -w /deck digitallyseamless/nodejs-bower-grunt /bin/bash -c 'npm install; npm run build'")
run("backup old settings.js", "mv deck/settings.js deck/orig_settings.js")
run("add settings", "cp settings.js deck/settings.js")
run("start deck","docker run -d -v `pwd`/deck:/opt/deck -v `pwd`/nginx.conf:/etc/nginx/nginx.conf -p 80:80 --name deck nginx")
run("install git on rush","docker exec rush apt-get install -y git")
run("clone rosco into rush container","docker exec rush git clone https://github.com/spinnaker/rosco.git /opt/rosco")

print "Spinnaker is now running on port 80"
