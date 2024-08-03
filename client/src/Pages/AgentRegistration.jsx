import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  CssBaseline,
  Avatar,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useStoreInLocal1 } from '../Store/Auth';



const specializations = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'rental', label: 'Rental' }
];

const initialData = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  licenseNumber: '',
  licenseExpirationDate: '',
  agencyName: '',
  agencyContactNumber: '',
  agencyStreet: '',
  agencyCity: '',
  agencyState: '',
  agencyZipCode: '',
  agencyCountry: '',
  yearsOfExperience: '',
  specializations: [],
  profilePictureUrl: '',
  linkedin: '',
  facebook: '',
  twitter: ''
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState(initialData);

  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = {
      username: formData.username,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country
      },
      license_number: formData.licenseNumber,
      license_expiration_date: formData.licenseExpirationDate,
      agency: {
        name: formData.agencyName,
        address: {
          street: formData.agencyStreet,
          city: formData.agencyCity,
          state: formData.agencyState,
          zip_code: formData.agencyZipCode,
          country: formData.agencyCountry
        },
        contact_number: formData.agencyContactNumber
      },
      years_of_experience: formData.yearsOfExperience,
      specializations: formData.specializations,
      profile_picture_url: formData.profilePictureUrl,
      social_media: {
        linkedin: formData.linkedin,
        facebook: formData.facebook,
        twitter: formData.twitter
      }
    };

    try {
      const response = await fetch('http://localhost:5000/api/agent/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();
      console.log('Form Data:', data);

      useStoreInLocal1(data.token)
      
      setOpen(true);

      setFormData(initialData)
    } catch (error) {
      console.error('Error submitting the form:', error);
    }

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Agent Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            <Step>
              <StepLabel>Account Information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Agency Information</StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phoneNumber"
                  required
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          )}
          {activeStep === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="agencyName"
                  required
                  fullWidth
                  label="Agency Name"
                  value={formData.agencyName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="agencyContactNumber"
                  required
                  fullWidth
                  label="Agency Contact Number"
                  value={formData.agencyContactNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="licenseNumber"
                  required
                  fullWidth
                  label="License Number"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="licenseExpirationDate"
                  required
                  fullWidth
                  label="License Expiration Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formData.licenseExpirationDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="yearsOfExperience"
                  required
                  fullWidth
                  label="Years of Experience"
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="specializations"
                  required
                  fullWidth
                  label="Specializations"
                  select
                  SelectProps={{
                    multiple: true,
                    value: formData.specializations,
                    onChange: handleChange
                  }}
                >
                  {specializations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Registration Successful</DialogTitle>
          <DialogContent>
            <Typography>
              Thank you for registering!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
