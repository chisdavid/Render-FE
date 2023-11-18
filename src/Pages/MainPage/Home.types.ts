import { IDeviceChecked } from "../../Components/Client/Client.types";
import { IClient, ISensor } from "../../Models/models";
import { USER } from "../SignIn/SignIn";

export const currentRole: IClient = JSON.parse((localStorage.getItem(USER) as string));
export const CURRENT_ROLE: string | null = currentRole?.role?.userType;
export const CURRENT_ID: number | null = currentRole?.id;
export const CURRENT_NAME: string | null = currentRole?.name;
export const CURRENT_DEVICES: IDeviceChecked[] = currentRole?.devices;
export const CURRENT_SENSORS: ISensor[] = currentRole?.devices?.filter((dev: IDeviceChecked) => dev.checked).map((d: IDeviceChecked) => d.device.sensor)

export interface IBasePageProps {
    currentUser?: IClient
}