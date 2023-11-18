import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useHistory } from 'react-router';
import { Pages } from "../../../Enums/Pages";
import { CURRENT_ID } from '../../../Pages/MainPage/Home.types';
import { AppBar, Drawer, mdTheme } from './LeftBar.styles';
import { mainListItems, secondaryListItems } from './ListItems';
import { RoleRoutes } from '../../../Routes/routes';
import { getHeaders } from '../../../Utils/methods';
import axios from 'axios';

export const Dashboard = (currentUser: any) => {
    const [open, setOpen] = React.useState(true);
    const history = useHistory();

    const logOut = () => {
        CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
        history.push(Pages.SignIn)
        localStorage.clear()
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (<div>   <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Energy Utility Platform
                    </Typography>
                    <IconButton color="inherit" >
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <ExitToAppIcon onClick={logOut} />
                    </IconButton>
                </Toolbar>
            </AppBar >
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List>{mainListItems(currentUser)}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />

            </Box>
        </Box >
    </ThemeProvider >
    </div>
    );
}