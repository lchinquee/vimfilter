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
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:id/friends/:friendId')
    .post(newFriend)
    .delete(deleteFriend);

module.exports = router;