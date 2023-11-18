
import LockOpenSharpIcon from '@mui/icons-material/LockOpenSharp';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import React, { useState } from "react";
import { useHistory } from 'react-router';
import { Pages } from "../../Enums/Pages";
import { IClient } from "../../Models/models";
import { RoleRoutes } from '../../Routes/routes';
import { getHeaders, goTo } from '../../Utils/methods';
import { CURRENT_ID } from '../MainPage/Home.types';
import { SignInButtonClass } from "./SignInPage.styles";
import { ISignInProps, NAME, PASSWORD } from "./SygnIn.types";
const theme = createTheme();

export const TOKEN: string = "TOKEN";
export const USER: string = "CurrentUser";
export const SignInPage = (props: ISignInProps): JSX.Element => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory()

  const handleSubmit = (): void => {

    axios.post(RoleRoutes.LOG_IN, { username: username, password: password }).then((response: any) => {
      console.log(response.data)
      localStorage.setItem(USER, JSON.stringify((response.data as IClient)))
      localStorage.setItem(TOKEN, `${response.headers.authorization}`)
      goTo(Pages.MainPage);
    }
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
  };

  const handleChange = (event: any): void => {
    const { value, name } = event.target;
    name === PASSWORD ? setPassword(value) : setUsername(value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{
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
          <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center", }} >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOpenSharpIcon />
            </Avatar>
            <Typography component="h1" variant="h5" onSubmit={handleSubmit}>
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} >
              <TextField
                margin="normal"
                required
                fullWidth
                id={NAME}
                label={NAME}
                name={NAME}
                className={SignInButtonClass(window.innerWidth)}
                autoComplete={NAME}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name={PASSWORD}
                label={PASSWORD}
                className={SignInButtonClass(window.innerWidth)}
                type={PASSWORD}
                id={PASSWORD}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={Pages.SignUp} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              className={SignInButtonClass(window.innerWidth)}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}