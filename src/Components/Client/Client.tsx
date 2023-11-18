
import { initializeIcons } from '@fluentui/react/lib/Icons'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { Checkbox, FormControlLabel, TextField } from "@mui/material"
import { DataRowModel, GridData, useDemoData } from "@mui/x-data-grid-generator"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro"
import axios from 'axios'
import React, { ReactNode, useCallback, useEffect, useState } from "react"
import { useHistory } from 'react-router'
import { Pages } from '../../Enums/Pages'
import { IClient } from "../../Models/models"
import { currentRole, CURRENT_ID, IBasePageProps } from "../../Pages/MainPage/Home.types"
import { NotFound } from '../../Pages/PageNotFound/NotFound'
import { PeopleRoutes, RoleRoutes } from '../../Routes/routes'
import { RPC } from '../../server/RPC'
import { generateRandomColor, getHeaders } from "../../Utils/methods"
import { DataGrid } from "../DataGrid/DataGrid"
import { CustomDialog } from "../Dialog/Dialog"
import { DropDown } from "../DropDown/DropDown"
import { Dashboard } from '../NavBarComponent/DashBoard/DashBoard'
import { BoxStyle, IconStyle, StatusDivStyle } from "./Client.styles"
import { IDeviceChecked } from "./Client.types"

const FIELD_NAME: string = "Name";
const FIELD_USERNAME: string = "Username";
const FIELD_EMAIL: string = "Email";
const FIELD_USERTYPE: string = "UserType";
const FIELD_BIRTHDAY: string = "BirthDay";
const FIELD_PHONE: string = "Phone";
const FIELD_ADDRESS: string = "Address";
const FIELD_DEVICES: string = "Devices";

const ColumsNames: string[] = ["avatar", "name", "email", "phone", "username", "id", "isAdmin", "status"];

const getRow = (user: IClient): DataRowModel => {
    const numberOfDevices: number = user.devices.filter((device: IDeviceChecked) => device.checked).length;
    return {
        id: user.id,
        avatar: generateRandomColor(),
        name: user.name,
        username: user.role.username,
        email: user.email,
        phone: user.phoneNumber,
        dateCreated: user.birthDate,
        address: user.address,
        isAdmin: user.role.userType === "Admin" ? true : false,
        birthDate: user.birthDate,
        status: user.role.status[user.role.status.length - 1]?.logOut === null ? "Online" : "Offline",
        devices: numberOfDevices !== 0 ? user.devices.filter((device: IDeviceChecked) => device.checked).map((device: IDeviceChecked) => device.device.name).join() : "No Devices"
    };
};

const getRows = (users: IClient[]): DataRowModel[] => {
    return users.map((user: IClient) => getRow(user));
};

let currentEditedClientId: number = 0;
let updatedClient: IClient;
let clients: IClient[] = [];

