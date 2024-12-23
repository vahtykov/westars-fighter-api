import { Login, LoginForm, required } from 'react-admin';
import { Box, Card, CardContent, Typography } from '@mui/material';

const CustomLoginForm = () => (
  <Box sx={{ padding: '24px' }}>
    <Box sx={{ marginBottom: '24px' }}>
      <Typography variant="h4" align="center">
        Fighter Admin
      </Typography>
    </Box>
    <Card>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  </Box>
);

export const LoginPage = () => (
  <Login
    sx={{
      backgroundImage: 'linear-gradient(to right bottom, #4a90e2, #8e44ad)',
      minHeight: '100vh',
    }}
  >
    <CustomLoginForm />
  </Login>
);
