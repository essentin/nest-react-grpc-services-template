import React from 'react';
import Oy from 'oy-vey';
import { IntlProvider } from 'react-intl';
import fetch from '../fetch';
import EmailTemplate from './template/EmailTemplate';
import { emailConfig } from '../../config';
import { getSubject } from './template/subjects';

export async function sendEmail(to, type, content) {
    let from = emailConfig.sender + '<' + emailConfig.senderEmail + '>';
    let html, subjectData = getSubject(type), emailContent = content;

    let query = `query getEmailLogo{
        getEmailLogo { 
          name
          value
        }
      }`;

    const siteSettingsQuery = `
      query($type: String) {
        siteSettings(type: $type) {
          name
          value
        }
      }
    `;

    if (content && !content.logo) {
        const logoResp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query
            }),
            credentials: 'include',
        });

        const { data } = await logoResp.json();
        emailContent.logo = data && data.getEmailLogo && data.getEmailLogo.value;
    }

    const siteSettingsResponse = await fetch('/graphql', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: siteSettingsQuery,
            variables: { type: 'site_settings' }
        }),
        credentials: 'include',
    });

    const { data } = await siteSettingsResponse.json();
    if (data && data.siteSettings && data.siteSettings.length > 0) {
        let facebookLink = data.siteSettings.find(element => element.name === 'facebookLink');
        let pinterestLink = data.siteSettings.find(element => element.name === 'pinterestLink');
        let instagramLink = data.siteSettings.find(element => element.name === 'instagramLink');
        let linkedinLink = data.siteSettings.find(element => element.name === 'linkedinLink');
        let siteSettings = {
            facebookLink: facebookLink && facebookLink['value'],
            pinterestLink: pinterestLink && pinterestLink['value'],
            instagramLink: instagramLink && instagramLink['value'],
            linkedinLink: linkedinLink && linkedinLink['value']
        };
        emailContent = {
            siteSettings,
            ...emailContent
        };
    }

    html = Oy.renderTemplate(
        <IntlProvider locale={"en"}>
            <EmailTemplate type={type} content={emailContent} />
        </IntlProvider>, {
        title: subjectData.subject,
        previewText: subjectData.previewText
    });

    let mailOptions = {
        from,
        to, // list of receivers
        subject: subjectData.subject, // Subject line
        //text: textMessage, // plain text body
        html
    };

    const resp = await fetch('/sendEmail', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mailOptions }),
        credentials: 'include'
    });
    const { status, response } = await resp.json();
    return { status, response };
}
