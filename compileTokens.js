const { tokens } = require("@sushiswap/default-token-list");
const fs = require("fs-extra");

const SUPPORTED_CHAINIDS = [1, 42161];

// Write to file
async function writeTokenData(token) {
  const { chainId, address } = token;
  await fs.outputFile(
    `./tokens/${chainId}/${address}.json`,
    JSON.stringify(token)
  );
}

// [ChainId.Arbitrum]
const map = {};

const promises = tokens.map(async (token) => {
  if (SUPPORTED_CHAINIDS.includes(token.chainId)) {
    if (!map[token.chainId]) {
      map[token.chainId] = {};
    }
    console.log(token.address, token.chainId);
    map[token.chainId][token.address] = token;
    await writeTokenData(token);
  }
});

Promise.all(promises).then(() => {
  console.log({ map }, Object.keys(map[42161]).length);
});

module.exports = { map };
