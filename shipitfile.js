module.exports = function (shipit) {
	require('shipit-deploy')(shipit);

	var pathStr = "PATH='$PATH:/usr/local/bin'";
	var integration = "hubDeveloperPortal";
	var currentPath = "~/" + integration + "/current";
	// for the env variables we set later on
	var environments = {
		"production": "production"
	}
	var environment = environments[shipit.options.environment];

	shipit.initConfig({
		default: {
			workspace: "deploy",
			deployTo: "~/" + integration,
			repositoryUrl: "https://github.com/BroadsoftLabs/" + integration + ".git",
			ignores: [".git", "node_modules"],
			rsync: ["--del"],
			keepReleases: 2,
			key: "~/.ssh/id_rsa",
			shallowClone: true
		},
		production: {
			servers: "root@hub-sandbox.broadsoftlabs.net"
		}
	});

	// this task runs an NPM install remotely to install dependencies
	shipit.blTask("npm_install", function () {
		return shipit.remote(pathStr + " && cd " + currentPath + " && npm install");
	});

  // this task runs a bower install to install all front end dependencies
  shipit.blTask("bower_install", function () {
    return shipit.remote(pathStr + " && cd " + currentPath + " && bower install --allow-root");
  });

  // this task runs an NPM install remotely to install dependencies
  shipit.blTask("webpack_build", function () {
    return shipit.remote(pathStr + " && cd " + currentPath + " && grunt buildWebpackProd");
  });

	shipit.blTask("pm2-restart", function () {
		return shipit.remote(pathStr + " && pm2 restart " + integration);
	});

	// this task removes the service
	shipit.blTask("pm2-delete", function () {
		return shipit.remote(pathStr + " && pm2 delete " + integration);
	});

	// this task creates the service with pm2
	shipit.blTask("pm2-create", function () {
		return shipit.remote(pathStr + " && cd " + currentPath + " && NODE_ENV=" + environment + " pm2 start app.js --name='" + integration + "'");
	});

	shipit.on("deployed", function () {
		// this series of tasks will result in a good deploy assuming everything is working
		shipit.start("npm_install", "bower_install", "pm2-restart");
	});
};
