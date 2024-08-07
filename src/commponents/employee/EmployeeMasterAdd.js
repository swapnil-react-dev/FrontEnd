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
import { addEmployee, editDeleteEmployee, getDepartmentList } from "../../actions/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { VisitorInput } from "../reuse/VisitorInput";
import { BootstrapDialog, BootstrapDialogTitle } from "../reuse/BootstrapDialog";
import { getCurrentDateTime } from "../reuse/getCurrentDateTime";

const EmployeeMasterAdd = (props) => {
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
        employee_name: editData ? editData.employee_name : '',
        employee_number: editData ? editData.employee_number : '',
        email_id: editData ? editData.email_id : '',
        mobile_number: editData ? editData.mobile_number : '',
        location: editData ? editData.location : '',
        department: editData ? editData.department : null,
        designation: editData ? editData.designation : '',
        android_imei_number: editData ? editData.android_imei_number : '',
        shift: editData ? editData.shift : '',
        device_code: editData ? editData.device_code : '',
        uid: editData ? editData.uid : '',
        status: editData ? editData.status : 'Active',
        // created_by: editData ? editData.created_by : loginUser.fullName + ' (' + loginUser.userName + ')',
        created_by : loginUser.userId,
        created_at: editData ? editData.created_at : getCurrentDateTime(),
        // modified_by: editData ? loginUser.fullName + ' (' + loginUser.userName + ')' : null,
        modified_by: loginUser.userId,
        modified_at: editData ? getCurrentDateTime() : null,
        userRole: 'Employee'

    })
    // const departmentList = useSelector(state => state.department.department)
    const handleChange = ({ target }) => {
        const value = target.value;
        setData({
            ...data,
            [target.name]: value,
        });
        data[target.name] = target.value;
    }
    const departmentList = useSelector(state => state.department.department)
    useEffect(() => {
        dispatch(getDepartmentList())
    }, []);

    const onSubmit = async (event) => {
        let sendingData = {
            ...data,
            changedUpdatedValue: 'edit'
        }
        if (editData) {
            dispatch(editDeleteEmployee(sendingData));
            props.onEdit();
            props.handleCloseDialog();
        } else {
            dispatch(addEmployee(sendingData));
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
                    <Grid container spacing={2} sx={{ pt: 1 }}>
                        <Grid item md={4} className="lableGrid">
                            <Typography className="Inputlable">Employee Name</Typography>
                            <VisitorInput
                                size="small"
                                fullWidth
                                name="employee_name"
                                type="text"
                                value={(data.employee_name)}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">Employee Number</Typography>
                            <VisitorInput
                                size="small"
                                fullWidth
                                name="employee_number"
                                type="number"
                                value={(data.employee_number)}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">Department</Typography>
                            <VisitorInput
                                select
                                size="small"
                                fullWidth
                                name="department"
                                type="text"
                                value={(data.department)}
                                onChange={handleChange}>

                                {departmentList && departmentList.map((dept, index) => (
                                    <MenuItem className="menuItem" value={dept.id}>{dept.department}</MenuItem>
                                ))}
                            </VisitorInput>
                        </Grid>
                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">Email ID</Typography>
                            <VisitorInput
                                size="small"
                                fullWidth
                                name="email_id"
                                type="email"
                                value={(data.email_id)}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">Mobile Number</Typography>
                            <VisitorInput
                                size="small"
                                fullWidth
                                name="mobile_number"
                                type="number"
                                value={(data.mobile_number)}
                                onChange={handleChange} />
                        </Grid>

                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">Location</Typography>
                            <VisitorInput
                                size="small"
                                fullWidth
                                name="location"
                                type="text"
                                value={(data.location)}
                                onChange={handleChange} />
                        </Grid>

                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">Designation</Typography>
                            <VisitorInput
                                size="small"
                                fullWidth
                                name="designation"
                                type="text"
                                value={(data.designation)}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">Android IMEI No</Typography>
                            <VisitorInput
                                size="small"
                                fullWidth
                                name="android_imei_number"
                                type="text"
                                value={(data.android_imei_number)}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">Status</Typography>
                            <VisitorInput
                                size="small"
                                select
                                fullWidth
                                name="status"
                                type="text"
                                value={(data.status)}
                                onChange={handleChange}>
                                <MenuItem className="menuItem" value="Active">Active </MenuItem>
                                <MenuItem className="menuItem" value="Inactive">Inactive</MenuItem>
                            </VisitorInput>
                        </Grid>

                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">Shift</Typography>
                            <VisitorInput
                                size="small"
                                fullWidth
                                name="shift"
                                type="text"
                                value={(data.shift)}
                                onChange={handleChange} />
                        </Grid>

                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">Device Code</Typography>
                            <VisitorInput
                                size="small"
                                fullWidth
                                name="device_code"
                                type="text"
                                value={(data.device_code)}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item md={4} xs={4} className="lableGrid">
                            <Typography className="Inputlable">UID</Typography>
                            <VisitorInput
                                size="small"
                                fullWidth
                                name="uid"
                                type="text"
                                value={(data.uid)}
                                onChange={handleChange} />

                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: '12px', float: 'right' }}>
                        <Button color="primary" id='btnSave' variant="contained" type="submit">
                            {editData ? 'Update' : 'Save'}
                        </Button>
                        {/* <Cancel />s */}
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

export default EmployeeMasterAdd;