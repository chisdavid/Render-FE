import { GridData } from "@mui/x-data-grid-generator";

export interface IDataGridProps {
    data: GridData,
    onDeleteRow: (ids: number[]) => void;
    onEditRow: (id: number, field: string, value: any) => void;
    onInsertRow: () => void;
}