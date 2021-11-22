const fs = require('fs');
const probe  = require('probe-image-size');
const through = require('through2');

module.exports = function imgSizeInline(options) {
    options = {
        path:             '',
        classMultipliers: {},
        ...options,
    };

    return through.obj((file, _enc, next) => {
        if (file.isNull() || file.isStream() || !file.isBuffer()) {
            next(null, file);
            return;
        }

        file.contents = Buffer.from(String(file.contents).replace(/<img[^>]*src="([^"]*)"[^>]*>/g, (match, url) => {
            const path = options.path + url;
            const size = fs.existsSync(path) ? probe.sync(fs.readFileSync(path)) : null;
            if (size) {
                if (Object.keys(options.classMultipliers).length > 0) {
                    const classMatch = match.match(/class=["']([^"']*)["']/);
                    const classes = classMatch && classMatch[1] ? classMatch[1].split(' ') : [];

                    for (const className of classes) {
                        if (options.classMultipliers[className]) {
                            size.width /= options.classMultipliers[className];
                            size.height /= options.classMultipliers[className];
                            break;
                        }
                    }
                }
                return match.replace(/\/?>$/, ` width="${size.width}" height="${size.height}" />`);
            }
            return match;
        }));
        next(null, file);
    });
};
