import { SearchOutlined } from "@mui/icons-material";
import {
    Box, Button, Container, Dialog, DialogTitle, Grid, DialogActions,
    IconButton, InputAdornment, Paper, Popover, TablePagination, Typography, Snackbar, DialogContent
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
import { NavLink, useNavigate } from "react-router-dom";
import { VisitorInput } from "../reuse/VisitorInput";
import EmployeeMasterAdd from "./EmployeeMasterAdd";
import { BootstrapDialog, BootstrapDialogTitle } from "../reuse/BootstrapDialog";
import EditIcon from '@mui/icons-material/Edit';
import { editDeleteEmployee, getEmployeeList } from "../../actions/actions";
import ExcelDownloadButton from "../reuse/ExcelDownloadButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const EmployeeMasterList = () => {
    const loginData = localStorage.getItem('loginUser');
    const loginUser = JSON.parse(loginData);

    const tableRef = useRef(null);
    // const login_details = sessionStorage.getItem('loginUser');
    // const userInfo = JSON.parse(login_details);
    const [open, setOpen] = useState(false);
    const [openOption, setOpenOption] = useState('');

    const [info, setInfo] = useState({});
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
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const rows = useSelector(state => state.employee.employee)

    const [q, setQ] = useState("");
    const [searchParam] = useState(["employee_name", "department","employee_number","email_id","mobile_number","designation","location","shift","device_code","status"]);
    

    function search() {
        return rows && rows.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem] && item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
                );
            });
        });
    }

    let fetchData = () => {
        dispatch(getEmployeeList())
    };
    useEffect(() => {
        fetchData()
    }, []);

    const [shouldShowMsg, setShouldShowMsg] = useState(false);
    const responseMessage = useSelector(state => state.employee.message);

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
        dispatch(editDeleteEmployee({ id: id, changedUpdatedValue: 'delete' }))
        setIsDelete(false);
    }

    const handleDelete = (info) => {
        setIsDelete(true);
        setDeleteInfo(info);
    }

    const handleEdit = employee => {
        setInfo(employee);
        setOpen(true);
        setOpenOption('Edit')
    }
    const handleDetails = party => {
        // retrievePartyIDWiseAction(party)
        setOpen(true);
        setOpenOption('Details')
    }

    const [openSnak, setOpenSnak] = React.useState(false);
    const handleClickOpen = () => {
        setInfo(undefined);
        setOpen(true);
        setOpenOption('Add')
    };

    const handleClose = (event, reason) => {
        setIsDelete(false)
        setDeleteInfo(null);
        setOpen(false);
        //     if (reason !== 'backdropClick') {
        //         setOpen(false);
        //     }
        // } else {
        //     if (data.party_type == '' &&
        //         data.party_name == '' &&
        //         data.email == '' &&
        //         data.address == '' &&
        //         data.city == '' &&
        //         data.pin_code == '' &&
        //         data.state == '' &&
        //         data.contact_person == '' &&
        //         data.contact_no == '' &&
        //         data.gst_in == '' &&
        //         data.branch_name == '') {
        //         setOpen(false);
        //         setOpenSnak(false);
        //     } else {
        //         setOpenSnak(true)
        //     }
        // }
    };

    const handleOpenSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        // setData({
        //     party_type: '',
        //     party_name: '',
        //     email: '',
        //     address: '',
        //     city: '',
        //     pin_code: '',
        //     state: '',
        //     contact_person: '',
        //     contact_no: '',
        //     gst_in: '',
        //     branch_name: ''
        // })
        setOpenSnak(false);
        setOpen(false);
    }

    const handleCloseSnak = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnak(false);
    };
    const action = (
        <React.Fragment>
            <Button size="small" id="btnYes" onClick={handleOpenSnack}>
                Yes
            </Button>
            <Button size="small" id="btnNo" onClick={handleCloseSnak}>
                No
            </Button>
        </React.Fragment>
    );

    const fields = ['employee_name', 'employee_number', 'department','user_role', 'email_id', 'mobile_number', 'location', 'designation', 'android_imei_number', 'shift', 'device_code', 'uid', 'status'];
    const labels = ['Employee Name', 'Emp No', 'Department', 'User Role', 'Email Id', 'Mobile No', 'Location', 'Designation', 'Android IMEI No', 'Shift', 'Device Code', 'UID', 'Status'];

    return (
        <>
            <Paper className="listPaper">
                <Box sx={{ display: 'flex' }}>
                    <Grid container spacing={2} sx={{ pt: 1.5, pb: 1.5 }}>
                        <Grid item md={8} >
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h5" gutterBottom >
                                    Employee List
                                </Typography>
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
                                            filename="EmployeeList"
                                        />
                                    <Box className="excelIconBox">
                                    <Icon icon="material-symbols:bookmark-add-sharp" width="28" height="28" color="#336699" onClick={handleClickOpen} />
                                    {/* <AddCircleIcon color="#336699" onClick={handleClickOpen}/> */}
                                    </Box> </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer className="listTable" ref={tableRef}>
                    <Table size="small" aria-label="a dense table" >
                        <TableHead >
                            <StyledTableRow >
                                <StyledTableCell align="center" className="tableHead">Action</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Employee Name</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Employee No</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Department</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Email ID</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Mobile No</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Designation</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Location</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Shift</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Device Code</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Status </StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows && search(rows)
                             .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                <StyledTableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
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
                                                        <Container style={{ display: 'flex', padding: '4px' }}>
                                                            <EditIcon icon="carbon:edit" style={{ cursor: 'pointer', color: '#551A8B', float: 'right', fontSize: '19px' }} onClick={() => handleEdit(row)} />
                                                            <Icon style={{ cursor: 'pointer', marginLeft: '6px', fontSize: '20px' }} icon="ic:baseline-delete-forever" onClick={() => handleDelete(row)} color="#c70000" />
                                                        </Container>
                                                    </Popover>
                                                </div>
                                            )}
                                        </PopupState>
                                    </StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.employee_name} </StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.employee_number}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.departmentName}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.email_id}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.mobile_number}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.designation}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.location}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.shift}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.device_code}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.status}</StyledTableCell>
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
                    <DialogTitle style={{ color: 'red' }}>Are you sure you want to delete #{deleteInfo && deleteInfo.employee_name} record?</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} style={{ color: 'blue', border: '1px solid blue', padding: '2px 10px' }} variant='outlined'>
                            No
                        </Button>
                        <Button onClick={() => deleteRecord(deleteInfo.id)} style={{ color: 'red', border: '1px solid red', padding: '2px 10px' }} variant='outlined' >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <BootstrapDialog
                    PaperProps={{
                        sx: {
                            minWidth: openOption === 'Details' ? "65%" : "70%",
                            maxHeight: "100%"
                        }
                    }}
                    onClose={handleClose}
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                        {openOption === 'Add' ? 'Add Employee' : openOption === 'Edit' ? 'Update Employee Master' : `View Details`}
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        {(openOption === 'Edit' || openOption === 'Add') &&
                            <EmployeeMasterAdd handleCloseDialog={handleClose} editInfo={info} onEdit={fetchData}/>
                        }
                        {/* {openOption === 'Details' &&
                            <EmployeeMasterAdd />
                        } */}
                    </DialogContent>
                </BootstrapDialog>
            </Paper>

        </>
    )
}
export default EmployeeMasterList;