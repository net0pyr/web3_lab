const checkShotContract = artifacts.require("checkShotContract");

module.exports = function (deployer) {
    deployer.deploy(checkShotContract);
};