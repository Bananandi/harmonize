const { MongoClient } = require('mongodb');

// In this json file is the dbUri
const config = require("./config/db.json");

const mongoClient = new MongoClient(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db;

const dbConn = {
    connectToServer: (callback) => {
        mongoClient.connect((err, client) => {
            // Verify we got a good "db" object
            if (client) {
                db = client.db('songsDb');
                console.log('Successfully connected to MongoDB');
            }
            return callback(err);
        });
    },

    getDb: () => db,
};

exports.dbConn = dbConn;