const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    newFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Setup url locations for requests
router
    .route('/api/users')
    .get(getAllUsers)
    .get(getUserById)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/api/users/:userId/friends/friendId')
    .post(newFriend)
    .delete(deleteFriend);

module.exports = router;