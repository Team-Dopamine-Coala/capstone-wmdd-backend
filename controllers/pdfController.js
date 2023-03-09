const PDFDocument =  require('pdfkit');
const nodemailer = require('nodemailer');
const moment = require('moment');

// Get related models
const Class = require('../models/classModel');
const Program = require('../models/programModel');
const Student = require('../models/studentModel');
const Evaluation = require('../models/evaluationModel');
const EvaluationComment = require('../models/evaluationCommentModel');
const Skill = require('../models/skillModel');
const User = require('../models/userModel');

// Get base64 images
const Images = require('../assets/images');

const getPdf = async (req, res, next) => {
  const { classid, studentid } = req.params

  if (!classid || !studentid) {
    res.status(401).send('Access denied')
  }

  // Gather data
  const studentClass = await Class.findOne({ _id: classid })
  const program = await Program.findOne({ _id: studentClass.programId })
  const student = await Student.findOne({ _id: studentid })
  const evaluation = await Evaluation.find({ studentId: studentid, classId: classid }).sort({createdAt: -1})
  const evaluationComment = await EvaluationComment.findOne({ studentId: studentid, classId: classid })
  const skills = await Skill.find().sort({createdAt: -1})
  const coach = await User.findOne({ _id: studentClass.userId })

  const getSkillName = (skillid) => {
    const skill = skills.filter(skill => skill._id == skillid)
    return skill[0].name
  }

  const getRatingIcon = (rating, isPDF) => {
    if (rating <= 1) {
      return `Not Started ${!isPDF ? '<img src="https://res.cloudinary.com/dp53wf7gb/image/upload/v1678314974/coala_not_started_bzijw7.png" />' : ''}`
    } else if (rating === 2) {
      return `Ongoing ${!isPDF ? '<img src="https://res.cloudinary.com/dp53wf7gb/image/upload/v1678314974/coala_ongoing_cdxjen.png" />' : ''}`
    } else if (rating === 3) {
      return `Completed ${!isPDF ? '<img src="https://res.cloudinary.com/dp53wf7gb/image/upload/v1678314974/coala_completed_t24sd0.png" />' : ''}`
    }
  }

  const getEvaluationData = evaluation.map((item, i) => {
    return `
      <tr>
        <td style="padding: 5px 10px;">${i + 1}. ${getSkillName(item.skillId)}</td>
        <td style="text-align: right; vertical-align: middle; padding: 5px 10px;">${getRatingIcon(item.rating, false)}</td>
      </tr>
    `
  }).join('')

  // PDF and Email process
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
      to: student.guardianEmail,
      subject: `New evaluation report for ${student.firstname} ${student.lastname}!`,
      text: 'You need HTML to view',
      html: `
        <p>Howdy, ${student.guardianName}!</p>
        <p>Attached is the evaluation report of student ${student.firstname} ${student.lastname} for their <strong>${studentClass.title}</strong> class.</p>
        <p>Have a great day!</p>
        <hr />
        <br />
        <table width="700px" cellpadding="0" cellspacing="0" border="0" style="font-family: Helvetica; font-size: 20px; color: black; margin-bottom: 10px;">
          <tr>
            <td><img src="https://res.cloudinary.com/dp53wf7gb/image/upload/v1678314237/coalaLogo_fsaqmu.png" /></td>
            <td style="text-align: right; font-weight: bold; vertical-align: bottom;">Report Card</td>
          </tr>
        </table>

        <table width="700px" cellpadding="0" cellspacing="0" border="0" style="font-family: Helvetica; font-size: 18px; color: black; margin-bottom: 50px;">
          <thead style="background-color: #FE7F2D; color: white;">
            <tr>
              <th style="text-align: left; padding: 5px 15px;">${studentClass.startTime} - ${studentClass.endTime}</th>
            </tr>
          </thead>
          <tbody style="background-color: #FFECE0;">
            <tr>
              <td style="padding: 10px 10px 0"><strong>Name:</strong> ${student.firstname} ${student.lastname}</td>
            </tr>
            <tr>
              <td style="padding: 0px 10px 10px"><strong>Curriculum:</strong> ${program.name}</td>
            </tr>
          </tbody>
        </table>

        <table width="700px" cellpadding="0" cellspacing="0" border="0" style="font-family: Helvetica; font-size: 18px; color: black; margin-bottom: 50px;">
          <thead style="background-color: #FE7F2D; color: white;">
            <tr>
              <th colspan="2" style="text-align: left; padding: 5px 15px;">${studentClass.title}</th>
            </tr>
          </thead>
          <tbody style="background-color: #FFECE0;">
            ${getEvaluationData}
          </tbody>
        </table>

        <table width="700px" cellpadding="0" cellspacing="0" border="0" style="font-family: Helvetica; font-size: 18px; color: black; margin-bottom: 40px;">
          <thead style="background-color: #FE7F2D; color: white;">
            <tr>
              <th colspan="2" style="text-align: left; padding: 5px 15px;">Comments</th>
            </tr>
          </thead>
          <tbody style="background-color: #FFECE0;">
            <tr>
              <td style="padding: 10px;">${evaluationComment.comment}</td>
            </tr>
          </tbody>
        </table>

        <table width="700px" cellpadding="0" cellspacing="0" border="0" style="font-family: Helvetica; font-size: 20px; font-weight: bold; color: black; text-align: right;">
          <tr>
            <td colspan="2">Coach: ${coach.firstName} ${coach.lastName}</td>
          </tr>
          <tr>
            <td colspan="2">Date: ${moment().format('MMM Do')}</td>
          </tr>
        </table>
      `,
      attachments: [{
          filename: `Evaluation Report - ${student.firstname} ${student.lastname}.pdf`,
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
  myDoc.image(Images.coalaLogo, 230, 40, {width: 150})
      .moveDown()
      .moveDown()
      .moveDown()

  myDoc.font('Helvetica-Bold')
      .fontSize(16)
      .text(`Report Card`, {align: 'center'})
      .moveDown()

  myDoc.font('Helvetica-Bold')
      .fontSize(16)
      .fillColor('#FE7F2D')
      .text(`${studentClass.startTime} - ${studentClass.endTime}`, {
        underline: true
      })

  myDoc.font('Helvetica-Bold')
      .fontSize(14)
      .fillColor('#000000')
      .moveDown()
      .text(`Name: `, {
        continued: true
      })
      .font('Helvetica')
      .text(`${student.firstname} ${student.lastname}`)

  myDoc.font('Helvetica-Bold')
      .fontSize(14)
      .fillColor('#000000')
      .text(`Curriculum: `, {
        continued: true
      })
      .font('Helvetica')
      .text(`${program.name}`)
      .moveDown()
      .moveDown()

  myDoc.font('Helvetica-Bold')
      .fontSize(16)
      .fillColor('#FE7F2D')
      .text(`${studentClass.title}`, {
        underline: true
      })
      .moveDown()

  evaluation.forEach((item, i) => {
    myDoc.font('Helvetica')
      .fontSize(14)
      .fillColor('#000000')
      .text(`${i + 1}. ${getSkillName(item.skillId)}`, {
        continued: true
      })
      .text(`${getRatingIcon(item.rating, true)}`, {
        align: 'right'
      })
  })

  myDoc.moveDown()
      .moveDown()
      .font('Helvetica-Bold')
      .fontSize(16)
      .fillColor('#FE7F2D')
      .text(`Comments`, {
        underline: true
      })
      .moveDown()

  myDoc.font('Helvetica')
      .fontSize(14)
      .fillColor('#000000')
      .text(`${evaluationComment.comment}`)
      .moveDown()
      .moveDown()

  myDoc.font('Helvetica-Bold')
      .fontSize(16)
      .text(`Coach: ${coach.firstName} ${coach.lastName}`, {
        align: 'right'
      })

  myDoc.font('Helvetica-Bold')
      .fontSize(16)
      .text(`Date: ${moment().format('MMM Do')}`, {
        align: 'right'
      })

  myDoc.end();
}

module.exports = {
  getPdf
}