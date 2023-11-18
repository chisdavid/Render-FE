import { HEROKU_SERVER_URL, LOCAL_SERVER_URL } from "../Utils/constants";

export let baseURL: string = LOCAL_SERVER_URL;

// export let baseURL: string = HEROKU_SERVER_URL;

export const SOCKET_ENDPOINT: string = `${baseURL}/socket`;

export namespace SensorRoutes {
    export const GET_ALL: string = `${baseURL}/Sensor/GetAll`;
    export const UPDATE: string = `${baseURL}/Sensor/Update`;
    export const ADD: string = `${baseURL}/Sensor/Insert`;
    export const DELETE: string = `${baseURL}/Sensor/Delete`;
    export const GET_BY_CLIENT_ID: string = `${baseURL}/Sensor/GetByClientId`;
};

export namespace RemoteProcedureCall {
    export const RPC_URL: string = `${baseURL}/rpc`;
};

export namespace DeviceRoutes {
    export const GET_ALL: string = `${baseURL}/Device/GetAll`;
    export const UPDATE: string = `${baseURL}/Device/Update`;
    export const ADD: string = `${baseURL}/Device/Add`;
    export const DELETE: string = `${baseURL}/Device/Delete`;
};

export namespace PeopleRoutes {
    export const GET_ALL: string = `${baseURL}/Client/GetAll`;
    export const GET_BY_ID: string = `${baseURL}/Client/GetById`;
    export const UPDATE: string = `${baseURL}/Client/Update`;
    export const ADD: string = `${baseURL}/Client/Insert`;
    export const DELETE: string = `${baseURL}/Client/Delete`;
    export const UPDATE_DEVICE: string = `${baseURL}/Client/UpdateDevice`;
    export const REGISTER: string = `${baseURL}/Client/Register`;
    export const UPLOAD_IMAGE: string = `${baseURL}/Client/UploadImage`;
    export const UPDATE_PROFILE: string = `${baseURL}/Client/UpdateProfile`
};

export namespace RoleRoutes {
    export const LOG_IN: string = `${baseURL}/Role/LogIn`;
    export const LOG_OUT: string = `${baseURL}/Role/LogOut`;
};