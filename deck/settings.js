webpackJsonp([1,3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var feedbackUrl = process.env.FEEDBACK_URL || 'http://hootch.test.netflix.net/submit';
	var gateHost = process.env.API_HOST || 'https://spinnaker-api-prestaging.prod.netflix.net';
	var bakeryDetailUrl = process.env.BAKERY_DETAIL_URL || 'http://bakery.test.netflix.net/#/?region={{context.region}}&package={{context.package}}&detail=bake:{{context.status.resourceId}}';
	var authEndpoint = process.env.AUTH_ENDPOINT || 'https://spinnaker-api-prestaging.prod.netflix.net/auth/info';

	window.spinnakerSettings = {
	  checkForUpdates: true,
	  defaultProviders: ['aws', 'gce', 'azure', 'cf', 'kubernetes', 'titan'],
	  feedbackUrl: feedbackUrl,
	  gateUrl: '/gate',
	  bakeryDetailUrl: '/bakery/api/v1/global/logs/{{context.status.id}}?html=true',
	  authEndpoint: authEndpoint,
	  pollSchedule: 30000,
	  defaultTimeZone: process.env.TIMEZONE || 'America/Los_Angeles', // see http://momentjs.com/timezone/docs/#/data-utilities/
	  defaultCategory: 'serverGroup',
	  providers: {
	    azure: {
	      defaults: {
	        account: 'azure-test',
	        region: 'westus'
	      }
	    },
	    aws: {
	      defaults: {
	        account: 'default',
	        region: 'us-west-2'
	      },
	      defaultSecurityGroups: [],
	      loadBalancers: {
	        // if true, VPC load balancers will be created as internal load balancers if the selected subnet has a purpose
	        // tag that starts with "internal"
	        inferInternalFlagFromSubnet: false
	      }
	    },
	    gce: {
	      defaults: {
	        account: 'my-google-account',
	        region: 'us-central1',
	        zone: 'us-central1-f'
	      }
	    },
	    titan: {
	      defaults: {
	        account: 'titustestvpc',
	        region: 'us-east-1'
	      }
	    },
	    kubernetes: {
	      defaults: {
	        account: 'my-kubernetes-account',
	        namespace: 'default'
	      }
	    }
	  },
	  whatsNew: {
	    gistId: '32526cd608db3d811b38',
	    fileName: 'news.md'
	  },
	  notifications: {
	    email: {
	      enabled: true
	    },
	    hipchat: {
	      enabled: true,
	      botName: 'Skynet T-800'
	    },
	    sms: {
	      enabled: true
	    },
	    slack: {
	      enabled: true,
	      botName: 'spinnakerbot'
	    }
	  },
	  authEnabled: process.env.AUTH === 'enabled',
	  gitSources: ['stash', 'github'],
	  triggerTypes: ['git', 'pipeline', 'docker', 'cron', 'jenkins'],
	  feature: {
	    pipelines: true,
	    notifications: false,
	    fastProperty: true,
	    vpcMigrator: true,
	    clusterDiff: true,
	    roscoMode: false,
	    netflixMode: false,
	    // whether stages affecting infrastructure (like "Create Load Balancer") should be enabled or not
	    infrastructureStages: process.env.INFRA_STAGES === 'enabled',
	    jobs: false
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(310)))

/***/ }
]);
