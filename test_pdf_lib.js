// import { PDFDocumentFactory, PDFDocumentWriter, StandardFonts, drawText } from 'pdf-lib';
const pl = require('pdf-lib');
const { PDFDocumentFactory, PDFDocumentWriter, StandardFonts, drawText } = pl;
const fs = require('fs');

const pdfDoc = PDFDocumentFactory.create();
// const [CourierRef, CourierFont] = pdfDoc.embedStandardFont(
//     StandardFonts.Courier,
// );
// const [CourierRef, CourierFont] = pdfDoc.embedStandardFont(
//     StandardFonts.Courier,
// );
// const [timesRomanRef, timesRomanFont] = pdfDoc.embedStandardFont(
//     StandardFonts.TimesRoman,
// );
const [SymbolRef, SymbolFont] = pdfDoc.embedStandardFont(
    StandardFonts.Symbol,
);
// const [ZapfDingbatsRef, ZapfDingbatsFont] = pdfDoc.embedStandardFont(
//     StandardFonts.ZapfDingbats,
// );
// const fontPath = "/usr/share/fonts/truetype/freefont/FreeSans.ttf";
const fontPath = "/usr/share/fonts/truetype/nanum/NanumBarunGothic.ttf";
const fontBytes = fs.readFileSync(fontPath);

const [fontRef, font] = pdfDoc.embedNonstandardFont(fontBytes);
const page = pdfDoc
    .createPage([350, 500])
    .addFontDictionary('nanum', fontRef);

const contentStream = pdfDoc.createContentStream(
    drawText(font.encodeText('中文汉语is awesome!'), {
        x: 50,
        y: 450,
        size: 15,
        font: 'nanum',
        colorRgb: [192, 192, 192],
    }),
);
// const page = pdfDoc
//     .createPage([350, 500])
//     .addFontDictionary('Symbol', SymbolRef);

// const contentStream = pdfDoc.createContentStream(
//     drawText(SymbolFont.encodeText('is awesome!'), {
//         x: 50,
//         y: 450,
//         size: 15,
//         font: 'Symbol',
//         colorRgb: [192, 192, 192],
//     }),
// );

page.addContentStreams(pdfDoc.register(contentStream));

pdfDoc.addPage(page);

const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);

fs.writeFile('test_pdf_lib.pdf', pdfBytes);