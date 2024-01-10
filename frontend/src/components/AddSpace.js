import React, { useState } from 'react';

const AddSpace = () => {
    const [spaceName, setSpaceName] = useState('');
    const [address, setAddress] = useState('')
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);

    const handleSpaceNameChange = (event) => {
      setSpaceName(event.target.value);
    };
    const handleAddressChange = (event) => {
      setAddress(event.target.value)
    }
    /* backend requirements for post req: 
       name: {
       type: String,
       required: true
       },

       address: {
       type: String,
       required: true
      }
    */
    const handleAddSpace = () => {
        const payload = {
        name: spaceName,
        address: address
    };

    console.log('sending POST req:', payload);

    /*
    backend response example:
    {
    "name": "uusi tila",
    "address": "Jokiväylä 11, 96200 ROVANIEMI",
    "_id": "65780c7601d5588a0b6b9a19",
    "createdAt": "2023-12-12T07:32:06.184Z",
    "updatedAt": "2023-12-12T07:32:06.184Z",
    "__v": 0
    }
    */
    fetch('/api/v1/spaces', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network err.');
    })
    .then(data => {
      console.log('OK:', data);
      setIsSuccess(true);
      setFeedbackMessage('Tila lisätty onnistuneesti!');
      setSpaceName(''); // Tyhjennä form
      setAddress('')
    })
    .catch((error) => {
      console.error('Err:', error);
      setIsSuccess(false);
      setFeedbackMessage('Tilaa ei pystytty lisäämään.');
    });
  };

  return (
    <div className="add-space-container">
        <h3>Lisää tila</h3>
        <input
            type="text"
            value={spaceName}
            onChange={handleSpaceNameChange}
            placeholder="Anna tilan nimi"
        />
        <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Anna tilan osoite"
        />
        <button onClick={handleAddSpace}>Lisää</button>
            {feedbackMessage && (
                <div className={`feedback-message ${isSuccess ? '' : 'error'}`}>
                    {feedbackMessage}
                </div>
            )}
    </div>
  );
};

export default AddSpace;