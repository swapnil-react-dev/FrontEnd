import { SearchOutlined } from "@mui/icons-material";
import {
    Box, Button, Container, Dialog, DialogTitle, Grid, DialogActions,
    IconButton, InputAdornment, Paper, Popover, TablePagination, Typography, Snackbar, DialogContent, Card, CardContent, getIconUtilityClass
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Icon } from '@iconify/react';

import { useDispatch, useSelector } from 'react-redux'
import { StyledTableCell, StyledTableRow } from "../reuse/StyledTable";
import { NavLink } from "react-router-dom";
import { VisitorInput } from "../reuse/VisitorInput";
import { BootstrapDialog, BootstrapDialogTitle } from "../reuse/BootstrapDialog";
import EditIcon from '@mui/icons-material/Edit';
import InvitationOrVisitorAdd from "./InvitationOrVisitorAdd";
import { editCheckoutnotifications, editDeleteInvitationOrVisitor, getInvitationOrVisitorList, getallintodaysCountList, getallouttodaysCountList, getalltodaysCountList, login } from "../../actions/actions";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SelfRegistration from "../selfRegistration/SelfRegistration";
import GuestPass from "./GuestPass";
import InvitationCode from "./InvitationCode";
import ExcelDownloadButton from "../reuse/ExcelDownloadButton";
import { addTime, formatMinutes, getCurrentTime } from "../reuse/getCurrentTime";
import { green } from "@mui/material/colors";

