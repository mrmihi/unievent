import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "./Finance/scenes/layout";
import Dashboard from "Finance/scenes/dashboard";
import Overview from "Finance/scenes/finance/overview";
import LoginPage from "Finance/scenes/login";
import Refunds from "Finance/scenes/finance/refunds";
import Table from "./Finance/scenes/finance/table";
import Bills from "./Finance/scenes/finance/bills";
import Payments from "./Finance/scenes/finance/payments";
import Report from "./Finance/scenes/finance/report";
import PayPal from "Finance/scenes/finance/paymentform";

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
                        <Route path="/finance/paypal" element={<PayPal />} />
                        <Route path="*" element={<h1>Page not found!</h1>} />
                        <Route path="/admin/finance" element={<LoginPage />} />
                        <Route element={<Layout />}>
                            <Route path="/admin/finance/dashboard/*" element={<Navigate to="/admin/finance/dashboard" replace />} />
                            <Route path="/admin/finance/dashboard" element={<Dashboard />} />
                            <Route path="/admin/finance/overview" element={<Overview />} />
                            <Route path="/admin/finance/refunds" element={<Refunds />} />
                            <Route path="/admin/finance/table" element={<Table />} />
                            <Route path="/admin/finance/bills" element={<Bills />} />
                            <Route path="/admin/finance/payments" element={<Payments />} />
                            <Route path="/admin/finance/report" element={<Report />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
