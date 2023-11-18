import { DateLocale } from "yup/lib/locale";
import { IDeviceChecked } from "../Components/Client/Client.types";

export interface ISensor {
    id: number,
    description: string,
    maxValue: number,
    name: string,
    dataList: ISensorData[]
};

export interface ISensorData {
    id: number,
    date: DateLocale
    value: number
};

export interface IStatus {
    id: number,
    logIn: Date,
    logOut: Date
};

export interface IRole {
    id: number,
    password: string,
    username: string,
    userType: string
    status: IStatus[]
};

export interface IDevice {
    id: number,
    name: string,
    description: string,
    address: string,
    maximumEnergyConsumption: number,
    averageEnergyConsumption: number
    sensor: ISensor
};

export interface IClient {
    id: number,
    name: string,
    address: string,
    email: string,
    birthDate: Date,
    phoneNumber: string,
    profilePicture: any,
    devices: IDeviceChecked[],
    role: IRole
};
