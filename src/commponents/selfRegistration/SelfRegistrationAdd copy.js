import { Button, Grid, Paper, DialogContent, Typography, MenuItem, Box, Snackbar, IconButton, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { addInvitationOrVisitor, editDeleteInvitationOrVisitor, getDepartmentList, getVisitorPurposeList, } from "../../actions/actions";
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

const SelfRegistrationAdd = (props) => {
    const [value, setValue] = React.useState(0);
    const tabCount = 3;
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const loginData = localStorage.getItem('loginUser');
    const loginUser = JSON.parse(loginData);
    const { handleSubmit } = useForm();
    const dispatch = useDispatch()

    const editData = props.editInfo;
    const editid = editData && editData._id;
    const [successMessage, setSuccessMessage] = useState(null)

    const [data, setData] = useState({
        _id: editid,
        type: editData ? editData.type : '',
        visitor_name: editData ? editData.visitor_name : '',
        company_name: editData ? editData.company_name : '',
        mobile_number: editData ? editData.mobile_number : '',
        id_type: editData ? editData.id_type : '',
        id_number: editData ? editData.id_number : '',
        purpose: editData ? editData.purpose : null,
        visit_type: editData ? editData.visit_type : '',
        host_name: editData ? editData.host_name : '',
        department: editData ? editData.department : null,
        meeting_location: editData ? editData.meeting_location : '',
        meeting_time: editData ? editData.meeting_time : '',
        expected_duration: editData ? editData.expected_duration : '',
        vehicle_number: editData ? editData.vehicle_number : '',
        person_accompanying: editData ? editData.person_accompanying : '',
        check_in_time: editData ? editData.check_in_time : '',
        upload_id: editData ? editData.upload_id : '',
        upload_photo: editData ? editData.upload_photo : '',
        status: '',
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


    const onSubmit = async (event) => {
        let sendingData = {
            ...data,
            changedUpdatedValue: 'edit'
        }
        if (editData) {
            dispatch(editDeleteInvitationOrVisitor(sendingData));
            setSuccessMessage("Record Updated Successfully!")
            props.onEdit();
            props.handleCloseDialog();
        } else {
            dispatch(addInvitationOrVisitor(sendingData));
            setSuccessMessage("Record Added Successfully!")
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
    const purposeList = useSelector(state => state.visitorPurpose.visitorPurpose)
    const departmentList = useSelector(state => state.department.department)
    useEffect(() => {
        dispatch(getVisitorPurposeList())
        dispatch(getDepartmentList())
    }, []);

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
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example" indicatorColor="primary"
                                textColor="primary"
                                centered="true">
                                <Tab label="Visitor" {...a11yProps(0)} />
                                <Tab label="Host" {...a11yProps(1)} />
                                <Tab label="Meeting" {...a11yProps(2)} />
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
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        name="upload_id"
                                        type="file"
                                        value={(data.upload_id)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Upload / Take Photo</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid">
                                    <VisitorInput
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        name="upload_photo"
                                        type="file"
                                        value={(data.upload_photo)}
                                        onChange={handleChange} />
                                </Grid>
                                {/* </CardContent>
                        </Card> */}
                            </Grid>

                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>

                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Host Name </Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="host_name"
                                        type="text"
                                        value={(data.host_name)}
                                        onChange={handleChange} />
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
                                        onChange={handleChange}>

                                        {departmentList && departmentList.map((dept, index) => (
                                            <MenuItem className="menuItem" value={dept._id}>{dept.department}</MenuItem>
                                        ))}
                                    </VisitorInput>
                                </Grid>


                            </Grid>

                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>
                                {/* <Card sx={{ minWidth: 295, backgroundColor: '#f2f2f2', marginTop: '20px' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                    Meeting Details
                                </Typography> */}
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
                                    <Typography className="Inputlable">Expected Duration </Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid">
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="expected_duration"
                                        type="text"
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
                                            <MenuItem className="menuItem" value={pur._id}>{pur.purpose}</MenuItem>
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
                                        <MenuItem className="menuItem" value="Official-default">Official-default </MenuItem>
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
                                <Button className="prevBtn" onClick={() => setValue((value + tabCount - 1) % tabCount)}>
                                    <div class="chevrons">
                                        <div class='chevrondown'></div>
                                        <div class='chevrondown'></div>
                                    </div>
                                    Prev</Button>
                                <Button className="nextBtn" onClick={() => setValue((value + 1) % tabCount)}> Next
                                    <div class="chevrons">

                                        <div class='chevronright'></div>
                                        <div class='chevronright'></div>

                                    </div>

                                </Button>
                            </div>
                        }
                        {value == '2' &&
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button className="prevBtn" onClick={() => setValue((value + tabCount - 1) % tabCount)} sx={{ border: '1px solid #c0c0c0 !importatnt' }}>
                                    <div class="chevrons">
                                        <div class='chevrondown'></div>
                                        <div class='chevrondown'></div>
                                    </div>Prev</Button>
                                <Box sx={{ float: 'right' }}>
                                    <Button type="button" variant="contained" color="error" id='btnCancel'  >
                                        cancel
                                    </Button>
                                    <NavLink to="/selfRegistrationMgs">
                                        <Button color="primary" id='btnSave' variant="contained" type="submit">
                                            {editData ? 'Update' : 'Save'}
                                        </Button>
                                    </NavLink>
                                </Box>
                            </div>
                        }

                    </Box>
                </form>

                {/* <Grid container spacing={1} sx={{ pt: 1 }}>
                     
                        <Grid item md={12} className="lableGrid">
                            <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>
                                {loginUser.userInfo.user_role == "Security" &&
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
                                                    type="text"
                                                    value={(data.check_in_time)}
                                                    onChange={handleChange} />
                                            </Grid>
                                            <Grid item md={12} xs={12} className="lableGrid">
                                                <Typography className="Inputlable">Check-Out Time-Host</Typography>
                                            </Grid>
                                            <Grid item md={12} xs={12} className="inputGrid">
                                                <VisitorInput
                                                    size="small"
                                                    fullWidth
                                                    name="check_out_time_host"
                                                    type="text"
                                                    value={(data.check_out_time_host)}
                                                    onChange={handleChange} />
                                            </Grid>
                                            <Grid item md={12} xs={12} className="lableGrid">
                                                <Typography className="Inputlable">Check-Out Time-Gate</Typography>
                                            </Grid>
                                            <Grid item md={12} xs={12} className="inputGrid">
                                                <VisitorInput
                                                    size="small"
                                                    fullWidth
                                                    name="check_out_time_gate"
                                                    type="text"
                                                    value={(data.check_out_time_gate)}
                                                    onChange={handleChange} />
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                }
                            </Grid>
                        </Grid>
                    </Grid> */}


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

export default SelfRegistrationAdd;