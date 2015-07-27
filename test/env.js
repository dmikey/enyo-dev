'use strict';

describe('Environment', function () {

	var env;
	
	before('Resetting environment', function () {
		return resetEnv();
	});
	
	context('Clean environment', function () {
		
		before(function () {
			return getOpts().then(function (opts) {
				env = opts.env;
			});
		});
	
		it('should not find a package', function () {
			expect(env.hasPackage()).to.be.false;
		});
		
		it('should not find a local configuration', function () {
			expect(env.hasConfig()).to.be.false;
		});
		
		it('should not find user defaults', function () {
			expect(env.hadDefaults()).to.be.false;
		});
		
		it('should not find user config', function () {
			expect(env.hadConfig()).to.be.false;
		});
		
		it('should have created a user-level configuration directory', function () {
			return fs.statAsync(path.join(testHome, '.enyo')).then(function (stat) {
				return stat.isDirectory();
			}).should.eventually.be.true;
		});
		
		it('should have created a user-level configuration file', function () {
			return fs.statAsync(path.join(testHome, '.enyo', 'config')).then(function (stat) {
				return stat.isFile();
			}).should.eventually.be.true;
		});
		
		it('should have created a user-level project defaults file', function () {
			return fs.statAsync(path.join(testHome, '.enyo', 'defaults')).then(function (stat) {
				return stat.isFile();
			}).should.eventually.be.true;
		});
	
	});
	
	context('Default environment', function () {
		
		before(function () {
			return getOpts().then(function (opts) {
				env = opts.env;
			});
		});
		
		it('should find user defaults', function () {
			expect(env.hadDefaults()).to.be.true;
		});
		
		it('should find user config', function () {
			expect(env.hadConfig()).to.be.true;
		});
		
		it('should resolve the defaults object', function () {
			return env.get('defaults').should.eventually.be.an('object');
		});
		
		it('should resolve the requested defaults property', function () {
			return env.get('defaults.libraries').should.eventually.be.an('array');
		});
		
		it('should resolve the requested user-level defaults property', function () {
			return env.get('libraries').should.eventually.be.an('array');
		});
		
		it('should resolve the requested user-level configuration property', function () {
			return env.get('interactive').should.eventually.be.true;
		});
	});
	
	context('Project environment', function () {
	
		before(function () {
			return getOpts({cwd: testProj}).then(function (opts) {
				env = opts.env;
			});
		});
	
		it('should use the correct working directory', function () {
			expect(env.cwd).to.be.equal(testProj);
		});
	
		it('should find a package', function () {
			expect(env.hasPackage()).to.be.true;
		});
		
		it('should find a local configuration', function () {
			expect(env.hasConfig()).to.be.true;
		});
	
		it('should resolve the requested package property', function () {
			expect(env.package.get('paths')).to.be.an('array');
			expect(env.package.get('name')).to.be.a('string').and.to.be.equal('testproject');
		});
	
		it('should resolve the local configuration value', function () {
			return all([
				env.get('libDir').should.eventually.be.equal('libdir'),
				env.get('libraries').should.eventually.be.an('array').with.length(2)
			]);
		});
		
		it('should still be able to resolve the user-level configuration value', function () {
			expect(env.user.get('libDir')).to.be.equal('lib');
			expect(env.user.get('libraries')).to.be.an('array').with.length.above(2);
		});
	});

});