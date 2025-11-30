// utils/tokenStore.js
const { config } = require("../config/config");

let TOKENS = {
  JWT_TOKEN: config.userToken.jwt || null,
  REFRESH_TOKEN: config.userToken.refresh || null,
  FEED_TOKEN: config.userToken.feed || null
};

function setTokens({ JWT_TOKEN, REFRESH_TOKEN, FEED_TOKEN }) {
  TOKENS.JWT_TOKEN = JWT_TOKEN;
  TOKENS.REFRESH_TOKEN = REFRESH_TOKEN;
  TOKENS.FEED_TOKEN = FEED_TOKEN;
}

function getTokens() {
  return TOKENS;
}

module.exports = { setTokens, getTokens };
