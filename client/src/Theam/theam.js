import { createTheme } from '@mui/material/styles';

// Define your custom theme here
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change to your desired primary color
    },
    secondary: {
      main: '#dc004e', // Change to your desired secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  spacing: 8,
});

export default theme;