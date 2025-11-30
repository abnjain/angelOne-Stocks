const { config } = require('../config/config.js');
const express = require('express');
const axios = require('axios');
const { GoogleGenAI } = require("@google/genai");
const { SYSTEMPROMPT } = require('./systemPrompt.txt.js');
const { setTokens, getTokens } = require("../store/tokenStore.js");
const { getStockData } = require('../utils/getStockData.js');
const { getScrips } = require('../utils/instruments.js');

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({});

// getStockData();
const login = async () => {
    try {
        const data = {
            "clientcode": `${config.angelOne.clientID}`,
            "password": `${config.angelOne.clientPin}`,
            "totp": `${config.angelOne.clientTotp}`,
            // "state": "STATE_VARIABLE"
        }
        const response = await axios.post('https://apiconnect.angelone.in/rest/auth/angelbroking/user/v1/loginByPassword', data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserType': 'USER',
                    'X-SourceID': 'WEB',
                    'X-ClientLocalIP': `${config.user.privateIP}`,
                    'X-ClientPublicIP': `${config.user.publicIP}`,
                    'X-MACAddress': `${config.user.mac}`,
                    'X-PrivateKey': `${config.angelOne.apiKey}`,
                }
            });
        console.log('Angel Login Result:', response.data);
        let tokens = response.data;
        setTokens({
            JWT_TOKEN: tokens.jwtToken,
            REFRESH_TOKEN: tokens.refreshToken,
            FEED_TOKEN: tokens.feedToken
        })
        // const {JWT_TOKEN} = getTokens();
        // console.log(JWT_TOKEN);
        
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
    }
};
// login();
getStockData();
// getScrips();
// app.post('/analyze', async (req, res) => {
const analyzeHandler = async () => {
    try {
        const fullPrompt = await SYSTEMPROMPT();
        // console.log('Received /analyze request with body:', fullPrompt);

        const response = await ai.models.generateContent({
            model: config.gemini.modelName,
            contents: "Generate detailed stock options analysis",
            config: {
                // thinkingConfig: {
                //     thinkingBudget: 0, // Disables thinking
                // },
                systemInstruction: fullPrompt
            }
        });
        // const text = response.text();
        // console.log(response);
        console.log(response.text);
        // console.log(text);



        // return res.json({
        //     disclaimer: "THIS IS NOT FINANCIAL ADVICE. FOR EDUCATIONAL PURPOSES ONLY.",
        //     analysis: text,
        //     timestamp: new Date().toISOString()
        // });

    } catch (error) {
        console.error('Error in analyzeHandler:', error);
        // return res.status(500).json({ error: error.message });
    }
}
// );
// analyzeHandler();

const PORT = config.server.port;
app.listen(PORT, () => {
    console.log(`MCP server running on http://localhost:${PORT}`);
});