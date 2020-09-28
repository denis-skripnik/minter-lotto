async function home(bot_login) {
    let text = `Welcome to @${bot_login}. You are an admin. Select an action from the menu. If it doesn't exist, send the command Home`;
return text;
}

async function gamers_addresses(addresses) {
    let text = '';
    if (addresses !== '') {
    text = `List of addresses:
${addresses}
`;
    } else {
        text = 'The list is currently empty.';
    }
return text;
}

async function fundPercent() {
    return 'Enter the percentage of the Fund that will be distributed among the winners. Examples: 5, 20, or 100';
}

async function fundPercentTyped(percent) {
    return `You pointed out ${percent}%.`;
}

async function workingType() {
    return 'Select the mode of operation: when the bot will select winners and distribute tokens.';
}

async function inTime() {
    return `Setting up the "time-based" operation mode. Enter the date and time in the format dd.mm.yyyy hh:mm:ss.`;
}

async function inTimeTyped(date, time) {
    return `"On time" mode is enabled. Date: ${date}, time: ${time}.`;
}

async function inTimeError(message) {
    return `Error. The date and time message format is probably incorrect. Details for the bot developer (just in case):
${message}.`;
}

async function inTimeInChats(date, time, bot_login) {
    return `The current @${bot_login} lottery round will end on ${date} ${time}.`;
}

async function inAmount() {
    return `Setting up the "by amount" operation mode. Enter the amount that the winner will reach. If the current amount is greater than it, the selection will start at the next payment.`;
}

async function inAmountTyped(amount) {
    return `The "by amount" mode is enabled. If players transfer ${amount} BIP, the winner will be selected.`;
}

async function inAmountInChats(amount) {
    return `The current round will end when players transfer ${amount} BIP.`;
}

async function leadersCount() {
    return `Enter the number of winners.`;
}

async function leadersCountTyped(lc) {
    return `Winners: ${lc}.`;
}

async function numberError(message) {
    return `Error: you need to enter a number. If you entered it, please send the error text to the developer:
${message}`;
}

async function sendState(status, balance, address, last_block) {
    let text = '';
        if (status !== '') {
        let mode = '';
            if (status.status === 'in_time') {
            mode = `"By time", Date and time: ${status.data}`;
        } else if (status.status === 'in_amount') {
            mode = `"By amount", amount: ${status.data} BIP.`;
        }
            text = `Operating mode: ${mode}, Percentage of the Fund to winners: ${status.fund_percent}%, Number of winners: ${status.leaders_count}.
Balance from fund: ${balance} BIP.
Fund address:
${address}
Last block from database: ${last_block}.`;
    } else {
        text = `The operating mode is not selected.
        Balance from fund: ${balance} BIP.
        Fund address:
        ${address}
Last block from database: ${last_block}`;
    }
return text;    
}
    
module.exports.home = home;
module.exports.gamers_addresses = gamers_addresses;
module.exports.fundPercent = fundPercent;
module.exports.fundPercentTyped = fundPercentTyped;
module.exports.workingType = workingType;
module.exports.inTime = inTime;
module.exports.inTimeTyped = inTimeTyped;
module.exports.inTimeError = inTimeError;
module.exports.inTimeInChats = inTimeInChats;
module.exports.inAmount = inAmount;
module.exports.inAmountTyped = inAmountTyped;
module.exports.inAmountInChats = inAmountInChats;
module.exports.leadersCount = leadersCount;
module.exports.leadersCountTyped = leadersCountTyped;
module.exports.numberError = numberError;
module.exports.sendState = sendState;