import React, { useCallback, useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit, AccountCircle, Send } from '@mui/icons-material';
import {
  useGetAttendeeStatusQuery,
  useCreateAttendeeStatusMutation,
  useUdaptedAttendeeStatusMutation,
  useDeleteAttendeeeStatusMutation,
} from '../../state/api';
import Header from '../../components/Header';
import { status } from './dataStatus';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
//Date Picker Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import AttendeeStatusPDF from './AttendeeStatusPDF';
const AttendeeStatus = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { data, isLoading } = useGetAttendeeStatusQuery();
  console.log('data', data);
  const [tableData, setTableData] = useState(() => (data ? [...data] : []));

  useEffect(() => {
    if (data) {
      setTableData([...data]);
    }
  }, [data]);

  const [createAttendeeStatus] = useCreateAttendeeStatusMutation();
  const [updateAttendeeStatus] = useUdaptedAttendeeStatusMutation();
  const [deleteAttendeeStatus] = useDeleteAttendeeeStatusMutation();

  //get date
  const [startDate, setStartDate] = useState(new Date());

  let handleColor = (time) => {
    return time.getHours() > 12 ? 'text-success' : 'text-error';
  };

  const handleCreateNewRow = (values) => {
    console.log('values', values);

    createAttendeeStatus(values);
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      console.log('values', values);
      updateAttendeeStatus(values);
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteAttendeeStatus(row.original._id)
            .then((response) => {
              Swal.fire('Deleted!', "Deleted your application", 'success');
              console.log(response);
            })
            .catch((error) => {
              Swal.fire('', 'Failed to Delete the Application.', 'error');
              console.log(error);
            })
            .finally(() => {
              tableData.splice(row.index, 1);
              setTableData([...tableData]);
            });
        }
      });
    },
    [deleteAttendeeStatus, tableData]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'phoneNumber'
              ? validatePhoneNumber(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
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
        accessorKey: '_id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
      },

      {
        accessorKey: 'event',
        header: 'Event',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'student_year',
        header: 'Student year',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: status.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          )),
        },
      },
      // {
      //     accessorKey: "date",
      //     header: "Date",
      //     size: 80,
      //     muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //         ...getCommonEditTextFieldProps(cell),
      //     }),
      // },
      {
        accessorFn: (row) => new Date(row.date), //convert to Date for sorting and filtering
        accessorKey: 'date',
        header: 'Date',
        filterFn: 'lessThanOrEqualTo',
        sortingFn: 'datetime',
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
        Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
        //Custom Date Picker Filter from @mui/x-date-pickers
        Filter: ({ column }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(newValue) => {
                column.setFilterValue(newValue);
              }}
              slotProps={{
                textField: {
                  helperText: 'Filter Mode: Less Than ',
                  sx: { minWidth: '120px' },
                  variant: 'standard',
                },
              }}
              value={column.getFilterValue()}
            />
          </LocalizationProvider>
        ),
      },

      {
        accessorKey: 'role',
        header: 'Role',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );
  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };
  return (
    <>
      <Box m="1.5rem 1.0rem">
        <Header
          title="ATTENDEES STATUS MANGEMENT"
          subtitle="List of Attendees Manege"
        />
        <MaterialReactTable
          loading={isLoading || !data}
          //state={{isLoading:true}}

          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          columns={columns}
          data={tableData}
          initialState={{
            columnVisibility: { _id: false },
            showColumnFilters: true,
          }}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: 'flex',
                gap: '1rem',
                p: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <Button
                color="primary"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Attendees Current Event's Data
              </Button>

              <Button
                color="secondary"
                onClick={() => setCreateModalOpen(true)}
                variant="contained"
              >
                Add New Attendee Status
              </Button>
              <AttendeeStatusPDF tableData={tableData} />
            </Box>
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
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };
  const [date, setStartTime] = useState(new Date());
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => {
              if (column.accessorKey === 'date') {
                return (
                  <LocalizationProvider
                    key={column.id}
                    dateAdapter={AdapterMoment}
                  >
                    <DatePicker
                      label={column.header}
                      name={column.accessorKey}
                      // value={value}
                      onChange={(value) =>
                        setValues({
                          ...values,
                          date: value,
                        })
                      }
                    />
                  </LocalizationProvider>
                );
              } else {
                return (
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
                );
              }
            })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Add New Attendee Status
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
//const validatePhoneNumber = (phoneNumber) => phoneNumber >= 0 && phoneNumber < 10;

const validatePhoneNumber = (phoneNumber) =>
  !!phoneNumber.length &&
  phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

// const validatePhoneNumber = ({ phoneNumber, setPhoneError }) => {
//     var phoneRegular = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//     return phoneNumber && !phoneNumber.match(phoneRegular)
//         ? setPhoneError("Phone Number not valid")
//         : setPhoneError("");
// };

export default AttendeeStatus;