import React from 'react';
import Oy from 'oy-vey';

// SMTP libraries & configurations
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

import EmailTemplate from './template/EmailTemplate';
import { getSubject } from './template/subjects';

import { IntlProvider } from 'react-intl';

import { emailConfig } from '../../config';
import { getSiteLogo } from './helpers/getSiteLogo';
import { getSiteSettings } from './helpers/getSiteSettings';

export async function sendEmailFromServer(to, type, emailContent) {
    try {
        let from = emailConfig.sender + '<' + emailConfig.senderEmail + '>';
        if (!emailContent) emailContent = {};

        let html, { subject, previewText } = getSubject(type, emailContent.subjectValue);

        if (emailContent && !emailContent.logo) {
            emailContent.logo = await getSiteLogo();
        }
        
        emailContent.siteSettings = await getSiteSettings();

        html = Oy.renderTemplate(
            <IntlProvider locale={"en"}>
                <EmailTemplate type={type} content={emailContent} />
            </IntlProvider>, {
            title: subject,
            previewText
        });

        let mailOptions = {
            from,
            to, // list of receivers
            subject, // Subject line
            //text: textMessage, // plain text body
            html
        };

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport(smtpTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            auth: {
                user: emailConfig.email,
                pass: emailConfig.password
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: emailConfig.tls
            }
        }));

        let sendSMTPEmail = await transporter.sendMail(mailOptions);

        if (sendSMTPEmail && !sendSMTPEmail.messageId) {
            console.log('Failed to send mail')
        }

    } catch (error) {
        console.log('Failed to send mail');
        console.log(error);
    }
}
