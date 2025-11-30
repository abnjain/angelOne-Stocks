const { Client } = require("@modelcontextprotocol/sdk");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/node");

const client = new Client(
  {
    name: "TestClient",
    version: "1.0.0",
  },
  {
    transport: new StdioClientTransport(),
  }
);

// Test run
async function test() {
  const result = await client.callTool("getAngelData", {
    symbol: "TCS",
    exchange: "NSE"
  });

  console.log("RESPONSE:", JSON.stringify(result, null, 2));
}

test();
