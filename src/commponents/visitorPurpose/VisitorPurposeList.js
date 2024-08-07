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
import { NavLink } from "react-router-dom";
import { VisitorInput } from "../reuse/VisitorInput";
import { BootstrapDialog, BootstrapDialogTitle } from "../reuse/BootstrapDialog";
import EditIcon from '@mui/icons-material/Edit';
import VisitorPurposeAdd from "./VisitorPurposeAdd";
import { editDeleteEmployee, editDeleteVisitorPurpose, getEmployeeList, getVisitorPurposeList } from "../../actions/actions";
import ExcelDownloadButton from "../reuse/ExcelDownloadButton";

const VisitorPurposeList = () => {
    const loginData = localStorage.getItem('loginUser');
    const loginUser = JSON.parse(loginData);
    console.log(loginUser)
    const tableRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [openOption, setOpenOption] = useState('');
    const dispatch = useDispatch()
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = useState(0)
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const [info, setInfo] = useState({});
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    const [isDelete, setIsDelete] = useState(false);
    const [deleteInfo, setDeleteInfo] = useState();

    const rows = useSelector(state => state.visitorPurpose.visitorPurpose)
    const fetchData = () => {
        dispatch(getVisitorPurposeList())
    };
    useEffect(() => {
        fetchData()
    }, []);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["purpose", "status"]);

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
    const responseMessage = useSelector(state => state.visitorPurpose.message);

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
        dispatch(editDeleteVisitorPurpose({ id: id, changedUpdatedValue: 'delete' }))
        setIsDelete(false);
        fetchData()
    }

    const handleDelete = (visitorPurpose) => {
        setIsDelete(true);
        setDeleteInfo(visitorPurpose);
    }

    const handleClose = (event, reason) => {
        setIsDelete(false)
        setDeleteInfo(null);
        setOpen(false);
    };
    const handleEdit = Bank => {
        setInfo(Bank);
        setOpen(true);
        setOpenOption('Edit')
        fetchData()
    }

    const handleDetails = party => {
        // retrievePartyIDWiseAction(party)
        setOpen(true);
        setOpenOption('Details')
    }
    const handleClickOpen = () => {
        setInfo(undefined);
        setOpen(true);
        setOpenOption('Add')
    };

    const fields = ['purpose', 'status'];
    const labels = ['Purpose', 'Status'];

    return (
        <>
            <Paper className="listPaper">
                <Box sx={{ display: 'flex' }}>
                    <Grid container spacing={2} sx={{ pt: 1.5, pb: 1.5 }}>
                        <Grid item md={8} >
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h5" gutterBottom >
                                    Visitor Purpose List
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
                                        filename="VisitorPurposeList"
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
                    <Table size="small" aria-label="a dense table" >
                        <TableHead>
                            <StyledTableRow >
                                <StyledTableCell align="center" className="tableHead">Action</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Purpose</StyledTableCell>
                                <StyledTableCell align="left" className="tableHead">Status </StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows && search(rows).slice(
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
                                        <StyledTableCell align="left" className='listTableBody'>{row.purpose}</StyledTableCell>
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
                    <DialogTitle style={{ color: 'red' }}>Are you sure you want to delete #{deleteInfo && deleteInfo.purpose} record?</DialogTitle>
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
                            minWidth: openOption === 'Details' ? "45%" : "40%",
                            maxHeight: "100%"
                        }
                    }}
                    onClose={handleClose}
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                        {openOption === 'Add' ? 'Add Visitor Purpose' : openOption === 'Edit' ? 'Update Visitor Purpose Master' : `View Details`}
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        {(openOption === 'Edit' || openOption === 'Add') &&
                            <VisitorPurposeAdd handleCloseDialog={handleClose} editInfo={info} onEdit={fetchData} />
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
export default VisitorPurposeList;