import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@mui/material';
import logo from './image.png';
const doc = new jsPDF();

const exportPDF = (tableData) => {
  doc.addImage(logo, 'PNG', 15, 10, 14, 14);
  doc.setFontSize(18);
  doc.text('Volunteer Report', 30, 20);

  // It can parse html:
  // <table id="my-table"><!-- ... --></table>
  autoTable(doc, { html: '#my-table' });
  const data = tableData.map((volunteer) => [
    volunteer.fullName,
    volunteer.availableTime.map((time) => time),
    volunteer.email,
    volunteer.contactNo,
    volunteer.status,
  ]);
  // Or use javascript directly:
  autoTable(doc, {
    head: [
      ['Full Name', 'Available Time', 'Email', 'Contact Number', 'Status'],
    ],
    body: data,
    startY: 30,
  });

  doc.save('Volunteers.pdf');
};

const VolunteerPDF = ({ tableData }) => {
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

export default VolunteerPDF;
