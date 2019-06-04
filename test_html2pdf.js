const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const source = path.resolve(__dirname, 'test_v1.html');
const target = path.resolve(__dirname, 'test_html2pdf.pdf');
const command = [
    "libreoffice",
    "--headless",
    "--convert-to",
    "pdf",
    source,
    // target
]
childProcess.exec(command.join(" "), {}, (error, stdout, stderr) => {
    if (error) {
        console.error(`执行出错: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});