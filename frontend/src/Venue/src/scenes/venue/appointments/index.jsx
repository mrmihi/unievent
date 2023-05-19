import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast, ToastContainer } from "react-toastify";
import Header from "Venue/src/components/Header";
import FlexBetween from "Venue/src/components/FlexBetween";

const VAppointments = (props) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

    const venueManagerID = Cookies.get("id")
  // const venueManagerID = "64456a13c2ee758733aa7ce7";

  const getData = async () => {
    try {
      const response = await axios.get(
        `/api/approval/request/user/${venueManagerID}`
      );
      //   const response = await axios.get(`/api/approval/request`);

      setTableData(response.data.data);

    } catch (error) {
      console.log(error.response.data);
      // toast.info(error.response.data.message, {
      //   position: "top-right",
      // });
    }
  };

  useEffect(() => {
    const fetchRegisteredData = async () => {
      await getData();
    };
    fetchRegisteredData();
  }, [venueManagerID]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, 
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "approval_id",
        header: "Approval ID",
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 120,
      },
      {
        accessorKey: "type",
        header: "Type",
        enableSorting: true,
      },
      {
        accessorKey: "requested_at",
        header: "Requested At",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "requested_by.name",
        header: "Requested By",
      },
      {
        accessorKey: "status",
        header: "Response",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "request_note",
        header: "Requested Note",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "responded_at",
        header: "Responded At",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
    ],
    []
  );

  return (
    <div className="mb-20 ml-10 mr-10">
      <ToastContainer />
      <Box>
        <div className="mb-10">
          <FlexBetween>
            <Header
              id="headerText"
              title="All Event Approval Requests Received"
              subtitle="Welcome!"
            />
          </FlexBetween>
        </div>
      </Box>
      <div className="text-lg">
        <MaterialReactTable
          muiTableBodyCellProps={{
            sx: {
              fontWeight: "normal",
              fontSize: "20px",
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              fontWeight: "bold",
              fontSize: "18px",
            },
          }}
          columns={columns}
          data={tableData !== null ? tableData : []} 
          enableColumnOrdering
          enableSorting
          initialState={{
            columnVisibility: {
              _id: false,
              approval_id: false,
            },
          }}
        />
      </div>
    </div>
  );
};

export default VAppointments;
