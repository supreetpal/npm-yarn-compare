#!/usr/bin/env node

process.title = 'npmvsyarn';

let prettyMs = require('pretty-ms'),
    clc = require('cli-color'),
    sh = require('shelljs'),
    Table = require('cli-table2');

let packageName = process.argv[2];

var table = new Table({
    head: ['Package Manager', 'Add', 'Remove'],
    colWidths: [20, 10, 10],
});

// Install module using yarn add.

sh.exec('npm cache clean', {silent: true});
sh.exec('rm node_modules', {silent: true});

for (let i = 1; i < 4; i++) {
	console.log('🛀 Adding ' + clc.magenta(packageName) + ' with ' + clc.blue('yarn'));
	let timeStamp = Date.now();
	sh.exec('yarn add ' + packageName, { silent: true });
	let yarnAddTime = Date.now() - timeStamp;
	console.log('🚀 Time taken by yarn to add ' + clc.green(prettyMs(yarnAddTime)) + '');

	// Uninstall module using yarn remove.
	console.log('🛀 Removing ' + clc.magenta(packageName) + ' with ' + clc.blue('yarn'));
	timeStamp = Date.now();
	sh.exec('yarn remove ' + packageName, { silent: true });
	let yarnRemoveTime = Date.now() - timeStamp;
	console.log('🚀 Time taken by yarn to remove ' + clc.red(prettyMs(yarnRemoveTime)) + '');

	table.push(['yarn run ' + i, prettyMs(yarnAddTime), prettyMs(yarnRemoveTime)]);
}

// Install module using npm install.
sh.exec('npm cache clean', {silent: true});
sh.exec('rm node_modules', {silent: true});

for (let i = 1; i < 4; i++) {
	timeStamp = Date.now();
	console.log('🛀 Installing ' + clc.magenta(packageName) + ' with ' + clc.blue('npm'));
	sh.exec('npm install ' + packageName, { silent: true });
	let npmAddTime = Date.now() - timeStamp;
	console.log('🚀 Time taken by npm to install ' + clc.green(prettyMs(npmAddTime)) + '');

	// Uninstall module using npm uninstall.
	console.log('🛀 Removing ' + clc.magenta(packageName) + ' with ' + clc.blue('npm'));
	timeStamp = Date.now();
	sh.exec('npm uninstall ' + packageName, { silent: true });
	let npmRemoveTime = Date.now() - timeStamp;
	console.log('🚀 Time taken by npm to uninstall ' + clc.red(prettyMs(npmRemoveTime)) + '');

	table.push(['npm run ' + i, prettyMs(npmAddTime), prettyMs(npmRemoveTime)]);
}

// Install module using npm install with cache-min
sh.exec('npm cache clean', {silent: true});
sh.exec('rm node_modules', {silent: true});

for (let i = 1; i < 4; i++) {
	timeStamp = Date.now();
	console.log('🛀 Installing ' + clc.magenta(packageName) + ' with ' + clc.blue('npm'));
	sh.exec('npm install --cache-min 9999999 ' + packageName, { silent: true });
	let npmAddTime = Date.now() - timeStamp;
	console.log('🚀 Time taken by npm to install ' + clc.green(prettyMs(npmAddTime)) + '');

	// Uninstall module using npm uninstall.
	console.log('🛀 Removing ' + clc.magenta(packageName) + ' with ' + clc.blue('npm'));
	timeStamp = Date.now();
	sh.exec('npm uninstall ' + packageName, { silent: true });
	let npmRemoveTime = Date.now() - timeStamp;
	console.log('🚀 Time taken by npm to uninstall ' + clc.red(prettyMs(npmRemoveTime)) + '');

	table.push(['npm w/ cache run ' + i, prettyMs(npmAddTime), prettyMs(npmRemoveTime)]);
}

console.log(table.toString());
