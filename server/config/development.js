const config = {
    db : {
        username: 'web',
        password: 'auctionproject',
        database: 'auction',
        host:'127.0.0.1',
        dialect:'mysql'
    },
    jwt : {
        jwtSecret: process.env.JWT_SECRET,
        jwtTokenExpiresIn: '30 days',
        emailTokenExpiresIn: '1 days',
    },
    mailServer : {
        gmailSMTP: {
                gmailSender: process.env.GMAIL_USERNAME,
                gmailConfig: {
                    service: 'Gmail',
                    auth: {
                        user: process.env.GMAIL_USERNAME,
                        pass: process.env.GMAIL_PASSWORD,
                    },
                    logger: true,
                    debug: true,
                }
        },
        mailTemplate: {
                subject: 'Please comfirm your email address',
        }
    }
    
}

module.exports = config;