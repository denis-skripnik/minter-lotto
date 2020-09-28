async function typedMinterAddress(address) {
    return `Ваш адрес в Минтере: ${address}.
Отправляйте 1 BIP только с него.`;
}

async function checkSubscribes(subscribes, bot_login) {
    let text = `Добро пожаловать в @${bot_login}.
Для участия в лотерее вам необходимо подписаться:
`;
if (subscribes.indexOf('channel') === -1) text += `На канал @kitmoonchannel
`;
if (subscribes.indexOf('kitmoongroup') === -1) text += `На чат @kitmoongroup.
`;
if (subscribes.indexOf('kittmonOTC') === -1) text += `На чат по адресу <a href="https://t.me/joinchat/HqW6ZlPA9tC2v12Tr_VdAw">https://t.me/joinchat/HqW6ZlPA9tC2v12Tr_VdAw</a>.
`;
text += `И нажать на кнопку "Проверить подписки".`;
return text;
}

async function winnerMSG(number, generated_block, end_block, address, leaders_count) {
    let text = `Поздравляем! Вы победили!
Выпало число ${number} - под ним оказались вы в списке игроков.
Блок генерации числа: ${generated_block},
Блок окончания раунда: ${end_block},
Адрес в блокчейне Minter: ${address}.
Проверить достоверность генерации числа можно <a href="https://dpos.space/dev/minter/randomblockchain/?block1=${generated_block}&block2=${end_block}&participants=${leaders_count}" target="_blank">Здесь</a>.
`;
return text;
}

async function participation(fund_address, user_address) {
    return `Отправьте 1 BIP на адрес фонда ${fund_address} со своего кошелька ${user_address}.
Все ваши транзакции будут учтены.`;
}

async function winnersChatsMessage(balance, leaders_count, gamers_count, end_block, winners, bot_login) {
    let text = `Очередной раунд лотереи завершён. Фонд: ${balance},
Число победителей: ${leaders_count}, 
блок завершения раунда: ${end_block}.
Победители:
`;
for (let winner of winners) {
    text += `Число-победитель: ${winner.winner}, адрес: ${winner.address}, блок генерации случайного числа: ${winner.generated_block}, <a href="https://dpos.space/dev/minter/randomblockchain/?block1=${winner.generated_block}&block2=${end_block}&participants=${gamers_count}" target="_blank">доказательство честности</a>
`;
}
text += `
Участвуйте в лотерее @${bot_login} и побеждайте.`;
    return text;
}

module.exports.typedMinterAddress = typedMinterAddress;
module.exports.checkSubscribes = checkSubscribes;
module.exports.winnerMSG = winnerMSG;
module.exports.participation = participation;
module.exports.winnersChatsMessage = winnersChatsMessage;