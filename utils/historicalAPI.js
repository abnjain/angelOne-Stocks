const axios = require("axios");
const { config } = require("../config/config");
const { getTokens } = require("../store/tokenStore");

module.exports.getHistoricalData = async () => {
  try {
    const { JWT_TOKEN } = getTokens();
    // console.log(JWT_TOKEN);
    const now = new Date();
    const oneMinuteLater = new Date(now.getTime() + 60 * 1000);

    // Format as "YYYY-MM-DD HH:mm:ss"
    const pad = (n) => n.toString().padStart(2, '0');
    const formatDateTime = (d) => [
      d.getFullYear(),
      pad(d.getMonth() + 1),
      pad(d.getDate())
    ].join('-') + ' ' +
      [pad(d.getHours()), pad(d.getMinutes())].join(':');

    const fromdate = formatDateTime(now);
    const todate = formatDateTime(oneMinuteLater);

    console.log(fromdate);
    console.log(todate);

    const response = await axios.post(
      "https://apiconnect.angelone.in/rest/secure/angelbroking/historical/v1/getCandleData",
      {
        exchange: "NSE",
        symboltoken: "99926000",
        interval: "ONE_MINUTE",
        fromdate: fromdate,
        todate: todate,
      },
      {
        headers: {
          "Authorization": `Bearer ${JWT_TOKEN}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserType": "USER",
          "X-SourceID": "WEB",
          "X-ClientLocalIP": `${config.user.privateIP}`,
          "X-ClientPublicIP": `${config.user.publicIP}`,
          "X-MACAddress": `${config.user.mac}`,
          "X-PrivateKey": `${config.angelOne.apiKey}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Error in instruments: ", error);
  }
};
