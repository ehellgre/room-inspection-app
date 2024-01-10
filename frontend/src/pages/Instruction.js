import React, { useState } from 'react';
import QRCodeReader from '../components/QRCodeReader';

const Instruction = () => {
    const links = [
        { name: 'Miten katselmoida tila?', url: 'https://luc.service-now.com/lucportal' },
        { name: 'Miten luoda uusi tila?', url: 'https://luc.service-now.com/lucportal' },
        // add more when needed :D
      ];
    
      return (
        <div className="instructions-page">
          <h1>Linkit</h1>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <QRCodeReader />
        </div>
      );
    };

export default Instruction;