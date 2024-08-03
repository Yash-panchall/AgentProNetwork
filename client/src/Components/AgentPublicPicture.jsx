import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Avatar, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import AdminAgentForm from './AdminAgentForm';
import AgentPublicForm from './AgentPublicForm';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  marginTop: theme.spacing(4),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  margin: '0 auto',
  marginBottom: theme.spacing(2),
}));

function AgentPublicPicture(props) {

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState('/static/images/avatar/1.jpg');

  const token  = localStorage.getItem("token");
  const username = props.getdata.username;
  const id = props.getdata.id;

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/agent/profile-pic/${username}/${id}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (response.ok && data.profileImageUrl) {
          setProfileImage(data.profileImageUrl);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, [token]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Root>
      <Container>
        <Typography variant="h4" gutterBottom>
          Profile Page
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <PaperStyled>
              <AvatarStyled alt="Agent Name" src={profileImage} />
              {/* <Button variant="contained" component="label" fullWidth style={{ marginBottom: 16 }}>
                Change Photo
                <input type="file" hidden onChange={handleImageChange} />
              </Button> */}
              {/* {image && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleImageUpload}
                  disabled={loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={24} /> : 'Upload Photo'}
                </Button>
              )} */}
            </PaperStyled>
          </Grid>
          <Grid item xs={12} sm={8}>
            <AgentPublicForm getdata = {props.getdata}/>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
}

export default AgentPublicPicture;