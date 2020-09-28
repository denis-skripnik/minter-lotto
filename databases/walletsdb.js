const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/exchanger';

async function getWallet(address) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        const db = client.db("lotto_bot");

        let collection = db.collection('wallets');

        let res = await collection.findOne({address});

return res;
    } catch (err) {

return err;
    } finally {

        client.close();
    }
}

async function updateWallet(address) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
      .catch(err => { console.log(err); });

  if (!client) {
      return;
  }

  try {

      const db = client.db("lotto_bot");

      let collection = db.collection('wallets');

      let res = await collection.updateOne({address}, {$set: {address}}, {upsert:true});

return res;

  } catch (err) {

      console.log(err);
  return err;
    } finally {

      client.close();
  }
}

async function removeWallet(address) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
      .catch(err => { console.log(err); });

  if (!client) {
      return;
  }

  try {

      const db = client.db("lotto_bot");

      let collection = db.collection('wallets');

      let res = await collection.deleteOne({address});

return res;

  } catch (err) {

      console.log(err);
  return err;
    } finally {

      client.close();
  }
}

async function findAllWallets() {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
      .catch(err => { console.log(err); });

  if (!client) {
      return;
  }

  try {

      const db = client.db("upromo");

      let collection = db.collection('wallets');

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

module.exports.getWallet = getWallet;
module.exports.updateWallet = updateWallet;
module.exports.removeWallet = removeWallet;
module.exports.findAllWallets = findAllWallets;