import { TextField } from "@material-ui/core";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataRowModel, GridData } from "@mui/x-data-grid-generator";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Pages } from "../../Enums/Pages";
import { ISensor } from "../../Models/models";
import { CURRENT_ID, CURRENT_ROLE, CURRENT_SENSORS, IBasePageProps } from "../../Pages/MainPage/Home.types";
import { RoleRoutes, SensorRoutes } from "../../Routes/routes";
import { ADMIN } from "../../Utils/constants";
import { Column, getColumns, getHeaders } from "../../Utils/methods";
import { BoxStyle } from "../Client/Client.styles";
import { DataGrid } from "../DataGrid/DataGrid";
import { Dashboard } from "../NavBarComponent/DashBoard/DashBoard";


const Columns: Column[] = [
    { name: "id", type: "number" },
    { name: "Description" },
    { name: "MaxValue", type: 'number' },
    { name: "Name" }
]

const getRow = (sensor: ISensor) => {
    return {
        id: sensor?.id,
        Description: sensor?.description,
        MaxValue: sensor?.maxValue,
        Name: sensor?.name
    }
}

const getRows = (users: ISensor[]): DataRowModel[] => {
    return users?.map((user: ISensor) => getRow(user));
}

const FIELD_NAME: string = "Name";
const FIELD_DESCRIPTION: string = "Description";
const FIELD_MAX_VALUE: string = "Max Value";

export const Sensor = (props: IBasePageProps): JSX.Element => {

    const [sensors, setSensors] = useState<ISensor[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [data, setData] = useState<GridData>();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [maxValue, setMaxValue] = useState<number>(-1);
    const history = useHistory()
    useEffect(() => {

        console.log(SensorRoutes.GET_ALL)
        if (CURRENT_ROLE === ADMIN) {
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
            setSensors(CURRENT_SENSORS);
        }

    }, [openDialog])

    useEffect(() => {
        setData({ columns: getColumns(Columns), rows: getRows(sensors) })
    }, [sensors])

    const closeDialog = (): void => {
        setDescription("");
        setMaxValue(-1);
        setName("");

        setOpenDialog(false);
    };

    const onEditRow = (id: number, field: string, value: any): void => {
        axios.post(SensorRoutes.UPDATE, { id: id, field: field, value: value }, getHeaders()).catch((error: any) => {
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
        axios.post(SensorRoutes.DELETE, ids, getHeaders()).catch((error: any) => {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Session Expired")
                    CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                    history.push(Pages.SignIn)
                    localStorage.clear()
                }
            }
        })
        window.location.reload()
    };

    const onInsertSensor = (): void => {
        axios.post(SensorRoutes.ADD, { name: name, maxValue: maxValue, description: description }, getHeaders()).catch((error: any) => {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Session Expired")
                    CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                    history.push(Pages.SignIn)
                    localStorage.clear()
                }
            }
        })
        closeDialog();
        window.location.reload()
    }


    const handleChange = (event: any) => {
        const name: string = event.target.name;
        const value: any = event.target.value;

        switch (name) {
            case FIELD_DESCRIPTION:
                setDescription(value);
                break;
            case FIELD_MAX_VALUE:
                setMaxValue(value);
                break;
            case FIELD_NAME:
                setName(value);
                break;
        }

    }

    const getTextField = (name: string): JSX.Element => {
        return <TextField
            style={{ width: window.innerWidth < 1000 ? '250px' : '500px' }}
            key={name}
            autoFocus
            margin="dense"
            id={name}
            name={name}
            required
            onChange={handleChange}
            type={name === FIELD_MAX_VALUE ? "number" : "text"}
            label={name}
            fullWidth
            variant="standard"
        />
    }

    const getInputTextFields = (names: string[]): JSX.Element[] => {
        return names?.map((name: string) => getTextField(name));
    };

    const insertDialog = (): void => {
        setOpenDialog(true);
    };


    return (
        <React.Fragment>
            <div style={BoxStyle}>
                <DataGrid
                    key={Math.random() * 16777215}
                    data={data !== undefined ? data : { columns: [], rows: [] }}
                    onEditRow={onEditRow}
                    onDeleteRow={onDeleteRow}
                    onInsertRow={insertDialog}
                />
            </div>
            <Dashboard currentUser={props.currentUser} />
            <Dialog open={openDialog} onClose={closeDialog}>
                <DialogTitle>Add a new person</DialogTitle>
                <DialogContent>
                    {getInputTextFields([FIELD_NAME, FIELD_DESCRIPTION, FIELD_MAX_VALUE])}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={onInsertSensor}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
}