import { Alert, Stack } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { useState } from "react"
import { ISnackBarProps } from "./SnackBar.types";

export const SnackBar = (props: ISnackBarProps): JSX.Element => {
    const [activateSnackBar, setActivateSnackBar] = useState<boolean>(true);

    const handleClose = () => {
        setActivateSnackBar(false);
    };

    return <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={activateSnackBar} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.error ? "error" : "success"} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    </Stack>
}