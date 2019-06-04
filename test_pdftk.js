const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const source = path.resolve(__dirname, 'test.pdf');
const target = path.resolve(__dirname, 'test_tk.pdf');
const background = path.resolve(__dirname, 'test_hummus.pdf');
const command = [
    "pdftk",
    source,
    "background",
    background,
    "output",
    target
]
async function pdftk() {
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
    const result = await pdftk();
    console.log('result is', result);
}
test();