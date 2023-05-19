import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@mui/material';
import logo from './image.png';
import moment from 'moment';
const doc = new jsPDF();

const exportPDF = (tableData) => {
  doc.addImage(logo, 'PNG', 0, 0, 210, 60);
  doc.setFontSize(12);
  doc.text('Event Report', 15, 60);
  doc.text('Date: ' + new Date().toLocaleString(), 15, 70);

  // It can parse html:
  // <table id="my-table"><!-- ... --></table>
  autoTable(doc, { html: '#my-table' });
  const data = tableData.map((event) => [
    event.name,
    moment(`${event.startTime}`).format('DD-MM-YYYY'),
    event.status,
  ]);
  // Or use javascript directly:
  autoTable(doc, {
    head: [['Event', 'Date', 'Status']],
    body: data,
    styles: {
      cellWidth: 'wrap',
    },
    startY: 80,
  });

  doc.save('Events.pdf');
};

const EventPDF = ({ tableData }) => {
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

export default EventPDF;
