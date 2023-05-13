import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import Header from "../components/Header";
import FlexBetween from "../components/FlexBetween";
import { useParams } from "react-router-dom";

const PrintAll = () => {
  const { id: approvalID } = useParams();
  const [approval, setApproval] = useState({});
  const [lic, setLic] = useState({});
  const [venue, setVenue] = useState({});
  const [budget, setBudget] = useState({});
  const [admin, setAdmin] = useState({});

  const [licDate, setLicDate] = useState({});
  const [venueDate, setVenueDate] = useState({});
  const [budgetDate, setBudgetDate] = useState({});
  const [adminDate, setAdminDate] = useState({});

  const [licStatus, setLicStatus] = useState({});
  const [venueStatus, setVenueStatus] = useState({});
  const [budgetStatus, setBudgetStatus] = useState({});
  const [adminStatus, setAdminStatus] = useState({});
  

  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    const fetchRequest = async (requestId, role) => {
      await axios
        .get(`http://localhost:5000/api/approval/request/${requestId}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.data.status);
          switch (role) {
            case "lic":
              setLic(res.data.data.requested_to);
              setLicDate(String(res.data.data.createdAt).split("T")[0])
              setLicStatus(res.data.data.status)
              break;

            case "venue":
              setVenue(res.data.data.requested_to);
              setVenueDate(String(res.data.data.createdAt).split("T")[0])
              setVenueStatus(res.data.data.status)
              break;

            case "budget":
              setBudget(res.data.data.requested_to);
              setBudgetDate(String(res.data.data.createdAt).split("T")[0])
              setBudgetStatus(res.data.data.status)
              break
            case "admin":
              setAdmin(res.data.data.requested_to);
              setAdminDate(String(res.data.data.createdAt).split("T")[0])
              setAdminStatus(res.data.data.status)
              break;
          }
          setIsLoaded(true)
        })
        .catch((err) => {
          console.log(err.response);
          setLic({});
          setVenue({});
          setBudget({});
          setAdmin({});
        });
    };

    axios
      .get(`http://localhost:5000/api/approval/event/${approvalID}`)
      .then((res) => {
        setApproval(res.data.data);
        fetchRequest(res.data.data.lic_approval._id, "lic");
        fetchRequest(res.data.data.venue_approval._id, "venue");
        fetchRequest(res.data.data.budget_approval._id, "budget");
        fetchRequest(res.data.data.admin_approval._id, "admin");
        setIsLoaded(true)
      })
      .catch((err) => {
        console.log(err);
        setApproval({});
      })

  }, []);

  const approvalStatus = (status) => {
    switch (status) {
      case "Initiated":
        return "Initiated";
      case "Draft":
        return "Draft";
      case "LIC_Awaiting":
        return "Request Sent To LIC";
      case "FM_Awaiting":
        return "LIC Approved";
      case "VM_Awaiting":
        return "Budget Approved";
      case "Admin_Awaiting":
        return "Venue Manager Approved";
      case "Approved":
        return "Event Approved";
      case "Rejected":
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  const requestStatus = (status) => {
    switch (status) {
      case "Not_Yet_Sent":
        return "Not Yet Sent";
      case "Sent":
        return "Sent";
      case "Viewed":
        return "Viewed";
      case "Approved":
        return "Approved";
      case "Rejected":
        return "Rejected";
      default:
        return "Unknown";
    }
  }

  const downloadForm = () => {
    const doc = new jsPDF();

    // add header
    doc.setFontSize(26);
    doc.setFont("bold");
    doc.text("UniEventPro PVT LTD", doc.internal.pageSize.getWidth() / 2, 30, {
      align: "center",
    });

    // add contact information
    doc.setFontSize(12);
    doc.setFont("normal");
    doc.text("UniEventPro PVT LTD", 20, 50);
    doc.text("94-759-932-123", 20, 60);
    doc.text("mail@unieventpro.com", 20, 70);
    doc.text("unieventpro.com", 20, 80);
    doc.text(new Date().toLocaleDateString(), 20, 90);

    // add quotation title
    doc.setFontSize(16);
    doc.text("Approval Request Form", doc.internal.pageSize.width / 2, 110, {
      align: "center",
    });

    // draw underline
    const underlineWidth =
      (doc.getStringUnitWidth("Approval Request Form") *
        doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const underlineStart = (doc.internal.pageSize.width - underlineWidth) / 2;
    const underlineEnd = underlineStart + underlineWidth;
    doc.line(underlineStart, 112, underlineEnd, 112);

    // add approval request information
    doc.setFontSize(12);
    doc.setFont("bold");
    doc.text(`Event Title: ${approval.event_id.name}`, 20, 130);
    doc.text(`Event Description: ${approval.event_id.name}`, 20, 140);
    doc.text(`Event Date: ${String(approval.event_id.startTime).split("T")[0]}`, 20, 150);
    doc.text(`Approval Status: ${approvalStatus(approval.status)}`, 20, 160);


    // add approval details table
    const detailsData = [
      [
        "Requested From",
        "Designation",
        "Approval Type",
        "Requested On",
        "Status",
      ],
      [
        `${lic.name != undefined ? lic.name : ""}`,
        `${"Lecturer-In-Charge"}`,
        `${"LIC Approval"}`,
        `${licDate}`,
        `${requestStatus(licStatus)}`,
      ],
      [
        `${venue.name != undefined ? venue.name : ""}`,
        `${"Venue Manager"}`,
        `${"venue Approval"}`,
        `${venueDate}`,
        `${requestStatus(venueStatus)}`,
      ],
      [
        `${budget.name != undefined ? budget.name : ""}`,
        `${"Staff"}`,
        `${"Budget Approval"}`,
        `${budgetDate}`,
        `${requestStatus(budgetStatus)}`,
      ],
      [
        `${admin.name != undefined ? admin.name : "" }`,
        `${"Administator"}`,
        `${"Admin Approval"}`,
        `${adminDate}`,
        `${requestStatus(adminStatus)}`,
      ],
    ];

    doc.autoTable({
      startY: 170,
      head: [detailsData[0]],
      body: detailsData.slice(1),
      tableWidth: "90%",
      theme: "striped",
      headStyles: { fillColor: "#ADD8E6" },
    });

    // add quotation total
    doc.text(
      `Date of Issue: ${new Date().toLocaleDateString()}`,
      140,
      220,
      { align: "left" }
    );

  
    // add thank you message and contact information
    doc.getFontSize(12);
    doc.text(
      "Thank you for choosing UniEventPro PVT LTD. For any queries, please contact us",
      20,
      255,
      { align: "left" }
    );

    doc.getFontSize(12);
    doc.text(
      "Disclaimer: This is a computer generated document and does not require a signature",
      20,
      280,
      { align: "left" }
    );

    // save the PDF
    doc.save("event-approval-request-form.pdf");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <div>
        <FlexBetween>
          <Header
            title="Event Approval Request Form"
            subtitle="Click to download"
          />
        </FlexBetween>
      </div>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#1769aa",
            color: "#fff",
            marginTop: "1rem",
            fontWeight: 600,
          }}
          onClick={downloadForm}
          disabled={!isLoaded}
          sx={!approval ? { opacity: 0.5 } : { opacity: 1 }}
        >
          Download Form
        </Button>
      </Box>
    </Box>
  );
};

export default PrintAll;
