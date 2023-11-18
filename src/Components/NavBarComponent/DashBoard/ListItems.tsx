import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { CURRENT_ROLE } from '../../../Pages/MainPage/Home.types';
import { AdminButtons, ClientButtons } from '../../../Utils/constants';
import { IClient } from '../../../Models/models';
import { width } from '@mui/system';

export const mainListItems = (currentUser: IClient | undefined) => {
    return CURRENT_ROLE === "Admin" ? AdminButtons : ClientButtons
};

export const secondaryListItems = (
    <div style={{
        height: '100%'
        // border: '1px solid black'

    }}>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);