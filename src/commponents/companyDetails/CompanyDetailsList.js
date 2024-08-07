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
import { editDeleteCompanyDetails,  getCompanyDetailsList,  } from "../../actions/actions";
import CompanyDetailsAdd from "./CompanyDetailsAdd";
import { DownloadTableExcel } from "react-export-table-to-excel";

const CompanyDetailsList = () => {
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
    const rows = useSelector(state => state.companyDetails.companyDetails)
    const fetchData = () => {
        dispatch(getCompanyDetailsList())
    };
    useEffect(() => {
        fetchData()
    }, []);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["company_name","gst_in","state","city","pan_number",]);

    function search() {
        return rows && rows.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        })
    }

    const deleteRecord = (id) => {
        dispatch(editDeleteCompanyDetails({ _id: id, changedUpdatedValue: 'delete' }));
        setIsDelete(false);
        fetchData()
    }

    const handleDelete = (info) => {
        setIsDelete(true);
        setDeleteInfo(info);
    }

    const handleEdit = companyDetails => {
        setInfo(companyDetails);
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

    return (
        <>
            <Paper className="listPaper">
                <Box sx={{ display: 'flex' }}>
                    <Grid container spacing={2} sx={{ pt: 1.5, pb: 1.5 }}>
                        <Grid item md={8} >
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h5" gutterBottom >
                                    Company List
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
                                <DownloadTableExcel
                                        filename={`company_details`}
                                        sheet="company_details"
                                        currentTableRef={tableRef.current}
                                    >
                                        <Box className="excelIconBox">
                                            <Icon icon="vscode-icons:file-type-excel2" width="28" height="28" style={{ padding: '2px' }} />
                                        </Box>
                                    </DownloadTableExcel>
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
                                <StyledTableCell align="center" className="tableHead">Action</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Company Name</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">GST No</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">State</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">City</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">PAN No</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Company Logo</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows && search(rows).map((row, index) => (
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
                                    <StyledTableCell align="left" className='listTableBody'>{row.company_name} </StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.gst_in}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.state}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.city}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.pan_number}</StyledTableCell>
                                    <StyledTableCell align="left" className='listTableBody'>{row.upload_company_logo}</StyledTableCell>

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
                    <DialogTitle style={{ color: 'red' }}>Are you sure you want to delete #{deleteInfo && deleteInfo.company_name} record?</DialogTitle>
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
                            minWidth: openOption === 'Details' ? "65%" : "70%",
                            maxHeight: "100%"
                        }
                    }}
                    onClose={handleClose}
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                        {openOption === 'Add' ? 'Add Company Details' : openOption === 'Edit' ? 'Update Company Details' : `View Details`}
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        {(openOption === 'Edit' || openOption === 'Add') &&
                            <CompanyDetailsAdd handleCloseDialog={handleClose} editInfo={info} onEdit={fetchData} />
                        }
                    </DialogContent>
                </BootstrapDialog>
            </Paper>

        </>
    )
}
export default CompanyDetailsList;