const axios = require("axios");
const { config } = require("../config/config.js");
const { getTokens } = require("../store/tokenStore.js");

const getStockData = async () => {
    try {
        const { JWT_TOKEN } = getTokens();

        if (!JWT_TOKEN) {
            console.log("❌ No JWT token found. Login not completed?");
            return null;
        }

        const response = await axios.post(
            "https://apiconnect.angelone.in/rest/secure/angelbroking/market/v1/quote",
            {
                mode: "FULL",
                exchangeTokens: {
                    "NSE": ["26000", "26017", "26009"],  // Example tokens for stocks like NIFTY, FINNIFTY, BANKNIFTY, etc.
                },
            },
            {
                headers: {
                    "X-PrivateKey": config.angelOne.apiKey,
                    Accept: "application/json",
                    "X-SourceID": "WEB",
                    "X-ClientLocalIP": config.user.privateIP,
                    "X-ClientPublicIP": config.user.publicIP,
                    "X-MACAddress": config.user.mac,
                    "X-UserType": "USER",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWT_TOKEN}`,
                },
            }
        );

        console.log("Function: ", JSON.stringify(response.data, null, 2));

        return response.data.data || null;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
};

module.exports = { getStockData };
