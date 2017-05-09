var ShortUrls = require('./models/shorturls');

function getShortUrls(res) {
    ShortUrls.find(function (err, shorturls) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(shorturls); // return all shorturls in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------

    // get shortUrl by originalUrl
    app.get('/api/shortenurl/:originalUrl([^~]+)', function (req, res) {
        var originalUrl = req.params.originalUrl;
        ShortUrls.find({
            originalUrl: originalUrl
        }, function (err, data) {
            if (err)
                res.send(err);
            else {
                res.json(data[0]);
            }
        });
    });

    // get all urls
    app.get('/api/shortenurl/', function (req, res) {
        // use mongoose to get all shortUrls in the database
        getShortUrls(res);
    });

    // create shortUrl and send back all shortUrls after creation
    app.post('/api/shortenurl', function (req, res) {

        // create a shortUrl, information comes from AJAX request from Angular
        ShortUrls.create({
            createDateTime: req.body.date,
            originalUrl: req.body.originalUrl,
            shortUrl: req.body.shortUrl,
            uuid: req.body.uuid,
            clicksCount: req.body.clicksCount,
            done: false
        }, function (err, shortUrl) {
            if (err)
                res.send(err);

            // get and return all the shorturls after you create another
            getShortUrls(res);
        });
    });

    // delete a shortUrl
    app.delete('/api/shortenurl/:id', function (req, res) {
        ShortUrls.remove({
            _id: req.params.id
        }, function (err, shortUrl) {
            if (err)
                res.send(err);

            getShortUrls(res);
        });
    });

    // update clicks count
    app.get('/sh/:shorturl', function (req, res) {
        ShortUrls.find({
            shortUrl: { $regex : req.params.shorturl }
        }, function (err, data) {
            if (err)
                res.send(err);
            else {
                console.log(data);
                ShortUrls.findByIdAndUpdate(data[0].id,
                {
                    $inc: { clicksCount: 1 },
                    $set: { createDateTime : new Date()}
                },
                {
                    new: true
                },
                function (err, data) {
                    if (err) return res.status(500).send("There was a problem while updating.");
                    res.status(200);
                    res.redirect(data.originalUrl);
                });
            }
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
