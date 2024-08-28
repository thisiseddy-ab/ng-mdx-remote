
import React from 'react';

// Define props interface
interface ButtonProps {
  onClick: () => void;
}


// Define the Button component
const Button: React.FC<ButtonProps> = ({onClick}) => {
  return (
    <div style={styles.container}>
      <button 
        onClick={onClick} 
        style={styles.button}
      >
        Click Me!
      </button>
    </div>
  );
};

// Define styles for the Button component
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  button: {
    width: '250px',
    borderRadius: '12px',
    padding: '10px 20px', 
    fontSize: '16px', 
    backgroundColor: 'var(--dark-color)',
    color: 'var(--yellow-color)',
    border: 'none', 
    cursor: 'pointer'
  }
};

export default Button;