import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@mui/material";
import logo from "./image.png";
const doc = new jsPDF();

const exportPDF = (tableData) => {
  doc.addImage(logo, "PNG", 15, 10, 14, 14);
  doc.setFontSize(18);
  doc.text("Speaker Report", 30, 20);

  // It can parse html:
  // <table id="my-table"><!-- ... --></table>
  autoTable(doc, { html: "#my-table" });
  console.log(tableData);
  const data = tableData.map((speaker) => [
    speaker.fullName,
    speaker.sessionTime,
    speaker.email,
    speaker.contactNo,
  ]);
  // Or use javascript directly:
  autoTable(doc, {
    head: [["Full Name", "Session Time", "Email", "Contact Number"]],
    body: data,
    styles: {
      cellWidth: "wrap",
    },
    startY: 30,
  });

  doc.save("Speakers.pdf");
};

const SpeakerPDF = ({ tableData }) => {
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

export default SpeakerPDF;
