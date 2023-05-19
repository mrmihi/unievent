import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import Header from "Venue/src/components/Header";
import FlexBetween from "Venue/src/components/FlexBetween";
import { useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const VVenueQuotation = () => {
  const [venues, setVenues] = useState([]);

  const [venue, setVenue] = useState("");
  const [days, setDays] = useState(1);
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/venues/manager/" + Cookie.get("id"))
      .then((res) => {
        setVenues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleVenueChange = (event) => {
    event.preventDefault();
    const selectedVenue = venues.find((v) => v.name === event.target.value);
    setVenue(event.target.value);
    setPrice(selectedVenue.price);
    setDays(1);
  };

  const handleDaysChange = (event) => {
    event.preventDefault();
    const selectedVenue = venues.find((v) => v.name === venue);
    const numberOfDays = event.target.value;
    setDays(numberOfDays);
    setPrice(selectedVenue.price * numberOfDays);
  };

  const downloadQuotation = () => {
    const doc = new jsPDF();

    // add header
    doc.setFontSize(26);
    doc.setFont("bold");
    doc.text("UniEventPro PVT LTD", doc.internal.pageSize.getWidth() / 2, 30, { align: "center" });

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
    doc.text("Quotation", doc.internal.pageSize.width / 2, 110, { align: "center" });

    // draw underline
    const underlineWidth = doc.getStringUnitWidth("Quotation") * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const underlineStart = (doc.internal.pageSize.width - underlineWidth) / 2;
    const underlineEnd = underlineStart + underlineWidth;
    doc.line(underlineStart, 112, underlineEnd, 112);


    // add venue information
    doc.setFontSize(12);
    doc.setFont("bold");
    doc.text(`Venue Name: ${venue}`, 20, 130);
    doc.text(`Duration: ${days} days`, 20, 140);

    // add quotation details table
    const detailsData = [
      ["Venue", "Price per Day", "Days", "Amount"],
      [`${venue}`, `${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}`, `${days}`, `${(price * days).toLocaleString("en-US", { style: "currency", currency: "USD" })}`],
    ];

    doc.autoTable({
      startY: 150,
      head: [detailsData[0]],
      body: detailsData.slice(1),
      tableWidth: "60%",
      theme: "striped",
      headStyles: { fillColor: "#ADD8E6" },
    });

    // add quotation total
    doc.text(`Total : ${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}`, 140, 175, { align: "left" });

    // add terms and conditions
    doc.text("Terms and Conditions:", 20, 200);
    const terms = [
      "The client agrees to pay the venue rental fee in full prior to the event date.",
      "The client is responsible for any damages or losses incurred during the event and will be\n charged accordingly.",
      "The venue reserves the right to cancel the event if the client fails to adhere to the terms and\n conditions set out in the agreement."
    ];
    doc.setFontSize(12);
    terms.forEach((term, index) => {
      const bullet = '\u2022'; // use bullet point symbol
      const indent = '\xa0\xa0\xa0\xa0'; // use non-breaking spaces for indentation
      doc.text(`${bullet}${indent}${term}`, 22, 210 + (index * 10));
    });



    // add thank you message and contact information
    doc.getFontSize(12)
    doc.text("Thank you for your inquiry! We hope this quotation meets satisfaction with your requirement. \n\nShould you require any clarifications or assistance on this produced document, please do not hesitate to reach us.", doc.internal.pageSize.getWidth() / 20, 260, { align: "left" });

    // save the PDF
    doc.save("venue-quotation.pdf");
  };




  return (
    <Box m="1.5rem 2.5rem">
      <div>
        <FlexBetween>
          <Header
            title="Venue Quotation"
            subtitle="Welcome to the Venue Quotation Page."
          />
        </FlexBetween>
      </div>

      <Stack
        sx={{
          width: '75%',
          minWidth: { xs: '300px', sm: '360px', md: '400px' },
          gap: '1.5rem',
          margin: 'auto',
        }}
      >
        <Typography variant="h3" sx={{ mt: 10 }}>Please select a venue and number of days to receive a quotation.</Typography>
        <FormControl fullWidth sx={{ mt: 4 }}>
          <InputLabel id="venue-select-label">Venue</InputLabel>
          <Select
            labelId="venue-select-label"
            id="venue-select"
            value={venue}
            label="Venue"
            onChange={handleVenueChange}
          >
            {venues &&
              venues.map((venue) => (
                <MenuItem key={venue._id} value={venue.name}>
                  {venue.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {venue && (
          <>
            <TextField
              fullWidth
              sx={{ mt: 4 }}
              label="Number of days"
              type="number"
              value={days}
              onChange={handleDaysChange}
              inputProps={{ min: 1 }}
            />

            <TextField
              fullWidth
              sx={{ mt: 4 }}
              label="Price per day"
              type="number"
              value={price}
              disabled
              InputProps={{ readOnly: true }}
            />
          </>
        )}

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#1769aa", color: "#fff", marginTop: "1rem", fontWeight: 600 }}
            onClick={downloadQuotation}
            disabled={!venue}
            sx={!venue ? { opacity: 0.5 } : { opacity: 1 }}
          >
            Download Quotation
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default VVenueQuotation;
