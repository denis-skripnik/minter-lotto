# minter-lotto
 Lotto bot for minter projects

## Purpose
After subscribing to the project's chats and channels (checks this), you can participate in the lottery: asks for the user's address in Minter and gives your own. When the user sends funds, the bot catches the transaction in the DB and adds it to the database. At the appointed time, the winners are selected randomly using an open RNG.
The RNG of my development is used [minter-random](https://github.com/denis-skripnik/minter_random).

The bot has the ability to configure the date and time of the draw, the distributed percentage of the Fund, and so on.

## 1. Config in config.json
1. Change 123456789 to your admin Telegram Ids.
Examples:
[381472853, 936184325]
or
[633910354];
2. Change bot login and api key to your data.
3. Change node address in "minter_api" if this need.
4. Change minter_address and seed_frase to your lottery wallet data.
5. Change chat ids to your ids for checking subscribes.

## 2. install npm packages
npm install
in bot directory.

## 3. Start
node lottery.js
or
pm2 start lottery.js
if you installed pm2:
npm install pm2 --g

# Минтер-лото
Лото-бот для проектов minter

## Назначение
После подписки на чаты и каналы проекта (проверяет это) позволяет участвовать в лотерее: спрашивает адрес пользователя в Минтере и даёт свой. Когда пользователь отправляет средства, бот ловит транзакцию в БЧ и добавляет в базу данных. В назначенное время случайным образом при помощи открытого ГСЧ происходит выбор победителей.
Используется ГСЧ моей разработки [minter-random](https://github.com/denis-skripnik/minter_random).

В боте есть возможность настройки даты и времени розыгрыша, распределяемого процента от фонда и т.д.

## 1. Настройка в config.json
1. Измените 123456789 на ваши идентификаторы администратора в Telegram.
Примеры:
[381472853, 936184325]
или
[633910354];
2. Измените логин бота и ключ api на ваши данные.
3. Измените адрес Ноды в "minter_api", если это необходимо.
4. Измените minter_address и seed_frase на данные вашего лотерейного кошелька.
5. Измените идентификаторы чатов на ваши идентификаторы для проверки подписок.

## 2. установка пакетов npm
npm install
в каталоге ботов.

## 3. запуск
node lottery.js
или
pm2 start lottery.js
если вы установили pm2:
npm install pm2 --g