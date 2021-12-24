const { tokens } = require("@sushiswap/default-token-list");
// const download = require("download");
const fs = require("fs-extra");
const Web3 = require("web3");

const SUPPORTED_CHAINIDS = [1, 3, 4, 5, 42, 42161, 421611, 10, 250];

const web3 = new Web3();
const checksumAddress = (address) => web3.utils.toChecksumAddress(address);

// Write to file
async function writeTokenData(token) {
  const { chainId, address } = token;

  const _address = checksumAddress(address);

  const fp = `./tokens/${chainId}/${_address}/info.json`;

  console.log({ fp, _address });

  await Promise.all(await fs.outputFile(fp, JSON.stringify(token))).catch(
    (err) => undefined
  );
}

// [ChainId.Arbitrum]
const map = {};

const promises = tokens.map(async (token) => {
  const address = checksumAddress(token.address);
  if (SUPPORTED_CHAINIDS.includes(token.chainId)) {
    if (!map[token.chainId]) {
      map[token.chainId] = {};
    }
    console.log(address, token.chainId);
    map[token.chainId][address] = token;
    await writeTokenData(token);
  }
});

// Promise.all(promises).then(() => {
//   console.log({ map }, Object.keys(map[42161]).length);
// });

module.exports = { map };
