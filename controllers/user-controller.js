const { User, Thought } = require('../models');

const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'users',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'User was not found' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // Update an existing user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User was not found' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User was not found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // Add a friend
    newFriend({ params, body }, res) { 
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Friend was not found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // Delete a friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;