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
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import OpportunityPDF from '../../pdf/OpportunityPDF';
const Opportunities = () => {
  const { eventID } = useParams();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [date, setDate] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const navigate = useNavigate();

  // let { eventID } = useParams();
  // eventID = eventID.toString();

  const getRegisteredData = async () => {
    try {
      const response = await axios.get(
        `/api/partners/opportunities/${eventID}`
      );
      console.log(response.data.data);
      setTableData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRegisteredData = async () => {
      // setIsLoading(true);
      await getRegisteredData();
      // setIsLoading(false);
    };
    fetchRegisteredData();
  }, []);

  const handleCreateNewRow = async (values) => {
    const newValues = {
      ...values,
      eventID: `${eventID}`,
    };
    tableData.push(newValues);
    setTableData([...tableData]);
    try {
      const response = await axios.post(
        "/api/partners/opportunities",
        newValues
      );
      console.log(response);
      setServerSuccessMessage(response.data.message);
      if (serverSuccessMessage !== '') {
        Swal.fire('', response.data.message, 'success').then(() =>
          navigate('/volunteerOpportunities')
        );
      }
    } catch (error) {
      setServerErrorMessage(error.response.data.message);
    }
  };

  //save updates
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      const newValues = {
        ...values,
        eventID: '643e6ca96030148f194b771d',
      };
      tableData[row.index] = newValues;
      try {
        const response = await axios.put(
          `/api/partners/opportunities/${newValues._id}`,
          newValues
        );
        setServerSuccessMessage(response.data.message);
        if (serverSuccessMessage !== '') {
          Swal.fire('', response.data.message, 'success').then(() =>
            navigate('/volunteerOpportunities')
          );
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
            .delete(`/api/partners/opportunities/${row.getValue('_id')}`)
            .then((response) => {
              Swal.fire('Deleted!', "Deleted The Opportunity", 'success');
              console.log(response);
              tableData.splice(row.index, 1);
              setTableData([...tableData]);
            })
            .catch((error) => {
              Swal.fire('', 'Failed to Delete The Opportunity', 'error');
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
        accessorFn: (row) => `${row.name} `,
        //accessorFn used to join multiple data into a single cell
        id: 'name', //id is still required when using accessorFn instead of accessorKey
        header: 'Opportunity',
        size: 250,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.opportunityImage}
              loading="lazy"
              style={{ borderRadius: '50%', height: '50px' }}
            />{' '}
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },

      {
        accessorFn: (row) => {
          console.log(row.date);
          const date = moment(`${row.date}`);
          const formattedDate = date.format('DD-MM-YYYY');
          return formattedDate;
        },
        accessorKey: 'date',
        header: 'Date',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorFn: (row) => {
          const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
          console.log(typeof row.time);
          if (dateRegex.test(row.time)) {
            console.log(typeof row.time);
            const date = moment(`${row.time}`);
            const formattedTime = date.format('hh:mm A');
            return formattedTime;
          } else {
            return `${row.time}`;
          }
        },
        accessorKey: 'time',
        header: 'Time',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'text',
        }),
      },
      // {
      //   accessorKey: 'opportunityImage',
      //   header: 'opportunityImage',
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //     type: 'text',
      //   }),
      // },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <div className="mb-20 ml-10 mr-10">
      <Box>
        <div className="mb-10">
          <FlexBetween>
            <Header title="Opportunities" subtitle="Welcome!" />
          </FlexBetween>
        </div>
      </Box>
      <MaterialReactTable
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
          columnVisibility: { _id: false, opportunityImage: false },
        }}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        // onEditingRowSave={handleSaveRowEdits}
        // onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() =>
                  navigate('/org/dashboard/updateOpportunity/', {
                    state: { opportunity: row.original },
                  })
                }
              >
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
        renderTopToolbarCustomActions={() => (
          <>
            <div className="flex items-center">
              <Button
                sx={{ marginRight: '5px' }}
                color="primary"
                onClick={() =>
                  navigate(`/org/dashboard/addOpportunity/${eventID}`)
                }
                variant="contained"
              >
                ADD An Opportunity
              </Button>
              <OpportunityPDF tableData={tableData} />
            </div>
          </>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </div>
  );
};

//SponsorView of creating a mui dialog modal for creating new rows
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
      formData.append('upload_preset', 'vief6ix8');

      axios
        .post(
          'https://api.cloudinary.com/v1_1/dpi1yqznl/image/upload',
          formData
        )
        .then((response) => {
          console.log(response);
          const imageUrl = response.data.secure_url;
          setValues({
            ...values,
            opportunityImage: imageUrl,
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
              }
              if (column.accessorKey === 'time') {
                return (
                  <LocalizationProvider
                    key={column.id}
                    dateAdapter={AdapterMoment}
                  >
                    <TimePicker
                      label="Time"
                      defaultValue={moment('2022-04-17T15:30')}
                      // value={value}
                      onChange={(value) =>
                        setValues({
                          ...values,
                          time: value,
                        })
                      }
                    />
                  </LocalizationProvider>
                );
              }
              if (
                column.accessorKey !== '_id' ||
                column.accessorKey !== 'date' ||
                column.accessorKey !== 'time'
              ) {
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
              } else {
              }
            })}

            <TextField
              key="opportunityImage"
              name="opportunityImage"
              type="file"
              onChange={(e) => {
                setImageSelected(e.target.files[0]);
                console.log(imageSelected);
                uploadImage();
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          ADD THE Opportunity
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
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default Opportunities;
