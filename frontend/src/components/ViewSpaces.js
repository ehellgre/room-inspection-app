import React, { useState, useEffect } from 'react';

const ViewSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSpaces = () => {
    setLoading(true);
    setError(null);
  
    fetch('/api/v1/spaces', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          console.log("unauth");
          throw new Error('Pääsy evätty');
        } else {
          throw new Error('Network err');
        }
      }
      return response.json();
    })
    .then(data => {
      setSpaces(data);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  if (loading) {
    return <p>Ladataan...</p>;
  }

  if (error) {
    return <p>Virhe tilojen tuonnissa: {error}</p>;
  }

  return (
    <div className="view-spaces-container">
      <h3>Tilat</h3>
      <button onClick={fetchSpaces}>Päivitä</button>
      <ul>
        {spaces.map((space, index) => (
          <li key={index}>
            {space.name} - {space.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSpaces;