import { Button, Grid, Paper, DialogContent, Typography, MenuItem, Box, Snackbar, IconButton, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { UploadIDProofVisitor, UploadPhotoVisitor, addInvitationOrVisitor, editDeleteInvitationOrVisitor, getDepartmentList, getVisitorPurposeList, visitorDetailsThroughCode, } from "../../actions/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { VisitorInput } from "../reuse/VisitorInput";

import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SelfRegistrationAdd = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get("invitationCode")
        // const loginData = localStorage.getItem('loginUser');
        // const loginInfor = JSON.parse(loginData);
        // const loginUser = loginInfor.userInfo;
        // console.log("userinfo", loginUser)
        
    const [value, setValue] = React.useState(0);
    const tabCount = 3;
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const { handleSubmit } = useForm();
    const dispatch = useDispatch()

    const visitorDetails = useSelector(state => state.invitationOrVisitor.visitorDetailsThroughCode)

    useEffect(() => {
        dispatch(visitorDetailsThroughCode({ invitationCode: code }))
    }, []);

    const navigate = useNavigate();

    const editData = visitorDetails;
    console.log("datavms", editData)
    const editid = editData && editData.id;
    const [successMessage, setSuccessMessage] = useState(null)
    const [data, setData] = useState({
        id: editid,
        visitor_name: editData ? editData.visitor_name : '',
        company_name: editData ? editData.company_name : '',
        mobile_number: editData ? editData.mobile_number : '',
        id_type: editData ? editData.id_type : '',
        id_number: editData ? editData.id_number : '',
        purpose: editData ? editData.purpose : null,
        visit_type: editData ? editData.visit_type : 'Official',
        host_name: editData ? editData.host_name : '',
        department: editData ? editData.department : null,
        meeting_location: editData ? editData.meeting_location : '',
        meeting_time: editData ? editData.meeting_time : '',
        expected_duration: editData ? editData.expected_duration : '',
        vehicle_number: editData ? editData.vehicle_number : '',
        person_accompanying: editData ? editData.person_accompanying : '',
        check_in_time: editData ? editData.check_in_time : '',
        // VType: editData ? editData.VType : loginUser.userRole == "Security" ? 'Walk-In Visitor' : 'Invited Visitor',
        VType: 'Walk-In Visitor',
        selfReg: 0,
        
    })
    const [meeting_date, setMeeting_date] = useState(dayjs(new Date()))

    const handleChangeMeetingDate = (newValue) => {
        setMeeting_date(newValue);
    };
    const handleChange = ({ target }) => {
        const value = target.value;
        setData({
            ...data,
            [target.name]: value,
        });
        data[target.name] = target.value;
    }

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
            if (responseMessage === 'Record updated successfully') {
               navigate('/selfRegistrationMgs?msg=success')
            } else {
                navigate('/selfRegistrationMgs?msg=failure')
            }
            dispatch({ type: 'RESET_MESSAGE' }); // Dispatch an action to reset the message
            }
        }
    }, [shouldShowMsg, responseMessage]);

    const onSubmit = async (event) => {
        let sendingData = {
            ...data,
            id: editData.id,
            code: code,
            upload_id: idProof,
            upload_photo: photo,
            meeting_date: meeting_date,
            check_out_time_host: null,
            check_out_time_gate: null,
            changedUpdatedValue: 'selfRegistration'
        }
        dispatch(editDeleteInvitationOrVisitor(sendingData));
    }

    const handleCloseSuccessMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage(false)
    };
    const purposeList = useSelector(state => state.visitorPurpose.visitorPurpose)
    
    const departmentList = useSelector(state => state.department.department)
    useEffect(() => {
        dispatch(getVisitorPurposeList())
        dispatch(getDepartmentList())
        dispatch(visitorDetailsThroughCode({ invitationCode: code}))
    }, []);


    const dateString = editData && editData.created_at;
    const date = new Date(dateString);
    const now = new Date();
    const timeDifference = now.getTime() - date.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    // if (minutesDifference > 20) {
    //     console.log("time expired");
    // } else {
    //     console.log("time not expired");
    // }

    return (
        <>
            <Paper className='listPaper' sx={{ boxShadow: 'none' }}>
                {editData && editData.selfReg === 1 ?
                    minutesDifference > 20 ?
                        <h1>QR Code Expired!</h1>
                        :
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example" indicatorColor="primary"
                                         textColor="primary"
                                        centered="true">
                                        <Tab label="Visitor" {...a11yProps(0)} />
                                        <Tab label="Meeting" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>

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
                                        {/* </CardContent>
                        </Card> */}
                                    </Grid>

                                </TabPanel>

                                <TabPanel value={value} index={1}>
                                    <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>

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
                                            <Typography className="Inputlable">Visit Type </Typography>
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
                                        {/* </CardContent>
                                          </Card> */}
                                    </Grid>

                                </TabPanel>

                                {value == '0' &&

                                    <Button className="nextBtn" onClick={() => setValue((value + 1) % tabCount)} sx={{ float: 'right' }}>Next
                                        <div class="chevrons">
                                            <div class='chevronright'></div>
                                            <div class='chevronright'></div>
                                        </div></Button>

                                }

                                {value == '1' &&
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button className="prevBtn" onClick={() => setValue((value + tabCount - 1) % tabCount)} sx={{ border: '1px solid #c0c0c0 !importatnt' }}>
                                            <div class="chevrons">
                                                <div class='chevrondown'></div>
                                                <div class='chevrondown'></div>
                                            </div>Prev</Button>
                                        <Box sx={{ float: 'right' }}>
                                            <Button color="primary" id='btnSave' variant="contained" type="submit">
                                                Save
                                            </Button>
                                        </Box>
                                    </div>
                                }

                            </Box>
                        </form>
                    :
                    // editData && editData.selfReg === 0 && 
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Type</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                <Typography>{editData.VType}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Visitor Name</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                <Typography>{editData.visitor_name}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Company Name</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                <Typography>{editData.company_name}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Host Name</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                {/* <Typography>{editData.host_name === null ? '-' : editData.host_name.employee_name}</Typography> */}
                                <Typography>{editData.hostName === null ? '-' : editData.hostName}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Department</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                {/* <Typography>{editData.department === null ? '-' :  editData.department.department}</Typography> */}
                                <Typography>{editData.department === 'null' ? '-' : editData.department}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Purpose</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                <Typography>{editData.purpose === null ? '-' :  editData.purposeName}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Meeting Time</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                <Typography>{editData.meeting_time}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Meeting Location</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                <Typography>{editData.meeting_location}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Check In Time</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                <Typography>{editData.check_in_time}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Check Out Time (Host)</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                <Typography>{editData.check_out_time_host}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Check Out Time (Gate)</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                <Typography>{editData.check_out_time_gate}</Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography style={{ fontWeight: 600 }}>Status</Typography>
                            </Grid>
                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                <Typography style={{ fontWeight: 600 }}>:</Typography>
                            </Grid>
                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                <Typography>{editData.status}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                }
            </Paper>
        </>
    )
}
export default SelfRegistrationAdd;

// remove second
// .slice(0,5)
