const router = require('express').Router();

// Import all API routes from /api/index.js
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('404 Error!');
});

module.exports = router;

