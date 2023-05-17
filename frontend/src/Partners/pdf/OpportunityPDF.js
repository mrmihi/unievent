import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@mui/material';
import logo from './image.png';
import moment from 'moment';
const doc = new jsPDF();

const exportPDF = (tableData) => {
  doc.addImage(logo, 'PNG', 0, 0, 210, 60);
  doc.setFontSize(12);
  doc.text('Opportunity Report', 15, 60);
  doc.text('Date: ' + new Date().toLocaleString(), 15, 70);

  // It can parse html:
  // <table id="my-table"><!-- ... --></table>
  autoTable(doc, { html: '#my-table' });
  const data = tableData.map((opportunity) => [
    opportunity.name,
    moment(`${opportunity.date}`).format('DD-MM-YYYY'),
    opportunity.time,
    opportunity.description,
  ]);
  // Or use javascript directly:
  autoTable(doc, {
    head: [['Opportunity', 'Date', 'Time', 'Description']],
    body: data,
    styles: {
      cellWidth: 'wrap',
    },
    startY: 80,
  });

  doc.save('Opportunities.pdf');
};

const OpportunityPDF = ({ tableData }) => {
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

export default OpportunityPDF;
