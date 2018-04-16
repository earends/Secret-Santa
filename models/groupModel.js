const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const group = new Schema({
	members: [{ 
		name: {type: String,required:true},
		number:{type:String, required:true}
	 }],
	leader: { 
		name: {type: String,required:true},
		number:{type:String,required:true}
	}
},{ collection: 'Group' });


module.exports = mongoose.model('Group', group);