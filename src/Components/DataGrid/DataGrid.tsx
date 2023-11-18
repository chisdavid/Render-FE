import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, SpeedDialIcon } from '@mui/material';
import { DataGridPro, GridCallbackDetails, GridEditCellPropsParams, GridSelectionModel, GridToolbar, GridToolbarContainer, MuiEvent } from '@mui/x-data-grid-pro';
import React, { useState } from 'react';
import { CURRENT_ROLE } from '../../Pages/MainPage/Home.types';
import { useStyles, useStylesAntDesign } from './DataGrid.styles';
import { IDataGridProps } from './DataGrid.types';
import { SettingsPanel } from './SettingsPanel/SetingsPanel';
import { GridDataType, GridPaginationSettings } from './SettingsPanel/SetingsPanel.types';
import { Stack } from '@fluentui/react'

export const DataGrid = (props: IDataGridProps) => {
    const phoneOrientation: boolean = window.innerWidth > 1000;
    const classes = useStyles();
    const antDesignClasses = useStylesAntDesign();
    const [isAntDesign, setIsAntDesign] = useState<boolean>(false);
    const [type, setType] = useState<GridDataType>('Commodity');
    const [size, setSize] = useState(100);
    const [pagination, setPagination] = useState<GridPaginationSettings>({ pagination: false, autoPageSize: false, pageSize: undefined, });
    const [deletedItemsIds, setDeletedItemsIds] = useState<number[]>([])

    const getActiveTheme = () => {
        return isAntDesign ? 'ant' : 'default';
    };

    const onEditRow = (params: GridEditCellPropsParams, event: MuiEvent<React.SyntheticEvent>, details: GridCallbackDetails): void => {
        props.onEditRow(params.id as number, params.field, params.props.value);
    }

    const addDataFromCSVFile = (): void => {

    }

    const CustomGridToolBar = (): JSX.Element => {
        return <Stack horizontal>
            <GridToolbarContainer >
                <Stack horizontal={window.innerWidth > 1000} >
                    <GridToolbar style={{ display: 'flex', flexDirection: !phoneOrientation ? 'column' : 'revert' }} />
                    {CURRENT_ROLE === "Admin" ?
                        <Box style={{ position: 'relative', top: '3px' }}>
                            <Button onClick={() => props.onInsertRow()}><SpeedDialIcon style={{ position: 'relative', bottom: '2px' }} color="primary" />Insert</Button>
                        </Box> : <div></div>}

                    <Box style={{ position: 'relative', top: '3px' }}>
                        <Button onClick={() => { props.onDeleteRow(deletedItemsIds) }} ><DeleteIcon style={{ position: 'relative', bottom: '2px' }} color="primary" />Delete</Button>
                    </Box>

                </Stack>


            </GridToolbarContainer >
        </Stack >
    }

    const handleApplyClick = (settings: any): void => {
        if (size !== settings.size) {
            setSize(settings.size);
        }

        if (type !== settings.type) {
            setType(settings.type);
        }

        if (getActiveTheme() !== settings.theme) {
            setIsAntDesign(!isAntDesign);
        }

        const newPaginationSettings: GridPaginationSettings = {
            pagination: settings.pagesize !== -1,
            autoPageSize: settings.pagesize === 0,
            pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
        };

        setPagination(
            (
                currentPaginationSettings: GridPaginationSettings,
            ): GridPaginationSettings => {
                if (currentPaginationSettings.pagination === newPaginationSettings.pagination && currentPaginationSettings.autoPageSize === newPaginationSettings.autoPageSize && currentPaginationSettings.pageSize === newPaginationSettings.pageSize
                ) {
                    return currentPaginationSettings;
                }
                return newPaginationSettings;
            },
        );
    };

    const onSelectionModelChange = (model: GridSelectionModel): void => {
        setDeletedItemsIds(model as number[])
    };

    return (<div className={classes.root}>
        <SettingsPanel
            onApply={handleApplyClick}
            size={size}
            type={type}
            theme={getActiveTheme()}
        />

        <DataGridPro
            className={isAntDesign ? antDesignClasses.root : undefined}
            {...props.data}
            components={{
                Toolbar: CustomGridToolBar,
            }}
            onEditCellPropsChange={onEditRow}
            onSelectionModelChange={onSelectionModelChange}
            checkboxSelection
            disableSelectionOnClick
            {...pagination}
        />
    </div>
    );
}
