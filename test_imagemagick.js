//
// Options to specify color of watermark text
//
// Various possble values of align are:

//
// dia1 : Diagonal 1 45度
// dia2 : Diagonal 2 135度
// ttb : top to bottom
// btt : bottom to top
// ltr : left to right
// rtl : right to left
//
// 需要修改/etc/imagemagick-6/policy.xml
var watermark = require('image-watermark');
const path = require('path');
const gm = require('gm').subClass({ imageMagick: true });
// .subClass({imageMagick: true});
// const text = Buffer.from('多益');
// const text = encodeURIComponent('多益');
var options = {
    'text': 'zhong文12放到',
    // font: 'simsong.ttf',
    // font: 'FangSong_GB2312.ttf',
    // font: 'singfang.ttf',
    // font: 'SimSun.ttf',
    // font: 'Ubuntu.ttf',
    // font: 'FangSong.ttf',
    font: "/usr/share/fonts/truetype/nanum/NanumBarunGothic.ttf",
    // text,
    'color': 'rgb(192, 192, 192)',
    'position': 'Right',
    'align': 'dia1' // default dia1
};
const filePath = path.resolve(__dirname, 'test.pdf');
console.log(filePath);
watermark.embedWatermark(filePath, options);

// const filePath = path.resolve(__dirname, 'test.pdf');
// console.log(filePath);
// const dstPath = path.resolve(__dirname, 'gm.pdf');
// // gm(filePath)
// //     .stroke("#ffffff")
// //     .drawCircle(10, 10, 20, 10)
// //     .font("Helvetica.ttf", 12)
// //     .drawText(30, 20, "GMagick!")
// //     .write(dstPath, function(err) {
// //         if (!err) console.log('done');
// //     });

// gm(filePath)
//     // .drawCircle(10, 10, 20, 10)
//     // .font("fonts/simsong.ttf", 30)
//     // .font("SimSun.ttf", 30)
//     // .font("Ubuntu.ttf", 30)
//     // .font("FangSong.ttf", 30)  
//     .font("/usr/share/fonts/truetype/nanum/NanumBarunGothic.ttf", 20)
//     .fontSize(20)
//     .drawText(400, 300, "中文沙发!")
//     .write(dstPath, function(err) {
//         if (!err) {
//             console.log('done');
//         } else {
//             console.log(err);
//         }
//     });

// 宋体	SimSun
// 黑体	SimHei
// 微软雅黑	Microsoft YaHei
// 微软正黑体	Microsoft JhengHei
// 新宋体	NSimSun
// 新细明体	PMingLiU
// 细明体	MingLiU
// 标楷体	DFKai-SB
// 仿宋	FangSong
// 楷体	KaiTi
// 仿宋_GB2312	FangSong_GB2312
// 楷体_GB2312	KaiTi_GB2312

function parse() {
    var args = [];
    const source = path.resolve(__dirname, 'test.pdf');
    const outputPath = path.resolve(__dirname, 'gm_args.pdf');
    const font = "/usr/share/fonts/truetype/nanum/NanumBarunGothic.ttf";
    const fillColor = "rgb(192, 192, 192)";

    const position = "Center"; // Center

    const watermarkText = '中文测试' + Date.now();


    args.push('-quality');
    args.push(50); // alignment of watermark text.
    args.push('-font');
    args.push(font);
    args.push('-fill');
    args.push(fillColor); // color of watermark text
    args.push('-gravity');
    args.push(position); // alignment of watermark text.
    const angle = -45;
    const pointsize = 50;
    // angle = (Math.atan(height / width) * (180 / Math.PI)) * -1;
    // pointsize = Math.sqrt(pointWidth * pointWidth + pointHeight * pointHeight) / watermarkText.length;
    args.push('-pointsize');
    args.push(pointsize); // this needs to be calculated dynamically based on image size and length of copyright message
    args.push('-annotate');
    args.push(angle); // angle of watermark message, with respect to X-axis
    args.push(watermarkText); // copyright text


    gm(source)
        .out(...args)
        .write(outputPath, function(err) {
            if (!err) {
                console.log('done');
            } else {
                console.log(err);
            }
        });
}
parse();