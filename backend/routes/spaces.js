const express = require('express')
const {
  getSpaces, 
  getSpace, 
  createSpace, 
  deleteSpace, 
  updateSpace
} = require('../controllers/spaceController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// protect routes
router.use(requireAuth)

// GET all spaces
router.get('/', getSpaces)

// GET a single space
router.get('/:id', getSpace)

// POST a new space
router.post('/', createSpace)

// DELETE a space
router.delete('/:id', deleteSpace)

// UPDATE a space
router.patch('/:id', updateSpace)

module.exports = router