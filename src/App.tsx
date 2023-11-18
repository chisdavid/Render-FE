import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Clients } from './Components/Client/Client';
import { Device } from './Components/Device/Device';
import { Sensor } from './Components/Sensor/Sensor';
import { Pages } from './Enums/Pages';
import { ClientChart } from './Pages/ClientPage/ChartClient.tsx/ClientChart';
import { ClientMeasurement } from './Pages/ClientPage/ChartClient.tsx/Measurement/Measurement';
import { Home } from './Pages/MainPage/Home';
import { NotFound } from './Pages/PageNotFound/NotFound';
import { Profile } from './Pages/Profile/Profile';
import { SignInPage } from './Pages/SignIn/SignIn';
import { SignUpPage } from './Pages/SignUp/SignUp';

export const App = () => {

  return (
    < Switch >
      <Route exact path={Pages.SignUp}><SignUpPage /></Route>
      <Route exact path={Pages.NotFound}><NotFound /></Route>
      <Route exact path={Pages.SignIn}> <SignInPage /></Route>
      <Route exact path={Pages.MainPage}><Home /></Route>
      <Route exact path={Pages.ClientPage}> <Clients /></Route>
      <Route exact path={Pages.Sensors}> <Sensor /></Route>
      <Route exact path={Pages.Profile}> <Profile /></Route>
      <Route exact path={Pages.Devices}><Device /></Route>
      <Route exact path={Pages.ClientChart}><ClientChart /></Route>
      <Route exact path={Pages.Measurement}><ClientMeasurement /></Route>
      <Route><Redirect to={Pages.SignIn} /></Route>
    </Switch >
  );
}
