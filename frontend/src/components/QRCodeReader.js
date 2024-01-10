import React, { useState, useRef } from 'react';
import jsQR from 'jsqr';

const QRCodeReader = () => {
  const [scanResult, setScanResult] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);

  const startScan = () => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreamActive(true);
        scanQRCode();
      }).catch(err => {
        console.error("Error accessing the camera", err);
      });
  };

  const scanQRCode = () => {
    const canvasElement = canvasRef.current;
    const videoElement = videoRef.current;
    const context = canvasElement.getContext('2d');

    requestAnimationFrame(scan);

    function scan() {
      if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
        canvasElement.height = videoElement.videoHeight;
        canvasElement.width = videoElement.videoWidth;
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code) {
          setScanResult(code.data);
          videoElement.srcObject.getTracks().forEach(track => track.stop());
          setStreamActive(false);
        } else {
          requestAnimationFrame(scan);
        }
      } else {
        requestAnimationFrame(scan);
      }
    }
  };

  return (
    <div>
      <h3>QR-koodin lukija</h3>
      <button onClick={startScan}>Aloita skannaus</button>
      <video ref={videoRef} style={{ display: streamActive ? 'block' : 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <p><a href={scanResult}>{scanResult}</a></p>
    </div>
  );
};

export default QRCodeReader;