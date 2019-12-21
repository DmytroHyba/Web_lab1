const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
const url = "mongodb://localhost:27017";

app.use('/',express.static('.'));
app.use(bodyParser.json());

app.get('/appeal', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        let dbo = db.db("server");
        let result = dbo.collection("appeal").find().toArray().then(function (data) {
            res.send(data);
        });
        db.close();
    });
});

app.post('/appeal', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("server");
            dbo.collection("appeal").insert(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.put('/appeal', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("server");
            dbo.collection("appeal").update(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.delete('/appeal', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("server");
            dbo.collection("appeal").remove(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.get('/all_news', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        let dbo = db.db("server");
        let result = dbo.collection("all_news").find().toArray().then(function (data) {
            res.send(data);
        });
        db.close();
    });
});

app.post('/all_news', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("server");
            dbo.collection("all_news").insert(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.put('/all_news', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("server");
            dbo.collection("all_news").update(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.delete('/all_news', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("server");
            dbo.collection("all_news").remove(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.listen(port, function () {
    console.log("Listening at port", port);
});