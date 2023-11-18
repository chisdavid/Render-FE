import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, FormControl, FormGroup, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from "react";
import { GridDataThemeOption, GridDataType, GridToolbarContainerProps } from "./SetingsPanel.types";

export const SettingsPanel = (props: GridToolbarContainerProps) => {
    const { onApply, type, size, theme } = props;
    const [sizeState, setSize] = React.useState<number>(size);
    const [typeState, setType] = React.useState<GridDataType>(type);
    const [selectedPaginationValue, setSelectedPaginationValue] = useState<number>(-1);
    const [activeTheme, setActiveTheme] = React.useState<GridDataThemeOption>(theme);

    const handleSizeChange = React.useCallback((event) => {
        setSize(Number(event.target.value));
    }, []);

    const handleDatasetChange = React.useCallback((event) => {
        setType(event.target.value);
    }, []);

    const handlePaginationChange = React.useCallback((event) => {
        setSelectedPaginationValue(event.target.value);
    }, []);

    const handleThemeChange = React.useCallback((event) => {
        setActiveTheme(event.target.value);
    }, []);

    const handleApplyChanges = React.useCallback(() => {
        onApply({
            size: sizeState,
            type: typeState,
            pagesize: selectedPaginationValue,
            theme: activeTheme,
        });
    }, [sizeState, typeState, selectedPaginationValue, activeTheme, onApply]);

    return (
        <FormGroup className="MuiFormGroup-options" row>
            <FormControl variant="standard">
                <InputLabel>Dataset</InputLabel>
                <Select value={typeState} onChange={handleDatasetChange}>
                    <MenuItem value="Employee">Employee</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>Rows</InputLabel>
                <Select value={sizeState} onChange={handleSizeChange}>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
                    <MenuItem value={10000}>{Number(10000).toLocaleString()}</MenuItem>
                    <MenuItem value={100000}>{Number(100000).toLocaleString()}</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>Page Size</InputLabel>
                <Select value={selectedPaginationValue} onChange={handlePaginationChange}>
                    <MenuItem value={-1}>off</MenuItem>
                    <MenuItem value={0}>auto</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>Theme</InputLabel>
                <Select value={activeTheme} onChange={handleThemeChange}>
                    <MenuItem value="default">Default Theme</MenuItem>
                    <MenuItem value="ant">Ant Design</MenuItem>
                </Select>
            </FormControl>
            <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleApplyChanges}
            >
                <KeyboardArrowRightIcon fontSize="small" /> Apply
            </Button>
        </FormGroup>
    );
}