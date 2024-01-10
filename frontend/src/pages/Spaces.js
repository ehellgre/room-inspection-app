import React, { } from 'react';
import ViewSpaces from '../components/ViewSpaces';
import AddSpace from '../components/AddSpace';
import QRCodeReader from '../components/QRCodeReader';

const Spaces = () => {
    
      return (
        <div className="space-page">
            <ViewSpaces />
            <AddSpace />
            <QRCodeReader />
        </div>
      );
    };

export default Spaces;