import React, { useEffect, useState } from 'react';
import { TextField, Grid, Typography, Paper } from '@mui/material';

function AgentPublicForm(props) {

  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    company: '',
    company_url: '',
    phone_number: '',
    email: '',
    license_number: '',
    listing_url: '',
    testimonial: '',
    video_link: '',
    education_and_credentials: '',
    specializations: '',
    about: '',
  });

  const token = localStorage.getItem("token");
  const username = props.getdata.username;
  const id = props.getdata.id;

  useEffect(() => {

    const fetchAgentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/agent/profile/${username}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();

        setFormValues({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          company: data.company || '',
          company_url: data.company_url || '',
          phone_number: data.phone_number || '',
          email: data.email || '',
          license_number: data.license_number || '',
          listing_url: data.listing_url || '',
          testimonial: data.testimonial || '',
          video_link: data.video_link || '',
          education_and_credentials: data.education_and_credentials || '',
          specializations: data.specializations || '',
          about: data.about || '',
        });
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };

    fetchAgentData();
  }, []);

  return (
    <form>
      <Paper style={{ padding: 16 }}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Agent Profile
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField 
              name="first_name" 
              label="First Name" 
              fullWidth 
              required 
              value={formValues.first_name}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              name="last_name" 
              label="Last Name" 
              fullWidth 
              required 
              value={formValues.last_name}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="company" 
              label="Company" 
              fullWidth 
              required 
              value={formValues.company}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              name="company_url" 
              label="Company URL" 
              fullWidth 
              value={formValues.company_url}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              name="phone_number" 
              label="Phone Number" 
              fullWidth 
              required 
              value={formValues.phone_number}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="email" 
              label="Email" 
              fullWidth 
              required 
              value={formValues.email}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="license_number" 
              label="Real Estate License ID Number" 
              fullWidth 
              required 
              value={formValues.license_number}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="listing_url" 
              label="My Listing URL" 
              fullWidth 
              value={formValues.listing_url}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="testimonial" 
              label="Short Testimonial" 
              fullWidth 
              multiline 
              rows={4} 
              value={formValues.testimonial}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="video_link" 
              label="Insert link to video or upload an additional photo in place of video" 
              fullWidth 
              value={formValues.video_link}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="education_and_credentials" 
              label="Education and Credentials" 
              fullWidth 
              value={formValues.education_and_credentials}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="specializations" 
              label="Specialities" 
              fullWidth 
              value={formValues.specializations}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="about" 
              label="About" 
              fullWidth 
              multiline 
              rows={4} 
              value={formValues.about}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}

export default AgentPublicForm;