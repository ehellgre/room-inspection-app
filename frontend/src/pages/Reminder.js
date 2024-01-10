import React, { useState, useEffect } from 'react';
import { usePopup } from '../context/PopUpContext';

const Reminder = () => {
  // PLACEHOLDER!!!! Tähän tilalle api req mongodatasta
  const [spaces, setSpaces] = useState([
    {
      spaceName: 'Tila 1',
      lastChecked: '2022-11-15T09:00:00Z',
      checkedBy: 'Nimi Niminen'
    },
    {
      spaceName: 'Tila 2',
      lastChecked: '2023-09-15T09:00:00Z',
      checkedBy: 'Nimi Niminen'
    },
    // etc
  ]);

  const { showPopup } = usePopup();

  const checkOverdueStatus = (lastChecked) => {
    const lastCheckedDate = new Date(lastChecked);
    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
    return lastCheckedDate < sixMonthsAgo;
  };

  useEffect(() => {
    spaces.forEach(space => {
      const isOverdue = checkOverdueStatus(space.lastChecked);
      if (isOverdue) {
        showPopup(`${space.spaceName} on myöhässä katselmoinnin kanssa!`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaces]); // rerun if spaces change

  return (
    <div className="reminder-container">
      <h1 className="reminder-header">Katselmointien muistutukset</h1>
      {spaces.map((space, index) => {
        const isOverdue = checkOverdueStatus(space.lastChecked);
        return (
          <div key={index} className={`reminder-status ${isOverdue ? 'overdue' : ''}`}>
            <div>
              <strong>Tilan nimi:</strong> {space.spaceName}
            </div>
            <div>
              <strong>Viimeksi katselmoitu:</strong> <span>{new Date(space.lastChecked).toLocaleString()}</span>
            </div>
            <div>
              <strong>Tarkastettu:</strong> {space.checkedBy}
            </div>
          </div>
        );
      })}
      {/* refresh all */}
      <button className="reminder-btn" onClick={() => {/* FETCHATAAN DATA TÄLLÄ NAPILLA */}}>
        Päivitä
      </button>
    </div>
  );
};

export default Reminder;