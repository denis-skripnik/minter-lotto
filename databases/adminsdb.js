const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/exchanger';

async function getUser(id) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        const db = client.db("lotto_bot");

        let collection = db.collection('admins');

        let res = await collection.findOne({id});

return res;
    } catch (err) {

return err;
    } finally {

        client.close();
    }
}

async function addUser(id, lng, prev_status, status) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        const db = client.db("lotto_bot");

        let collection = db.collection('admins');

        let res = await collection.insertOne({id, lng, prev_status, status});

return res;

    } catch (err) {

        console.log(err);
    return err;
      } finally {

        client.close();
    }
}

async function updateUser(id, lng, prev_status, status) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
      .catch(err => { console.log(err); });

  if (!client) {
      return;
  }

  try {

      const db = client.db("lotto_bot");

      let collection = db.collection('admins');

      let res = await collection.updateOne({id}, {$set: {id, lng, prev_status, status}}, {});

return res;

  } catch (err) {

      console.log(err);
  return err;
    } finally {

      client.close();
  }
}

module.exports.getUser = getUser;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;