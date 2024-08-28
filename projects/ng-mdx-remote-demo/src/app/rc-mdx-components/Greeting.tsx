import React from 'react';

// Define props interface
interface GreetingProps {
  name: string;
}

// Define the Greeting component
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div style={styles['card']}>
      <h1 style={styles['header']}>Hello, {name}!</h1>
      <p style={styles['text']}>Welcome to the MDX React Component.</p>
    </div>
  );
};

// Define styles for the Greeting component
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: 'var(--dark-color)',
    color: 'var(--yellow-color)',
    textAlign: 'center',
  },
  header: {
    fontSize: '2rem',
    margin: '0',
  },
  text: {
    fontSize: '1rem',
  }
};

export default Greeting;