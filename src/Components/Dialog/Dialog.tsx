
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { IDialogComponentProps } from "./Dialog.types";
import React from "react";
export const CustomDialog = (props: IDialogComponentProps): JSX.Element => {

    const closeDialog = (): void => {
        props.onClose();
    };

    const Add = (): void => {
        props.onSubmit();
    };

    return (<Dialog open={props.openDialog} onClose={closeDialog} >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent style={{ width: "450px", }} >
            {props.data}
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button onClick={Add}>Add</Button>
        </DialogActions>
    </Dialog>)
}