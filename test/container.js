var proxyquire = require('proxyquire');
var assert = require('assert');
var mockSpawn = require('mock-spawn');

var mySpawn = mockSpawn();

/**
 * Mock the spawn dependency
 *
 * @type {container|exports.container}
 */
var Container = require('../lib/container').container;
var Container = proxyquire('../lib/container', { child_process: { spawn: mySpawn } }).container;

/**
 * Mock config
 *
 * @type {{path: String, verbose: boolean, help: boolean, version: boolean}}
 */
global.config = {
	path: process.cwd(),
	verbose: true,
	help: false,
	version: false
};

var oldExit = process.exit;

describe('container', function() {

	describe('#pullImage()', function() {

		/**
		 * Test a simple successful Docker image pull
		 */
		it('Test successful Docker image pull', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(0));

			var child = container.pullImage({}, function() {
				done();
			});
		});

		/**
		 * Test a simple unsuccessful Docker pull
		 */
		it('Test unsuccessful Docker image pull', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(1));

			process.exit = function(code) {
				if (1 === code) {
					done();
				}
			};

			container.pullImage({}, function() {});
		});

	});

	describe('#pullImage()', function() {

		/**
		 * Test a simple successful Docker image pull
		 */
		it('Test successful Docker start', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			process.exit = oldExit;

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(0, '24fdgw543ys25'));

			var child = container.startAndMountContainer({}, function() {
				done();
			});
		});

		/**
		 * Test an unsuccessful Docker start where no container ID is provided
		 */
		it('Test unsuccessful Docker start where no container ID is provided', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			process.exit = oldExit;

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(0));

			process.exit = function(code) {
				if (1 === code) {
					done();
				}
			};

			var child = container.startAndMountContainer({}, function() { });
		});

		/**
		 * Test an unsuccessful Docker start where no container ID is provided
		 */
		it('Test unsuccessful Docker start the command errored', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			process.exit = oldExit;

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(1));

			process.exit = function(code) {
				if (1 === code) {
					done();
				}
			};

			var child = container.startAndMountContainer({}, function() { });
		});
	});

	describe('#stopContainer()', function() {

		/**
		 * Test a simple successful Docker container stop
		 */
		it('Test successful Docker container stop', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			process.exit = oldExit;

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(0));

			var child = container.stopContainer({}, 'e534rwdfs', function() {
				done();
			});
		});

		/**
		 * Test a simple successful Docker container stop
		 */
		it('Test successful Docker container stop', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			process.exit = oldExit;

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(1));

			process.exit = function(code) {
				if (1 === code) {
					done();
				}
			};

			var child = container.stopContainer({}, 'e534rwdfs', function() { });
		});
	});

	describe('#removeContainer()', function() {

		/**
		 * Test a simple successful Docker container remove
		 */
		it('Test successful Docker container remove', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			process.exit = oldExit;

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(0));

			var child = container.removeContainer({}, 'e534rwdfs', function() {
				done();
			});
		});

		/**
		 * Test a simple successful Docker container remove
		 */
		it('Test successful Docker container remove', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			process.exit = oldExit;

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(1));

			process.exit = function(code) {
				if (1 === code) {
					done();
				}
			};

			var child = container.removeContainer({}, 'e534rwdfs', function() { });
		});
	});

	describe('#runBeforeScript()', function() {

		/**
		 * Test a simple successful before script
		 */
		it('Test successful before script', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			process.exit = oldExit;

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(0));

			var child = container.runBeforeScript({}, 0, 'e534rwdfs', function() {
				done();
			});
		});

		/**
		 * Test a simple unsuccessful before script
		 */
		it('Test unsuccessful before script', function(done) {
			var json = require('./json/simple-1.json').containers[0];

			process.exit = oldExit;

			var container = new Container(json);

			mySpawn.setDefault(mySpawn.simple(1));

			process.exit = function(code) {
				if (1 === code) {
					done();
				}
			};

			var child = container.runBeforeScript({}, 0, 'e534rwdfs', function() { });
		});
	});
});