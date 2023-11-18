import { Label, Pivot, PivotItem, Stack, StackItem } from "@fluentui/react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BoxStyle } from "../../../../Components/Client/Client.styles";
import { IDeviceChecked } from "../../../../Components/Client/Client.types";
import { DropDown } from "../../../../Components/DropDown/DropDown";
import { Dashboard } from "../../../../Components/NavBarComponent/DashBoard/DashBoard";
import { IDevice } from "../../../../Models/models";
import { RemoteProcedureCall } from "../../../../Routes/routes";
import { generateRandomColor, getHeaders } from "../../../../Utils/methods";
import { currentRole, CURRENT_DEVICES, CURRENT_ROLE } from "../../../MainPage/Home.types";
import { NotFound } from "../../../PageNotFound/NotFound";
import { MenuItem, RPCObject, RPCResponse } from "./Measurement.types";

const getHours = (): string[] => {
    const hours: string[] = []
    for (let i = 1; i < 24; i -= -1) {
        hours.push(`${i}:00`);
    }
    return hours;
};

const getDays = (numberOfDays: number): string[] => {
    let date = new Date();
    const days: string[] = []
    for (let i = 0; i < numberOfDays; i++) {
        days.push(`Day ${i} ${(date.toLocaleDateString('en-GB'))}`)
        date.setDate(date.getDate() - 1);
    }
    return days;
};

const Menu = [MenuItem.HistoricalEnergyConsumption, MenuItem.Baseline, MenuItem.Program];

