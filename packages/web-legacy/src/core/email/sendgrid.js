import mail from '@sendgrid/mail'
import { sendgridConfig } from '../../../src/config'

mail.setApiKey(sendgridConfig.apiKey)

export const sendgridTemplates = sendgridConfig.templates;

const sendgrid = Object.freeze({

    send: async (to, data, template = sendgridTemplates.generic) => {
        try {
            await mail.send({
                from: sendgridConfig.senderEmail,
                to,
                dynamicTemplateData: data,
                templateId: template,
            })
        } catch (error) {
            console.error(error)
            if (error.response) {
                console.error(error.response.body)
            }
        }
    }

});

export default sendgrid;

