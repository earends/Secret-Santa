const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const group = new Schema({
	members: { type: [String],required:true },
	leader: { type: String, required: true }
},{ collection: 'Group' });


module.exports = mongoose.model('Group', group);
