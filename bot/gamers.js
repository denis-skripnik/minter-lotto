const conf = require('../config.json');
let lng = {};
lng['Русский'] = require('./languages/ru.json');
lng['English'] = require('./languages/en.json');
let texts = {};
texts['Русский'] = require('./languages/ru_gamers');
texts['English'] = require('./languages/en_gamers');
const botjs = require("./bot");
const gdb = require("../databases/gamerdb");
const helpers = require("../helpers");
const mnt = require("../minter");

// Клавиатура
async function keybord(lang, variant) {
    var buttons = [];
    if (variant === 'not_subscribe') {
        buttons = [lng[lang].check_subscribes,lng[lang].lang];
    } else if (variant === 'lng') {
        buttons = ["English", "Русский"];
    } else if (variant === 'subscribed') {
        buttons = [lng[lang].minter_address, lng[lang].take_part, lng[lang].lang];
    }     else if (variant === 'back') {
    buttons = [lng[lang].back];
}     else if (variant === 'cancel') {
        buttons = [lng[lang].cancel];
    }
return buttons;
}

// Команды
async function main(id, my_name, message) {
    let user = await gdb.getUser(id);
    if (!user) {
        await gdb.addUser(id, '', '', '', 'start');
    } else {
        if (lng[user.lang] && lng[user.lang].back && message !== lng[user.lang].back) {
            await gdb.updateUser(id, user.address, user.lng, user.status, message);
        } else {
            await gdb.updateUser(id, user.address, user.lng, user.prev_status, user.status);
        }            
            }

    if (message.indexOf('start') > -1 || user && user.lng && message.indexOf(lng[user.lng].lang) > -1) {
let text = '';
let btns;
if (message.indexOf('start') > -1 && user && user.lng && user.lng !== '') {
    await main(id, my_name, lng[user.lng].check_subscribes)
} else {
    text = `Select language: Выберите язык.`;
    btns = await keybord('', 'lng');
    await botjs.sendMSG(id, text, btns);
}
    } else if (user && user.lng && message.indexOf(lng[user.lng].check_subscribes) > -1 || user && user.lng && message.indexOf(lng[user.lng].take_part) > -1) {
        let text = '';
        let btns = [];
        let checking = await botjs.checkSubscribes(id);
        if (checking && checking.length === 3) {
            if (!user || user && !user.address || user && user.address && user.address === '') { // if not address in database.
            await main(id, my_name, lng[user.lng].minter_address)
            } else { // if address yes.
                text = await texts[user.lng].participation(conf.minter_address, user.address);
            }
            btns = await keybord(user.lng, 'subscribed');
        } else {
            text = await texts[user.lng].checkSubscribes(checking, conf.bot_login);
            btns = await keybord(user.lng, 'not_subscribe');
        }
                    await botjs.sendMSG(id, text, btns);
                } else if (user && user.lng && message.indexOf(lng[user.lng].minter_address) > -1) {
                    let text = lng[user.lng].enter_mx;
                                let btns = await keybord(user.lng, 'cancel');
                                await botjs.sendMSG(id, text, btns);    
                            } else if (typeof lng[message] !== "undefined") {
                        let text = lng[message].selected_language;
        let btns = await keybord(message, '');
                    await gdb.updateUser(id, user.code, message);
                    await botjs.sendMSG(id, text, btns);
                    await helpers.sleep(3000);
                    await main(id, my_name, lng[message].check_subscribes)
                } else if (user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].back) > -1 || user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].cancel) > -1) {
                    await main(id, my_name, user.prev_status);
                } else {
                    if (user.status === lng[user.lng].minter_address) {
                        await gdb.updateUser(id, message, user.lng, user.prev_status, user.status);
                        let text = await texts[user.lng].typedMinterAddress(message);
let btns = await keybord(user.lng, 'subscribed');
await botjs.sendMSG(id, text, btns);
await helpers.sleep(2000);
await main(id, my_name, lng[user.lng].check_subscribes)
}
                    }
}

async function winnerMessage(number, generated_block, end_block, address, id, leaders_count) {
    let user = await gdb.getUser(id);
    if (user) {
    let text = await texts[user.lng].winnerMSG(number, generated_block, end_block, address, leaders_count);
    let btns = await keybord(user.lng, 'subscribed');
    await botjs.sendMSG(id, text, btns);
    }
}

async function winnersMessageToChats(balance, leaders_count, gamers_count, end_block, winners) {
        let text = await texts['Русский'].winnersChatsMessage(balance, leaders_count, gamers_count, end_block, winners, conf.bot_login);
        await botjs.sendChatsMSG(text);
    }

        module.exports.main = main;
        module.exports.winnerMessage = winnerMessage;
        module.exports.winnersMessageToChats = winnersMessageToChats;