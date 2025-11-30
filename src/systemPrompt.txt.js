const { getStockData } = require('../utils/getStockData.js');
const { getStockStaticData } = require('../utils/getStockStaticData.js');

module.exports.SYSTEMPROMPT = async () => {
    const stockData = await getStockData();
    // let stockData = await getStockStaticData;
    // stockData = { ...stockData.data };

    return `
    Give me today's most accurate intraday options analysis for NIFTY & FINNIFTY.
Time window for analysis: 9:30 AM - 11:30 AM IST. Use ONLY real-time live market data.

Follow these rules strictly and respond in the exact output format below.

A) PRECHECKS (auto)
• If index option liquidity is low, bid/ask spread is wide, premium > ₹50, or any major scheduled news/event is within the next 30 minutes → respond "NO TRADE" with reason. 
• Ensure recommended strike's premium and lot size keep my max risk per trade ≈ ₹300-₹400 (capital ₹10,000). If not possible, suggest alternate strike or "NO TRADE".
• If signals conflict heavily (trend unclear / indicators opposite), confidence < 5 → "NO TRADE".

B) MARKET OVERVIEW
• Global sentiment: SGX NIFTY, major US futures, Asian markets (brief)
• Pre-market/Opening volatility (ATR or implied vol summary)
• Current intraday trend: Bullish / Bearish / Sideways
• Momentum strength: Strong / Moderate / Weak / Choppy

C) PRICE ACTION (1-minute)
Report exact:
• VWAP trend and price vs VWAP (above/below + distance %)
• EMA9 slope (up/down/flat) and EMA50/200 relation
• Supertrend color & confirmation
• RSI(14) value and condition (overbought/oversold/neutral)
• MACD momentum direction
• Volume vs average 5-min volume
• Market structure: HH/HL or LH/LL
• Any fake breakout or liquidity-hunt signs

D) OPTION CHAIN DEEP STUDY (both indices)
• Last traded premiums for ATM and nearest safe OTM
• OI & ΔOI (CE & PE) + top 3 CE walls and top 3 PE walls
• PCR (spot & change) + direction
• Aggressive buyer/seller footprints
• Premium behaviour for nearest 50-100 OTM strikes

E) LEVELS & ZONES
• Strong intraday supports (exact numeric levels)
• Strong intraday resistances (exact numeric levels)
• Liquidity zones & breakout zones (exact numeric levels)
• Max Pain (if relevant) + effect on intraday bias

F) INDEX COMPARISON & CHOICE
• Compare NIFTY vs FINNIFTY on trend clarity, volume, OI support, and momentum
• Choose ONLY ONE index to trade and give a concise justification

G) FINAL TRADE SETUP (ONLY ONE high-probability trade)
Provide EXACT numeric values:
• Index: NIFTY / FINNIFTY
• Strategy: Buy CE or Buy PE
• Strike: exact strike number + reason (distance OTM, premium affordability)
• Entry price (LTP) + acceptable slippage range (±)
• Stop-Loss price (strict) — must equal ~30% of premium (show calculation)
• Target price — 30% (and optional Target 2 if trailing)
• Position sizing: max lots/contracts allowed for ₹10,000 capital (show math)
• Confidence score (0-10) + short reason
• Liquidity indicators (bid/ask spread, available contracts)
• If conditional, specify exact trigger (e.g., “Only buy if price retests VWAP and closes above ___ on 1-min timeframe”)

H) RISK RULES (MANDATORY)
• Stop-loss = 30% of premium
• Target = 30% (or trail as suggested)
• No averaging losing trades
• No revenge trades
• Maximum 1 trade for the day unless clearly stated otherwise
• If confidence < 5 → "NO TRADE"

I) QUICK CHECKLIST (just before the trade)
• “Trade OK” or “NO TRADE” + one-sentence reason

J) If NO TRADE:
• Provide top 3 watch levels and exact numeric triggers to consider a later trade.

End with ONE final actionable line for execution, like:
“Buy FINNIFTY 20900 CE @ ₹22.5 — SL ₹15.75 — Target ₹29.25 — Max 1 lot — Confidence 7/10”.
    
    Data:
    ${stockData.fetched ? JSON.stringify(stockData.fetched, null, 2) : 'No stock data available currently, API may be down.'}
    `
};