import { Button, Grid, Paper, DialogContent, Typography, MenuItem, Box, Snackbar, IconButton, Card, CardContent, Checkbox } from "@mui/material";
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
import { UploadIDProofVisitor, UploadPhotoVisitor, addInvitationOrVisitor, editDeleteInvitationOrVisitor, getDepartmentList, getEmployeeList, getVisitorPurposeList, } from "../../actions/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { VisitorInput } from "../reuse/VisitorInput";
import QRCode from 'qrcode'
import { getCurrentDateTime } from "../reuse/getCurrentDateTime";


const InvitationOrVisitorAdd = (props) => {
    const loginData = localStorage.getItem('loginUser');
    const loginInfor = JSON.parse(loginData);
    const loginUser = loginInfor.userInfo;
    const { handleSubmit } = useForm();
    const dispatch = useDispatch()

    const editData = props.editInfo;
    const editid = editData && editData.id;
    const [successMessage, setSuccessMessage] = useState(null)

    const [data, setData] = useState({
        id: editid,
        VType: editData ? editData.VType : loginUser.userRole == "Security" ? 'Walk-In Visitor' : 'Invited Visitor',
        visitor_name: editData ? editData.visitor_name : '',
        company_name: editData ? editData.company_name : '',
        mobile_number: editData ? editData.mobile_number : '',
        id_type: editData ? editData.id_type : '',
        id_number: editData ? editData.id_number : '',
        vehicle_number: editData ? editData.vehicle_number : '',
        person_accompanying: editData ? editData.person_accompanying : '',
        host_name: editData ? editData.host_name : loginUser.userRole == "Employee" ? loginUser.visitorId : null,
        department: editData ? editData.department : loginUser.userRole == "Employee" ? loginUser.empLoginDept : null,
        purpose: editData ? editData.purpose : null,
        visit_type: editData ? editData.visit_type : 'Official',
        meeting_location: editData ? editData.meeting_location : '',
        meeting_time: editData ? editData.meeting_time : '',
        expected_duration: editData ? editData.expected_duration : '',
        check_in_time: editData ? editData.check_in_time : '',
        // check_out_time_host: editData ? editData.check_out_time_host : '',
        // check_out_time_gate: editData ? editData.check_out_time_gate : '',
        selfReg: 0,
        // created_by: editData ? editData.created_by : loginUser.fullName + ' (' + loginUser.userName + ')',
        created_by : loginUser.userId,
        created_at: editData ? editData.created_at : getCurrentDateTime(),
        // modified_by: editData ? loginUser.fullName + ' (' + loginUser.userName + ')' : null,
        modified_at: editData ? getCurrentDateTime() : null,
        modified_by: loginUser.userId,
    })
    const [meeting_date, setMeeting_date] = useState(editData ? (editData.meeting_date) : dayjs(new Date()))
    const [notifyOption, setNotifyOption] = useState(editData ? editData.status === '' ? true : false : true );
    const [mailOption, setMailOption] = useState(editData ? editData.status === '' ? true : false : true );

    const purposeList = useSelector(state => state.visitorPurpose.visitorPurpose)
    const departmentList = useSelector(state => state.department.department)
    const HostList = useSelector(state => state.employee.employee)
    console.log("department" , departmentList)

    const handleChangeMeetingDate = (newValue) => {
        setMeeting_date(newValue);
    };
    const handleChange = ({ target }) => {
        const value = target.value;
        setData({
            ...data,
            [target.name]: value,
        });

        if (target.name === 'host_name') {
            const dept = HostList.find(({ id }) => id === target.value).department;
            data['department'] = dept
        }

        data[target.name] = target.value;

        const temp = Object.assign({}, data);
        setData(temp);
    }

    const handleCheckboxNotifyOption = (event) => {
        setNotifyOption(event.target.checked);
    };

    const handleCheckboxMailOption = (event) => {
        setMailOption(event.target.checked);
    };

    const idProof = useSelector(state => state.invitationOrVisitor.IdProofVisitor)
    const photo = useSelector(state => state.invitationOrVisitor.photoVisitor)

    const handleChangePhoto = async (event) => {
        const selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append('file', selectedFile);
        dispatch(UploadPhotoVisitor(formData))
    }

    const uploadIDFile = (event) => {
        const selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append('file', selectedFile);
        dispatch(UploadIDProofVisitor(formData))
    };

    const onSubmit = async (event) => {
        const code = Math.random().toString(36).slice(5);
        QRCode.toDataURL(`http://192.168.1.3:2449/api/visitorDetails?invitationCode=${editData ? editData.code : code}`, {
            width: 800,
            margin: 2,
        }, (err, scanncode) => {
            if (err) return console.error(err)
            let sendingData = {
                ...data,
                code: editData ? editData.code : code,
                scanCode: scanncode,
                meeting_date: meeting_date,
                upload_id: idProof == null ? editData ? editData.upload_id : null : idProof,
                upload_photo: photo == null ? editData ? editData.upload_photo : null : photo,
                changedUpdatedValue: 'edit',
                mailOption: editData ? editData.status === '' ? true : false : loginUser.userRole == "Security" ? mailOption : false,
                notifyOption: editData ? editData.status === '' ? true : false : loginUser.userRole == "Security" ? notifyOption : false,
                // status: editData ? editData.status === '' ? 'Request Sent' : editData.status : loginUser.userRole == "Security" ? 'Request Sent' : 'Allowed',
                status: editData ? editData.status === '' ? 'Request Sent' : editData.status : loginUser.userRole == "Security" ? 'Request Sent' : 'Invited',
              
            }
            console.log(sendingData)
            if (editData) {
                dispatch(editDeleteInvitationOrVisitor(sendingData));
                props.onEdit();
                props.handleCloseDialog();
            } else {
                dispatch(addInvitationOrVisitor(sendingData));
                props.onEdit();
                props.handleCloseDialog();
            }
        })

    }

    const handleCloseSuccessMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage(false)
    };


    useEffect(() => {
        dispatch(getVisitorPurposeList())
        dispatch(getDepartmentList())
        dispatch(getEmployeeList())
    }, []);

    // const timeConversion = () => {
    //     let ampm = hours >= 12 ? 'pm' : 'am';
    // }


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
                        <Grid item md={4} className="lableGrid">

                            <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>
                                <Card sx={{ minWidth: 295, backgroundColor: '#f2f2f2' }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                            Visitor Details
                                        </Typography>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Visitor Name</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid" >
                                            <VisitorInput
                                                required
                                                size="small"
                                                fullWidth
                                                name="visitor_name"
                                                type="text"
                                                value={(data.visitor_name)}
                                                onChange={handleChange} />
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Company Name</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid" >
                                            <VisitorInput
                                                size="small"
                                                fullWidth
                                                name="company_name"
                                                type="text"
                                                value={(data.company_name)}
                                                onChange={handleChange} />
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Mobile Number</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid" >
                                            <VisitorInput
                                                size="small"
                                                fullWidth
                                                name="mobile_number"
                                                type="text"
                                                value={(data.mobile_number)}
                                                onChange={handleChange} />
                                        </Grid>

                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Id Type </Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid" >
                                            <VisitorInput
                                                required
                                                select
                                                size="small"
                                                fullWidth
                                                name="id_type"
                                                type="text"
                                                value={(data.id_type)}
                                                onChange={handleChange}>
                                                <MenuItem className="menuItem" value="Aadhar Card">Aadhar Card </MenuItem>
                                                <MenuItem className="menuItem" value="Votting Card">Votting Card</MenuItem>
                                                <MenuItem className="menuItem" value="Pan Card">Pan Card</MenuItem>
                                                <MenuItem className="menuItem" value="Driving Licence">Driving Licence</MenuItem>
                                            </VisitorInput>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">ID Number</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid" >
                                            <VisitorInput
                                                required
                                                size="small"
                                                fullWidth
                                                name="id_number"
                                                type="text"
                                                value={(data.id_number)}
                                                onChange={handleChange} />
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Vehicle Number</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid">
                                            <VisitorInput
                                                size="small"
                                                fullWidth
                                                name="vehicle_number"
                                                type="text"
                                                value={(data.vehicle_number)}
                                                onChange={handleChange} />
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Person accompanying</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid">
                                            <VisitorInput
                                                size="small"
                                                fullWidth
                                                name="person_accompanying"
                                                type="text"
                                                value={(data.person_accompanying)}
                                                onChange={handleChange} />
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Upload ID</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid">
                                            <VisitorInput
                                                variant="standard"
                                                size="small"
                                                fullWidth
                                                name="upload_id"
                                                type="file"
                                                onChange={uploadIDFile}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                style={{ border: '1px solid #0000003b', borderRadius: '4px' }}
                                            />
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Upload / Take Photo</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid">
                                            <VisitorInput
                                                variant="standard"
                                                size="small"
                                                fullWidth
                                                name="upload_photo"
                                                type="file"
                                                onChange={handleChangePhoto}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                InputLabelProps={{ shrink: true }}
                                                accept="image/*"
                                                style={{ border: '1px solid #0000003b', borderRadius: '4px' }}
                                            />
                                        </Grid>
                                    </CardContent>

                                </Card>


                            </Grid>
                        </Grid>
                        {/* ----2nd col */}
                        <Grid item md={4} className="lableGrid">
                            <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>
                                <Card sx={{ minWidth: 295, backgroundColor: '#f2f2f2' }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                            Host Details
                                        </Typography>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Host Name </Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid" >
                                            <VisitorInput
                                                size="small"
                                                fullWidth
                                                select
                                                name="host_name"
                                                type="text"
                                                value={data.host_name}
                                                onChange={handleChange}
                                                inputProps={{
                                                    readOnly: loginUser.userRole === 'Employee' ? true : false
                                                }}
                                                >
                                                {HostList && HostList.map((host, index) => (
                                                    <MenuItem className="menuItem" value={host.id}>{host.employee_name} ({host.departmentName})</MenuItem>
                                                ))}
                                            </VisitorInput>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Department </Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid" >
                                            <VisitorInput
                                                select
                                                size="small"
                                                fullWidth
                                                name="department"
                                                type="text"
                                                value={(data.department)}
                                                onChange={handleChange}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                SelectProps={{ IconComponent: () => null }}
                                                // disabled
                                                >
                                                {departmentList && departmentList.map((dept, index) => (
                                                    <MenuItem className="menuItem" value={dept.id}>{dept.department}</MenuItem>
                                                ))}
                                            </VisitorInput>
                                        </Grid>

                                    </CardContent>
                                </Card>

                                <Card sx={{ minWidth: 295, backgroundColor: '#f2f2f2', marginTop: '20px' }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                            Meeting Details
                                        </Typography>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Meeting Location </Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid" >
                                            <VisitorInput
                                                size="small"
                                                fullWidth
                                                name="meeting_location"
                                                type="text"
                                                value={(data.meeting_location)}
                                                onChange={handleChange} />
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Meeting Date</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                    name="meeting_date"
                                                    inputFormat="DD/MM/YYYY"
                                                    value={meeting_date}
                                                    onChange={handleChangeMeetingDate}
                                                    renderInput={(params) => <VisitorInput {...params}
                                                        fullWidth />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Meeting Time</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid">
                                            <VisitorInput
                                                size="small"
                                                fullWidth
                                                name="meeting_time"
                                                type="time"
                                                value={(data.meeting_time)}
                                                onChange={handleChange} />
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Expected Duration (Min)</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid">
                                            <VisitorInput
                                                size="small"
                                                fullWidth
                                                name="expected_duration"
                                                type="number"
                                                value={(data.expected_duration)}
                                                onChange={handleChange} />
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Purpose </Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid" >
                                            <VisitorInput
                                                required
                                                select
                                                size="small"
                                                fullWidth
                                                name="purpose"
                                                type="text"
                                                value={(data.purpose)}
                                                onChange={handleChange} >
                                                {purposeList && purposeList.map((pur, index) => (
                                                    <MenuItem className="menuItem" value={pur.id}>{pur.purpose}</MenuItem>
                                                ))}


                                            </VisitorInput>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">Visit Type</Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid" >
                                            <VisitorInput
                                                select
                                                size="small"
                                                fullWidth
                                                name="visit_type"
                                                type="text"
                                                value={(data.visit_type)}
                                                onChange={handleChange}>
                                                <MenuItem className="menuItem" value="Official">Official </MenuItem>
                                                <MenuItem className="menuItem" value="Personal">Personal</MenuItem>
                                            </VisitorInput>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item md={4} className="lableGrid">
                            <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>
                                {loginUser.userRole == "Security" &&
                                    <>
                                        <Card sx={{ minWidth: 295, backgroundColor: '#f2f2f2' }}>
                                            <CardContent>
                                                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                    Check In-Out Details
                                                </Typography>

                                                <Grid item md={12} xs={12} className="lableGrid">
                                                    <Typography className="Inputlable">Check-In Time</Typography>
                                                </Grid>
                                                <Grid item md={12} xs={12} className="inputGrid">
                                                    <VisitorInput
                                                        size="small"
                                                        fullWidth
                                                        name="check_in_time"
                                                        type="time"
                                                        value={(data.check_in_time)}
                                                        onChange={handleChange} />
                                                </Grid>
                                                {/* 
                                                <Grid item md={12} xs={12} className="lableGrid">
                                                    <Typography className="Inputlable">Check-Out Time-Gate</Typography>
                                                </Grid>
                                                <Grid item md={12} xs={12} className="inputGrid">
                                                    <VisitorInput
                                                        size="small"
                                                        fullWidth
                                                        name="check_out_time_gate"
                                                        type="time"
                                                        value={(data.check_out_time_gate)}
                                                        onChange={handleChange} />
                                                </Grid> */}

                                            </CardContent>
                                        </Card>
                                    </>
                                }
                                {loginUser.userRole == "Security" &&
                                    <>
                                        <Grid item md={12} xs={12} className="lableGrid">
                                            <Typography className="Inputlable">
                                                <Checkbox
                                                    size="small"
                                                    name="notifyOption"
                                                    checked={notifyOption}
                                                    onChange={handleCheckboxNotifyOption}
                                                />
                                                Send Notification In system
                                            </Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="inputGrid">
                                            <Typography className="Inputlable">
                                                <Checkbox
                                                    size="small"
                                                    name="mailOption"
                                                    checked={mailOption}
                                                    onChange={handleCheckboxMailOption}
                                                />
                                                Send Notification by mail
                                            </Typography>
                                        </Grid>
                                    </>
                                }
                                <Grid item md={12} xs={12} sx={{
                                    display: 'grid',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Button color="primary" variant="contained" type="submit" style={{
                                        backgroundColor: '#336699', width: '300px', height: '150px', borderRadius: '22px', fontSize: '70px',
                                        display: 'grid', justifyContent: 'center', alignItems: 'center', textTransform: 'none'
                                    }}>
                                        {/* <InsertInvitationIcon sx={{fontSize:'77px', }}/>  */}
                                        {editData ? 'Update' : 'Save'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: '12px', float: 'right' }}>
                        {/* <Button color="primary" id='btnSave' variant="contained" type="submit">
                            {editData ? 'Update' : 'Save'}
                        </Button> */}
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

export default InvitationOrVisitorAdd;