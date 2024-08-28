// Define props interface
interface InfoCardProps {
    title: string;
    content: string;
    imageUrl?: string;
  }
  
  const InfoCard: React.FC<InfoCardProps> = ({ title, content, imageUrl }) => {
    return (
      <div style={styles.card}>
        {imageUrl && <img src={imageUrl} alt={title} style={styles.image} />}
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.content}>{content}</p>
      </div>
    );
  };
  
  const styles = {
    card: {
      margin: '20px auto',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '400px',
      backgroundColor: 'var(--dark-color)',
      color: 'var(--yellow-color)',
    },
    image: {
      width: '100%',
      borderRadius: '8px'
    },
    title: {
      fontSize: '18px',
      margin: '10px 0'
    },
    content: {
      fontSize: '16px'
    }
  };
  
  export default InfoCard;