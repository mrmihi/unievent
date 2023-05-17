import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@mui/material';
import logo from './image.png';
import moment from 'moment';
//const doc = new jsPDF();
const doc = new jsPDF({
  orientation: "landscape",
});
const exportPDF = (tableData) => {
  doc.addImage(logo, 'PNG', 0, 0, 200, 50);
  doc.setFontSize(12);
  doc.text('Atendee Report', 15, 50);
  doc.text('Date: ' + new Date().toLocaleString(), 15, 60);

  // It can parse html:
  // <table id="my-table"><!-- ... --></table>
  autoTable(doc, { html: '#my-table' });
  const data = tableData.map((attendee) => [
    attendee.name,
    attendee.email,
    attendee.event,
    attendee.student_year,
    attendee.phoneNumber,
    attendee.status,
    moment(`${attendee.date}`).format('DD-MM-YYYY'),
  ]);
  // Or use javascript directly:
  autoTable(doc, {
    head: [
      [
        'Name',
        'Email',
        'Event',
        'Student Year',
        'Phone Number',
        'Status',
        'Date',
      ],
    ],
    body: data,
    styles: {
      cellWidth: 'wrap',
    },
    startY: 65,
  });

  doc.save('AttendeeSatus.pdf');
};

const AttendeeStatusPDF = ({ tableData }) => {
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

export default AttendeeStatusPDF;
