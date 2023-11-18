export type GridDataType = 'Employee' | 'Commodity';
export type GridDataThemeOption = 'default' | 'ant';


export interface GridPaginationSettings {
    pagination: boolean;
    autoPageSize: boolean;
    pageSize: number | undefined;
}

export interface GridConfigOptions {
    size: number;
    type: GridDataType;
    pagesize: number;
    theme: GridDataThemeOption;
}

export interface GridToolbarContainerProps {
    onApply: (options: GridConfigOptions) => void;
    size: number;
    type: GridDataType;
    theme: GridDataThemeOption;
}