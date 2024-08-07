import { Box, Button, ButtonGroup, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, Stack, Table, TableBody, TableContainer, TableHead, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { PieChart } from '@mui/x-charts/PieChart';
import { styled } from '@mui/material/styles';
import { StyledTableCell, StyledTableRow } from "../reuse/StyledTable";
import { useDrawingArea } from '@mui/x-charts/hooks';
import { getInvitationOrVisitorList, getallCheckOutList, getallCountList, getallEmployeeList, getnextdateCountList, gettodaydateCountList, gettodaysCountList, gettommorowdateCountList, getallAverageList, getallweeklyCountList, getallAverageday } from "../../actions/actions";

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const DashboardAdmin = (props) => {
    const loginData = localStorage.getItem('loginUser');
    const loginInfor = JSON.parse(loginData);
    const loginUser = loginInfor.userInfo;
    const dispatch = useDispatch()
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    // const rows = useSelector(state => state.invitationOrVisitor.invitationOrVisitor)
    const totalCount = useSelector(state => state.invitationOrVisitor.allVisitors)
    const weeklyCount = useSelector(state => state.invitationOrVisitor.weeklyVisitors)
    const todaysCount = useSelector(state => state.invitationOrVisitor.intodayvisitors)
    const employeeCount = useSelector(state => state.employee.allEmployees)
    const checkoutCount = useSelector(state => state.invitationOrVisitor.employeeCheckout)
    const averagehrsvisitors = useSelector(state => state.invitationOrVisitor.averagehrsvisitors)
    const averagedayCount = useSelector(state => state.invitationOrVisitor.averagedayvisitors)

    const count = Object.keys(totalCount === null ? '' : totalCount).length
    const count1 = Object.keys(weeklyCount === null ? '' : weeklyCount).length
    const count2 = Object.keys(todaysCount === null ? '' : todaysCount).length
    const count3 = Object.keys(employeeCount === null ? '' : employeeCount).length
    const count5 = Object.keys(checkoutCount === null ? '' : checkoutCount).length
   


    const fetchData = () => {
        dispatch(getInvitationOrVisitorList())
        dispatch(getallweeklyCountList())
        dispatch(gettodaysCountList())
        dispatch(getallCountList())
        dispatch(getallEmployeeList())
        dispatch(getallCheckOutList())
        dispatch(getallAverageList())
        dispatch(getallAverageday())

    }
    useEffect(() => {
        fetchData()
    }, [])

    //DASHBOARD LOGIC
    const result = averagehrsvisitors && averagehrsvisitors.reduce((total, currentValue) => total = total + currentValue.totalMinutes, 0);
    
    const maxcount = averagedayCount && averagedayCount.reduce((prev, current) => ((prev.total > current.total) ? prev : current), 0)
   
    
    let monday = 0;
    let tuesday = 0;
    let wednesday = 0;
    let thursday = 0;
    let friday = 0;
    let saturday = 0;
    let sunday = 0;

    for (let i = 0; i < averagedayCount.length; i++) {
        if (averagedayCount[i].DAY === "Monday") {
            monday = averagedayCount[i].total 
        }
        if (averagedayCount[i].DAY === "Tuesday") {
            tuesday = averagedayCount[i].total 
        }
        if (averagedayCount[i].DAY === "Wednesday") {
            wednesday = averagedayCount[i].total 
        }
        if (averagedayCount[i].DAY === "Thursday") {
            thursday = averagedayCount[i].total 
        }
        if (averagedayCount[i].DAY === "Friday") {
            friday = averagedayCount[i].total 
        }
        if (averagedayCount[i].DAY === "Saturday") {
            saturday = averagedayCount[i].total 
        }
        if (averagedayCount[i].DAY === "Sunday") {
            sunday = averagedayCount[i].total 
        }
    }
   
    //PIECHARTS 1
    const data = [
        { value: monday, label: 'Monday' },
        { value: tuesday, label: 'Tuesday' },
        { value: wednesday, label: 'Wednesday' },
        { value: thursday, label: 'Thursday' },
        { value: friday, label: 'Friday' },
        { value: saturday, label: 'Saturday' },
        { value: sunday, label: 'Sunday'} 
    ];

    const size = {
        width: 460,
        height: 220,
    };

    const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 23,
    }));

    const StyledText1 = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
    }));

    function PieCenterLabel({ children }) {
        const {height , top, width , left} = useDrawingArea()
        return (
            <StyledText x={left + width/ 2} y = {top + height / 2.5} fontWeight="bolder" fontFamily="Tahoma, Verdana, sans-serif">
              {children}
            </StyledText>
        );
    }

    function PieCenterLabel1({ children }) {
        const { height , top , width , left} = useDrawingArea()
        return (
          <StyledText1 x={left + width / 2} y = {top + height / 1.8} fontWeight="bold">
           {children}
          </StyledText1>
        )
    }

    //PIECHART 2

    const datatime = [
        { label: '09:00 to 11:00', value: 25 },
        { label: '11:00 to 01:00', value: 15 },
        { label: '01:00 to 03:00', value: 17 },
        { label: '03:00 to 05:00', value: 30 },
        { label: '05:00 to 07:00', value: 30 }
       
    ];

    const sizes = {
        width: 460,
        height: 220,
    };
    
    const StyledTextPiechart2 = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
    }));

    function PieCenterLabelPiechart2({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
            <StyledTextPiechart2 x = {left + width / 2} y = {top + height / 2} fontWeight="bolder">
                {children}
            </StyledTextPiechart2>
        );
    }

    // const sumofMinutes = () => {
    // let totalsum = averagehrsvisitors && averagehrsvisitors.map(value => value.totalMinutes)
    // return totalsum
    // }
    // console.log("sum", sumofMinutes)





    // const totalMinutes = () => {
    //     let result = averagehrsvisitors.reduce((total, currentValue) => total = total + currentValue.totalMinutes, 0);
    //     return result
    // }
    // console.log("minutes", totalMinutes)


    return (
        <>

            <Paper sx={{ boxShadow: 'none', backgroundColor: '#edf3f5', paddingLeft: '14px' }}>
                <Grid container spacing={0} sx={{ pt: 1, }}>
                    <Grid item xs={4} md={4} >
                        <Box className="admindashboardTopcard" sx={{ height: '80px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography className="admindashboardcardTitle">TOTAL VISITORS
                                        RECORD</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className="admindashboardcardCount">{count}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4} >
                        <Box className="admindashboardTopcard1" sx={{ height: '80px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography className="admindashboardcardTitle">VISIT THIS
                                        WEEK</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className="admindashboardcardCount">{count1}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4} >
                        <Box className="admindashboardTopcard2" sx={{ height: '80px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography className="admindashboardcardTitle">VISIT RECORD TODAY</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className="admindashboardcardCount">{count2}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4} >
                        <Box className="admindashboardTopcard3" sx={{ height: '80px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography className="admindashboardcardTitle">CHECKOUT NOT RECORDED</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className="admindashboardcardCount">{count5}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4} >
                        <Box className="admindashboardTopcard4" sx={{ height: '80px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography className="admindashboardcardTitle">AVERAGE MINUTES EXPRESS VISITORS</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className="admindashboardcardCount">{result}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4} >
                        <Box className="admindashboardTopcard5" sx={{ height: '80px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography className="admindashboardcardTitle">TOTAL EMPLOYEES REGISTERED</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className="admindashboardcardCount">{count3}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/*                     
                    <Grid item md={4} xs={4} >
                        <Box className="dashboardTopcard">
                            <Typography className="dashboardcardTitle">Visit This Week</Typography>
                            <Typography className="dashboardcardCount">2</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={4} >
                        <Box className="dashboardTopcard">
                            <Typography className="dashboardcardTitle">Visit Record Today</Typography>
                            <Typography className="dashboardcardCount">2</Typography>
                        </Box>
                    </Grid>

                    <Grid item md={4} xs={4} >
                        <Box className="dashboardTopcard">
                            <Typography className="dashboardcardTitle">CheckOut Not Recorded</Typography>
                            <Typography className="dashboardcardCount">22K</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={4} >
                        <Box className="dashboardTopcard">
                            <Typography className="dashboardcardTitle">Average Hrs Express Visitor</Typography>
                            <Typography className="dashboardcardCount">2</Typography>

                        </Box>
                    </Grid>
                    <Grid item md={4} xs={4} >
                        <Box className="dashboardTopcard">
                            <Typography className="dashboardcardTitle">Total Employee Registered</Typography>
                            <Typography className="dashboardcardCount">2</Typography>

                        </Box>
                    </Grid> */}

                </Grid>
                <Box>
                </Box>
            </Paper>
            <Paper sx={{ boxShadow: 'none', paddingLeft: '14px' }}>

                <Grid container spacing={0} sx={{ pt: 1, }}>
                    <Grid item xs={6}>
                        <Typography className="admindashboardcardTitle1">AVERAGE VISITORS EVERY MONTH</Typography>
                        <PieChart series={[{ data, innerRadius: 80 }]} {...size}  slotProps={{
                            // legend: { hidden: true },
                        }}>
                            <PieCenterLabel>{maxcount.DAY} </PieCenterLabel>
                            <PieCenterLabel1>{maxcount.total}</PieCenterLabel1>
                        </PieChart>
                    </Grid>


                    <Grid item xs={6}>
                        <Typography className="admindashboardcardTitle1">WHEN DO MY VISITOR COME AVERAGE TIME</Typography> 
                        <PieChart series={[{data:datatime, innerRadius: 80 }]} {...sizes} slotProps={{
                            // legend: { hidden: true },
                        }}>
                            <PieCenterLabelPiechart2>12:00 TO 02:00</PieCenterLabelPiechart2>
                        </PieChart>
                    </Grid>
                </Grid>


            </Paper>
        </>
    )
}
export default DashboardAdmin;
