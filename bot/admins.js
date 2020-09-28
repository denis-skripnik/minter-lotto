const conf = require('../config.json');
let lng = {};
lng['Русский'] = require('./languages/ru.json');
lng['English'] = require('./languages/en.json');
let texts = {};
texts['Русский'] = require('./languages/ru_admin');
texts['English'] = require('./languages/en_admin');
const botjs = require("./bot");
const adb = require("../databases/adminsdb");
const wdb = require("../databases/walletsdb");
const sdb = require("../databases/statedb");
const bdb = require("../databases/blocksdb");
const helpers = require("../helpers");
const mnt = require("../minter");

// Клавиатура
async function keybord(lang, variant) {
    var buttons = [];
    if (variant === 'home') {
        buttons = [lng[lang].working_type,lng[lang].gamers_addresses, lng[lang].fund_percent, lng[lang].leaders_count, lng[lang].status, lng[lang].lang];
    } else if (variant === 'lng') {
        buttons = ["English", "Русский"];
    } else if (variant === 'working_type') {
        buttons = [lng[lang].in_time, lng[lang].in_amount, lng[lang].back, lng[lang].home];
    }     else if (variant === 'back') {
    buttons = [lng[lang].back];
}     else if (variant === 'cansel') {
        buttons = [lng[lang].cancel];
    }
return buttons;
}

