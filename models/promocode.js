const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PromocodeShcema = new Schema({
	name: String,
	discount: Number
});

module.exports = mongoose.model('Promocode', PromocodeShcema);