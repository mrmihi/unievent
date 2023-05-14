import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AddVenuePage = () => {
    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '350px'
        }}>
            <h1 style={{ marginBottom: '30px', textAlign: 'center', fontSize: '36px' }}>Add Venue Page</h1>
            <Button 
                variant="contained" 
                component={Link} 
                to="/venue/list"
                style={{ 
                    backgroundColor: '#2196F3',
                    color: '#fff',
                    padding: '10px 20px',
                    textTransform: 'none',
                    fontWeight: 'bold'
                }}
            >
                Add a Venue
            </Button>
        </div>
    );
};

export default AddVenuePage;