// Команды
async function main(id, my_name, message) {
    let user = await adb.getUser(id);
    if (!user) {
        await adb.addUser(id, '', '', 'start');
    } else {
        if (message !== lng[user.lang].back) {
            await adb.updateUser(id, user.lng, user.status, message);
        } else {
            await adb.updateUser(id, user.lng, user.prev_status, user.status);
        }
            }

    if (message.indexOf('start') > -1 || user && user.lng && message.indexOf(lng[user.lng].lang) > -1) {
let text = '';
let btns;
if (message.indexOf('start') > -1 && user && user.lng && user.lng !== '') {
    text = await texts[user.lng].home(conf.bot_login);
btns = await keybord(user.lng, 'home');
} else {
    text = `Select language: Выберите язык.`;
    btns = await keybord('', 'lng');
}
        await botjs.sendMSG(id, text, btns);
    } else if (user && user.lng && message.indexOf(lng[user.lng].home) > -1) {
            let text = await texts[user.lng].home(conf.bot_login);
                    let btns = await keybord(user.lng, 'home');
                    await botjs.sendMSG(id, text, btns);
                    } else if (typeof lng[message] !== "undefined") {
                        let text = `${lng[message].selected_language}
${await texts[message].home(conf.bot_login)}`;
        let btns = await keybord(message, 'home');
                    await adb.updateUser(id, message, user.status, message);
                    await botjs.sendMSG(id, text, btns);
                } else if (user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].gamers_addresses) > -1) {
    let addresses = '';
let wallets = await wdb.findAllWallets();
if (wallets && wallets.length > 0) {
for (let wallet of wallets) {
    addresses += `
${wallet.address}`
}
}
let text = await texts[user.lng].gamers_addresses(addresses);
    let btns = await keybord(user.lng, 'home');
    await botjs.sendMSG(id, text, btns);
} else if (user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].fund_percent) > -1) {
    let text = await texts[user.lng].fundPercent();
    let btns = await keybord(user.lng, 'cansel');
    await botjs.sendMSG(id, text, btns);
} else if (user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].working_type) > -1) {
    let text = await texts[user.lng].workingType();
    let btns = await keybord(user.lng, 'working_type');
await botjs.sendMSG(id, text, btns);
} else if (user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].in_time) > -1) {
    let text = await texts[user.lng].inTime();
    let btns = await keybord(user.lng, 'cansel');
    await botjs.sendMSG(id, text, btns);
} else if (user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].in_amount) > -1) {
    let text = await texts[user.lng].inAmount();
    let btns = await keybord(user.lng, 'cansel');
    await botjs.sendMSG(id, text, btns);
} else if (user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].leaders_count) > -1) {
    let text = await texts[user.lng].leadersCount();
    let btns = await keybord(user.lng, 'cansel');
    await botjs.sendMSG(id, text, btns);
} else if (user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].status) > -1) {
    let acc = await mnt.getBalance(conf.minter_address);
    let balance = 0;
    if (acc.balances.BIP) {
balance = acc.balances.BIP;
    }
    let block = await bdb.getBlock(0);
let last_block = block.last_block;
    let status = await sdb.getState();
    let text = '';
    if (status) {
        text = await texts[user.lng].sendState(status, balance, acc.address, last_block);
    } else {
        text = await texts[user.lng].sendState('', balance, acc.address, last_block);
    }
    let btns = await keybord(user.lng, 'home');
    await botjs.sendMSG(id, text, btns);
} else if (user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].back) > -1 || user && user.lng && user.lng !== '' && message.indexOf(lng[user.lng].cancel) > -1) {
    await main(id, my_name, user.prev_status);
} else {
    if (user && user.status && user.status === lng[user.lng].fund_percent) {
let text = '';
        try {
        let fund_percent = parseFloat(message);
if (fund_percent > 100) {
    fund_percent = 100;
}
        let status = await sdb.getState();
if (!status) {
    await sdb.updateState('', '', fund_percent, 10);
}         else {
    await sdb.updateState(status.status, status.data, message, status.leaders_count);
}
text = await texts[user.lng].fundPercentTyped(fund_percent);
} catch(e) {
    text = await texts[user.lng].numberError(e);
}
let btns = await keybord(user.lng, 'home');
    await botjs.sendMSG(id, text, btns);
} else if (user && user.status && user.status === lng[user.lng].in_time) {
    let text = '';
    try {
    let datetime = message.split(' ');
let date = datetime[0].split('.');
let time = datetime[1];
let [day, month, year] = date;
let datetime_str = `${year}-${month}-${day}T${time}+03:00`;
let status = await sdb.getState();
        if (!status) {
            await sdb.updateState('in_time', datetime_str, 100, 10);
        }         else {
            await sdb.updateState('in_time', datetime_str, status.fund_percent, status.leaders_count);
        }
        text = await texts[user.lng].inTimeTyped(datetime[0], datetime[1]);
    let chatText = await texts[user.lng].inTimeInChats(datetime[0], datetime[1], conf.bot_login);
    await botjs.sendChatsMSG(chatText);
await helpers.sleep(2000);
} catch(e) {
        text = await texts[user.lng].inTimeError(e);
    }        
        let btns = await keybord(user.lng, 'home');
            await botjs.sendMSG(id, text, btns);
        } else if (user && user.status && user.status === lng[user.lng].in_amount) {
            let text = '';
            try {
            let amount = parseFloat(message);
            let status = await sdb.getState();
                if (!status) {
                    await sdb.updateState('in_amount', amount, 100, 10);
                }         else {
                    await sdb.updateState('in_amount', amount, status.fund_percent, status.leaders_count);
                }
                text = await texts[user.lng].inAmountTyped(amount);
                let chatText = await texts[user.lng].inAmountInChats(amount);
                await botjs.sendChatsMSG(chatText);
            await helpers.sleep(2000);
            } catch(e) {
                text = await texts[user.lng].numberError(e);
            }
                let btns = await keybord(user.lng, 'home');
                    await botjs.sendMSG(id, text, btns);    
                } else if (user && user.status && user.status === lng[user.lng].leaders_count) {
                    let text = '';
                    try {
                    let leaders = parseInt(message);
                    let status = await sdb.getState();
                        if (!status) {
                            await sdb.updateState('По сумме', 50, 100, leaders);
                        }         else {
                            await sdb.updateState(status.status, status.data, status.fund_percent, leaders);
                        }
                        text = await texts[user.lng].leadersCountTyped(leaders);
                    } catch(e) {
                        text = await texts[user.lng].numberError(e);
                    }
                        let btns = await keybord(user.lng, 'home');
                            await botjs.sendMSG(id, text, btns);
                }
}
}

        module.exports.main = main;