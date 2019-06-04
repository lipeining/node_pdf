// const unoconv = require('unoconv');
// const fs = require('fs');
// unoconv.convert('test.docx', 'pdf', function(err, result) {
//     // result is returned as a Buffer

//     fs.writeFile('test_out.pdf', result);
// });
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const source = path.resolve(__dirname, 'test.docx');
const target = path.resolve(__dirname, 'test.pdf');
const command = [
    "libreoffice",
    "--convert-to",
    "pdf",
    source
]
async function docx2pdf() {
    return await new Promise((resolve, reject) => {
        childProcess.exec(command.join(" "), {}, (error, stdout, stderr) => {
            if (error) {
                console.error(`执行出错: ${error}`);
                reject(error);
            } else {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                resolve(target);
            }
        });
    })
}
async function test() {
    const result = await docx2pdf();
    console.log('result is', result);
}
test();