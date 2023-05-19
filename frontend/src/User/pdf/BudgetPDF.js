import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@mui/material";
import moment from "moment";
import logo from "./image.png";

const doc = new jsPDF({
  orientation: "landscape",
});

const exportPDF = (tableData) => {
    doc.addImage(logo, 'PNG', 0, 0, 300, 70);
    doc.setFontSize(13);
    doc.text("Budget Report", 15, 70);
    doc.text(`Report Generated ${moment().format("MMMM Do YYYY, h:mm:ss a")}`, 14, 75);
  
    if(!tableData) {
      console.log("No data");
      return;
    }

    const headData = tableData.map((budget) => [
        budget.organizationName,
        budget.eventName
    ]);
  
    const incomeData = tableData.map((budget) => [
      budget.income.map((item) => item.description).join('\n'),
      budget.income.map((item) => item.amount).join('\n'),
    ]);
  
    const expenseData = tableData.map((budget) => [
      budget.expenses.map((item) => item.description).join('\n'),
      budget.expenses.map((item) => item.amount).join('\n'),
    ]);
  
    const tableHeaders = ["Description", "Amount"];

    doc.text(`Organization: ${headData[0][0]}`, 14, 80);
    doc.text(`Event: ${headData[0][1]}`, 14, 85);
    
    
    // Generate the income table
    doc.text("Income", doc.internal.pageSize.width / 2, 100, { align: "center" });
    autoTable(doc, {
      head: [tableHeaders],
      body: incomeData,
      styles: {
        cellWidth: "auto",
        fontSize:14
      },
      startY: 90,
    });
  
    // Add some space between the tables
    doc.addPage();
  
    // Generate the expense table
    doc.text("Expenses", doc.internal.pageSize.width / 2, 30, { align: "center" });
    autoTable(doc, {
      head: [tableHeaders],
      body: expenseData,
      styles: {
        cellWidth: "auto",
        fontSize:14
      },
      startY: 40,
    });
  
    doc.save("Budget.pdf");
  };

const BudgetPDF = ({ tableData }) => {
  return (
      <Button
        color="primary"
        onClick={() => {
          exportPDF(tableData);
        }}
        variant="contained"
      >
        Export as PDF
      </Button>
  );
};

export default BudgetPDF;