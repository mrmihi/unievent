import React from "react";
import { Box } from "@mui/material";
import Header from "User/components/Header"
import FlexBetween from "User/components/FlexBetween";
import FourAnalytics from "User/pages/FourAnalytics";

const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        return "Good morning Administrator !";
    } else if (hour >= 12 && hour < 18) {
        return "Good afternoon Administrator ! ";
    } else {
        return "Good evening Administrator ! ";
    }
}


const Dashboard = () => {
    return (
        <Box m="1.5rem 2.5rem">
            <div>
                <FlexBetween>
				<Header
					title={getGreeting()}
					subtitle="Welcome to your dashboard"
				/>	
				</FlexBetween>
                <FourAnalytics />
                

            </div>
        </Box>
    );
};

export default Dashboard;

// import React from "react";
// import FlexBetween from "components/FlexBetween";
// import Header from "components/Header";
// import {
// 	UploadOutlined,
// 	Email,
// 	PointOfSale,
// 	PersonAdd,
// 	Traffic,
// } from "@mui/icons-material";
// import {
// 	Box,
// 	Button,
// 	Typography,
// 	useTheme,
// 	useMediaQuery,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import BreakdownChart from "components/BreakdownChart";
// import OverviewChart from "components/OverviewChart";
// import { useGetDashboardQuery } from "state/api";
// import StatBox from "components/StatBox";

// const Dashboard = () => {
// 	const theme = useTheme();
// 	const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
// 	const { data, isLoading } = useGetDashboardQuery();

// 	const columns = [
// 		{
// 			field: "_id",
// 			headerName: "ID",
// 			flex: 1,
// 		},
// 		{
// 			field: "attendeeId",
// 			headerName: "User ID",
// 			flex: 1,
// 		},
// 		{
// 			field: "createdAt",
// 			headerName: "CreatedAt",
// 			flex: 1,
// 		},
// 		{
// 			field: "feedbacks",
// 			headerName: "# of FeedBacks",
// 			flex: 0.5,
// 			sortable: false,
// 			renderCell: (params) => (params.value ?? "").length,
// 		},
// 		{
// 			field: "cost",
// 			headerName: "Ticket Price",
// 			flex: 1,
// 			renderCell: (params) => `Rs.${Number(params.value).toFixed(2)}`,
// 		},
// 	];

// 	return (
// 		<Box m="1.5rem 2.5rem">
// 			<FlexBetween>
// 				<Header
// 					title="ATTENDEES MANAGE"
// 					subtitle="Welcome to your dashboard"
// 				/>

// 				<Box>
// 					<Button
// 						sx={{
// 							backgroundColor: theme.palette.secondary.light,
// 							color: theme.palette.background.alt,
// 							fontSize: "14px",
// 							fontWeight: "bold",
// 							padding: "10px 20px",
// 						}}
// 					>
// 						<UploadOutlined sx={{ mr: "10px" }} />
// 						Upload CSV Reports
// 					</Button>
// 				</Box>
// 			</FlexBetween>

// 			<Box
// 				mt="20px"
// 				display="grid"
// 				gridTemplateColumns="repeat(12, 1fr)"
// 				gridAutoRows="160px"
// 				gap="20px"
// 				sx={{
// 					"& > div": {
// 						gridColumn: isNonMediumScreens ? undefined : "span 12",
// 					},
// 				}}
// 			>
// 				{/* ROW 1 */}
// 				<StatBox
// 					title="Total Attendees"
// 					value={data && data.yearlyAttendeesTotal}
// 					increase="+14%"
// 					description="Since last years"
// 					icon={
// 						<Email
// 							sx={{
// 								color: theme.palette.secondary[300],
// 								fontSize: "26px",
// 							}}
// 						/>
// 					}
// 				/>
// 				<StatBox
// 					title="Yearly Events"
// 					value={data && data.todayStats.totalEvents}
// 					increase="+21%"
// 					description="Since past yaers"
// 					icon={
// 						<PointOfSale
// 							sx={{
// 								color: theme.palette.secondary[300],
// 								fontSize: "26px",
// 							}}
// 						/>
// 					}
// 				/>
// 				<Box
// 					gridColumn="span 8"
// 					gridRow="span 2"
// 					backgroundColor={theme.palette.background.alt}
// 					p="1rem"
// 					borderRadius="0.55rem"
// 				>
// 					<OverviewChart view="events" isDashboard={true} />
// 				</Box>
// 				<StatBox
// 					title="Monthly Attendees"
// 					value={data && data.thisMonthStats.totalEvents - 54000}
// 					increase="+5%"
// 					description="Since last month"
// 					icon={
// 						<PersonAdd
// 							sx={{
// 								color: theme.palette.secondary[300],
// 								fontSize: "26px",
// 							}}
// 						/>
// 					}
// 				/>
// 				<StatBox
// 					title="Yearly Events"
// 					value={data && data.yearlyAttendeesTotal + 120000}
// 					increase="+43%"
// 					description="Since last month"
// 					icon={
// 						<Traffic
// 							sx={{
// 								color: theme.palette.secondary[300],
// 								fontSize: "26px",
// 							}}
// 						/>
// 					}
// 				/>

// 				{/* ROW 2 */}
// 				<Box
// 					gridColumn="span 8"
// 					gridRow="span 3"
// 					sx={{
// 						"& .MuiDataGrid-root": {
// 							border: "none",
// 							borderRadius: "5rem",
// 						},
// 						"& .MuiDataGrid-cell": {
// 							borderBottom: "none",
// 						},
// 						"& .MuiDataGrid-columnHeaders": {
// 							backgroundColor: theme.palette.background.alt,
// 							color: theme.palette.secondary[100],
// 							borderBottom: "none",
// 						},
// 						"& .MuiDataGrid-virtualScroller": {
// 							backgroundColor: theme.palette.background.alt,
// 						},
// 						"& .MuiDataGrid-footerContainer": {
// 							backgroundColor: theme.palette.background.alt,
// 							color: theme.palette.secondary[100],
// 							borderTop: "none",
// 						},
// 						"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
// 							color: `${theme.palette.secondary[200]} !important`,
// 						},
// 					}}
// 				>
// 					<DataGrid
// 						loading={isLoading || !data}
// 						getRowId={(row) => row._id}
// 						rows={(data && data.dataFinalists) || []}
// 						columns={columns}
// 					/>
// 				</Box>
// 				<Box
// 					gridColumn="span 4"
// 					gridRow="span 3"
// 					backgroundColor={theme.palette.background.alt}
// 					p="1.5rem"
// 					borderRadius="0.55rem"
// 				>
// 					<Typography
// 						variant="h6"
// 						sx={{ color: theme.palette.secondary[100] }}
// 					>
// 						Event By Category
// 					</Typography>
// 					<BreakdownChart isDashboard={true} />
// 					<Typography
// 						p="0 0.6rem"
// 						fontSize="0.8rem"
// 						sx={{ color: theme.palette.secondary[200] }}
// 					>
// 						Breakdown of real states and information via category
// 						for Events made for past year and total Attendees.
// 					</Typography>
// 				</Box>
// 			</Box>
// 		</Box>
// 	);
// };

// export default Dashboard;
