import nodemailer from 'nodemailer'
import { email as emailConfig } from '../config.js'

let transporter = nodemailer.createTransport(emailConfig)

export let Get = async (to, from, data) => {
    let mailOptions = {
        from: '"Yu 👻" <org@wanan.me>', // sender address
        to: '1103307414@qq.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error)
            throw error
        }
        return info
    })
} 