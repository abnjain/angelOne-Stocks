require('dotenv').config();

module.exports.config = {
    server: {
        port: process.env.PORT || 3000
    },
    angelOne: {
        clientID: process.env.ANGEL_CLIENT_ID,
        apiKey: process.env.ANGEL_API_KEY,
        clientPin: process.env.ANGEL_CLIENT_PIN,
        clientTotp: process.env.ANGEL_TOTP
    },
    user: {
        privateIP: process.env.PRIVATE_IP,
        publicIP: process.env.PUBLIC_IP,
        mac: process.env.MAC_ADDRESS
    },
    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
        modelName: process.env.GEMINI_MODEL_NAME || "gemini-2.5-flash"
    },
    userToken: {
        jwt: process.env.JWT_TOKEN,
        refresh: process.env.REFRESH_TOKEN,
        feed: process.env.FEED_TOKEN
    }
}