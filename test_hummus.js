const hummus = require('hummus');

function rgbRight() {
    const pdfWriter = hummus.createWriter(__dirname + '/test_hummus.pdf', { version: hummus.ePDFVersion14 });
    const page = pdfWriter.createPage();

    page.mediaBox = [0, 0, 210, 297];
    const cxt = pdfWriter.startPageContentContext(page);
    const fontPath = "/usr/share/fonts/truetype/nanum/NanumBarunGothic.ttf";
    const fontObj = pdfWriter.getFontForFile(fontPath, 0);

    var pathStrokeOptions = { color: 0xc0c0c0, width: 4 };

    var textOptions = { font: fontObj, size: 14, colorspace: 'gray', color: 0xc0c0c0 };

    // write some text, with top and bottom lines, which position is based on the text dimensions
    const words = 'Hello 中文 World';
    var textDimensions = fontObj.calculateTextDimensions('Hello 汉语 World', 14);
    cxt.writeText(words, 50, 145, textOptions);
    console.log(words.length);
    // .drawPath(280 + textDimensions.xMin, 398 + textDimensions.yMin, 280 + textDimensions.xMax, 398 + textDimensions.yMin, pathStrokeOptions)
    // .drawPath(280 + textDimensions.xMin, 402 + textDimensions.yMax, 280 + textDimensions.xMax, 402 + textDimensions.yMax, pathStrokeOptions)

    pdfWriter.writePage(page).end();
}
rgbRight();

function rgbWrong() {
    const pdfWriter = hummus.createWriter(__dirname + '/test_hummus.pdf', { version: hummus.ePDFVersion14 });
    const page = pdfWriter.createPage();

    page.mediaBox = [0, 0, 210, 297];
    const cxt = pdfWriter.startPageContentContext(page);
    const fontPath = "/usr/share/fonts/truetype/nanum/NanumBarunGothic.ttf";
    const fontObj = pdfWriter.getFontForFile(fontPath, 0);

    var textOptions = { font: fontObj, size: 14, colorspace: 'gray', color: 0x000000 };

    // write some text, with top and bottom lines, which position is based on the text dimensions
    const words = 'Hello 汉语 World';
    cxt.writeText(words, 50, 145, textOptions);
    console.log(words.length);
    pdfWriter.writePage(page).end();
}
// rgbWrong();