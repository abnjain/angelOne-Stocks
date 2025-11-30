const axios = require("axios");
const { config } = require("../config/config");
const { getTokens } = require("../store/tokenStore");

module.exports.getScrips = async () => {
    try {
        const { JWT_TOKEN } = getTokens();
        // console.log(JWT_TOKEN);
        

        const response = await axios.post("https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/searchScrip",
            {
                "exchange": "NSE",
                "searchscrip": "BANKNIFTY"
            },
            {
                headers: {
                    'Authorization': `Bearer ${JWT_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserType': 'USER',
                    'X-SourceID': 'WEB',
                    'X-ClientLocalIP': `${config.user.privateIP}`,
                    'X-ClientPublicIP': `${config.user.publicIP}`,
                    'X-MACAddress': `${config.user.mac}`,
                    'X-PrivateKey': `${config.angelOne.apiKey}`
                }
            });

        console.log(response.data);

    } catch (error) {
        console.error("Error in instruments: ", error);
    }
};