var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a schema
var shortenUrlSchema = new Schema({
    originalUrl: String,
    shortUrl: String,
    uuid: String,
    createDateTime: { type: Date, default: Date.now },
    clicksCount: Number
});

module.exports = mongoose.model('ShortUrls', shortenUrlSchema);