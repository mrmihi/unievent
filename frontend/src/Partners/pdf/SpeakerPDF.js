import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@mui/material';
import logo from './image.png';
const doc = new jsPDF();

const exportPDF = (tableData) => {
  doc.addImage(logo, 'PNG', 0, 0, 210, 60);
  doc.setFontSize(12);
  doc.text('Speaker Report', 15, 60);
  doc.text('Date: ' + new Date().toLocaleString(), 15, 70);

  // It can parse html:
  // <table id="my-table"><!-- ... --></table>
  autoTable(doc, { html: '#my-table' });
  console.log(tableData);
  const data = tableData.map((speaker) => [
    speaker.fullName,
    speaker.sessionTime,
    speaker.email,
    speaker.contactNo,
  ]);
  // Or use javascript directly:
  autoTable(doc, {
    head: [['Full Name', 'Session Time', 'Email', 'Contact Number']],
    body: data,
    styles: {
      cellWidth: 'wrap',
    },
    startY: 80,
  });

  doc.save('Speakers.pdf');
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
