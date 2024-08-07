import { Button, Grid, Paper, DialogContent, Typography, MenuItem, Box, Snackbar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Icon } from '@iconify/react';
import { BackBtn, Cancel } from "../reuse/BackBtn";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { addCompany, addDepartment, addEmployee, editDeleteCompany, editDeleteDepartment, editDeleteEmployee } from "../../actions/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { VisitorInput } from "../reuse/VisitorInput";
import { BootstrapDialog, BootstrapDialogTitle } from "../reuse/BootstrapDialog";
import { getCurrentDateTime } from "../reuse/getCurrentDateTime";

const CompanyMasterAdd = (props) => {
    const loginData = localStorage.getItem('loginUser');
    const loginInfor = JSON.parse(loginData);
    const loginUser = loginInfor.userInfo;

    const { handleSubmit } = useForm();
    const dispatch = useDispatch()

    const editData = props.editInfo;
    const editid = editData && editData.id;
    const [successMessage, setSuccessMessage] = useState(null)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        setOpen(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [data, setData] = useState({
        id: editid,
        name_of_company: editData ? editData.name_of_company : '',
        address: editData ? editData.address : '',
        mobile_no: editData ? editData.mobile_no : '',
        gst_no: editData ? editData.gst_no : '',
        description: editData ? editData.description : '',

        // created_by: editData ? editData.created_by : loginUser.fullName + ' (' + loginUser.userName + ')',
        created_by : loginUser.userId,
        created_at: editData ? editData.created_at : getCurrentDateTime(),
        // modified_by: editData ? loginUser.fullName + ' (' + loginUser.userName + ')' : null,
        modified_by : loginUser.userId,
        modified_at: editData ? getCurrentDateTime() : null,
    })
    const handleChange = ({ target }) => {
        const value = target.value;
        setData({
            ...data,
            [target.name]: value,
        });
        data[target.name] = target.value;
    }

    const onSubmit = async (event) => {
        let sendingData = {
            ...data,
            changedUpdatedValue: 'edit'
        }
        console.log("data" , sendingData)
        if (editData) {
            dispatch(editDeleteCompany(sendingData));
            props.onEdit();
            props.handleCloseDialog();
        } else {
            dispatch(addCompany(sendingData));
            props.onEdit();
            props.handleCloseDialog();
        }
    }

    const handleCloseSuccessMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage(false)
    };

    const actionMsg = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSuccessMsg}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>

            <Paper className='listPaper' sx={{ boxShadow: 'none' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1} sx={{ pt: 1 }}>
                        <Grid item md={12} className="lableGrid">
                            <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Name Of Company</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid">
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="name_of_company"
                                        type="text"
                                        value={(data.name_of_company)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Address</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid">
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="address"
                                        type="text"
                                        value={(data.address)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Mobile No</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid">
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="mobile_no"
                                        type="number"
                                        value={(data.mobile_no)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">GST No</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid">
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="gst_no"
                                        type="text"
                                        value={(data.gst_no)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Description</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid">
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="description"
                                        type="text"
                                        value={(data.description)}
                                        onChange={handleChange} />
                                </Grid>
                               
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: '12px', float: 'right' }}>
                        <Button color="primary" id='btnSave' variant="contained" type="submit">
                            {editData ? 'Update' : 'Save'}
                        </Button>
                        {/* <Cancel /> */}
                    </Box>
                </form>
                {successMessage &&
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        open={successMessage ? true : false}
                        autoHideDuration={2000}
                        onClose={handleCloseSuccessMsg}
                        message={successMessage}
                        action={actionMsg}
                    />
                }
            </Paper>
        </>
    )
}

export default CompanyMasterAdd;