export const Clients = (props: IBasePageProps) => {
    const datasetEmployee = useDemoData({ dataSet: 'Employee', rowLength: 10, maxColumns: 50, editable: true })
    const [clientsData, setClientsData] = useState<GridData>();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openEditDevicesDialog, setOpenEditDevicesDialog] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("")
    const [userType, setUserType] = useState<string>("");
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [devices, setDevices] = useState<string[]>([]);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const history = useHistory()
    initializeIcons()

    useEffect(() => {


        axios.get(PeopleRoutes.GET_ALL, getHeaders()).then((res: any) => {
            clients = res.data as IClient[]
        })
            .catch((error: any) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert("Session Expired")
                        CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                        history.push(Pages.SignIn)
                        localStorage.clear()
                    }
                }
            })
    }, [openDialog, openEditDevicesDialog]);

    const getAvailableDevices = (): string[] => {
        let allDevicesNames: string[] = clients[0]?.devices.map((device: IDeviceChecked) => device.device.name);
        clients.forEach((client: IClient) => {
            client.devices.forEach((device: IDeviceChecked) => {
                if (device.checked) {
                    allDevicesNames = allDevicesNames.filter((dev: string) => dev !== device.device.name);
                }
            })
        })
        return allDevicesNames;
    };

    const getClientByID = (clients: IClient[], id: number): IClient => {
        return clients.filter((client: IClient) => client.id === id)[0];
    };

    useEffect(() => {
        const getColumns = (): GridColDef[] => {
            let output: GridColDef[] = datasetEmployee.data.columns.filter((data: GridColDef) => data.field !== undefined ? ColumsNames.includes(data.field) : "");
            output.push({ field: "address", headerName: "Address", editable: true });
            output.push({ field: "birthDate", headerName: "BirthDate", editable: true, type: "date" })
            output.push({
                field: "devices", headerName: "Devices", type: "string", editable: true, renderEditCell: (event: any) => {
                    currentEditedClientId = event.row.id
                    setOpenEditDevicesDialog(true)
                    return ""
                }
            })
            output.push({
                field: "status", headerName: "Status", type: "string", editable: false,
                renderCell: (params: GridRenderCellParams): ReactNode => {
                    return params.value === "Online" ? <div
                        style={StatusDivStyle(params.value)}>
                        <CheckCircleIcon style={IconStyle(params.value)} />
                        <div style={{ position: 'relative', bottom: '10px' }}>
                            {params.value}</div>
                    </div> : <div
                        style={StatusDivStyle(params.value)}>
                        <ErrorIcon style={IconStyle(params.value)} />
                        <div style={{ position: 'relative', bottom: '10px' }}>
                            {params.value}</div>
                    </div>
                }
            })
            return output.map((data: GridColDef) => Object.assign({}, data, { width: 180 }));
        };
        if (clients !== undefined) {
            setClientsData({ columns: getColumns(), rows: getRows(clients) })
        }
    }, [datasetEmployee.data.columns]);

    const handleChange = (event: any): void => {
        const name: string = event.target.name;
        const value: any = event.target.value;

        switch (name) {
            case FIELD_NAME:
                setName(value);
                break;
            case FIELD_USERNAME:
                setUsername(value);
                break;
            case FIELD_EMAIL:
                setEmail(value);
                break;
            case FIELD_USERTYPE:
                setUserType(value);
                break;
            case FIELD_BIRTHDAY:
                setBirthDate(value);
                break;
            case FIELD_PHONE:
                setPhoneNumber(value);
                break;

            case FIELD_ADDRESS:
                setAddress(value);
                break;
        };
    };

    const getTextField = (name: string): JSX.Element => {
        let returnValue: JSX.Element;
        switch (name) {
            case FIELD_USERTYPE:
                returnValue = <FormControlLabel
                    key={Math.random() * 16777215}
                    style={{ position: 'relative', display: 'flex', justifyContent: 'center', scale: '2px', width: window.innerWidth < 1000 ? '250px' : '400px' }}
                    value="start"
                    control={<Checkbox />}
                    label="Is Admin"
                    labelPlacement="start"
                />
                break;
            case FIELD_DEVICES:
                returnValue = <div key={name} style={{ position: "relative", display: 'flex', justifyContent: 'center', width: window.innerWidth < 1000 ? '250px' : '400px' }}>
                    <DropDown

                        key={Math.random() * 16777215}
                        setValues={setDevices}
                        values={getAvailableDevices()}
                        multiple={true}
                        name={FIELD_DEVICES} />
                </div>
                break;

            default:
                returnValue = <TextField
                    style={{ position: "relative", display: 'flex', justifyContent: 'center', width: window.innerWidth < 1000 ? '250px' : '400px' }}
                    autoFocus
                    margin="dense"
                    id={name}
                    name={name}
                    required
                    onChange={handleChange}
                    type={name === FIELD_BIRTHDAY ? "date" : "text"}
                    label={name === FIELD_BIRTHDAY ? "" : name}
                    fullWidth
                    variant="standard"
                />


        }
        return returnValue;
    };

    const getInputTextFields = (names: string[]): JSX.Element[] => {
        return names.map((name: string) => <div key={name}>{getTextField(name)}</div>);
    };

    const closeDialog = (): void => {
        setName("");
        setAddress("");
        setUsername("");
        setBirthDate(new Date());
        setAddress("");
        setPhoneNumber("");
        setOpenDialog(false);
    };

    const closeEditDevicesDialog = (): void => {
        setOpenEditDevicesDialog(false);
    };

    const onEditRow = (id: number, field: string, value: any): void => {

        axios.post(PeopleRoutes.UPDATE, { id: id, field: field.toLocaleLowerCase(), value: value }, getHeaders()).catch((error: any) => {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Session Expired")
                    CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                    history.push(Pages.SignIn)
                    localStorage.clear()
                }
            }
        })
    };

    const onDeleteRow = (ids: number[]): void => {
        axios.post(PeopleRoutes.DELETE, ids, getHeaders()).catch((error: any) => {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Session Expired")
                    CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                    history.push(Pages.SignIn)
                    localStorage.clear()
                }
            }
        })
        window.location.reload();
    };

    const insertDialog = (): void => {
        setOpenDialog(true);
    };

    const addPerson = (): void => {
        axios.post(PeopleRoutes.ADD, { name: name, username: username, userType: userType, email: email, phone: phoneNumber, date: birthDate, address: address, devices: devices }, getHeaders()).catch((error: any) => {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Session Expired")
                    CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                    history.push(Pages.SignIn)
                    localStorage.clear()
                }
            }
        })
        setOpenDialog(false);
        window.location.reload()
    };

    const cloneObj = (obj: any): any => {
        return JSON.parse(JSON.stringify(obj))
    };

    const handleChangeDevice = useCallback((event?: any, checked?: boolean): void => {
        let currentClient: IClient = getClientByID(clients, currentEditedClientId);
        currentClient?.devices.forEach((device: IDeviceChecked) => {
            if (device.device.name === event.target.name)
                device.checked = checked
        });
        updatedClient = currentClient;
    },
        [],
    );

    const getPairDeviceCheckBox = (device: IDeviceChecked): JSX.Element => {
        const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
        return <div>
            {device.device.name}
            <Checkbox
                {...label}
                onChange={handleChangeDevice}
                name={device.device.name}
                defaultChecked={device.checked}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                style={{ position: "relative", left: "300px" }}
            />
        </div>
    };

    const getEditedDevicesList = (devicesNames: IDeviceChecked[], availableDevicesNames: string[]): JSX.Element[] => {
        return devicesNames?.map((device: IDeviceChecked) => getPairDeviceCheckBox(cloneObj(device)))
    };

    const handleUpdateDevices = (): void => {
        const devices: string[] = updatedClient.devices.filter((device: IDeviceChecked) => device.checked).map((dev: IDeviceChecked) => dev.device.name);
        axios.post(PeopleRoutes.UPDATE_DEVICE, { id: currentEditedClientId, devices: devices }, getHeaders()).catch((error: any) => {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Session Expired")
                    CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                    history.push(Pages.SignIn)
                    localStorage.clear()
                }
            }
        });
        window.location.reload();
        setOpenEditDevicesDialog(false)
    };

    return (currentRole === null ? <NotFound /> : <React.Fragment>
        <div style={BoxStyle}>
            <DataGrid
                data={clientsData !== undefined ? clientsData : { columns: [], rows: [] }}
                onEditRow={onEditRow}
                onDeleteRow={onDeleteRow}
                onInsertRow={insertDialog}
            />
        </div>

        <Dashboard currentUser={props.currentUser} />
        <CustomDialog
            key={Math.random() * 16777215 + ""}
            title={"Add a new Person"}
            data={getInputTextFields([FIELD_NAME, FIELD_USERNAME, FIELD_ADDRESS, FIELD_EMAIL, FIELD_PHONE, FIELD_BIRTHDAY, FIELD_DEVICES, FIELD_USERTYPE,])}
            onClose={closeDialog}
            onSubmit={addPerson}
            openDialog={openDialog}
        />

        <CustomDialog
            key={Math.random() * 16777215 + ""}
            title={"Edit Devices"}
            data={getEditedDevicesList(getClientByID(cloneObj(clients), currentEditedClientId)?.devices, getAvailableDevices())}
            onClose={closeEditDevicesDialog}
            onSubmit={handleUpdateDevices}
            openDialog={openEditDevicesDialog}
        />
        <RPC />
    </React.Fragment >

    )
}
