import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  Typography,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams, Link, Navigate } from 'react-router-dom';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Dayjs } from 'dayjs';
import EventPDF from '../pdf/EventPDF';
import { ToastContainer, toast } from 'react-toastify';
import '../styles/swalz.css';
import Cookies from 'js-cookie';

const OrgView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id: eventId } = useParams();

  const orgId = Cookies.get('org_id');

  console.log('orgId', orgId);
  // GET method
  const getEventData = async () => {
    try {
      const response = await axios.get(`/api/events/byorg/${orgId}`);
      setTableData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Running the GET method
  useEffect(() => {
    const fetchEventData = async () => {
      // setIsLoading(true);
      await getEventData();
      // setIsLoading(false);
    };
    fetchEventData();
  }, []);

  // CREATE method
  const handleCreateNewRow = async (values) => {
    const newValues = {
      ...values,
      orgId: '642e4928973a5984d960f4bc',
    };
    tableData.push(newValues);
    setTableData([...tableData]);
    try {
      const response = await axios.post("/api/events", newValues);
      console.log(response);
      setServerSuccessMessage(response.data.message);
      if (serverSuccessMessage !== '') {
        Swal.fire('', response.data.message, 'success').then(() =>
          navigate('/org/dashboard')
        );
      }
    } catch (error) {
      setServerErrorMessage(error.response.data.message);
    }
  };

  // PUT method
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    // console.log(values._id);
    // console.log(values.status);
    if (!Object.keys(validationErrors).length) {
      const newValues = {
        ...values,
        status: values.status,
      };
      if (values.category.length < 2) {
        //Swal.fire('', 'Category should be more than 2 characters!', 'warning');
        //toast.success('Category should be more than 2 characters!');
        Swal.fire({
          title: 'Alert',
          text: 'Category should be more than 2 characters!',
          icon: 'warning',
          customClass: {
            container: 'my-swal-container',
            popup: 'my-swal-popup',
          },
        });
        return;
      }
      tableData[row.index] = newValues;
      try {
        const response = await axios.put(`/api/events/${row.getValue('_id')}`, {
          category: values.category,
          status: values.status,
        });
        setServerSuccessMessage(response.data.message);
        if (serverSuccessMessage !== '') {
          Swal.fire('', response.data.message, 'success');
        }
      } catch (error) {
        setServerErrorMessage(error.response.data.message);
      }
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  //cancel updating
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  //deleting row edits
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
          axios
            .delete(`/api/events/${row.getValue('_id')}`)
            .then((response) => {
              Swal.fire('Deleted!', "Deleted The Event!", 'success');
              console.log(response);
              tableData.splice(row.index, 1);
              setTableData([...tableData]);
            })
            .catch((error) => {
              Swal.fire('', 'Failed to Delete The Event!.', 'error');
              console.log(error);
            });
        }
      });
    },
    [tableData]
  );

  useEffect(() => {
    if (serverSuccessMessage !== '') {
      Swal.fire('', serverSuccessMessage, 'success');
    }
  }, [serverSuccessMessage]);
  const [status, setStatus] = useState(tableData.status);

  const updateStatus = (id) => {
    console.log(status);
    console.log(id);
    if (status === 'pending') {
      setStatus('Approved');
    } else {
      setStatus('Rejected');
    }

    const updatedTableData = tableData.map((item) => {
      if (item._id === id) {
        // replace "selectedItemId" with the actual ID of the item you want to update
        return {
          ...item,
          status: status,
        };
      } else {
        return item;
      }
    });

    console.log(updatedTableData);
    setTableData(updatedTableData);
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
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

  const statusValues = ['Archived', 'Active', 'Upcoming'];

  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
        columnVisibility: false,
        isVisible: false,
      },
      {
        accessorKey: 'name',
        header: 'Event Name',
        enableEditing: false,
        enableSorting: true,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        enableColumnOrdering: false,
        enableEditing: true,
        enableSorting: false,
        size: 80,
        columnVisibility: false,
      },
      {
        accessorKey: 'capacity',
        header: 'Capacity',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
        columnVisibility: false,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        muiTableBodyCellEditTextFieldProps: () => ({
          children: statusValues.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          )),
          select: true,
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  if (!tableData) return <h1>Loading...</h1>;

  const handleView = (row) => {
    console.log(row.getValue('_id'));
    navigate(`/org/dashboard/events/${row.getValue('_id')}`);
  };

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 50,
          },
        }}
        columns={columns}
        data={tableData}
        initialState={{
          columnVisibility: { _id: false, description: false },
          density: 'compact',
        }}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="left" title="View">
              <IconButton onClick={() => handleView(row)}>
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        positionActionsColumn="last"
        renderTopToolbarCustomActions={() => (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              p: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create A New Event
            </Button>
            <EventPDF tableData={tableData} />
          </Box>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

//Event Creation Model -- Start
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here

    onSubmit(values);
    onClose();
  };
  const [imageSelected, setImageSelected] = useState('');

  const uploadImage = () => {
    if (imageSelected) {
      const formData = new FormData();
      formData.append('file', imageSelected);
      formData.append('upload_preset', 'rytp0oyr');

      axios
        .post(
          'https://api.cloudinary.com/v1_1/dn3wwir7s/image/upload',
          formData
        )
        .then((response) => {
          console.log(response);
          const imageUrl = response.data.secure_url;
          setValues({
            ...values,
            headerImage: imageUrl,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    uploadImage();
  }, [imageSelected]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Event</DialogTitle>
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
              if (!column.accessorKey) {
                return (
                  <TextField
                    key={column.id}
                    label={column.header}
                    name={column.id}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                );
              }
              if (
                column.accessorKey !== '_id' &&
                column.accessorKey !== 'status'
              ) {
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    // required
                    // // value={values.accessorKey}
                    // error={!values.name} // Here, we're setting the error prop based on whether the name field is empty or not
                    // helperText={!values.name ? 'Please enter a venue name' : ''}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                );
              } else {
                console.log(column.accessorKey);
              }
            })}
            <Typography>Start Date & Time</Typography>
            <MobileDateTimePicker
              key="startTime"
              name="startTime"
              required
              // value={values.startTime}
              error={!values.startTime} // Here, we're setting the error prop based on whether the name field is empty or not
              helperText={!values.startTime ? 'Please enter a venue name' : ''} // Here, we're showing an error message if the name field is empty
              onChange={(newValue) => {
                setValues({ ...values, startTime: newValue.$d });
              }}
            />
            <Typography>End Date & Time</Typography>
            <MobileDateTimePicker
              key="endTime"
              name="endTime"
              onChange={(newValue) => {
                setValues({ ...values, endTime: newValue.$d });
              }}
            />
            <Typography>Upload Event Image (Max Size: 5MB)</Typography>
            <TextField
              key="headerImage"
              name="headerImage"
              type="file"
              onChange={(e) => {
                setImageSelected(e.target.files[0]);
                console.log(imageSelected);
                uploadImage();
                setValues({ ...values, [e.target.name]: e.target.value });
                console.log(values.headerImage);
              }}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          ADD EVENT
        </Button>
      </DialogActions>
    </Dialog>
  );
};
//Event Creation Model -- End

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default OrgView;
