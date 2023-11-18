import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataRowModel, GridData } from "@mui/x-data-grid-generator";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Pages } from "../../Enums/Pages";
import { IDevice, ISensor } from "../../Models/models";
import { currentRole, CURRENT_ID, CURRENT_ROLE, IBasePageProps } from "../../Pages/MainPage/Home.types";
import { DeviceRoutes, RoleRoutes, SensorRoutes } from "../../Routes/routes";
import { ADMIN } from "../../Utils/constants";
import { Column, getColumns, getHeaders } from "../../Utils/methods";
import { BoxStyle } from "../Client/Client.styles";
import { IDeviceChecked } from "../Client/Client.types";
import { DataGrid } from "../DataGrid/DataGrid";
import { Dashboard } from "../NavBarComponent/DashBoard/DashBoard";

const Columns = (values: string[]): Column[] => {
    return [
        { name: "id", type: "number" },
        { name: "Name" },
        { name: "Address" },
        { name: "Description" },
        { name: "MaximumEnergyConsumption", type: "number" },
        { name: "AverageEnergyConsumption", type: "number" },
        { name: "Sensor", type: "singleSelect", values: values }
    ]
}

const getRow = (device: IDevice) => {
    return {
        id: device.id,
        Name: device.name,
        Address: device.address,
        Description: device.description,
        MaximumEnergyConsumption: device.maximumEnergyConsumption,
        AverageEnergyConsumption: device.averageEnergyConsumption,
        Sensor: device.sensor === null ? "No Sensor " : device.sensor?.name
    }
}

const getRows = (users: IDevice[]): DataRowModel[] => {
    return users.map((user: IDevice) => getRow(user));
}

const FIELD_NAME: string = "Name";
const FIELD_ADDRESS: string = "Address";
const FIELD_DESCRIPTION: string = "Description";
const FIELD_MAXIMUM_ENERGY_CONSUMPTION: string = "Maximum Energy Consumption";
const FIELD_AVERAGE_ENERGY_CONSUMPTION: string = "Average Energy Consumption";
const FIELD_SENSOR = "Sensor";

