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
			}

			container.pullImage({}, function() {});
		});

	});

});