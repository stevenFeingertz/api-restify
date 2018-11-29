const errors = require('restify-errors');
const {Contact} = require('../models/Contact.js');

module.exports = server => {

	// ---> GET ALL CONTACTS
    server.get('/contacts', async (req, res, next) => {
    	try {
    		const contacts = await Contact.find({});
    		res.send(contacts);
    		return next();
    	} catch(err) {
    		return next(new errors.InvalidContentError(err));
    	}

    });

    // ---> ADD CONTACT
    server.post('/contacts', async (req, res, next) => {
    	// check for JSON
    	if (!req.is('application/json')) {
    		return next(new errors.InvalidContentError("Content-Type is not 'application/json'"));
    	}

        // guess timezone




    	// destructure to get what we need
    	const { first_name, last_name, email, company } = req.body;

    	const contact = new Contact({
    		first_name,
    		last_name,
    		email,
            company
    	});

    	try {
    		const newContact = await contact.save();
    		res.send(201);
    		return next();
    	} catch(err) {
    		return next(new errors.InternalError(err.message));
    	}

    });












};
