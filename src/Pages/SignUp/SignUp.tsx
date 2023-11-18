
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Pages } from "../../Enums/Pages";
import { PeopleRoutes, RoleRoutes } from "../../Routes/routes";
import { emailSufixe } from "../../Utils/constants";
import { getHeaders } from "../../Utils/methods";
import { CURRENT_ID } from "../MainPage/Home.types";
import { SignInButtonClass } from "../SignIn/SignInPage.styles";
import { SignInTypes } from "../SignIn/SygnIn.types";

const theme = createTheme();
export const SignUpPage = (): JSX.Element => {

    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [address, setAddress] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const history = useHistory()

    const handleSubmit = (): void => {
        if (username !== "" && name !== "" && address !== "" && email !== "" && phoneNumber !== "") {
            if (phoneNumber.length === 12 || phoneNumber.length === 10) {
                let ok: boolean = true;
                emailSufixe.forEach((sufixe: string) => {
                    if (email.includes(sufixe)) {
                        ok = false;
                        console.log({ username: username, address: address, name: name, date: birthDate, email: email, phoneNumber: phoneNumber })

                        axios.post(PeopleRoutes.REGISTER, { username: username, address: address, name: name, date: birthDate, email: email, phoneNumber: phoneNumber })
                            .then((res) => {
                                res.data !== "" && setErrorMessage(res.data as string)
                                alert("You will receive a mail with your credentials")
                            })

                        history.push(Pages.SignIn)
                    }
                })
                ok === true && setErrorMessage("Your Email is not valid");
            }
            else {
                setErrorMessage("Your phone number is invalid ");
            }
        }
    };

    const handleChange = (event: any): void => {
        const { value, name } = event.target;
        switch (name) {
            case SignInTypes.ADDRESS:
                setAddress(value);
                break;
            case SignInTypes.USERNAME:
                setUsername(value);
                break;
            case SignInTypes.NAME:
                setName(value);
                break;
            case SignInTypes.DATE:
                setBirthDate(value);
                break;
            case SignInTypes.EMAIL:
                setEmail(value);
                break;
            case SignInTypes.PHONE_NUMBER:
                setPhoneNumber(value);
                break;
        };
    }

    const getError = (): JSX.Element => {
        return <label className={SignInButtonClass(window.innerWidth)}>{errorMessage}</label>
    }

    const getField = (name: string): JSX.Element => {
        console.log(window.innerWidth)
        return <TextField
            margin="normal"
            required
            className={SignInButtonClass(window.innerWidth)}
            id={name}
            label={name !== SignInTypes.DATE && name}
            name={name}
            type={name === SignInTypes.DATE ? 'date' : "text"}
            autoComplete={name}
            onChange={handleChange}
            autoFocus
        />
    }

    const getFields = (names: string[]): JSX.Element[] => {
        return names.map((name: string) => getField(name))
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(https://source.unsplash.com/random)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" onSubmit={handleSubmit}>
                            Sign Up
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            sx={{ mt: 1 }}
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            {getFields([SignInTypes.NAME, SignInTypes.USERNAME, SignInTypes.ADDRESS, SignInTypes.DATE, SignInTypes.EMAIL, SignInTypes.PHONE_NUMBER])}
                        </Box>
                        <Button
                            type="submit"
                            className={SignInButtonClass(window.innerWidth)}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                        {getError()}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
