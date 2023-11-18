import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, useTheme } from "@mui/material";
import { useState } from "react";
import { getStyles, MenuProps } from "./DropDown.styles";
import { IDropDownProps } from "./DropDown.types";
import React from "react";

export const DropDown = (props: IDropDownProps): JSX.Element => {

    const theme = useTheme();
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const { target: { value }, } = event;
        setPersonName(typeof value === 'string' ? value.split(',') : value,)
        props.setValues(typeof value === 'string' ? value.split(',') : value,);
    };

    return (<div>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">{props.name}</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple={props.multiple}
                value={personName}
                onChange={handleChange}
                defaultValue={props.values}
                input={<OutlinedInput label={props.name} />}
                MenuProps={MenuProps}
            >
                {props.values?.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>)
}