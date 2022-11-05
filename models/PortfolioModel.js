const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stocks: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
