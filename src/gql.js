const axios = require("axios");

const FUSE_SUBGRAPH_URLS = {
  1: "https://api.studio.thegraph.com/query/853/fuse-zacel/0.5.31",
};

const getUnderlyingAssets = async (chainId = 1) => {
  const res = await axios.post(
    FUSE_SUBGRAPH_URLS[chainId],
    {
      query: `
      query GetAllUnderlyingAssets {
        underlyingAssets(first: 400) {
          id
        }
      }
      `,
      // variables: {
      //   now: new Date().toISOString(),
      // },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let ids = res.data.data.underlyingAssets.map(({ id }) => id);
  return ids
};

getUnderlyingAssets();
