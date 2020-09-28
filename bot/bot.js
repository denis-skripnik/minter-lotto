const conf = require('../config.json');
const TeleBot = require('telebot');
const bot = new TeleBot(conf.bot_api_key);
bot.start();
const gm = require("./gamers");
const adm = require("./admins");

async function ids(uid) {
    if (conf.admins.indexOf(uid) > -1) {
        return {status: 2, id: uid};
    } else {
        return {status: 1, id: uid};
    }
}

async function keybord(btn_list) {
    let replyMarkup = bot.keyboard([
            btn_list,
    ], {resize: true});
    var buttons = {
        parseMode: 'Html',
        replyMarkup};
        return buttons;
    }

async function sendMSG(userId, text, buttons) {
        let options = await keybord(buttons);
        await bot.sendMessage(userId, text, options);
}

async function sendMSGToChats(userId, text) {
    var buttons = {
        parseMode: 'Html'};
    await bot.sendMessage(userId, text, buttons);
}

async function allCommands() {
    try {
    bot.on('text', async (msg) => {
        var uid = await ids(msg.from.id);
        var my_name = msg.from.first_name + ' ' + msg.from.last_name;
        if (uid.status === 1) {
            await gm.main(uid.id, my_name, msg.text);
        } else if (uid.status === 2) {
            await adm.main(uid.id, my_name, msg.text);
        }
    });
    } catch(er) {
        console.log(JSON.stringify(er));
    }
}

async function checkSubscribes(uid) {
var chats = [];
    try {
            let chat1 = await bot.getChatMember(-1001498464851, uid);
let chat2 = await bot.getChatMember('@kitmoongroup', uid);
let chat3 = await bot.getChatMember(-1001405155024, uid)
if (chat1.user.id === uid && chat1.status === 'member') chats.push('channel');
if (chat2.user.id === uid && chat2.status === 'member') chats.push('kitmoongroup');
if (chat3.user.id === uid && chat3.status === 'member') chats.push('kittmonOTC');
} catch (e) {
console.log(JSON.stringify(e));
    }
return chats;
}

async function sendChatsMSG(text) {
    try {
    let chats = conf.chats;
for (let chat of chats) {
    await sendMSGToChats(chat, text);
}
    } catch(e) {
        console.log(JSON.stringify(e));
    }
}

module.exports.sendMSG = sendMSG;
module.exports.allCommands = allCommands;
module.exports.checkSubscribes = checkSubscribes;
module.exports.sendChatsMSG = sendChatsMSG;