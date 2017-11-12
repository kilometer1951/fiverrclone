const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;


const OrderShcema = new Schema({
	buyer: { type: Schema.Types.ObjectId, ref: 'User' },
	seller: { type: Schema.Types.ObjectId, ref: 'User' },
	gig: { type: Schema.Types.ObjectId, ref: 'Gig' },
	messages: [{
		type: Schema.Types.ObjectId, ref: 'Message' 
	}],
	created: { type: Date, default: Date.now }

});

OrderShcema.plugin(deepPopulate);


module.exports = mongoose.model('Order', OrderShcema);