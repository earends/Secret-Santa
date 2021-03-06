const axios = require("axios");

const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const groupModel = require('../models/groupModel')
const Group = mongoose.model('Group');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
// Twilio Credentials
//const accountSid = process.env.A_SID;
//const authToken = process.env.A_TOKEN;
// require the Twilio module and create a REST client
//const client = require('twilio')(accountSid, authToken);


module.exports = {
	main(req, res) {
		res.send("WELCOME TO SECRET SANTA ... BUT YOUR IN THE WRONG PLACE\NTEXT 206-123-3456");
	},
	mainPost(req,res) {
		var messageContent = req.body.Body; // text message content
		const twiml = new MessagingResponse();
		Group.find({}, (err, groups) => {
			if (err)
				return err;
			twiml.message(groups[0].leader.name)
		});

		
		/*
		Body here
		*/
		// message comes in check to see if its a leader
			// if leader then send back menu options
				// send options 
					/*
					1. add member to a group 
					2. delete member from your group 
					3. delete group 
					4. shuffle secret santa send to all members
					5. recieve list of all numbers within group 
					*/
			// if not leader then send non-leader options
				// send options 
					/*
					1. create group
					2. add yourself to a group
					3. delete yourself from a group 
					*/

		/*
		Body ends here
		*/
		res.writeHead(200, {'Content-Type': 'text/xml'});
		res.end(twiml.toString());
	},

	test() {

		Group.find({}, (err, groups) => {
			if (err)
				return err;
			SendMessage("","","helldadaso");
		});
	}

	
};



/*
	sends message to phone number
	m - messsage
	s - sender
	r - reciever
	*/
function SendMessage(s,r,m) {
		console.log(m);
		/*
		client.messages
		.create({
			to: r,
			from: '+'+s,
			body: m,
		})
		.then(message => console.log(message.sid));
		*/
	}

	/*
	Creates a new group, with a leader input
	*/
function CreateGroup(l_name,l_num) { // l = leader
		const newGroup = new Group({leader:{name:l_name,number:l_num},members:[{name:l_name,number:l_num}]})
		newGroup.save((err, response) => {
			if (err)
				console.log(err);
			console.log(response);
		});
	}
	/*
	Grabs a list of all of the groups in db
	*/

function GetAll () {
		
		Group.find({}, (err, groups) => {
			if (err)
				return err;
			SendMessage("","","helldadaso");
		});
}
	
	/*
	Grabs a single group by leader
	*/
function GetByLeader(l) {
		Group.find({leader:l}, (err, groups) => {
			if (err)
				console.log(err);
			return groups;
		});
	}
	/*
	Clears all groups within the db 
	*/
function	ClearAll() {
		Group.remove({}, (err, groups) => {
			if(err)
				console.log(err);
			console.log(groups);
		})
	}
	/*
	adds user to group
	find group by leader number
	*/
function addMember(l,member) { // l = leader's number

		var allMembers = GetByLeader(l).members // arrray of memebers
		allMembers.push(member);
		Group.findOneAndUpdate({ leader: l },{members:allMembers},(err, g) => {
                if (err)
                    console.log(err);
                return g;
			});

	}
	/*
	delete specific group
	find group by leader
	*/
function deleteGroupByLeader(l) { // l = leader
		Group.remove({ l: leader }, (err, g) => {
			if (err)
				console.log(err)


			return g;
		});
	}
	/*
	delete specific member from a group 
	find group by leader
	*/
function deleteMember(l,member) {

		var allMembers = GetByLeader(l).members // arrray of memebers
		var i = temp.indexOf(allMembers)
		if (i!=-1) {
			delete allMembers[i]
			Group.findOneAndUpdate({ leader: l },{members:allMembers},(err, g) => {
                if (err)
                    console.log(err);
                return g;
			});
		} 
	}


