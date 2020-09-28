async function home(bot_login) {
    let text = 'Добро пожаловать в @${bot_login}. Вы админ. Выберите действие в меню. Если его нет, отправьте слово Главная';
return text;
}


async function gamers_addresses(addresses) {
    let text = '';
    if (addresses !== '') {
    text = `Список адресов:
${addresses}
`;
    } else {
        text = 'В настоящее время список пуст.';
    }
return text;
}

async function fundPercent() {
    return 'Введите процент от фонда, который будет распределяться между победителями. Пример: 5, 20 или 100';
}

async function fundPercentTyped(percent) {
    return `Вы указали ${percent}%.`;
}

async function workingType() {
    return 'Выберите режим работы: когда бот будет выбирать победителей и рассылать токены.';
}

async function inTime() {
    return `Настройка режима работы "по времени". Введите дату и время в формате dd.mm.yyyy hh:mm:ss.`;
}

async function inTimeTyped(date, time) {
    return `Включён режим работы "По времени". Дата: ${date}, время: ${time}.`;
}

async function inTimeError(message) {
    return `Ошибка. Вероятно неверный формат сообщения даты и времени. Подробности для разработчика бота (на всякий случай):
${message}.`;
}

async function inTimeInChats(date, time, bot_login) {
    return `Текущий раунд лотереи @${bot_login} завершится ${date} ${time}.`;
}

async function inAmount() {
    return `Введите сумму, по достижении которой будет находиться победитель. Если текущая сумма больше неё, выбор начнётся при следующем платеже.`;
}

async function inAmountTyped(amount) {
    return `Включён режим работы "По сумме". Если игроки переведут ${amount} BIP, будет выбор победителя.`;
}

async function inAmountInChats(amount) {
    return `Текущий раунд завершится, когда игроки переведут ${amount} BIP.`;
}

async function leadersCount() {
    return `Введите количество победителей.`;
}

async function leadersCountTyped(lc) {
    return `Победителей: ${lc}.`;
}

async function numberError(message) {
    return `Ошибка: надо ввести число. Если же вы ввели его, просьба отправить разработчику текст ошибки:
${message}`;
}

async function sendState(status, balance, address, last_block) {
let text = '';
    if (status !== '') {
    let mode = '';
        if (status.status === 'in_time') {
        mode = `"По времени", дата и время: ${status.data}`;
    } else if (status.status === 'in_amount') {
        mode = `"По сумме", Сумма: ${status.data} BIP.`;
    }
        text = `Режим работы: ${mode}, Процент от фонда победителям: ${status.fund_percent}%, Количество победителей: ${status.leaders_count}.
Баланс фонда: ${balance} BIP.
Адрес фонда:
${address}
Текущий блок в базе данных: ${last_block}.`;
} else {
    text = `Режим работы не установлен.
Баланс фонда: ${balance} BIP.
Адрес фонда:
${address}
Текущий блок из базы данных: ${last_block}`;
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