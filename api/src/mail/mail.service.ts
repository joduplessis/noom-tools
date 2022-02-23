
export const MailService = {
    sendTest: async (fastify: any) => {
        fastify.mail.sendEmail({
            From: 'support@noomtools',
            To: 'support@noomtools',
            Subject: 'Hello from Postmark',
            HtmlBody: '<strong>Hello</strong> dear Postmark user.',
            TextBody: 'Hello from Postmark!',
            MessageStream: 'outbound',
        })
    },

    sendWelcome: async (fastify: any, email: string) => {
        fastify.mail.sendEmailWithTemplate({
            From: 'support@noomtools',
            To: email,
            ReplyTo: 'support@noomtools',
            TemplateAlias: 'welcome',
            TemplateModel: {},
        })
    },

    sendPasswordReset: async (fastify: any, email: string, token: string) => {
        fastify.mail.sendEmailWithTemplate({
            From: 'support@noomtools',
            To: email,
            ReplyTo: 'support@noomtools',
            TemplateAlias: 'password-reset',
            TemplateModel: { token },
        })
    },
}
