const express = require('express')
const {
    getAllAudits,
    getAudit,
    createAudit,
    deleteAudit,
    updateAudit,
    getAllAuditsForSpace,
    getLatestAuditForSpace
} = require('../controllers/auditsController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// CONTINUOUS AUDITS

// GET all audits
router.get('/', getAllAudits)

// GET one audit
router.get('/:id', getAudit)

// POST a new audit for a space
router.post('/', createAudit)

// DELETE an audit
router.delete('/:id', deleteAudit)

// UPDATE an audit
router.patch('/:id', updateAudit)

// GET all audits for a space
router.get('/spaces/:name', getAllAuditsForSpace)

// GET latest audit for a space
router.get('/spaces/:space/1', getLatestAuditForSpace)

module.exports = router

