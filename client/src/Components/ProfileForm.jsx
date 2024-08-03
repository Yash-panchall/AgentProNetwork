import React, { useEffect, useState } from 'react';
import { TextField, Grid, Button, Typography, Paper } from '@mui/material';

function ProfileForm() {
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

  const token = localStorage.getItem("AgentToken")


  useEffect(() => {

    const fetchAgentData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/agent/profile' , {
          method : "GET",
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        const data = await response.json();
        // console.log(data)

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create the object to post to the schema
    const agentProfile = { ...formValues };

    try {
      const response = await fetch('http://localhost:5000/api/agent/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(agentProfile),
      });

      if (!response.ok) {
        console.log("succesfull Update")
        throw new Error('Error updating profile');
      }

      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper style={{ padding: 16 }}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Edit Profile
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField 
              name="first_name" 
              label="First Name" 
              fullWidth 
              required 
              value={formValues.first_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              name="last_name" 
              label="Last Name" 
              fullWidth 
              required 
              value={formValues.last_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="company" 
              label="Company" 
              fullWidth 
              required 
              value={formValues.company}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              name="company_url" 
              label="Company URL" 
              fullWidth 
              value={formValues.company_url}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              name="phone_number" 
              label="Phone Number" 
              fullWidth 
              required 
              value={formValues.phone_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="email" 
              label="Email" 
              fullWidth 
              required 
              value={formValues.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="license_number" 
              label="Real Estate License ID Number" 
              fullWidth 
              required 
              value={formValues.license_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="listing_url" 
              label="My Listing URL" 
              fullWidth 
              value={formValues.listing_url}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="video_link" 
              label="Insert link to video or upload an additional photo in place of video" 
              fullWidth 
              value={formValues.video_link}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="education_and_credentials" 
              label="Education and Credentials" 
              fullWidth 
              value={formValues.education_and_credentials}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="specializations" 
              label="Specialities" 
              fullWidth 
              value={formValues.specializations}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}

export default ProfileForm;