const InvitationOrVisitorList = () => {

    const tableRef = useRef(null);
    const [info, setInfo] = useState({});
    const [open, setOpen] = useState(false);
    const [openOption, setOpenOption] = useState('');
    const loginData = localStorage.getItem('loginUser');
    const loginInfor = JSON.parse(loginData);
    const loginUser = loginInfor.userInfo;

    console.log("userInfo", loginUser)
    const dispatch = useDispatch()
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = useState(0)
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    const [isDelete, setIsDelete] = useState(false);
    const [deleteInfo, setDeleteInfo] = useState();

    const rows = useSelector(state => state.invitationOrVisitor.invitationOrVisitor)
    const incount = useSelector(state => state.invitationOrVisitor.intodaysVisitors)
    const outcount = useSelector(state => state.invitationOrVisitor.outtodaysVisitors)
    const allcount = useSelector(state => state.invitationOrVisitor.alltodaysVisitors)

    const intodaysVisitors = Object.keys(incount === null ? '' : incount).length
    const outtodaysVisitors = Object.keys(outcount === null ? '' : outcount).length
    const alltodaysVisitors = Object.keys(allcount === null ? '' : allcount).length
    

    const fetchData = () => {
        // dispatch(getInvitationOrVisitorList({host_name: loginUser.empLoginId == undefined ? null : loginUser.empLoginId}))
        // dispatch(getInvitationOrVisitorList({host_name: loginUser.userId == undefined ? null : loginUser.userId}))
        dispatch(getInvitationOrVisitorList({ host_name: loginUser.visitorId, userRole: loginUser.userRole }))
        dispatch(getallintodaysCountList({ host_name: loginUser.visitorId, userRole: loginUser.userRole }))
        dispatch(getallouttodaysCountList({ host_name: loginUser.visitorId, userRole: loginUser.userRole }))
        dispatch(getalltodaysCountList({ host_name: loginUser.visitorId, userRole: loginUser.userRole }))

    };
    useEffect(() => {
        fetchData()
    }, []);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["VType", "visitor_name", "company_name", "mobile_number", "id_type", "id_number", "visit_type", "meeting_location", "meeting_time", "meeting_date", "expected_duration", "vehicle_number", "person_accompanying", "check_in_time", "check_out_time_host", "check_out_time_gate", "status", "hostName", "purpose", "department", "code"]);
    const [date, setDate] = useState(new Date());
    const dateConversion = (date) => {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        const convDate = dd + "/" + mm + "/" + yyyy;
        return convDate;
    };




    function search() {
        return rows && rows.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem] && item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
                );
            });
        });
    }

    const [shouldShowMsg, setShouldShowMsg] = useState(false);
    const responseMessage = useSelector(state => state.invitationOrVisitor.message);

    useEffect(() => {
        if (responseMessage) {
            setShouldShowMsg(true);
        }
    }, [responseMessage, dispatch]);

    useEffect(() => {
        if (shouldShowMsg) {
            if (responseMessage !== null) {
                alert(responseMessage);
                setShouldShowMsg(false);
                dispatch({ type: 'RESET_MESSAGE' }); // Dispatch an action to reset the message
                fetchData()
            }
        }
    }, [shouldShowMsg, responseMessage]);

    const deleteRecord = (id) => {
        dispatch(editDeleteInvitationOrVisitor({ id: id, changedUpdatedValue: 'delete' }))
        setIsDelete(false);
    }

    const handleDelete = (invitationOrVisitor) => {
        setIsDelete(true);
        setDeleteInfo(invitationOrVisitor);
    }

    const handleClose = (event, reason) => {
        setIsDelete(false)
        setDeleteInfo(null);
        setOpen(false);
    };
    const handleEdit = info => {
        setInfo(info);
        setOpen(true);
        setOpenOption('Edit')
    }

    const handleGuestPass = info => {
        setInfo(info);
        setOpen(true);
        setOpenOption('GuestPass')
    }

    const handleClickOpen = () => {
        setInfo(undefined);
        setOpen(true);
        setOpenOption('Add')
    };
    
    const getMinutesDifference = (check_in_time , check_out_time_gate) => {
        const difference = check_in_time - check_out_time_gate
        return (difference)
    }
    
    console.log("timediff", getMinutesDifference)

    const handleCheckOut = (info) => {
        const sendData = {
            id: info.id,
            check_out_time_host: loginUser.userRole !== "Security" ? getCurrentTime() : info.check_out_time_host,
            check_out_time_gate: loginUser.userRole === "Security" ? getCurrentTime() : info.check_out_time_gate,
            changedUpdatedValue: 'checkoutStatus',
        }
        dispatch(editDeleteInvitationOrVisitor(sendData));
    }

    let fields = null;
    let labels = null;

    if ((loginUser.userRole === "Security") || (loginUser.userRole === "Admin")) {
        fields = ['VType', 'visitor_name', 'company_name', 'hostName', 'department', 'purpose', 'meeting_time', 'meeting_location', 'check_in_time', 'check_out_time_host', 'check_out_time_gate', 'status'];
        labels = ['Type', 'Visitor Name', 'Company', 'Host Name', 'Department', 'Purpose', 'Meeting Time', 'Meeting Location', 'Check In Time', 'Check Out Time Host', 'Check Out Time Gate', 'Status'];
    }

    if (loginUser.userRole === "Employee") {
        fields = ['VType', 'visitor_name', 'company_name', 'purpose', 'meeting_time', 'meeting_location', 'status'];
        labels = ['Type', 'Visitor Name', 'Company', 'Purpose', 'Meeting Time', 'Meeting Location', 'Status'];
    }


    return (
        <>
            <Paper className="listPaper">
                {loginUser.userRole == "Security" ?

                    <Box sx={{ display: 'flex' }}>
                        <Grid container spacing={2} sx={{ pt: 1, pb: 1.5 }}>
                            <Grid item md={12} >
                                <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: "initial", fontSize: "17px" }}>{date.toDateString().slice(3)}</Typography>
                            </Grid>
                            <Grid item md={12} >
                                <Grid container spacing={4} >
                                    <Grid item md={3} >
                                        <Box className="invitationTopcard">
                                            <Typography className="dashboardcardTitle">  IN </Typography>
                                            <Typography className="dashboardcardCount">{alltodaysVisitors}</Typography>
                                        </Box>

                                    </Grid>
                                    <Grid item md={6} >
                                        <Box className="invitationTopcard">
                                            <Typography className="dashboardcardTitle">  INPREMISES </Typography>
                                            <Typography className="dashboardcardCount"> {intodaysVisitors} </Typography>
                                        </Box>

                                    </Grid>
                                    <Grid item md={3} >
                                        <Box className="invitationTopcard">
                                            <Typography className="dashboardcardTitle">  OUT </Typography>
                                            <Typography className="dashboardcardCount"> {outtodaysVisitors}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Box>
                    : loginUser.userRole == "Employee" ?
                        <Box sx={{ display: 'flex' }}>
                            <Grid container spacing={2} sx={{ pt: 1, pb: 1.5 }}>
                                <Grid item md={12} >
                                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: "initial", fontSize: "17px" }}>{date.toDateString().slice(3)}</Typography>
                                </Grid>
                                <Grid item md={12} >
                                    <Grid container spacing={4} >
                                        <Grid item md={3} >
                                            <Box className="invitationTopcard">
                                                <Typography className="dashboardcardTitle">  IN </Typography>
                                                <Typography className="dashboardcardCount">{alltodaysVisitors}</Typography>
                                            </Box>

                                        </Grid>
                                        <Grid item md={6} >
                                            <Box className="invitationTopcard">
                                                <Typography className="dashboardcardTitle">  INPREMISES </Typography>
                                                <Typography className="dashboardcardCount"> {intodaysVisitors} </Typography>
                                            </Box>

                                        </Grid>
                                        <Grid item md={3} >
                                            <Box className="invitationTopcard">
                                                <Typography className="dashboardcardTitle">  OUT </Typography>
                                                <Typography className="dashboardcardCount"> {outtodaysVisitors}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Box>
                        : ""
                }

                <Box sx={{ display: 'flex' }}>
                    <Grid container spacing={2} sx={{ pt: 1.5, pb: 1.5 }}>
                        <Grid item md={8} >
                            <Box sx={{ display: 'flex' }}>
                                {loginUser.userRole == "Security" ?
                                    <>
                                        <Typography variant="h5" gutterBottom >
                                            Visitor List
                                        </Typography>
                                        {/* <Button onClick={handleDetails} size="small" variant="outlined"
                                            sx={{ marginLeft: '20px', color: 'black', fontWeight: 'bold' }}>
                                            <QrCode2Icon sx={{ marginRight: '8px' }} /> Invitation Code</Button> */}
                                        <InvitationCode />
                                    </>
                                    :
                                    loginUser.userRole == "Employee" ?
                                        <Typography variant="h5" gutterBottom >
                                            Visitor List
                                        </Typography>
                                        :
                                        <Typography variant="h5" gutterBottom >
                                            Visitor List
                                        </Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item md={4} style={{ display: 'flex', float: 'right' }}>
                            <Grid container spacing={0} >
                                <Grid item md={9.5} >
                                    <VisitorInput
                                        fullWidth
                                        type="search"
                                        name="search"
                                        placeholder="Search"
                                        value={q}
                                        size="small"
                                        onChange={(e) => setQ(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                    <IconButton>
                                                        <SearchOutlined />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item md={2.5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <ExcelDownloadButton
                                        data={rows}
                                        fields={fields}
                                        labels={labels}
                                        filename="VisitorsList"
                                    />
                                    {loginUser.userRole !== "Admin" &&
                                        <Box className="excelIconBox">
                                            <Icon icon="material-symbols:bookmark-add-sharp" width="28" height="28" color="#336699" onClick={handleClickOpen} />
                                        </Box>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer className="listTable" ref={tableRef}>
                    <Table size="small" aria-label="a dense table" >
                        <TableHead>
                            <StyledTableRow>
                                {loginUser.userRole !== "Admin" &&
                                    <StyledTableCell align="center" className="tableHead">Action</StyledTableCell>
                                }
                                <StyledTableCell align="left" className="tableHead">Type</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Visitor Name</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Company</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Mobile No</StyledTableCell>

             
                                {loginUser.userRole !== "Employee" &&
                                    <>
                                        <StyledTableCell align="left" className="tableHead">Host Name</StyledTableCell>
                                        <StyledTableCell align="left" className="tableHead">Department</StyledTableCell>
                                    </>
                                }
                                <StyledTableCell align="left" className="tableHead">Meeting Date</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Purpose</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Meeting Time</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Expected Duration</StyledTableCell>

                                {/* {loginUser.userRole === "Security" && */}
                                {loginUser.userRole !== "Employee" && 
                                    <>
                                        <StyledTableCell align="left" className="tableHead">Check In Time</StyledTableCell>
                                        <StyledTableCell align="left" className="tableHead">Check Out Time Host</StyledTableCell>
                                        <StyledTableCell align="left" className="tableHead">Check Out Time Gate</StyledTableCell>
                                    </>
                                }
                                <StyledTableCell align="left" className="tableHead">Status</StyledTableCell>
                                {/* {loginUser.userRole === "Employee" && */}
                                <StyledTableCell align="left" className="tableHead">Checkout Status</StyledTableCell>

                                {/* } */}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows && search(rows)
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage)

                                .map((row, index) => (
                                    <StyledTableRow
                                        style={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            background: loginUser.userRole === "Security" && row.check_out_time_gate === null && addTime(row.meeting_time, formatMinutes(row.expected_duration), '00:15') < getCurrentTime() && '#edad45'
                                            // background : loginUser.userRole === "Security" && '#edad45'
                                        }}
                                    >
                                        {loginUser.userRole !== "Admin" &&
                                            <StyledTableCell align="center" className='listTableBody'>
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
                                                                <Container style={{ display: 'grid', padding: '4px' }}>
                                                                    {/* <NavLink to={{ pathname: `/events`, search: "adhoc" }}> */}
                                                                    <Button className="visitorActionBtn" onClick={() => handleEdit(row)}> Edit  <EditIcon style={{ cursor: 'pointer', color: '#551A8B', float: 'right', fontSize: '19px' }} /></Button>
                                                                    {/* </NavLink> */}
                                                                    <Button className="visitorActionBtn" onClick={() => handleGuestPass(row)}> Gate Pass <Icon icon="fluent-emoji-high-contrast:identification-card" /></Button>
                                                                </Container>
                                                            </Popover>
                                                        </div>
                                                    )}

                                                </PopupState>
                                            </StyledTableCell>
                                        }
                                        <StyledTableCell align="left" className='listTableBody'>{row.VType}</StyledTableCell>
                                        <StyledTableCell align="left" className='listTableBody'>{row.visitor_name}</StyledTableCell>
                                        <StyledTableCell align="left" className='listTableBody'>{row.company_name}</StyledTableCell>
                                        <StyledTableCell align="left" className='listTableBody'>{row.mobile_number}</StyledTableCell>
                                        {loginUser.userRole !== "Employee" &&
                                            <>
                                                <StyledTableCell align="left" className='listTableBody'>{row.host_name === null ? '-' : row.hostName}</StyledTableCell>
                                                <StyledTableCell align="left" className='listTableBody'>{row.departmentName === null ? '-' : row.departmentName}</StyledTableCell>
                                            </>
                                        }
                                        <StyledTableCell align="left" className='listTableBody'>{dateConversion(row.meeting_date)}</StyledTableCell>
                                        <StyledTableCell align="left" className='listTableBody'>{row.purpose === null ? '-' : row.purposeName}</StyledTableCell>
                                        <StyledTableCell align="left" className='listTableBody'>{row.meeting_time.slice(0, 5)}</StyledTableCell>
                                        <StyledTableCell align="left" className='listTableBody'>{row.expected_duration}</StyledTableCell>
                                        {/* {loginUser.userRole === "Security" &&  */}
                                        {loginUser.userRole !== "Employee" &&
                                            <>
                                                <StyledTableCell align="left" className='listTableBody'>{row.check_in_time.slice(0, 5)}</StyledTableCell>
                                                <StyledTableCell align="left" className='listTableBody'>{row.check_out_time_host}</StyledTableCell>
                                                <StyledTableCell align="left" className='listTableBody'>{row.check_out_time_gate}</StyledTableCell>
                                            </>
                                        }
                                        <StyledTableCell align="left" className='listTableBody'
                                            // style={{color: row.status === "Allowed" ? '#008000' : '#000000' , fontWeight:"bold"}}
                                            // "Rejected" ? '#FF0000' : '#000000'
                                            style={{ color: row.status === "Allowed" ? '#008000' : row.status === "Rejected" ? '#FF0000' : '#000000', fontWeight: "bold" }}
                                        >
                                            {/* Request Sent / Allowed / Rejected/ Visitor Out */}

                                            {row.status}
                                        </StyledTableCell>
                                        {/* {loginUser.userRole === "Employee" && */}
                                        <StyledTableCell align="left" className='listTableBody'>
                                            {
                                                (row.check_out_time_host === null && row.check_out_time_gate === null) ?
                                                    <Button color="primary" variant="contained" size="small" style={{ fontSize: "8px" }} onClick={() => handleCheckOut(row)}>Checkout</Button>
                                                    :
                                                    (row.check_out_time_host !== null && row.check_out_time_gate === null) ?
                                                        loginUser.userRole === "Security" ?
                                                            <>
                                                                <Button color="primary" variant="contained" style={{ fontSize: "8px" }} onClick={() => handleCheckOut(row)}>Checkout</Button>
                                                                <span style={{ fontSize: "11px" }}> Checkout By Host</span>
                                                            </>
                                                            :
                                                            <span style={{ fontSize: "11px" }}>Checkout By Host</span>
                                                        :
                                                        <span style={{ fontSize: "11px" }}>Final Checkout</span>
                                            }
                                        </StyledTableCell>
                                        {/* } */}
                                        
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
                <Dialog open={isDelete}>
                    <DialogTitle style={{ color: 'red' }}>Are you sure you want to delete #{deleteInfo && deleteInfo.emp_first_name + " " + deleteInfo.emp_last_name} record?</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} style={{ color: 'blue', border: '1px solid blue', padding: '2px 10px' }} variant='outlined'>
                            No
                        </Button>
                        <Button onClick={() => deleteRecord(deleteInfo._id)} style={{ color: 'red', border: '1px solid red', padding: '2px 10px' }} variant='outlined' >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <BootstrapDialog
                    PaperProps={{
                        sx: {
                            minWidth: openOption === 'GuestPass' ? " 60%" : "80%",
                            maxHeight: "95%"
                        }
                    }}
                    onClose={handleClose}
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                        {openOption === 'Add' && (loginUser.userRole == "Security" ? 'Add Visitor Info' : loginUser.userRole == "Employee" ? 'Add Invitation' : 'Add Invitation')}
                        {openOption === 'Edit' && (loginUser.userRole == "Security" ? 'Update Visitor Info' : loginUser.userRole == "Employee" ? 'Update Invitation' : 'Update Invitation')}
                        {openOption === 'GuestPass' && 'Guest Pass Preview'}
                        {/* {openOption === 'Details' && 'Invitation Code'} */}
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        {(openOption === 'Edit' || openOption === 'Add') &&
                            <InvitationOrVisitorAdd handleCloseDialog={handleClose} editInfo={info} onEdit={fetchData} />
                        }
                        {/* {openOption === 'Details' &&
                            <InvitationCode />
                        } */}
                        {openOption === 'GuestPass' &&
                            <GuestPass handleCloseDialog={handleClose} editInfo={info} onEdit={fetchData} />
                        }

                    </DialogContent>
                </BootstrapDialog>
            </Paper>
        </>
    )
}
export default InvitationOrVisitorList;