# spinnaker-docker
Script to provision Spinnaker with containers

## Setup

1. Launch instance with Spinnaker IAM role. Take note of `vpc-id`, `subnet-id` and aws account number.
2. SSH in and become root. Clone repo `git clone https://github.com/moondev/spinnaker-docker.git`
3. Edit `igor.yml` and add jenkins info
4. Edit `rosco.yml` and add apt repo.
5. Edit `launch.py` and add the instance private ip, vpc-id, subnet-id and aws account number
6. Run setup script `#./launch.py`
7. Tunnel port 80 to your local machine, spinnaker should now be up.

### Updating configs

If you update a service's config, you can restart it with `docker restart SERVICENAME`

### Logs

You can tail a service's log with `docker logs -f SERVICENAME`
