const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const validator = require('validator');
const moment_timezone = require('moment-timezone');

// contact schema
const ContactSchema = new mongoose.Schema({
	isOwner: {
		type: Boolean,
		default: 0
	},
	first_name: {
		type: String,
		trim: true,
		required: true,
		minLength: 1
	},
	last_name: {
		type: String,
		trim: true,
		minLength: 1
	},
	company: {
		type: String,
		trim: true
	},
	title: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minLength: 1,
		unique: true,
		validate: {
			validator: value => {
				return validator.isEmail(value);
			},
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		minLength: 6
	},
	timezone: {
		type: String,
		trim: true,
		default: moment_timezone.tz.guess()
	}
});

// add created/modified timestamps
ContactSchema.plugin(timestamp);

// create Contact model
const Contact = mongoose.model('Contact', ContactSchema);

module.exports = {
	Contact
};
