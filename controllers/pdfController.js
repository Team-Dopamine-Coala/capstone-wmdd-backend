const PDFDocument =  require('pdfkit');
const emailjs = require('@emailjs/nodejs');

const getPdf = async (req, res, next) => {
  var myDoc = new PDFDocument({bufferPages: true});

  let buffers = [];
  myDoc.on('data', buffers.push.bind(buffers));
  myDoc.on('end', () => {

    let pdfData = Buffer.concat(buffers);
    // res.writeHead(200, {
    // 'Content-Length': Buffer.byteLength(pdfData),
    // 'Content-Type': 'application/pdf',
    // 'Content-disposition': 'attachment;filename=test.pdf',})
    // .end(pdfData);

    var templateParams = {
      to_name: 'Elmer',
      student_name: 'Check this Elmerini!',
      message: 'new report',
    };
    
    emailjs
      .send('service_38kp6pw', 'template_coachcoala', templateParams, {
        publicKey: 'user_jHZJS1x4gGwhp3Os6sKi3',
        privateKey: 'a42ebe7bebe2dff7bb8c54a6dd6e7170', // optional, highly recommended for security reasons
      })
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (err) {
          console.log('FAILED...', err);
        },
      );

});

  myDoc.font('Times-Roman')
      .fontSize(12)
      .text(`This is the first line`)
      .text(`This is probably the second line`)
      .moveDown()
      .text(`There is a space before this line`)

  myDoc
      .addPage()
      .text('Check out YK portfolio', 100, 100)
      .underline(100, 100, 160, 27, { color: 'pink' })
      .link(100, 100, 160, 27, 'https://yuenkihung.com/');
  
  myDoc.end();
}

module.exports = {
  getPdf
}