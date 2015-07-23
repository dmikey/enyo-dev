- user configuration files have changed location/names and use-case
- new project defaults config file
- options have changed 
- new command options, new commands for enyo
- new --script-safe flag for scripts/server environments
- documentation



## Enyo Developer Tools
> version 0.5.1

> __SPECIAL NOTICE__
> 
> There have been breaking changes in the configurations and environment setup between
> versions `0.5.0` and `0.5.1`. To ensure that you have a correctly configured environment
> please use the command `enyo reset-env` one time. This will unfortunately reset any
> customizations you may have used but should be a one-time transition for the forseeable
> future.

# Contents

- [Setup](#setup)
	- [Requirements](#setup-reqs)
	- [Installation](#setup-install)
		- ~~[NPM installation](#setup-npm)~~
		- [Manual installation](#setup-manual)
			- [Clean](#setup-manual-clean)
			- [Upgrade](#setup-manual-upgrade)
- [Environment Configuration](#env)
	- [User](#env-user)
		- [User-level configuration](#env-user-user)
		- [Project default configuration](#env-user-project)
		- [Links directory](#env-user-links)
	- [Script/Server](#env-script)
- [Commands](#commands)
	- [config](#commands-config)

### <a name="setup"></a>Setup

#### <a name="setup-reqs"></a>Requirements

In order to use these tools you need to ensure you have Node version `0.12.2` or higher. You can acquire [Node](https://nodejs.org/download/) in various ways including their pre-built binary or installation packages. Ensure that the correct version of Node and npm are available from the terminal/console of your operating system and that you have the correct permissions to install _npm packages globally_. You can check your current version of Node by issuing the following command:

```bash
node --version
```

#### <a name="setup-install"></a>Installation

The easiest way to manage your installation of the tools is to use the ~~[npm package manager](#setup-npm)~~<sup>[1](#fn1)</sup>. In other cases you can follow the directions below for a [manual installation](#setup-manual).

##### <a name="setup-npm"></a>~~NPM Installation~~<sup>[1](#fn1)</sup>

```bash
# not currently available
```

##### <a name="setup-manual"></a>Manual Installation

A manual installation means you have a local _clone_ of the source code. This gives you control if you wish to debug issues with the tools or test new features but requires a few extra steps.

###### <a name="setup-manual-clean"></a>Clean

For a clean install on a system that does not currently have _enyo-dev_ installed follow these directions:

```bash
git clone https://github.com/enyojs/enyo-dev.git
cd enyo-dev
# if there is a version, use the next line and replace the version as appropriate
git checkout 0.5.1
npm install
npm link
```

###### <a name="setup-manual-upgrade"></a>Upgrade

If you already have a local clone of _enyo-dev_ and need to upgrade follow these instructions from the root of the local repository:

```bash
git pull
# if there is a version, use the next line and replace the version as appropriate
git checkout 0.5.1
npm install
npm prune
npm link
```

### <a name="env"></a>Environment Configuration

#### <a name="env-user"></a>User (normal use-case)

By default, the enyo developer tools need a location to store stateful information. For a typical user a directory `.enyo` will be created at the root level of the user's _home_ (differs per operating system - the equivalent of `~/` for OS X and Linux and `$HOME` for most Windows systems). It will create and store information in various files as needed. There are a few files which you can modify directly or via the `enyo config` command (explained below) to automatically modify the behavior of the tools according to your needs.

##### <a name="env-user-user"></a>User-level configuration file `~/.enyo/config`

The user-level configuration file is a JSON file at `~/.enyo/config` that will be referenced for values when a local configuration file doesn't exist or to specify common configuration options that would otherwise need to be specified each time a command is issued. Initially this file is generated for you with all of the most common defaults. You can update it to suit your needs either manually or by using the `enyo config` command as discussed later. At this time there are only a few options useful in this configuration (comments added for clarity).

```javascript
{
  // most commands have an interactive mode that can be helpful in deciding how to
  // handle various situations, if you turn this off it will be forced to use
  // default options, only use if you know what you are doing
  "interactive": true
}
```

##### <a name="env-user-project"></a>Project default configuration file `~/.enyo/defaults`

The project defaults configuration file is a JSON file at `~/.enyo/defaults` that is used (directly copied) as a _new_ project's own configuration file (`[project]/.enyoconfig`). Any values in this file will be evaluated and used when initializing a new project using `enyo init` that does not directly specify a command line flag that negates one of its values or is using the `--bare` flag (meaning the project `[project]/.enyoconfig` will be empty). For a more complete understanding of what `enyo init` can do, read its documentation below. Rememeber that once using `enyo init` any of these options can be updated/modified for that project only by using the `enyo config` command in the project directory or by directly editing the project's `[project]/.enyoconfig` file. The default options in this file are as follows (comments added for clarity).

```javascript
{
  // the directory within the project where it should install included libraries
  "libDir": "lib",
  
  // the list of default libraries to be included in the project's "libDir"
  "libraries": [
    "enyo",
    "layout",
    "canvas",
    "svg",
    "moonstone",
    "onyx",
    "spotlight",
    "enyo-webos",
    "enyo-cordova",
    "enyo-ilib"
  ],
  
  // a map of library names to their location from where they can be retrieved
  "sources": {
    "enyo": "https://github.com/enyojs/enyo.git",
    "layout": "https://github.com/enyojs/layout.git",
    "canvas": "https://github.com/enyojs/canvas.git",
    "svg": "https://github.com/enyojs/svg.git",
    "moonstone": "https://github.com/enyojs/moonstone.git",
    "onyx": "https://github.com/enyojs/onyx.git",
    "spotlight": "https://github.com/enyojs/spotlight.git",
    "enyo-webos": "https://github.com/enyojs/enyo-webos.git",
    "enyo-cordova": "https://github.com/enyojs/enyo-cordova.git",
    "enyo-ilib": "https://github.com/enyojs/enyo-ilib.git"
  },
  
  // a map of library names to the intended target if it is not "master" and can
  // be a branch, tag or specific commit hash - if not present will be assumed as
  // "master"
  "targets": {
    "enyo": "2.6.0-dev",
    "layout": "2.6.0-dev",
    "canvas": "2.6.0-dev",
    "svg": "master",
    "moonstone": "2.6.0-dev",
    "onyx": "2.6.0-dev",
    "spotlight": "2.6.0-dev",
    "enyo-webos": "2.6.0-dev",
    "enyo-cordova": "2.6.0-dev",
    "enyo-ilib": "2.6.0-dev"
  },
  
  // a list of libraries to include in the project as a link instead of a copy of
  // the repository
  "link": [],
  
  // set this to true to always link the libraries in projects
  "linkAllLibs": false
}
```

##### <a name="env-user-links"></a>Links directory `~/.enyo/links`

When using the _link_ option within your projects the tools will create a separate directory at `~/.enyo/links` where it stores the global link to your local libraries. Subsequent requests in projects will link to _this location_ so you can modify the location of your library without invalidating all of the projects that may be linked to it. For more information on using _links_ in your development environment see the documentation below.


#### <a name="env-script"></a>Scripts/Servers

Often when using the development tools it is necessary to run non-interactive commands and avoid unnecessary environment setup that will be reset on each subsequent run. Please use the `--script-safe` flag for any command issued to disable interactive mode and keep from generating user-level configuration files. This also ensures that separate commands can safely be executed in parallel (multiple jobs) without race-conditions.

### <a name="commands"></a>Commands

All of the tools require various commands issued from the command-line. Below are a list of the available commands, their options and some typical use-case examples. The root `enyo` command is, by itself, not very useful (literally, does nothing). The sub-commands are where the magic happens. All boolean flags can be negated by using the full flag prefixed with `no` (e.g. `--interactive` can be negated by using `--no-interactive` or optionally `--interactive=false` or even `-i false`). It should be noted that each sub-command shares these command-line flags:

```bash
-c, --config-file
-i, --interactive
--script-safe
```

The `-c, --config-file` option is a relative path to a custom configuration file (the default is `.enyoconfig`). Note that, if the file doesn't exist it will be ignored and the command will continue using the defaults and user-level configurations.

The `-i, --interactive` option is a boolean indicating whether any given option should enter interactive-mode (if necessary) to receive user input to resolve a course of action that has multiple paths. If interactive mode is disabled it will fall back to a default path that varies by the command.

The `--script-safe` option is a boolean indicating that the requested command should be executed in a manner that is safe for scripts and server environments. See [Scripts/Servers](#env-script) for more information.

#### <a name="commands-config"></a>config - `enyo config`

```bash
Usage: enyo config <target> [value] [options]

target     The configuration property to retrieve, set or remove. When the --global flag is set will update the user-level configuration file unless target begins with default.[target] in which case it will update the project defaults configuration.
value      The value(s) to add/set to target. If an array, can be a comma-separated list of values to add/remove.

Options:
   -c, --config-file   Set this to a custom configuration file, otherwise defaults to .enyoconfig in the current working directory.
   -i, --interactive   Various commands may need user input. To avoid interactive sessions and always use the built-in resolution options set this to false.
   --script-safe       When executing commands within an automated script or without an active terminal set this flag to true.
   -g, --global        Execute the current operation on the global configuration.
   --get               Retrieve the target as it would be resolved by a command from the current configuration file (global only if the --global flag is set).
   -a, --array         Add or remove the current value(s) from a configuration array. If the target already exists in the configuration and is an array, this is implied.
   -r, --remove        Remove the target from an array or, if not an array, remove the option altogether.
   --reset             If a target is provided, will reset the project configuration target to the current user-level default value. If the --global flag is set and target is provided it will reset the appropriate user-level configuration to the system default value. If no target is provided the project configuration will be reset to the current user-level configuration defaults. If the --global flag is set and no target is provided it will reset the user-level configuration file and defaults to system defaults. CANNOT BE UNDONE.

Update, remove or set configuration options for your project or environment.
```

The `enyo config` command is a convenience method designed to make modifying your configurations as easy as possible. Anything you can do with this command you can also do by editing the target JSON file directly. If issued in a directory that _seems like an enyo project_ (has a valid package.json file) it will assume you intend to modify a local configuration file (`.enyoconfig` unless otherwise specified). You can update the [user-level configurations](#env-user) instead by using the `-g, --global` flag and the appropriate target. To update the user-level configuration simply use the `-g, --global` flag and the target option. To update the project-defaults prefix all options with `defaults.[option]` where `[option]` is the default option you wish to set, update or remove.

Note that updating default values in the user-level configuration will not automatically update existing configurations.

~~Note when adding _libraries_ using the `enyo config -a defaults.libraries` or `enyo config -a libraries` (or other equivalent) commands they can have their source and target set/updated at the same time using the form `[lib]@[remote]#[target]` (e.g. `enyo@https://github.com/enyojs/enyo.git#2.6.0-dev`). __Do not use this method of adding the source and target if the GIT URI includes any commas__. Also note you can use the ssh+git formats as well e.g. `enyo@git@github.com:enyojs/enyo.git#master` is still valid.~~

Note when using the `-r, --remove` flag and the `libraries` or `defaults.libraries` target it will also remove the related `sources` and `targets` entry when applicable.

Examples:

```bash
# retrieve the list of libraries that would be installed if you run enyo init
# note that --get is implied and can be left off of the command
enyo config --get libraries

# retrieve the list of default libraries from the global configuration
enyo config --get -g defaults.libraries

# retrieve the global interactive mode setting
enyo config -g interactive

# update the global interactive mode setting
enyo config -g interactive false

# add some libraries to the libraries list for the given project
enyo config -a libraries enyo,moonstone,enyo-webos

# update the source for the enyo library in the current project
enyo config sources.enyo git@github.com:enyojs/enyo.git

# update the target for the enyo library in the current project
enyo config targets.enyo my-test-branch

# remove some libraries from the libraries list
enyo config -a -r libraries enyo-cordova,canvas

# update the global libDir value for projects
enyo config -g defaults.libDir libs
```



##### Footnotes
<a name="fn1">1</a>: The npm package is not yet available, you will need to manually clone the repository and install it following the commands listed for [manual installation](#setup-manual).
