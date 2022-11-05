const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({});

module.exports = mongoose.model('Stock', StockSchema);
