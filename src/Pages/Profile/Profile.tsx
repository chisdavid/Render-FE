import { Stack } from "@fluentui/react";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { fontSize } from "@mui/system";
import axios from "axios";
import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { Dashboard } from "../../Components/NavBarComponent/DashBoard/DashBoard";
import { PeopleRoutes, RoleRoutes } from "../../Routes/routes";
import { getHeaders, getImageUrlFromByteArray, mobileAdapter } from "../../Utils/methods";
import { currentRole, CURRENT_ID } from "../MainPage/Home.types";
import { TOKEN, USER } from "../SignIn/SignIn";
import { SignInButtonClass } from "../SignIn/SignInPage.styles";
import { Pages } from '../../Enums/Pages'
import { useHistory } from "react-router";

const Input = styled('input')({ display: 'none', });

const NAME: string = "Name";
const ADDRESS: string = "Address";
const EMAIL: string = "Email";
const PHONE_NUMBER: string = "Phone";
const USERNAME: string = "Username";
const PASSWORD: string = "Password";
const BIRTH_DATE: string = "Birth Date";
const PROFILE_PAGE_TITLE: string = "Profile Page";
const SCHEDULAR: string = "The information can be edited";

export const Profile = (): JSX.Element => {
    const [imageURL, setImageURL] = useState<string>(getImageUrlFromByteArray(currentRole.profilePicture));
    const history = useHistory()

    const [values, setValues] = useState({
        name: currentRole.name,
        address: currentRole.address,
        email: currentRole.email,
        phone: currentRole.phoneNumber,
        username: currentRole.role.username,
        password: currentRole.role.password,
        birthDate: currentRole.birthDate.toString()

    });

    const uploadImage = (event: any) => {

        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('clientId', `${CURRENT_ID}`);

        axios.post(PeopleRoutes.UPLOAD_IMAGE, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(TOKEN)}`,
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }).then((response: any) => {
            localStorage.setItem(USER, JSON.stringify(response.data))
            setImageURL(getImageUrlFromByteArray(response.data.profilePicture));
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
    };

    const handleSubmit = (): void => {
        axios.post(PeopleRoutes.UPDATE_PROFILE, { ...values, id: CURRENT_ID }, getHeaders()).catch((error: any) => {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Session Expired")
                    CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                    history.push(Pages.SignIn)
                    localStorage.clear()
                }
            }
        }).catch((error: any) => {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Session Expired")
                    CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                    history.push(Pages.SignIn)
                    localStorage.clear()
                }
            }
        });
        alert("Your account has been updated");
        history.push(Pages.MainPage)
    }

    const handleChange = (event: any) => {
        const obj = { ...values };
        switch (event.target.name) {
            case NAME:
                obj.name = event.target.value;
                break;
            case USERNAME:
                obj.username = event.target.value;
                break;
            case PASSWORD:
                obj.password = event.target.value;
                break;
            case ADDRESS:
                obj.address = event.target.value;
                break;
            case PHONE_NUMBER:
                obj.phone = event.target.value;
                break;
            case BIRTH_DATE:
                obj.birthDate = event.target.value;
                break;
            case EMAIL:
                obj.email = event.target.value;
                break;
        }
        setValues({ ...obj })
    };

    const getDefaultValues = (name: string): string => {
        switch (name) {
            case NAME:
                return values.name;
            case USERNAME:
                return values.username;
            case PASSWORD:
                return values.password;
            case ADDRESS:
                return values.address;
            case PHONE_NUMBER:
                return values.phone;
            case BIRTH_DATE:
                return values.birthDate;
            case EMAIL:
                return values.email;
        };
    };

    const getTextField = (name: string): JSX.Element => {
        return <Grid item md={6} xs={10}>
            <TextField
                fullWidth
                helperText={name === BIRTH_DATE ? "" : `Please specify the ${name}`}
                label={name === BIRTH_DATE ? "" : name}
                name={name}
                type={name === BIRTH_DATE ? 'date' : 'string'}
                onChange={handleChange}
                required
                value={getDefaultValues(name)}
                variant="outlined"
            />
        </Grid>
    };

    const getContent = (names: string[]): JSX.Element[] => {
        return names.map((name: string) => getTextField(name))
    };

    return (<Fragment>
        <Dashboard currentUser={undefined} />
        <div style={{ position: 'absolute', justifyContent: 'center', height: "90%", top: '80px', left: '12%', width: '80%' }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack>
                        <img width={mobileAdapter('300', '200')} height={mobileAdapter('300', '200')} src={imageURL} style={{ borderRadius: "50%" }} />
                        <label htmlFor="contained-button-file" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={uploadImage} />
                            <Button variant="contained" component="span" style={{ top: '20px' }}>
                                Upload
                            </Button>
                        </label>
                    </Stack>
                </div>
                <CardHeader
                    subheader={SCHEDULAR}
                    title={PROFILE_PAGE_TITLE}
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={4} style={{ display: 'flex', justifyContent: 'center' }}>
                        {getContent([NAME, ADDRESS, EMAIL, USERNAME, PASSWORD, PHONE_NUMBER, BIRTH_DATE])}
                    </Grid>
                </CardContent>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                    <Button color="primary" variant="contained" onClick={handleSubmit}>Save details</Button>
                </Box>
            </Card>
        </div>
    </Fragment >)
}