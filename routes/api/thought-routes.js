const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/user-controller');

// Setup url locations for requests
router
    .route('/api/thoughts')
    .get(getAllThoughts)
    .get(getThoughtById)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/api/thoughts/:thoughtId/reactions')
    .post(newReaction)
    .delete(deleteReaction);

module.exports = router;