export const ClientMeasurement = (): JSX.Element => {

    const [selectedTab, setSelectedTab] = useState<string>(MenuItem.HistoricalEnergyConsumption);
    const [selectedDevices, setSelectedDevices] = useState<string[]>([CURRENT_DEVICES.filter((device: IDeviceChecked) => device.checked)[0].device?.name])
    const [numberOfDays, setNumberOfDays] = useState<number>(-1);
    const [data, setData] = useState<any[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([getDays(numberOfDays)[0]]);
    const [displayHourly, setDisplayHourly] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    const [startTime, setStartTime] = useState<number>(-1);

    useEffect(() => {
        const call: boolean = shouldMakeCall();
        if (call) {
            const defaultData: RPCObject = { id: 1, jsonrpc: 2.0, method: 'getAverage', params: { deviceId: getDeviceByName(selectedDevices[0])?.id, daysNumber: numberOfDays } };
            let data: RPCObject;
            switch (selectedTab) {
                case MenuItem.HistoricalEnergyConsumption:
                    data = displayHourly ? { ...defaultData, method: 'getAverage' } : { ...defaultData, method: 'getHourlyHistoricalEnergy' }
                    break;
                case MenuItem.Baseline:
                    data = { ...defaultData, method: 'getBaseLine', params: { deviceId: getDeviceByName(selectedDevices[0])?.id } }
                    break;
                case MenuItem.Program:
                    data = { ...defaultData, method: 'getProgram', params: { deviceId: getDeviceByName(selectedDevices[0])?.id, time: getSelectedTimeAsNumber() } }
                    break;
            };

            axios.post(RemoteProcedureCall.RPC_URL, data, getHeaders())
                .then((response: AxiosResponse) => {
                    const result = (response.data as RPCResponse).result
                    console.log(result)
                    if (data.method === "getProgram") {
                        setData(result.baseline);
                        setStartTime(result.startTime);
                    }
                    else { setData(result) }


                }).catch(err => console.log(err))
        }

    }, [selectedTab, numberOfDays, selectedDays, selectedDevices, selectedTime]);

    const getSelectedTimeAsNumber = (): number => {
        return parseInt(selectedTime[0]?.replace(":00", ""));
    }

    const shouldMakeCall = (): boolean => {
        switch (selectedTab) {
            case MenuItem.HistoricalEnergyConsumption:
                return selectedDevices.length >= 1 && numberOfDays > 0 && !displayHourly ? selectedDays[0] !== undefined : true
            case MenuItem.Baseline:
                return selectedDevices.length >= 1;
            case MenuItem.Program:
                return selectedDevices.length >= 1 && selectedTime.length >= 1
        };
    };

    const getDeviceByName = (name: string): IDevice => {
        return CURRENT_DEVICES.filter((device: IDeviceChecked) => device.checked).filter((dev: IDeviceChecked) => dev.device.name === name).map((d: IDeviceChecked) => d.device)[0];
    };

    const getCurrentDevicesNames = (): string[] => {
        return CURRENT_DEVICES.filter((device: IDeviceChecked) => device.checked).map((de: IDeviceChecked) => de.device.name);
    };

    const handleChange = (event: any): void => {
        const { value, name } = event.target;
        setNumberOfDays(value);
    };

    const getField = (name: string): JSX.Element => {

        return <TextField
            margin="normal"
            required
            style={{ bottom: '9px', left: '25px' }}
            id={name}
            label={name}
            name={name}
            type='number'
            autoComplete={name}
            onChange={handleChange}
            autoFocus
        />
    };

    const onChangeDisplayHourly = (): void => {
        setDisplayHourly(!displayHourly)
        setData([])
    };

    const getDataForGraphic = () => {
        return selectedTab === MenuItem.HistoricalEnergyConsumption ? data[getDays(numberOfDays).indexOf(selectedDays[0])] : data;
    };

    const getMenuButtons = (): JSX.Element[] => {
        return Menu.map((item: MenuItem) => getPivotItem(item));
    };

    const getHistoricalEnergyConsumptionTab = (): JSX.Element => {
        return <div style={{ display: 'flex' }}>
            <DropDown values={getCurrentDevicesNames()} name="Devices" multiple={false} setValues={setSelectedDevices} />
            {getField("Number Of Days")}
            <FormControlLabel
                style={{ position: 'relative', top: '-5px', left: '50px' }}
                control={
                    <Checkbox
                        defaultChecked={!displayHourly}
                        onChange={onChangeDisplayHourly} />}
                label="Display Hourly" />

            {numberOfDays > 0 && !displayHourly &&
                < StackItem style={{ position: "relative", left: '40px' }}>
                    <DropDown
                        values={getDays(numberOfDays)}
                        name="Select Day"
                        multiple={false}
                        setValues={setSelectedDays}
                    />
                </StackItem>
            }
        </div >
    };

    const getBaselineTab = (): JSX.Element => {
        return <div style={{ display: 'flex' }}>
            <DropDown values={getCurrentDevicesNames()} name="Devices" multiple={false} setValues={setSelectedDevices} />
            <FormControlLabel
                style={{ position: 'relative', top: '-5px', left: '50px' }}
                control={
                    <Checkbox
                        defaultChecked={!displayHourly}
                        onChange={onChangeDisplayHourly} />}
                label="Display Hourly" />
        </div>
    };

    const getProgramTab = (): JSX.Element => {
        return <div style={{ display: 'flex' }}>
            <DropDown values={getCurrentDevicesNames()} name="Devices" multiple={false} setValues={setSelectedDevices} />
            <DropDown
                values={getHours()}
                name={"Selecte Hour"}
                multiple={false}
                setValues={setSelectedTime} />
            <FormControlLabel
                style={{ position: 'relative', top: '-5px', left: '50px' }}
                control={
                    <Checkbox
                        defaultChecked={!displayHourly}
                        onChange={onChangeDisplayHourly} />}
                label="Display Hourly" />
        </div >
    };

    const getPivotItem = (tabName: MenuItem): JSX.Element => {

        switch (tabName) {
            case MenuItem.Baseline:
                return <PivotItem key={tabName} itemKey={tabName} headerText={tabName}  >
                    {getBaselineTab()}
                </PivotItem>
            case MenuItem.HistoricalEnergyConsumption:
                return <PivotItem key={tabName} itemKey={tabName} headerText={tabName}  >
                    {getHistoricalEnergyConsumptionTab()}
                </PivotItem>
            case MenuItem.Program:
                return <PivotItem key={tabName} itemKey={tabName} headerText={tabName}  >
                    {getProgramTab()}
                </PivotItem>
        }
    };

    const getMessage = (): string => {
        return `Between ${startTime} and ${startTime + getSelectedTimeAsNumber()}  `
    }

    const onPivotItemClicked = (item: PivotItem): void => {
        if (selectedTab === item.props.itemKey)
            return;
        setData([])
        setSelectedDays([])
        setSelectedDevices([])
        setNumberOfDays(-1);
        setSelectedTab(item.props.itemKey);
    };

    const getCharts = (): JSX.Element => {
        return <ResponsiveContainer width="100%" height="100%">
            {displayHourly ?
                <BarChart
                    data={data}
                    barCategoryGap={"30%"}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey={'name'} />
                    <YAxis />
                    <Tooltip active={true} />
                    <Legend />
                    <Bar dataKey={"value"} fill={generateRandomColor()} />
                </BarChart>
                :
                <LineChart width={500} height={300} data={getDataForGraphic()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            }

        </ResponsiveContainer>
    };

    return (<div>
        {console.log(data)}
        {currentRole !== null && CURRENT_ROLE !== "Admin" ?
            <div >
                <Dashboard currentUser={undefined} />
                <div style={BoxStyle}>
                    <Stack horizontal>
                        <Pivot selectedKey={selectedTab} onLinkClick={onPivotItemClicked}>
                            {getMenuButtons()}
                        </Pivot>
                    </Stack>
                    {getCharts()}


                    {startTime > 0 && <label style={{ position: 'relative', fontSize: '24px', fontFamily: 'inherit', fontStyle: 'initial', fontWeight: 700, left: '850px' }} >{getMessage()}</label>}

                </div>
            </div> : <NotFound />
        }
    </div>)
}