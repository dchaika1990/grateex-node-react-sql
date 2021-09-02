const fs = require('fs')
const path = require("path");
const JSZip = require("jszip");

class FileService {
	createDir(req, dirName) {
		const filePath = req.filePath + '/' + dirName
		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath)
		}
	}

	deleteDir(req, dirName) {
		const filePath = req.filePath + '/' + dirName
		if (fs.existsSync(filePath)) {
			fs.rmdirSync(filePath, {recursive: true});
		}
	}

	deleteFile(req, fileName) {
		const file = req.filePath + '/' + fileName;
		fs.promises.access(file, fs.constants.F_OK)
			.then(() => {
				if (fs.existsSync(file)) {
					fs.unlinkSync(file)
				}
			})
	}
	
	static addFilesFromDirectoryToZip(userLink = '', courseLink = '', zip){
		let coursePath = path.join('uploads', userLink, courseLink)
		const directoryContents = fs.readdirSync(coursePath, {
			withFileTypes: true,
		});
		directoryContents.forEach(({ name }) => {
			const path = `${coursePath}/${name}`;
			if (fs.statSync(path).isFile()) {
				zip.file(name, fs.readFileSync(path, "utf-8"));
			}
			if (fs.statSync(path).isDirectory()) {
				FileService.addFilesFromDirectoryToZip(path, zip);
			}
		});
	};
	
	async generateZipForPath (userLink= "", courseLink = ''){
		const zip = new JSZip();
		FileService.addFilesFromDirectoryToZip(userLink, courseLink, zip);
		return await zip.generateAsync({type: "base64"});
	};
}

module.exports = new FileService()
