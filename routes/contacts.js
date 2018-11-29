const errors = require('restify-errors');
const {Contact} = require('../models/Contact.js');

module.exports = server => {

	// ROUTE: GET /contacts
	// get all contacts
	server.get('/contacts', async (req, res) => {
		try {
			const contacts = await Contact.find({});
			res.send(contacts);
		} catch(err) {
			return next(new errors.InvalidContentError(err));
		}
	});

	// ROUTE: GET /contacts/:id
	// get single contact
	server.get('/contacts/:id', async (req, res, next) => {
		try {
			const contact = await Contact.findById(req.params.id);
			res.send(contact);
			return next();
		} catch(err) {
			return next(new errors.ResourceNotFoundError(`No contact found with id: ${req.params.id}`));
		}
	});


	// ROUTE: POST /contacts
	// add contact
	server.post('/contacts', async (req, res, next) => {

		// check for JSON
		if (!req.is('application/json')) {
			return next(new errors.InvalidContentError("Content-Type is not 'application/json'"));
		}

		// de-structure to get what we need
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

	// ROUTE: POST /contacts/:id
	// update contact
	server.put('/contacts/:id', async (req, res, next) => {
		// check for JSON
		if (!req.is('application/json')) {
			return next(new errors.InvalidContentError("Content-Type is not 'application/json'"));
		}

		try {
			const contact = await Contact.findOneAndUpdate({_id: req.params.id }, req.body);
			res.send(200);
			return next();
		} catch(err) {
			return next(new errors.ResourceNotFoundError(`No contact found with id: ${req.params.id}`));
		}

	});












};
