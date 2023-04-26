import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@mui/material";
import Unilogo from "./University of babylon.png";
const doc = new jsPDF();

const exportPDF = (tableData) => {
  // Add logo
  doc.addImage(Unilogo, "PNG", 15, 10, 30, 30); // Changed the image size from 14x14 to 30x30

  // Set font size
  doc.setFontSize(20); // Changed the font size from 18 to 14
  doc.setTextColor("#2980BA");

  // Add header
  doc.text("Full Transaction Report", 50, 20); // Changed the font size from 14 to 12

  // Add margin for header
  //doc.setParagraphSpace(10);

  
  // It can parse html:
  // <table id="my-table"><!-- ... --></table>
  autoTable(doc, { html: "#my-table" });
  const data = tableData.map((payment) => [
    payment._id,
    payment.start_time,
    payment.start_time,
    payment.status,
    payment.price,
  ]);
  // Or use javascript directly:
  autoTable(doc, {
    head: [["ID", "start_date", "end_date", "status", "price"]],
    body: data,
    styles: {
      cellWidth: "wrap",
      head: {cellfillColor: "black", textColor: "white"},
    },
    startY: 60,
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
  });

  doc.setFontSize(10); // Changed the font size from 18 to 14
  doc.setTextColor("black");
  // Add date
  doc.text("Date: " + new Date().toLocaleString(), 50, 30, {
    fontSize: 12
  }); // Changed the font size from 14 to 12

  // Add margin for date
  //doc.setParagraphSpace(10);

  // Add department
  doc.text("Finance Division, University of Babylon", 50, 40, {
    fontSize: 12
  }); // Changed the font size from 14 to 12

  doc.save("full_transaction_report.pdf");
};

const PaymentPDF = ({ tableData }) => {
  return (
    <div>
      <Button
        color="primary"
        onClick={() => {
          exportPDF(tableData);
        }}
        variant="contained"
      >
        Export as PDF
      </Button>
    </div>
  );
};

export default PaymentPDF;
