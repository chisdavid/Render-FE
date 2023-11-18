import DevicesIcon from '@mui/icons-material/Devices';
import PersonIcon from '@mui/icons-material/Person';
import SensorsIcon from '@mui/icons-material/Sensors';
import { BarChart as BarChartIcon } from 'react-feather';
import { Pages } from '../Enums/Pages';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import TimelineIcon from '@mui/icons-material/Timeline';
import { goTo } from './methods';
import PeopleIcon from '@mui/icons-material/People';
import StraightenIcon from '@mui/icons-material/Straighten';

export const getListItem = (href: string, icon: any, title: string): JSX.Element => {
    return <ListItem key={href} button onClick={() => goTo(href)}>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
    </ListItem>
};

export const getButtons = (hrefArray: string[], icons: any[], titles: string[]): JSX.Element[] => {
    return hrefArray.map((url: string, index: number) => getListItem(url, icons[index], titles[index]));
};

const ClientIcons: JSX.Element[] = [<PersonIcon />, <DevicesIcon />, <SensorsIcon />, <TimelineIcon />, <StraightenIcon />];
const ClientHrefs: string[] = [Pages.Profile, Pages.Devices, Pages.Sensors, Pages.ClientChart, Pages.Measurement];
const ClientTitles: string[] = ["Profile", "Devices ", "Sensors", "Chart", "Measurement"]

const AdminIcons: JSX.Element[] = [<PersonIcon />, <PeopleIcon />, <SensorsIcon />, <DevicesIcon />];
const AdminHrefs: string[] = [Pages.Profile, Pages.ClientPage, Pages.Sensors, Pages.Devices];
const AdminTitles: string[] = ["Profile", "Clients ", "Sensors", "Devices"];

export const ClientButtons: JSX.Element[] = getButtons(ClientHrefs, ClientIcons, ClientTitles);
export const AdminButtons: JSX.Element[] = getButtons(AdminHrefs, AdminIcons, AdminTitles);

export const ADMIN: string = "Admin";

export const emailSufixe: string[] = ["@yahoo.com", "@gmail.com"]

export const LOCAL_SERVER_URL: string = "http://localhost:8080";
export const HEROKU_SERVER_URL: string = "https://davidchis2021.herokuapp.com";


