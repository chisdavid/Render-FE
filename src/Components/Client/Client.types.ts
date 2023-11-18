import { IDevice } from "../../Models/models";

export interface IDeviceChecked {
    device: IDevice,
    checked: boolean | undefined
}

export interface ICurrentEdited {
    columnName: string,
    id: number
}