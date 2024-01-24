'use client'

import {useEffect, useState} from 'react';
import {useFirebaseAuth} from '../../auth/firebase';
import {useAuth} from '../../auth/context';
import { Card, CardContent, TextField, Button, Typography} from '@mui/material';
import  styled  from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from './page.module.css';
import Grid from '@mui/material/Grid';
import ProfilePhotoUpload from './ProfilePhotoUpload';

// Styled components using Emotion
const ProfileCard = styled(Card)`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
`;


const socialIconStyles = {
  color: 'black',
  fontSize: '20px',
  margin: '10px 8px',
};



export default function UserProfile() {
  const { getFirebaseAuth } = useFirebaseAuth();
  const { user, token } = useAuth();


  const handleProfilePhotoUpload = (file: File) => {
    // Handle the file upload, e.g., send it to the server
    console.log('Uploading profile photo:', file.name);
    // Update the user's profile photo in your application state or database
  };

  useEffect(() => {
    const fetchUser = async () => {

      try {
        // console.log(token, ' CURRENT TOKEN')

        await fetch('http://127.0.0.1:8080/api/users/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // const resp = await fetch('http://127.0.0.1:8080/api/users/')
        // console.log(resp, 'resp back from server')
      } catch (e) {
        console.log(e, 'error getting user')
      }
    }

    if (token) {
      const result = fetchUser().catch(console.error)
    }


  }, [token]);


  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@lpshare.com',
    about : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
    occupation: 'Manager Associates',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    phoneNumber: '1234567890',
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    linked: 'https://www.linkedin.com',
  });

  // Function to handle edit mode toggle
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Function to handle user input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const saveProfile = () => {
    // Here you would send the updated user data to your backend
    toggleEditMode();
  };

  return (
    <div className='w-[100%]'>
      <ProfileCard>
      <div className={`${styles.dflex}   ${styles.justifyContentSpaceBetween}`}>
          <div  className={`${styles.dflex} ${styles.justifyContentCenter} ${styles.alignItemsCenter}`}>
            <ProfilePhotoUpload onUpload={handleProfilePhotoUpload} defaultImageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVbmeRTCtXQ8eRaChjT3C2rwsjPECF58NIWA&usqp=CAU' />
            <div className='typography' style={{marginLeft: '30px'}}>
              <Typography variant="h4"  fontWeight="bold">John Smith</Typography>
              <Typography variant="subtitle1">Manager Associates</Typography>
              <Typography variant="body2"><span style={{fontWeight: 'bold'}}>Member Since:</span> 12 Feb 2010</Typography>
              <div>
              <a href={userData.facebook} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} style={socialIconStyles} />
              </a>
              <a href={userData.twitter} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} style={socialIconStyles} />
              </a>
              <a href={userData.linked} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} style={socialIconStyles} />
              </a>
              </div>
            </div>
          </div>
          <div>
            {!isEditMode && <Button variant="outlined"  onClick={toggleEditMode}>Edit</Button>}
            {isEditMode && <Button variant="contained"  onClick={saveProfile}>Save</Button>}
          </div>
      </div>

      <CardContent>
       <Grid container spacing={2}>

      {/* Left Grid - 50% width */}
      <Grid item xs={6}>
        <Typography variant="h6" gutterBottom>
          About Me
        </Typography>
        <textarea onChange={handleChange} value={userData.about} disabled={!isEditMode}  style={{ width: '100%', minHeight: '150px', padding: '20px', border:'1px solid #bdbdbd', borderRadius:'5px' }}          placeholder="Tell us about yourself..." />

        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Social Links
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField label="Facebook" fullWidth disabled={!isEditMode} value={userData.facebook} onChange={handleChange}/>
            </Grid>
            <Grid item xs={4}>
              <TextField label="X" fullWidth disabled={!isEditMode} value={userData.twitter} onChange={handleChange}/>
            </Grid>
            <Grid item xs={4}>
              <TextField label="LinkedIn" fullWidth disabled={!isEditMode} value={userData.linked} onChange={handleChange}/>
            </Grid>
          </Grid>
        </div>
      </Grid>

      {/* Right Grid - 50% width */}
      <Grid item xs={6}>
      <Typography variant="h6" gutterBottom>
            Personal Info
          </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="First Name" fullWidth disabled={true} value={userData.firstName} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Last Name" fullWidth disabled={true} value={userData.lastName}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" fullWidth disabled={true} value={userData.email}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Phone Number" fullWidth onChange={handleChange} disabled={!isEditMode} value={userData.phoneNumber}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Occupation" fullWidth onChange={handleChange}
          disabled={!isEditMode} value={userData.occupation}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="City" fullWidth onChange={handleChange} disabled={!isEditMode} value={userData.city}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="State" fullWidth onChange={handleChange} disabled={!isEditMode} value={userData.state}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Country" fullWidth onChange={handleChange} disabled={!isEditMode} value={userData.country}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>       
      </CardContent>
      </ProfileCard>
    </div>
  )
}