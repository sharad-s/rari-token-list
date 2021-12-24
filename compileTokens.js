const { tokens } = require("@sushiswap/default-token-list");
// const download = require("download");
const fs = require("fs-extra");

const SUPPORTED_CHAINIDS = [1, 3, 4, 5, 42, 42161, 421611, 10, 250];

// Write to file
async function writeTokenData(token) {
  const { chainId, address } = token;

  //   let arr = token.logoURI.split("/")
  //   const fileType = arr[arr.length -1].split(".")[1]

  await Promise.all(
    await fs.outputFile(
      `./tokens/${chainId}/${address}/info.json`,
      JSON.stringify(token)
    )
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

// Promise.all(promises).then(() => {
//   console.log({ map }, Object.keys(map[42161]).length);
// });

module.exports = { map };
