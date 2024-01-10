const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Schema for audit for a space
const auditSchema = new Schema({
  spaceName: {
    type: String,
    required: true,
    index: true
  },
  spaceAddress: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  questions: {
    type: Schema.Types.Mixed
  }, 
}, { timestamps: true })

module.exports = mongoose.model('Audit', auditSchema)

/*

// POST katselmointi näyttää tältä
{
    "spaceName": "Ruokala",
    "questions": [
        {"question": "kyssäri 1", "answer": "vastaus 1", "note": "vapaata tekstiä"},
        {"question": "kyssäri 2", "answer": "vastaus 2", "note": ""}
    ]
}


// GET katselmointi näyttää tältä
{
  "_id": "657471f3d586af9b4124f0e4",
  "spaceName": "Ruokala",
  "spaceAddress": "Vihtatie 6",
  "email": "sami.kalliokoski@edu.lapinamk.fi",
  "questions": [
      {
          "question": "kyssäri 1",
          "answer": "vastaus 1",
          "note": "vapaata tekstiä"
      },
      {
          "question": "kyssäri 2",
          "answer": "vastaus 2",
          "note": ""
      }
  ],
  "createdAt": "2023-12-09T13:56:03.078Z",
  "updatedAt": "2023-12-09T13:56:03.078Z",
  "__v": 0
} 
*/