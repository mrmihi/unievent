import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import FLayout from "./Finance/scenes/layout";
import FDashboard from "Finance/scenes/dashboard";
import FOverview from "Finance/scenes/finance/overview";
import FLoginPage from "Finance/scenes/login";
import FRefunds from "Finance/scenes/finance/refunds";
import FTable from "./Finance/scenes/finance/table";
import FBills from "./Finance/scenes/finance/bills";
import FPayments from "./Finance/scenes/finance/payments";
import FReport from "./Finance/scenes/finance/report";
import FPayPal from "Finance/scenes/finance/paymentform";

function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                    {/* Finance Routes */}
                    <Routes>
                        <Route path="/finance/paypal" element={<FPayPal />} />
                        <Route path="*" element={<h1>Page not found!</h1>} />
                        <Route path="/admin/finance" element={<FLoginPage />} />
                        <Route element={<FLayout />}>
                            <Route path="/admin/finance/dashboard/*" element={<Navigate to="/admin/finance/dashboard" replace />} />
                            <Route path="/admin/finance/dashboard" element={<FDashboard />} />
                            <Route path="/admin/finance/overview" element={<FOverview />} />
                            <Route path="/admin/finance/refunds" element={<FRefunds />} />
                            <Route path="/admin/finance/table" element={<FTable />} />
                            <Route path="/admin/finance/bills" element={<FBills />} />
                            <Route path="/admin/finance/payments" element={<FPayments />} />
                            <Route path="/admin/finance/report" element={<FReport />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
