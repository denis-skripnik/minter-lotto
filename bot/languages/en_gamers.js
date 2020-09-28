async function typedMinterAddress(address) {
    return `Your Minter address: ${address}.
.`;
}

async function checkSubscribes(subscribes, bot_login) {
    let text = `Welcome to @${bot_login}.
In order to participate in the lottery you have to subscribe:
`;
if (subscribes.indexOf('channel') === -1) text += `To @kitmoonchannel
`;
if (subscribes.indexOf('kitmoongroup') === -1) text += `To chat @kitmoongroup
`;
if (subscribes.indexOf('kittmonOTC') === -1) text += `Chat at <a href="https://t.me/joinchat/HqW6ZlPA9tC2v12Tr_VdAw">https://t.me/joinchat/HqW6ZlPA9tC2v12Tr_VdAw</a>
`;
text += `And click on the "Check Subscriptions" button .`;
return text;
}

async function winnerMSG(number, generated_block, end_block, address, leaders_count) {
    let text = `Congratulations!  You won!
The number picked is ${number} you are in the list of players.
Number generation block: ${generated_block},
End block: ${end_block},
Minter blockchain address: ${address}.
<a href="https://dpos.space/dev/minter/randomblockchain/?block1=${generated_block}&block2=${end_block}&participants=${leaders_count}" target="_blank">Here</a> you can check the reliability of the number generation.
`;
return text;
}

async function participation(fund_address, user_address) {
    return `Send 1 BIP from your wallet ${user_address} to the fund address ${fund_address}.
All оf your transactions will be taken into account.`;
}

async function winnersChatsMessage(balance, leaders_count, gamers_count, end_block, winners, bot_login) {
    let text = `Another round of the lottery is completed. Fund: ${balance},
Number of winners: ${leaders_count},
round completion block: ${end_block}.
Winners:
`;
for (let winner of winners) {
    text += `Won number: ${winner.winner}, Address: ${winner.address},     address: mx ..., random number generation block: ${winner.generated_block}, <a href="https://dpos.space/dev/minter/randomblockchain/?block1=${winner.generated_block}&block2=${end_block}&participants=${gamers_count}" target="_blank">proof of integrity</a>
`;
}
text += `
Participate in the @${bot_login} lottery and win.`;
    return text;
}

module.exports.typedMinterAddress = typedMinterAddress;
module.exports.checkSubscribes = checkSubscribes;
module.exports.winnerMSG = winnerMSG;
module.exports.participation = participation;
module.exports.winnersChatsMessage = winnersChatsMessage;