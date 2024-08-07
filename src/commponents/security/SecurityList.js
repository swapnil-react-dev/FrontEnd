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
import { VisitorInput } from "../reuse/VisitorInput";
import { BootstrapDialog, BootstrapDialogTitle } from "../reuse/BootstrapDialog";
import EditIcon from '@mui/icons-material/Edit';
import { editDeleteCompanyDetails, editDeleteSecurity, getCompanyDetailsList, getSecurityList, } from "../../actions/actions";
import SecurityAdd from "./SecurityAdd";
import ExcelDownloadButton from "../reuse/ExcelDownloadButton";

const SecurityList = () => {
    const loginData = localStorage.getItem('loginUser');
    const loginUser = JSON.parse(loginData);
    const tableRef = useRef(null);
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
    const rows = useSelector(state => state.security.security)
   
    const [q, setQ] = useState("");
    const [searchParam] = useState(["security_name", "aadhar_number", "agency_name", "security_contact_number", "agency_contact_number", "gender"]);

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
    const responseMessage = useSelector(state => state.security.message);

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
        dispatch(editDeleteSecurity({ id: id, changedUpdatedValue: "delete"}));
        setIsDelete(false);
    }

    const handleDelete = (info) => {
        setIsDelete(true);
        setDeleteInfo(info);
    }

    const handleEdit = security => {
        setInfo(security);
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
        fetchData()
    };

    let fetchData = () => {
        dispatch(getSecurityList())
    };
    useEffect(() => {
        fetchData()
    }, []);

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

    const fields = ['security_name', 'aadhar_number', 'agency_name', 'gender', 'security_contact_number', 'agency_contact_number'];
    const labels = ['Security Name', 'Aadhar No', 'Agency Name', 'Gender', 'Security Contact No', 'Agency Contact No'];

    return (
        <>
            <Paper className="listPaper">
                <Box sx={{ display: 'flex' }}>
                    <Grid container spacing={2} sx={{ pt: 1.5, pb: 1.5 }}>
                        <Grid item md={8} >
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h5" gutterBottom >
                                    Security List swapnil
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
                                            filename="SecurityList"
                                        />
                                    <Box className="excelIconBox">
                                        <Icon icon="material-symbols:bookmark-add-sharp" width="28" height="28" color="#336699" onClick={handleClickOpen} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer className="listTable" ref={tableRef}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <StyledTableRow >
                                <StyledTableCell align="center"className="tableHead">Action</StyledTableCell>
                                <StyledTableCell align="left"  className="tableHead">Agency Name</StyledTableCell>
                                <StyledTableCell align="left"  className="tableHead">Agency Contact No</StyledTableCell>
                                <StyledTableCell align="left"  className="tableHead">Security Name</StyledTableCell>
                                <StyledTableCell align="left"  className="tableHead">Security Contact No</StyledTableCell>
                                <StyledTableCell align="left"  className="tableHead">Aadhar No</StyledTableCell>
                                <StyledTableCell align="center"className="tableHead">Aadhar card Photo</StyledTableCell>
                                <StyledTableCell align="left"  className="tableHead">Gender</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows && search(rows) .slice(
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
                                    <StyledTableCell align="left" className='listTableBody'>{row.agency_name}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.agency_contact_number}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.security_name} </StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.security_contact_number}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.aadhar_number}</StyledTableCell>
                                    <StyledTableCell align="center" className='listTableBody'>
                                        <img src={row.upload_aadhar_card} style={{width:'60px', height: '50px'}} />
                                    </StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.gender}</StyledTableCell>
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
                    <DialogTitle style={{ color: 'red' }}>Are you sure you want to delete #{deleteInfo && deleteInfo.security_name} record?</DialogTitle>
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
                        {openOption === 'Add' ? 'Add Security Details' : openOption === 'Edit' ? 'Update Security Details' : `View Details`}
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        {(openOption === 'Edit' || openOption === 'Add') &&
                            <SecurityAdd handleCloseDialog={handleClose} editInfo={info} onEdit={fetchData} />
                        }
                    </DialogContent>
                </BootstrapDialog>
            </Paper>

        </>
    )
}
export default SecurityList;