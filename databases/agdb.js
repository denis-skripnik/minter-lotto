const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/exchanger';

async function addActiveGamer(address, balance, tg_id, block, hash) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        const db = client.db("lotto_bot");

        let collection = db.collection('active_games');

        let res = await collection.insertOne({address, balance, tg_id, block, hash});

return res;

    } catch (err) {

        console.log(err);
    return err;
      } finally {

        client.close();
    }
}

async function findAllActiveGamers() {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
      .catch(err => { console.log(err); });

  if (!client) {
      return;
  }

  try {

      const db = client.db("lotto_bot");

      let collection = db.collection('active_games');

      const res = [];
      let cursor = await collection.find({}).limit(500);
      let doc = null;
      while(null != (doc = await cursor.next())) {
          res.push(doc);
      }
  return res;
    } catch (err) {

      console.log(err);
  return err;
    } finally {

      client.close();
  }
}

async function removeActiveGamers() {

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
      .catch(err => { console.log(err); });

  if (!client) {
      return;
  }

  try {

      const db = client.db("lotto_bot");

      let collection = db.collection('active_games');

      let res = await collection.drop();

return res;

  } catch (err) {

      console.log(err);
  return err;
    } finally {

      client.close();
  }
}

module.exports.addActiveGamer = addActiveGamer;
module.exports.findAllActiveGamers = findAllActiveGamers;
module.exports.removeActiveGamers = removeActiveGamers;