import { Box, Button, ButtonGroup, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, Stack, Table, TableBody, TableContainer, TableHead, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import visitor from "../images/guest_pass.jpeg"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { StyledTableCell, StyledTableRow } from "../reuse/StyledTable";
import { getInvitationOrVisitorList, getallinvitedCountList, getexpireddateCountList, getnextdateCountList, gettodaydateCountList, gettommorowdateCountList } from "../../actions/actions";
import { all } from "redux-saga/effects";


const data01 = [
    // { name: 'Group A', value: 400 },
    // { name: 'Group B', value: 300 },
    // { name: 'Group C', value: 300 },
    // { name: 'Group D', value: 200 },
    // { name: 'Group E', value: 278 },
    // { name: 'Group F', value: 189 },

    { name: 'Jan.', value: 900 },
    { name: 'Feb.', value: 300 },
    { name: 'Mar.', value: 100 },
    { name: 'Apr.', value: 200 },
    { name: 'May.', value: 800 },
    { name: 'Jun.', value: 189 },

];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ad2497', '#2aed24'];

const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },

];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const Dashboard = (props) => {
    // const { handleSubmit } = useForm();
    // const dispatch = useDispatch()
    // const editData = props.editInfo;
    // const editid = editData && editData._id;
    // const [successMessage, setSuccessMessage] = useState(null)

    // const [data, setData] = useState({
    //     _id: editid,
    //     account_name: editData ? editData.account_name : '',
    //     bank_name: editData ? editData.bank_name : '',
    //     account_no: editData ? editData.account_no : '',
    //     account_type: editData ? editData.account_type : '',
    //     branch_name: editData ? editData.branch_name : '',
    //     ifsc_code: editData ? editData.ifsc_code : '',
    // })

    // const handleChange = ({ target }) => {
    //     const value = target.value;
    //     setData({
    //         ...data,
    //         [target.name]: value,
    //     });
    //     data[target.name] = target.value;

    // }

    // const onSubmit = async (event) => {
    //     let sendingData = {
    //         ...data,
    //         changedUpdatedValue: 'edit'
    //     }
    //     if (editData) {
    //         dispatch(editDeleteBank(sendingData));
    //         setSuccessMessage("Record Updated Successfully!")
    //         props.onEdit();
    //         props.handleCloseDialog();
    //     } else {
    //         dispatch(addBank(sendingData));
    //         setSuccessMessage("Record Added Successfully!")
    //         props.onEdit();
    //         props.handleCloseDialog();
    //     }
    // }

    // const handleCloseSuccessMsg = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setSuccessMessage(false)
    // };

    // const actionMsg = (
    //     <React.Fragment>
    //         <IconButton
    //             size="small"
    //             aria-label="close"
    //             color="inherit"
    //             onClick={handleCloseSuccessMsg}
    //         >
    //             <CloseIcon fontSize="small" />
    //         </IconButton>
    //     </React.Fragment>
    // );
    const rows = useSelector(state => state.invitationOrVisitor.invitationOrVisitor)
    const todaysvisitors = useSelector(state => state.invitationOrVisitor.todayvisitors)
    const tommorowVisitors = useSelector(state => state.invitationOrVisitor.tommorowVisitors)
    const nextVisitors = useSelector(state => state.invitationOrVisitor.nextVisitors)
    const expiredVisitors = useSelector(state => state.invitationOrVisitor.expiredVisitors)
    const allInvitedVisitors = useSelector(state => state.invitationOrVisitor.allInvitedVisitors)

    console.log("todaysvisitor", todaysvisitors)


    const countall = Object.keys(rows === null ? '' : rows).length
    const count = Object.keys(allInvitedVisitors === null ? '' : allInvitedVisitors).length
    const count1 = Object.keys(todaysvisitors === null ? '' : todaysvisitors).length
    const count2 = Object.keys(tommorowVisitors === null ? '' : tommorowVisitors).length
    const count3 = Object.keys(nextVisitors === null ? '' : nextVisitors).length
    const count4 = Object.keys(expiredVisitors === null ? '' : expiredVisitors).length

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


    // const todaysvisitorcount = Object.keys(todaysvisitors).length;


    const fetchData = () => {
        dispatch(getInvitationOrVisitorList({ host_name: loginUser.visitorId, userRole: loginUser.userRole }))
        dispatch(gettodaydateCountList({ host_name: loginUser.visitorId, userRole: loginUser.userRole }))
        dispatch(gettommorowdateCountList({ host_name: loginUser.visitorId, userRole: loginUser.userRole }))
        dispatch(getnextdateCountList({ host_name: loginUser.visitorId, userRole: loginUser.userRole }))
        dispatch(getallinvitedCountList())
        dispatch(getexpireddateCountList({ host_name: loginUser.visitorId, userRole: loginUser.userRole }))
    };
    useEffect(() => {
        fetchData()
    }, []);

    const dateConversion = (date) => {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        const convDate = dd + "/" + mm + "/" + yyyy;
        return convDate;
    };

    return (
        <>
            {loginUser.userRole == "Security" ?
                <>
                    <Paper sx={{ boxShadow: 'none', backgroundColor: '#edf3f5', paddingLeft: '14px' }}>
                        <Grid container spacing={0} sx={{ pt: 1, }}>
                            <Grid item md={12} xs={12}>
                                <Typography variant="h6"> Invitation Summary </Typography>
                            </Grid>
                            <Grid item md={2.4} xs={4} >
                                <Box className="dashboardTopcard">
                                    <Typography className="dashboardcardTitle">Today </Typography>
                                    {/* {todaysvisitors && todaysvisitors.map((row, index) => ( */}
                                    <Typography className="dashboardcardCount">{count1}</Typography>
                                    {/* ))} */}
                                </Box>

                            </Grid>
                            <Grid item md={2.4} xs={4} >
                                <Box className="dashboardTopcard">
                                    <Typography className="dashboardcardTitle">Tommorrow </Typography>
                                    <Typography className="dashboardcardCount">{count2}</Typography>

                                </Box>
                            </Grid>
                            <Grid item md={2.4} xs={4} >
                                <Box className="dashboardTopcard">
                                    <Typography className="dashboardcardTitle">Next 7 Days </Typography>
                                    <Typography className="dashboardcardCount">{count3}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={2.4} xs={4} >
                                <Box className="dashboardTopcard">
                                    <Typography className="dashboardcardTitle">All Invites </Typography>
                                    {/* <Typography className="dashboardcardCount">22K</Typography> */}
                                    <Typography className="dashboardcardCount">{loginUser.userRole === 'Security' ? count : countall}</Typography>
                                    {/* <Typography className="dashboardcardCount">{count}</Typography> */}
                                </Box>
                            </Grid>
                            <Grid item md={2.4} xs={4} >
                                <Box className="dashboardTopcard">
                                    <Typography className="dashboardcardTitle">Expired</Typography>
                                    <Typography className="dashboardcardCount" sx={{ color: '#ff5a5a' }}>{count4}</Typography>
                                </Box>

                            </Grid>

                        </Grid>
                        <Box>
                            <Grid container spacing={0} sx={{ pt: 1, }}>
                                <Grid item md={12} xs={12} >
                                    <Grid container spacing={0} sx={{ pt: 1, }}>
                                        <Grid item md={12} xs={12}>
                                            <Typography variant="h6"> Invitation Summary </Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12}>
                                            <TableContainer className="listTable" sx={{ maxHeight: 440 }} >
                                                <Table size="small" stickyHeader aria-label="sticky table" >
                                                    <TableHead>
                                                        <StyledTableRow >
                                                            <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Visitor Name</StyledTableCell>
                                                            <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Company</StyledTableCell>
                                                            <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Department</StyledTableCell>
                                                            <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Meeting Date</StyledTableCell>
                                                            <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Host Name</StyledTableCell>
                                                            <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Meeting Time</StyledTableCell>
                                                            <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>In Time</StyledTableCell>
                                                            <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Out Time</StyledTableCell>
                                                            <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>CheckOut Status</StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableHead>
                                                   
                                                    <TableBody>
                                                        {allInvitedVisitors && allInvitedVisitors
                                                            .slice(
                                                                page * rowsPerPage,
                                                                page * rowsPerPage + rowsPerPage
                                                            )
                                                            .map((row, index) => (
                                                                <StyledTableRow
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <StyledTableCell align="left" className='listTableBody'>{row.visitor_name}</StyledTableCell>
                                                                    <StyledTableCell align="left" className='listTableBody'>{row.company_name}</StyledTableCell>
                                                                    <StyledTableCell align="left" className='listTableBody'>{row.departmentName}</StyledTableCell>
                                                                    <StyledTableCell align="left" className='listTableBody'>{dateConversion(row.meeting_date)}</StyledTableCell>
                                                                    <StyledTableCell align="left" className='listTableBody'>{row.hostName}</StyledTableCell>
                                                                    <StyledTableCell align="left" className='listTableBody'>{row.meeting_time}</StyledTableCell>
                                                                    <StyledTableCell align="left" className='listTableBody'>{row.check_in_time}</StyledTableCell>
                                                                    <StyledTableCell align="left" className='listTableBody'>{row.check_out_time_host}</StyledTableCell>
                                                                    <StyledTableCell align="left" className='listTableBody'
                                                                        style={{ color: row.status === "Allowed" ? '#008000' : row.status === "Rejected" ? '#FF0000' : '#000000', fontWeight: "bold" }}
                                                                    >{row.status}</StyledTableCell>
                                                                </StyledTableRow>
                                                            ))} 
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                sx={{ px: 2 }}
                                                rowsPerPageOptions={[10, 25, 50, 100]}
                                                component="div"
                                                count={allInvitedVisitors ? allInvitedVisitors.length : 0}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                backIconButtonProps={{
                                                    'aria-label': 'Previous Page',
                                                }}
                                                nextIconButtonProps={{
                                                    'aria-label': 'Next Page',
                                                }}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />

                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid item md={4} xs={12} sx={{}}>
                            <Grid container spacing={0} sx={{ pt: 1, }}>
                                <Grid item md={12} xs={12}>
                                    <Typography variant="h6"> Monthly Activity</Typography>

                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <PieChart width={350} height={300} style={{ backgroundColor: '#d2edf7', margin: '12px' }}>

                                        <Pie
                                            dataKey="value"
                                            isAnimationActive={false}
                                            data={data01}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label
                                        >
                                            {data01.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>

                                </Grid>
                            </Grid>
                        </Grid> */}
                            </Grid>
                        </Box>
                    </Paper >
                </>
                : loginUser.userRole == "Employee" ?
                    <>
                        <Paper sx={{ boxShadow: 'none', backgroundColor: '#edf3f5', paddingLeft: '14px' }}>
                            <Grid container spacing={0} sx={{ pt: 1, }}>
                                <Grid item md={12} xs={12}>
                                    <Typography variant="h6"> Invitation Summary </Typography>
                                </Grid>
                                <Grid item md={2.4} xs={4} >
                                    <Box className="dashboardTopcard">
                                        <Typography className="dashboardcardTitle">Today </Typography>
                                        {/* {todaysvisitors && todaysvisitors.map((row, index) => ( */}
                                        <Typography className="dashboardcardCount">{count1}</Typography>
                                        {/* ))} */}
                                    </Box>

                                </Grid>
                                <Grid item md={2.4} xs={4} >
                                    <Box className="dashboardTopcard">
                                        <Typography className="dashboardcardTitle">Tommorrow </Typography>
                                        <Typography className="dashboardcardCount">{count2}</Typography>

                                    </Box>
                                </Grid>
                                <Grid item md={2.4} xs={4} >
                                    <Box className="dashboardTopcard">
                                        <Typography className="dashboardcardTitle">Next 7 Days </Typography>
                                        <Typography className="dashboardcardCount">{count3}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item md={2.4} xs={4} >
                                    <Box className="dashboardTopcard">
                                        <Typography className="dashboardcardTitle">All Invites </Typography>
                                        {/* <Typography className="dashboardcardCount">22K</Typography> */}
                                        <Typography className="dashboardcardCount">{loginUser.userRole === 'Security' ? count : countall}</Typography>
                                        {/* <Typography className="dashboardcardCount">{count}</Typography> */}
                                    </Box>
                                </Grid>
                                <Grid item md={2.4} xs={4} >
                                    <Box className="dashboardTopcard">
                                        <Typography className="dashboardcardTitle">Expired</Typography>
                                        <Typography className="dashboardcardCount" sx={{ color: '#ff5a5a' }}>{count4}</Typography>
                                    </Box>

                                </Grid>

                            </Grid>
                            <Box>
                                <Grid container spacing={0} sx={{ pt: 1, }}>
                                    <Grid item md={12} xs={12} >
                                        <Grid container spacing={0} sx={{ pt: 1, }}>
                                            <Grid item md={12} xs={12}>
                                                <Typography variant="h6"> Invitation Summary </Typography>
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <TableContainer className="listTable" sx={{ maxHeight: 440 }} >
                                                    <Table size="small" stickyHeader aria-label="sticky table" >
                                                        <TableHead>
                                                            <StyledTableRow >
                                                                <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Visitor Name</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Company</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Department</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Meeting Date</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Host Name</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Meeting Time</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>In Time</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Out Time</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>CheckOut Status</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {rows && rows
                                                                .slice(
                                                                    page * rowsPerPage,
                                                                    page * rowsPerPage + rowsPerPage
                                                                )
                                                                .map((row, index) => (
                                                                    <StyledTableRow
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        {/* <StyledTableCell align="center" className='listTableBody'>
                                                    <PopupState variant="popover" popupId="demo-popup-popover">
                                                        {(popupState) => (
                                                            <div>
                                                                <MoreHorizIcon
                                                                    id="actionBtn"
                                                                    alt="translator"
                                                                    variant="contained"
                                                                    {...bindTrigger(popupState)}
                                                                />
                                                                <Popover
                                                                    {...bindPopover(popupState)}
                                                                    anchorOrigin={{
                                                                        vertical: "right",
                                                                        horizontal: "center"
                                                                    }}
                                                                    transformOrigin={{
                                                                        vertical: "right",
                                                                        horizontal: "center"
                                                                    }}
                                                                >
                                                                    <Container style={{ display: 'flex', padding: '4px' }}>
                                                                        <EditIcon icon="carbon:edit" style={{ cursor: 'pointer', color: '#551A8B', float: 'right', fontSize: '19px' }} onClick={() => handleEdit(row)} />
                                                                        <Icon style={{ cursor: 'pointer', marginLeft: '6px', fontSize: '20px' }} icon="ic:baseline-delete-forever" onClick={() => handleDelete(row)} color="#c70000" />
                                                                    </Container>
                                                                </Popover>
                                                            </div>
                                                        )}
                                                    </PopupState>
                                                </StyledTableCell> */}
                                                                        <StyledTableCell align="left" className='listTableBody'>{row.visitor_name}</StyledTableCell>
                                                                        <StyledTableCell align="left" className='listTableBody'>{row.company_name}</StyledTableCell>
                                                                        <StyledTableCell align="left" className='listTableBody'>{row.departmentName}</StyledTableCell>
                                                                        <StyledTableCell align="left" className='listTableBody'>{dateConversion(row.meeting_date)}</StyledTableCell>
                                                                        <StyledTableCell align="left" className='listTableBody'>{row.hostName}</StyledTableCell>
                                                                        <StyledTableCell align="left" className='listTableBody'>{row.meeting_time}</StyledTableCell>
                                                                        <StyledTableCell align="left" className='listTableBody'>{row.check_in_time}</StyledTableCell>
                                                                        <StyledTableCell align="left" className='listTableBody'>{row.check_out_time_host}</StyledTableCell>
                                                                        <StyledTableCell align="left" className='listTableBody'
                                                                            style={{ color: row.status === "Allowed" ? '#008000' : row.status === "Rejected" ? '#FF0000' : '#000000', fontWeight: "bold" }}
                                                                        >{row.status}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <TablePagination
                                                    sx={{ px: 2 }}
                                                    rowsPerPageOptions={[10, 25, 50, 100]}
                                                    component="div"
                                                    count={rows ? rows.length : 0}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    backIconButtonProps={{
                                                        'aria-label': 'Previous Page',
                                                    }}
                                                    nextIconButtonProps={{
                                                        'aria-label': 'Next Page',
                                                    }}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/* <Grid item md={4} xs={12} sx={{}}>
                            <Grid container spacing={0} sx={{ pt: 1, }}>
                                <Grid item md={12} xs={12}>
                                    <Typography variant="h6"> Monthly Activity</Typography>

                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <PieChart width={350} height={300} style={{ backgroundColor: '#d2edf7', margin: '12px' }}>

                                        <Pie
                                            dataKey="value"
                                            isAnimationActive={false}
                                            data={data01}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label
                                        >
                                            {data01.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>

                                </Grid>
                            </Grid>
                        </Grid> */}
                                </Grid>
                            </Box>
                        </Paper >

                    </>
                    : ""

            }
        </>

        // OLD Dashboard
        // <Paper sx={{ boxShadow: 'none', backgroundColor: '#edf3f5', paddingLeft: '14px' }}>
        //     <Grid container spacing={0} sx={{ pt: 1, }}>
        //         <Grid item md={12} xs={12}>
        //             <Typography variant="h6"> Invitation Summary </Typography>
        //         </Grid>
        //         <Grid item md={2.4} xs={4} >
        //             <Box className="dashboardTopcard">
        //                 <Typography className="dashboardcardTitle">Today </Typography>
        //                 {/* {todaysvisitors && todaysvisitors.map((row, index) => ( */}
        //                 <Typography className="dashboardcardCount">{count1}</Typography>
        //                 {/* ))} */}
        //             </Box>

        //         </Grid>
        //         <Grid item md={2.4} xs={4} >
        //             <Box className="dashboardTopcard">
        //                 <Typography className="dashboardcardTitle">Tommorrow </Typography>
        //                 <Typography className="dashboardcardCount">{count2}</Typography>

        //             </Box>
        //         </Grid>
        //         <Grid item md={2.4} xs={4} >
        //             <Box className="dashboardTopcard">
        //                 <Typography className="dashboardcardTitle">Next 7 Days </Typography>
        //                 <Typography className="dashboardcardCount">{count3}</Typography>
        //             </Box>
        //         </Grid>
        //         <Grid item md={2.4} xs={4} >
        //             <Box className="dashboardTopcard">
        //                 <Typography className="dashboardcardTitle">All Invites </Typography>
        //                 {/* <Typography className="dashboardcardCount">22K</Typography> */}
        //                 <Typography className="dashboardcardCount">{loginUser.userRole === 'Security' ? count : countall}</Typography>
        //                 {/* <Typography className="dashboardcardCount">{count}</Typography> */}
        //             </Box>
        //         </Grid>
        //         <Grid item md={2.4} xs={4} >
        //             <Box className="dashboardTopcard">
        //                 <Typography className="dashboardcardTitle">Expired</Typography>
        //                 <Typography className="dashboardcardCount" sx={{ color: '#ff5a5a' }}>{count4}</Typography>
        //             </Box>

        //         </Grid>

        //     </Grid>
        //     <Box>
        //         <Grid container spacing={0} sx={{ pt: 1, }}>
        //             <Grid item md={12} xs={12} >
        //                 <Grid container spacing={0} sx={{ pt: 1, }}>
        //                     <Grid item md={12} xs={12}>
        //                         <Typography variant="h6"> Invitation Summary </Typography>
        //                     </Grid>
        //                     <Grid item md={12} xs={12}>
        //                         <TableContainer className="listTable" sx={{ maxHeight: 440 }} >
        //                             <Table size="small" stickyHeader aria-label="sticky table" >
        //                                 <TableHead>
        //                                     <StyledTableRow >
        //                                         <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Visitor Name</StyledTableCell>
        //                                         <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Company</StyledTableCell>
        //                                         <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Department</StyledTableCell>
        //                                         <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Meeting Date</StyledTableCell>
        //                                         <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Host Name</StyledTableCell>
        //                                         <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Meeting Time</StyledTableCell>
        //                                         <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>In Time</StyledTableCell>
        //                                         <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>Out Time</StyledTableCell>
        //                                         <StyledTableCell align="left" style={{ backgroundColor: '#5ba84a' }}>CheckOut Status</StyledTableCell>
        //                                     </StyledTableRow>
        //                                 </TableHead>
        //                                 <TableBody>
        //                                     {rows && rows
        //                                         .slice(
        //                                             page * rowsPerPage,
        //                                             page * rowsPerPage + rowsPerPage
        //                                         )
        //                                         .map((row, index) => (
        //                                             <StyledTableRow
        //                                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //                                             >
        //                                                 <StyledTableCell align="left" className='listTableBody'>{row.visitor_name}</StyledTableCell>
        //                                                 <StyledTableCell align="left" className='listTableBody'>{row.company_name}</StyledTableCell>
        //                                                 <StyledTableCell align="left" className='listTableBody'>{row.departmentName}</StyledTableCell>
        //                                                 <StyledTableCell align="left" className='listTableBody'>{dateConversion(row.meeting_date)}</StyledTableCell>
        //                                                 <StyledTableCell align="left" className='listTableBody'>{row.hostName}</StyledTableCell>
        //                                                 <StyledTableCell align="left" className='listTableBody'>{row.meeting_time}</StyledTableCell>
        //                                                 <StyledTableCell align="left" className='listTableBody'>{row.check_in_time}</StyledTableCell>
        //                                                 <StyledTableCell align="left" className='listTableBody'>{row.check_out_time_host}</StyledTableCell>
        //                                                 <StyledTableCell align="left" className='listTableBody'
        //                                                     style={{ color: row.status === "Allowed" ? '#008000' : row.status === "Rejected" ? '#FF0000' : '#000000', fontWeight: "bold" }}
        //                                                 >{row.status}</StyledTableCell>
        //                                             </StyledTableRow>
        //                                         ))}
        //                                 </TableBody>
        //                             </Table>
        //                         </TableContainer>
        //                         <TablePagination
        //                             sx={{ px: 2 }}
        //                             rowsPerPageOptions={[10, 25, 50, 100]}
        //                             component="div"
        //                             count={rows ? rows.length : 0}
        //                             rowsPerPage={rowsPerPage}
        //                             page={page}
        //                             backIconButtonProps={{
        //                                 'aria-label': 'Previous Page',
        //                             }}
        //                             nextIconButtonProps={{
        //                                 'aria-label': 'Next Page',
        //                             }}
        //                             onPageChange={handleChangePage}
        //                             onRowsPerPageChange={handleChangeRowsPerPage}
        //                         />

        //                     </Grid>
        //                 </Grid>
        //             </Grid>
        //             {/* <Grid item md={4} xs={12} sx={{}}>
        //                     <Grid container spacing={0} sx={{ pt: 1, }}>
        //                         <Grid item md={12} xs={12}>
        //                             <Typography variant="h6"> Monthly Activity</Typography>

        //                         </Grid>
        //                         <Grid item md={12} xs={12}>
        //                             <PieChart width={350} height={300} style={{ backgroundColor: '#d2edf7', margin: '12px' }}>

        //                                 <Pie
        //                                     dataKey="value"
        //                                     isAnimationActive={false}
        //                                     data={data01}
        //                                     cx="50%"
        //                                     cy="50%"
        //                                     outerRadius={80}
        //                                     fill="#8884d8"
        //                                     label
        //                                 >
        //                                     {data01.map((entry, index) => (
        //                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        //                                     ))}
        //                                 </Pie>
        //                                 <Tooltip />
        //                             </PieChart>

        //                         </Grid>
        //                     </Grid>
        //                 </Grid> */}
        //         </Grid>
        //     </Box>
        // </Paper >
    )
}
export default Dashboard;