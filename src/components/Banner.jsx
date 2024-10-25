import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import school from '../assets/school.svg';

const Banner = () => {
  return (
    <Stack alignItems="center" spacing={2} sx={{ padding: 2, maxWidth: '100vw' }}>
      
      <img 
        src={school} 
        alt="School" 
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          height: 'auto' 
        }} 
      />
      
      <a 
        href="https://storyset.com/transport" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ fontSize: '0.875rem' }} 
      >
        Transport illustrations by Storyset
      </a>
      
      <Button 
        component={Link} 
        to="/dashboard" 
        variant="contained" 
        size="large" 
        sx={{ width: { xs: '100%', sm: 'auto' } }} 
      >
        Go to Students Dashboard
      </Button>
    </Stack>
  );
};

export default Banner;
