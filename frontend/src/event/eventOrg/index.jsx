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
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const OrgView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const navigate = useNavigate();

  // GET method
  const getEventData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events`);
      setTableData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   let { eventID } = useParams();
  //   eventID = eventID.toString();
  //   console.log(typeof eventID);

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
      orgId: "642e4928973a5984d960f4bc",
    };
    tableData.push(newValues);
    setTableData([...tableData]);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/events`,
        newValues
      );
      console.log(response);
      setServerSuccessMessage(response.data.message);
      if (serverSuccessMessage !== "") {
        Swal.fire("", response.data.message, "success").then(() =>
          navigate("/volunteerOpportunities")
        );
      }
    } catch (error) {
      setServerErrorMessage(error.response.data.message);
    }
  };

  // PUT method
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    console.log(values._id);
    console.log(values.status);
    if (!Object.keys(validationErrors).length) {
      const newValues = {
        ...values,
        status: values.status,
      };
      tableData[row.index] = newValues;
      try {
        const response = await axios.put(
          `http://localhost:5000/api/events/${row.getValue("_id")}`,
          {
            status: values.status,
          }
        );
        setServerSuccessMessage(response.data.message);
        if (serverSuccessMessage !== "") {
          Swal.fire("", response.data.message, "success");
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
      console.log(tableData._id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:5000/api/events/${row.getValue("_id")}`)
            .then((response) => {
              Swal.fire("Deleted!", `Deleted!`, "success");
              console.log(response);
            })
            .catch((error) => {
              Swal.fire("", "Failed to Delete!", "error");
              console.log(error);
            });
        }
      });
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  useEffect(() => {
    if (serverSuccessMessage !== "") {
      Swal.fire("", serverSuccessMessage, "success");
    }
  }, [serverSuccessMessage]);
  const [status, setStatus] = useState(tableData.status);

  const updateStatus = (id) => {
    console.log(status);
    console.log(id);
    if (status === "pending") {
      setStatus("Approved");
    } else {
      setStatus("Rejected");
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
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
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

  const statusValues = ["Approved", "Rejected", "Pending"];

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
        columnVisibility: false,
      },
      {
        accessorKey: "name",
        header: "Event Name",
        enableEditing: false,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "category",
        header: "Category",
        enableColumnOrdering: false,
        enableEditing: true,
        enableSorting: false,
        size: 80,
        columnVisibility: false,
      },
      {
        accessorKey: "capacity",
        header: "Capacity",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
        columnVisibility: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "status",
        header: "Status",

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

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 50,
          },
        }}
        columns={columns}
        data={tableData}
        initialState={{
          columnVisibility: { _id: false, description: false },
          density: "compact",
        }}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            {/* {console.log(row)} */}
            {/* <Button
              variant="contained"
              onClick={() => updateStatus(row.original._id)}
            >
              Status
            </Button> */}
            <Tooltip arrow title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        positionActionsColumn="last"
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create a New Event
          </Button>
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

//All Events of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  // const [imageSelected, setImageSelected] = useState("");

  // const uploadImage = () => {
  //   if (imageSelected) {
  //     const formData = new FormData();
  //     formData.append("file", imageSelected);
  //     formData.append("upload_preset", "vief6ix8");

  //     axios
  //       .post(
  //         "https://api.cloudinary.com/v1_1/dpi1yqznl/image/upload",
  //         formData
  //       )
  //       .then((response) => {
  //         console.log(response);
  //         const imageUrl = response.data.secure_url;
  //         setValues({
  //           ...values,
  //           speakerImage: imageUrl,
  //         });
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   uploadImage();
  // }, [imageSelected]);

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
              if (column.accessorKey !== "_id") {
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                );
              } else {
                console.log(column.accessorKey);
              }
            })}
            {/* <TextField
              key="speakerImage"
              label="Speaker Image"
              name="speakerImage"
              type="file"
              onChange={(e) => {
                setImageSelected(e.target.files[0]);
                console.log(imageSelected);
                uploadImage();
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            /> */}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          ADD THE SPEAKER
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

export default OrgView;
