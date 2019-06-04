const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const source = path.resolve(__dirname, 'test.docx');
const target = path.resolve(__dirname, 'test.html');
const command = [
    "libreoffice",
    "--convert-to",
    "html",
    source,
    target
]
childProcess.exec(command.join(" "), {}, (error, stdout, stderr) => {
    if (error) {
        console.error(`执行出错: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});