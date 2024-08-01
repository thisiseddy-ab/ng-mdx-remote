import React from 'react';

// Define props interface
interface AlertBoxProps {
  message: string;
  type?: 'info' | 'warning' | 'error';
}

// Define the AlertBox component
const AlertBox: React.FC<AlertBoxProps> = ({ message, type = 'info' }) => {
  const alertStyles = {
    info: { backgroundColor: '#e7f0ff', color: '#0056b3' },
    warning: { backgroundColor: '#fff3cd', color: '#856404' },
    error: { backgroundColor: '#f8d7da', color: '#721c24' }
  };

  return (
    <div 
      style={{ 
        padding: '10px', 
        borderRadius: '4px', 
        border: `1px solid ${alertStyles[type].color}`, 
        backgroundColor: alertStyles[type].backgroundColor, 
        color: alertStyles[type].color
      }}
    >
      {message}
    </div>
  );
};

export default AlertBox;