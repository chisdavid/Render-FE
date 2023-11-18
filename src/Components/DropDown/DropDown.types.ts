export interface IDropDownProps {
    values: string[],
    name: string,
    multiple: boolean,
    setValues: (values: string[]) => void
}

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;