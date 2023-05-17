import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@mui/material';
import logo from './image.png';
const doc = new jsPDF();

const exportPDF = (tableData) => {
  doc.addImage(logo, 'PNG', 0, 0, 210, 60);
  doc.setFontSize(12);
  doc.text('Sponsor Report', 15, 60);
  doc.text('Date: ' + new Date().toLocaleString(), 15, 70);

  // It can parse html:
  // <table id="my-table"><!-- ... --></table>
  autoTable(doc, { html: '#my-table' });
  const data = tableData.map((sponsor) => [
    sponsor.fullName,

    sponsor.packageType,
    sponsor.email,
  ]);
  // Or use javascript directly:
  autoTable(doc, {
    head: [['Full Name', 'Package Type', 'Email']],
    body: data,
    styles: {
      cellWidth: 'wrap',
    },
    startY: 80,
  });

  doc.save('Sponsors.pdf');
};

const SponsorPDF = ({ tableData }) => {
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

export default SponsorPDF;
