const MongoClient = require('mongodb').MongoClient; // Подключаем npm пакет mongodb.

const url = 'mongodb://127.0.0.1:27017/exchanger'; // подключаемся к Монге.

async function getState() {

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        const db = client.db("lotto_bot");

        let collection = db.collection('state');

        let query = {}

        let res = await collection.findOne(query);

return res;

    } catch (err) {

return err;
    } finally {

        client.close();
    }
}

async function updateState(status, data, fund_percent, leaders_count) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        const db = client.db("lotto_bot");

        let collection = db.collection('state');

        let res = await collection.updateOne({}, {$set: {status, data, fund_percent, leaders_count}}, { upsert: true });

return res;
    } catch (err) {

        console.log(err);
    return err;
      } finally {

        client.close();
    }
}

module.exports.getState = getState;
module.exports.updateState = updateState;