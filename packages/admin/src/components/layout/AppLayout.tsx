import { Layout, AppBar, UserMenu, Logout } from 'react-admin';
import { Typography } from '@mui/material';
import config from '../../config';

const CustomAppBar = () => (
  <AppBar>
    <Typography variant="h6" color="inherit" sx={{ flex: 1 }}>
      {config.app.name}
    </Typography>
    <UserMenu>
      <Logout />
    </UserMenu>
  </AppBar>
);

export const AppLayout = (props: any) => (
  <Layout
    {...props}
    appBar={CustomAppBar}
    sx={{
      '& .RaLayout-root': {
        minHeight: '100vh',
      },
      '& .RaLayout-content': {
        padding: '24px',
        maxWidth: config.app.contentMaxWidth,
        margin: '0 auto',
      },
      '& .RaLayout-appFrame': {
        marginTop: '0',
      },
      '& .MuiDrawer-root': {
        position: 'relative',
      }
    }}
  />
);
