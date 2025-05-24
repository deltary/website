import fs from 'fs';
import path from 'path';

export const cp = (src, dest, callback) => {
	fs.mkdir(dest, { recursive: true }, callback(dest));
	fs.readdir(src, { withFileTypes: true }, (err, files) => {
		if (err) throw err;
		files.forEach((file) => {
			const from = `${src}/${file.name}`;
			const to = `${dest}/${file.name}`;
			if (file.isDirectory()) {
				cp(from, to, callback);
			} else {
				fs.copyFile(from, to, callback(to));
			}
		});
	});
}