export const Device = (props: IBasePageProps): JSX.Element => {

    const [devices, setDevices] = useState<IDevice[]>([]);
    const [sensors, setSensors] = useState<ISensor[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [data, setData] = useState<GridData>();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [maximumEnergyConsumption, setMaximumEnergyConsumption] = useState<number>(-1);
    const [averageEnergyConsumption, setAverageEnergyConsumption] = useState<number>(-1);
    const [sensorId, setSensorId] = useState<number>(-1);
    const history = useHistory()

    useEffect(() => {
        if (CURRENT_ROLE === ADMIN) {
            axios.get(DeviceRoutes.GET_ALL, getHeaders()).then((response) => {
                setDevices(response.data as IDevice[])
            }).catch((error: any) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert("Session Expired")
                        CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                        history.push(Pages.SignIn)
                        localStorage.clear()
                    }
                }
            })

            axios.get(SensorRoutes.GET_ALL, getHeaders()).then(
                (res) => setSensors(res.data as ISensor[])
            ).catch((error: any) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert("Session Expired")
                        CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                        history.push(Pages.SignIn)
                        localStorage.clear()
                    }
                }
            })
        }
        else {
            console.log(currentRole.devices[0].checked)
            const devices: IDevice[] = currentRole.devices.filter((deviceChecked: IDeviceChecked) => deviceChecked.checked).map((dev: IDeviceChecked) => dev.device);
            setDevices(devices);
            setSensors(devices.map((device: IDevice) => device.sensor))
        }

    }, [openDialog]);

    useEffect(() => {
        setData({ columns: getColumns(Columns(sensors.map((sensor: ISensor) => sensor.name))), rows: getRows(devices) })
    }, [devices, sensors]);

    const onEditRow = (id: number, field: string, value: any): void => {
        axios.post(DeviceRoutes.UPDATE, { id: id, field: field, value: value }, getHeaders()).catch((error: any) => {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Session Expired")
                    CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                    history.push(Pages.SignIn)
                    localStorage.clear()
                }
            }
        })
    }

    const onDeleteRow = (ids: number[]): void => {
        axios.post(DeviceRoutes.DELETE, ids, getHeaders()).catch((error: any) => {
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
    }

    const insertDialog = (): void => {
        setOpenDialog(true);
    }

    const handleChange = (event: any): void => {
        const name: string = event.target.name;
        const value: any = event.target.value;
        switch (name) {
            case FIELD_ADDRESS:
                setAddress(value);
                break;
            case FIELD_AVERAGE_ENERGY_CONSUMPTION:
                setAverageEnergyConsumption(value);
                break;
            case FIELD_MAXIMUM_ENERGY_CONSUMPTION:
                setMaximumEnergyConsumption(value);
                break;
            case FIELD_NAME:
                setName(value);
                break;
            case FIELD_DESCRIPTION:
                setDescription(value);
                break;
            default:
                setSensorId(value);
                break;
        }
    }
    const getTextField = (name: string, sensors?: string[]): JSX.Element => {
        return name === FIELD_SENSOR ?
            <Autocomplete
                key={name}
                id="combo-box-demo"
                options={sensors !== undefined ? sensors : []}
                sx={{ width: 300, marginTop: 2 }}
                onChange={handleChange}
                renderInput={(params) => <TextField style={{ width: window.innerWidth < 1000 ? '250px' : '550px', display: 'flex', justifyContent: 'center' }} placeholder="Sensor" {...params} />}
            />
            :
            <TextField
                style={{ width: window.innerWidth < 1000 ? '250px' : '550px' }}
                key={name}
                autoFocus
                margin="dense"
                id={name}
                name={name}
                required
                onChange={handleChange}
                type={name === FIELD_SENSOR ? "combobox" : "text"}
                label={name}
                fullWidth
                variant="standard"
            />
    };

    const getInputTextFields = (names: string[], sensors?: ISensor[]): JSX.Element[] => {
        const sensorsNames: string[] | undefined = sensors?.map((sensor: ISensor) => sensor.name)
        return names.map((name: string) => name === FIELD_SENSOR ? getTextField(name, sensorsNames) : getTextField(name));
    };

    const closeDialog = (): void => {
        setOpenDialog(false);
        setAddress("");
        setDescription("");
        setName("");
        setMaximumEnergyConsumption(-1);
        setAverageEnergyConsumption(-1);
        setSensorId(-1);
    };

    const addDevice = (): void => {
        axios.post(DeviceRoutes.ADD, { name: name, address: address, description: description, maximumEnergyConsumtion: maximumEnergyConsumption, averageEnergyConsumtion: averageEnergyConsumption, sensorId: sensorId }, getHeaders())
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
        window.location.reload();
        closeDialog();
    }

    return (
        <Fragment>
            <div style={BoxStyle} key={Math.random() * 16777215}>
                <DataGrid
                    data={data !== undefined ? data : { columns: [], rows: [] }}
                    onEditRow={onEditRow}
                    onDeleteRow={onDeleteRow}
                    onInsertRow={insertDialog}
                />
            </div>
            <Dashboard key={Math.random() * 16777215} currentUser={props.currentUser} />
            <Dialog open={openDialog} onClose={closeDialog}>
                <DialogTitle>Add a new person</DialogTitle>
                <DialogContent>
                    {getInputTextFields([FIELD_NAME, FIELD_DESCRIPTION, FIELD_ADDRESS, FIELD_MAXIMUM_ENERGY_CONSUMPTION, FIELD_AVERAGE_ENERGY_CONSUMPTION, FIELD_SENSOR], sensors)}
                </DialogContent>
                <DialogActions>
                    <Button key={"Button2"} onClick={closeDialog}>Cancel</Button>
                    <Button key={"button1"} onClick={addDevice}>Add</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}