// importiamo la perte di express
const express = require('express');

// utilizzo perte di express per gestire le rotte
const router = express.Router();

// importiamo il reletivo controller
const movieControllers = require('../controllers/movieControllers');

// definizione rotte

// rotta index
router.get('/', movieControllers.index);

// rotta show
router.get('/:id', movieControllers.show);

module.exports = router;