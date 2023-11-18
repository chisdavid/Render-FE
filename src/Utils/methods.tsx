import { GridColDef } from "@mui/x-data-grid-pro";
import { TOKEN } from "../Pages/SignIn/SignIn";
import { ADMIN, AdminButtons, ClientButtons } from "./constants";
export const goTo = (path: string) => {
    window.location.pathname = path
};

export interface IButton {
    href: string,
    title: string,
    icon: JSX.Element,
};

export const getNavBarButtons = (userType: string | null) => {
    return userType !== null && userType === ADMIN ? AdminButtons : ClientButtons;
};

export interface Column {
    name: string,
    type?: string
    values?: string[]
};

export const getColumn = (name: string, type?: string, values?: string[]): GridColDef => {
    return {
        field: name,
        editable: name !== "id" ? true : false,
        headerName: name,
        width: 200,
        valueOptions: values,
        type: type,
    }
};

export const getColumns = (columns: Column[]) => {
    return columns.map((column: Column) => getColumn(column.name, column?.type, column?.values));
};

export function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
};

export const getHeaders = (): any => {
    return {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(TOKEN)}`,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    }
};

export const getImageUrlFromByteArray = (byteArray: any): string => {
    const byteCharacters = atob(byteArray);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const bytearr: Uint8Array = new Uint8Array(byteNumbers);
    const image: Blob = new Blob([bytearr], { type: 'image/jpeg' });
    return URL.createObjectURL(image);
};

export const mobileAdapter = (t: string, f: string): string => {
    return window.innerWidth > 1000 ? t : f;
};