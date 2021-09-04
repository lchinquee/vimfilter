const { Schema, model } = require('mongoose');
const validator = require('validator');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Email address is required',
            validate: {
                validator: validator.isEmail,
                message: 'Must enter a valid email address!'
            }
        },
        thoughts: [        
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [        
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Get total number of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('User', UserSchema);

// Export the User model
module.exports = User;