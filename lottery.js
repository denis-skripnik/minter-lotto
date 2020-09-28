const blockchain = require("./blockchain");
const botjs = require("./bot/bot");

async function run() {
    await botjs.allCommands();
await blockchain.getBlocks();
}
run();