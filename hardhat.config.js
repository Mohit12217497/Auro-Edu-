require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
