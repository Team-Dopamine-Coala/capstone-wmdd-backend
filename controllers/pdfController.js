const PDFDocument =  require('pdfkit');
const nodemailer = require('nodemailer');

// Get related models
const Student = require('../models/studentModel');
const Class = require('../models/classModel');
const Evaluation = require('../models/evaluationModel');
const EvaluationComment = require('../models/evaluationCommentModel');

// Get base64 images
const Images = require('../assets/images');

const getPdf = async (req, res, next) => {
  const { classid, studentid } = req.params

  if (!classid || !studentid) {
    res.status(401).send('Access denied')
  }

  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

  var myDoc = new PDFDocument({bufferPages: true});

  let buffers = [];
  myDoc.on('data', buffers.push.bind(buffers));
  myDoc.on('end', () => {
    let pdfData = Buffer.concat(buffers);

    var transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false,
      auth: {
        user: 'elmz.arnsi@gmail.com',
        pass: 'HvqN2OKLzXc67kwP'
      }
    })

    var mailOptions = {
      from: 'Team Coala <team@coachcoala.ca>',
      to: 'elmz.arnsi@gmail.com',
      subject: 'Hey there',
      text: 'some text',
      html: 'just a <strong>test</strong>',
      attachments: [{
          filename: "Evaluation Report.pdf",
          contentType: 'application/pdf',
          content: pdfData
      }]
    }

    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(404).send(error)
        } else {
          res.status(200).send('Email report sent!')
        }
      })
    } catch (e) {
      res.status(401).send('Something went wrong')
    }

  });

    // Scale proprotionally to the specified width
  myDoc.image(Images.coalaLogo, {width: 191})
  .text('Proportional to width');

  myDoc.font('Helvetica')
      .fontSize(14)
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