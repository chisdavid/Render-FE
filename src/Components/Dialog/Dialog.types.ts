export interface IDialogComponentProps {
    openDialog: boolean;
    data: JSX.Element[],
    title: string,
    onSubmit: () => void;
    onClose: any;
}