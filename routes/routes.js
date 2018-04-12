const mainHelper = require('../controllers/mainHelper');


module.exports = function (app) {
	app.route('/')
		.get(mainHelper.main)
	app.route('/sms')
		.post(mainHelper.mainPost)
	
	
};
