'use strict';

var
	PluginError = require('gulp-util').PluginError,
	Transform = require('stream').Transform,
	fs = require('fs'),
	PLUGIN_NAME = 'gulp-pre-link';

module.exports = function(opts) {
	opts = opts || {};
	var stream = new Transform({
		objectMode: true
	});

	stream._transform = function(file, encoding, cb) {
		if (file.isNull()) {
			return cb(null, file);
		}
		if (file.isStream()) {
			var error = 'Streaming not supported';
			return cb(new PluginError(PLUGIN_NAME, error));
		} else if (file.isBuffer()) {
			var content = String(file.contents);
			var reg = /<link\s+[\s\S]*?["'\s\w\/\-](?:>|$)/gi;
			var arrs = content.match(reg);
			var reg2 = /\srel\s*=\s*('[^']+'|"[^"]+"|[^\s\/>]+)\s*href\s*=\s*('[^']+'|"[^"]+"|[^\s\/>]+)/i;
			var addrs = [],
				results = [];
			if (arrs != null) {
				for (var i = 0; i < arrs.length; i++) {
					var result = arrs[i].match(reg2);
					if (result && result[1]) {
						var rel = result[1].replace(/^['"]|['"]$/g, '').toLowerCase();
						if (rel === 'import') {
							var addr = result[2].replace(/^['"]|['"]$/g, '').toLowerCase();
							console.log("替换：" + file.history+" --- "+addr);
							addrs.push(addr);
							results.push(result);
						}
					}
				}
				file.contents = new Buffer(readFile(addrs, results, content));
				this.push(file);
				cb();
			}
		}
	}
	return stream;
};

function readFile(addrs, results, content) {
	for (var i = 0; i < addrs.length; i++) {
		var data = fs.readFileSync(addrs[i], 'utf-8');
		content = content.replace(results[i].input, String(data));
	}
	return content;
}