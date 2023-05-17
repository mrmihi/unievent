import {
    useGetAdministratorsQuery,
    useCreateAdminsitratorMutation,
    useDeleteAdminsitratorMutation,
    useUpdateAdminsitratorMutation,
    
} from "../../state/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import Header from "../../components/Header";

const Administrator = () => {
    const { data, isLoading } = useGetAdministratorsQuery();
    console.log("data", data);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [tableData, setTableData] = useState(() => (data ? [...data] : []));
    console.log("tableData", tableData);

    useEffect(() => {
        if (data) {
            setTableData([...data]);
        }
    }, [data]);

    const [createAdministrator] = useCreateAdminsitratorMutation();
    const [deleteAdministrator] = useDeleteAdminsitratorMutation();
    const [updateAdministrator] = useUpdateAdminsitratorMutation();
    //const [getEventSpecificAttendees] = useGetEventSpecificAttendeesQuery();

    const handleCreateNewRow = (values) => {
        console.log("values", values);
        createAdministrator(values);
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            //send/receive api updates here, then refetch or update local table data for re-render
            console.log("values", values);
            updateAdministrator(values);
            setTableData([...tableData]);
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row) => {
            console.log("row", row);
            deleteAdministrator(row.original._id);
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [deleteAdministrator, tableData]
    );

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell._id],
                helperText: validationErrors[cell._id],
                onBlur: (event) => {
                    const isValid =
                        cell.column._id === "email"
                            ? validateEmail(event.target.value)
                            : cell.column._id === "age"
                            ? validateAge(+event.target.value)
                            : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell._id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell._id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors]
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: "_id",
                header: "ID",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 80,
            },
            {
                accessorKey: "name",
                header: "Name",
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "email",
                header: "Email",
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: "email",
                }),
            },
            {
                accessorKey: "city",
                header: "City",
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "state",
                header: "State",
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },

            {
                accessorKey: "phoneNumber",
                header: "Phone Number",
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: "number",
                }),
            },

            {
                accessorKey: "role",
                header: "Role",
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
        ],
        [getCommonEditTextFieldProps]
    );

    return (
        <>
            <Box m="1.5rem 1.0rem">
                <Header
                    title="ADMINISTRATOR"
                    subtitle="List of Administrator"
                />

                <MaterialReactTable
                    loading={isLoading || !data}
                    displayColumnDefOptions={{
                        "mrt-row-actions": {
                            muiTableHeadCellProps: {
                                align: "center",
                            },
                            size: 120,
                        },
                    }}
                    columns={columns}
                    data={tableData}
                    editingMode="modal" //default
                    enableColumnOrdering
                    enableEditing
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    positionActionsColumn="last"
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                            <Tooltip arrow placement="left" title="Edit">
                                <IconButton
                                    onClick={() => table.setEditingRow(row)}
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="right" title="Delete">
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteRow(row)}
                                >
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                    renderTopToolbarCustomActions={() => (
                        <Button
                            color="secondary"
                            onClick={() => setCreateModalOpen(true)}
                            variant="contained"
                        >
                            Add New Administrator
                        </Button>
                    )}
                />
                <CreateNewAccountModal
                    columns={columns}
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateNewRow}
                />
            </Box>
        </>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ""] = "";
            return acc;
        }, {})
    );

    const handleSubmit = () => {
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New Account</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: "100%",
                            minWidth: { xs: "300px", sm: "360px", md: "400px" },
                            gap: "1.5rem",
                        }}
                    >
                        {columns.map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={(e) =>
                                    setValues({
                                        ...values,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        ))}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    color="secondary"
                    onClick={handleSubmit}
                    variant="contained"
                >
                    Add New Administrator
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const validateRequired = (value) => !!value;
const validateEmail = (email) =>
    !!email &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
const validateAge = (age) => age >= 18 && age <= 50;

export default Administrator;
