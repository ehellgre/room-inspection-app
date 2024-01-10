const Audit = require('../models/auditModel')
const Space = require('../models/spaceModel')
const mongoose = require('mongoose')


// GET all audits
const getAllAudits = async (req, res) => {
    const audits = await Audit.find({}).sort({createdAt: -1})
  
    res.status(200).json(audits)
}


// get a single audit
const getAudit = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Katselmointia ei löydy'})
    }
  
    const audit = await Audit.findById(id)
  
    if (!audit) {
      return res.status(404).json({error: 'Katselmointia ei löydy'})
    }
  
    res.status(200).json(audit)
}


// POST a new audit
const createAudit = async (req, res) => {
    try {
        const { spaceName, questions } = req.body;

        // Finds a space by its name
        const space = await Space.findOne({name: spaceName})

        if (!space) {
            return res.status(404).json({ error: 'Tilaa ei löytynyt.' })
        }

        const newAudit = new Audit({
            spaceName: space.name,
            spaceAddress: space.address,
            email: "testi@edu.lapinamk.fi", //tulee middlewaresta, kun otetaan käyttöön
            questions: questions
        });

        const savedAudit = await newAudit.save();

        res.status(201).json(savedAudit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


// DELETE an audit
const deleteAudit = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Katselmointia ei löydy'})
    }
  
    const audit = await Audit.findOneAndDelete({_id: id})
  
    if (!audit) {
      return res.status(400).json({error: 'Katselmointia ei löydy'})
    }
  
    res.status(200).json(audit)
  }


// UPDATE an audit
const updateAudit = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Katselmointia ei löydy'})
    }
  
    const audit = await Audit.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!audit) {
      return res.status(400).json({error: 'Katselmointia ei löydy'})
    }
  
    res.status(200).json(audit)
  }


// Tämä hakee kaikki auditoinnit nimestä riippumatta
// KORJAA !!!

// GET all audits for a space
const getAllAuditsForSpace = async (req, res) => {
    try {        
        const { name } = req.body

        // Finds a space by its name
        const space = await Space.findOne({ name: name })

        if (!space) {
            return res.status(404).json({ error: 'Tilaa ei löytynyt' })
        }
        
        // Fetch all audits for a specific space
        const audits = await Audit.find({ spaceName: space.name }).sort({ createdAt: -1 })
  
        res.status(200).json(audits);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
  }


// GET latest audit for a space
const getLatestAuditForSpace = async (req, res) => {
    try {
        const { name } = req.body;

        // Finds a space by its name
        const space = await Space.findOne({space: name})

        // Add logic to fetch the latest audit for a specific space
        const latestAudit = await Audit.findOne({ space }).sort({ createdAt: -1 })

        res.status(200).json(latestAudit);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


  module.exports = {
    getAllAudits,
    getAudit,
    createAudit,
    deleteAudit,
    updateAudit,
    getAllAuditsForSpace,
    getLatestAuditForSpace
  }
