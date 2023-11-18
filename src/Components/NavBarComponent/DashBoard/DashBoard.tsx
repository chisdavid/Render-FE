import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './ListItems';
import { AppBar, Drawer, mdTheme } from './LeftBar.styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { CURRENT_ID } from '../../../Pages/MainPage/Home.types';
import { useHistory } from 'react-router';
import { Pages } from "../../../Enums/Pages"
import axios from 'axios';
import { RoleRoutes } from '../../../Routes/routes';
import { getHeaders } from '../../../Utils/methods';
import { Grid, Paper, Container } from '@mui/material';

export const Dashboard = (currentUser: any) => {
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const logOut = () => {
        CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
        history.push(Pages.SignIn)
        localStorage.clear()
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (<div>
        <ThemeProvider theme={mdTheme}>
            <Box >
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
                            component="h2"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1, fontWeight: '2px' }}
                            fontSize={window.innerHeight > 1000 ? '20px' : '16px'}

                        >
                            Energy Utility Platform
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={5} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={logOut} >
                            <ExitToAppIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [3],
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
            </Box >
        </ThemeProvider >
    </div>
    );
}