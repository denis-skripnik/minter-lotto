const conf = require('./config.json');
const bdb = require("./databases/blocksdb");
const wdb = require("./databases/walletsdb");
const agdb = require("./databases/agdb");
const gdb = require("./databases/gamerdb");
const sdb = require("./databases/statedb");
const mnt = require("./minter");
const helpers = require('./helpers');
let BigI = require("big-integer");
const botjs = require("./bot/bot");
const gm = require("./bot/gamers");
const LONG_DELAY = 12000;
const SHORT_DELAY = 3000;
const SUPER_LONG_DELAY = 1000 * 60 * 15;

// Генерация leaders_count случайных чисел
// Просмотр списка участников и генерация. Если числа нет в списке, оно добавляется.
async function getWinners(gamers, block, leaders_count, fund_percent) {
    try {
    let acc = await mnt.getBalance(conf.minter_address);
    let balance = 0;
    let send_amount = 0;
    if (acc.balances.BIP) {
balance = acc.balances.BIP;
    balance *= (fund_percent / 100);
send_amount = balance / leaders_count;
}
let sig = block.hash;
    let ok_ops_count = 0;
if (gamers.length > 0) {
    var winners = [];
    var numbers = [];
    var send_list = [];
var return_list = [];
var return_balance = 0;
for (let gamer of gamers) {
    if (numbers.length === leaders_count) {
        break;
    }
    let prevSig = gamer.hash;
    let sha3 = prevSig + sig;
        let winner1 = BigI(sha3, 16).mod(gamers.length);
    winner1 = parseInt(winner1);
    if (numbers.indexOf(winner1) === -1) {
    let subs = await botjs.checkSubscribes(gamers[winner1-1].tg_id);
    if (subs && subs.length === 3) {
    numbers.push(winner1);
winners.push({winner: winner1, generated_block: gamer.block, address: gamers[winner1-1].address});
if (balance > 0) {
send_list.push({value: send_amount, coin: "BIP", to: gamers[winner1-1].address});
await gm.winnerMessage(winner1, gamer.block, block.num, gamers[winner1-1].address, gamers[winner1-1].tg_id, gamers.length);
} // end if balance > 0.
    } // end if winner and subscriber.length
else {
    return_balance += gamers[winner1-1].balance;
    return_list.push({value: gamers[winner1-1].balance, coin: "BIP", to: gamers[winner1-1].address});
} // end if not subscriber or error.
}     // end if search winner1 in winners.
} // end for.

if (return_list.length > 0) {
console.log('Возвращаем: ' + JSON.stringify(return_list));
        send_amount -= (return_balance/leaders_count);
        send_list = send_list.map(i => {return {value: send_amount, coin: i.coin, to: i.to}});
    }
    if (send_list.length > 0) {
console.log('Отправить: ' + JSON.stringify(send_list));        
        await gm.winnersMessageToChats(balance, winners.length, gamers.length, block.num, winners);
let all_send = send_list.concat(return_list);
await mnt.multiSend(conf.seed_frase, all_send, '');
        await agdb.removeActiveGamers();
    }
} // end if gamers.length >= leaders_count.
} catch(err) {
    console.log('Ошибка в функции генерации победителей: ' + JSON.stringify(err));
}
} // end function.

// Обработка блока.
async function processBlock(bn) {
    let ok_ops_count = 0;
    const block = await mnt.getBlockData(bn);
    let gamers = await agdb.findAllActiveGamers();
if (gamers && gamers.length > 0) {
    let state = await sdb.getState();
    if (state && state.status === 'in_time') {
        let block_unixtime = await helpers.unixTime(block.timestamp);
let state_unixtime = await helpers.unixTime(state.data);
if (block_unixtime >= state_unixtime) {
state_unixtime += 86400 + 10800;
let iso_state_datetime = new Date(state_unixtime*1000).toISOString().split('.')[0] + '+03:00';
await sdb.updateState(state.status, iso_state_datetime, state.fund_percent, state.leaders_count);
await getWinners(gamers, block, state.leaders_count, state.fund_percent);
}
    } else if (state && state.status === 'in_amount') {
        let gamers_amount = gamers.length;
        if (gamers_amount === state.data) {
            await getWinners(gamers, block, state.leaders_count, state.fund_percent);
        } // end if gamers_amount === amount for generation leaders.

    } // end if status in_amount.
} // end if gamers.
    
    let transactions = block.transactions
if (transactions.length > 0) {
                for (let tr of transactions) {
if (tr.data.coin.symbol === "BIP" && tr.data.value >= 1 && tr.data.to === conf.minter_address) {
    let user = await gdb.getUserFromMX(tr.from);
if (user) {
    let wallet = await wdb.getWallet(tr.from);
if (!wallet) {
await wdb.updateWallet(tr.from);
}
await agdb.addActiveGamer(tr.from, tr.data.value, user.id, bn, block.hash);
ok_ops_count += 1;
}
}
}
}                 else {
    ok_ops_count = 0;
}
return ok_ops_count;
    }

    // Работа с текущими и прошлыми блоками.
    let PROPS = null;
let bn = 0;
let last_bn = 0;
let delay = SHORT_DELAY;
async function getBlocks() {
    PROPS = await mnt.getBlockNum();
            const block_n = await bdb.getBlock(PROPS);
bn = block_n.last_block;

delay = SHORT_DELAY;
while (true) {
    try {
        if (bn > PROPS) {
            // console.log("wait for next blocks" + delay / 1000);
            await helpers.sleep(delay);
            PROPS = await mnt.getBlockNum();
        } else {
            if(0 < await processBlock(bn)) {
                delay = SHORT_DELAY;
            } else {
                delay = LONG_DELAY;
            }
            bn++;
            await bdb.updateBlock(bn);
        }
    } catch (e) {
        console.log("error in work loop" + e);
        await helpers.sleep(1000);
        }
    }
}

setInterval(() => {
    if(last_bn == bn) {

        try {
                process.exit(1);
        } catch(e) {
            process.exit(1);
        }
    }
    last_bn = bn;
}, SUPER_LONG_DELAY);

module.exports.getBlocks = getBlocks;