import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled, Box, useTheme } from '@mui/system'
import {
    Icon,
    Badge,
    Card,
    Button,
    IconButton,
    Drawer,
    Avatar,
    Typography,
    TextField,
    MenuItem,
    Grid,
} from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ClearIcon from '@mui/icons-material/Clear';
import { editDeletenotifications, getAcceptedNotificationList, getNotificationList, getInvitationOrVisitorList, editDeleteInvitationOrVisitor } from "../../actions/actions"
import { useDispatch, useSelector } from 'react-redux';
// import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getCurrentTime } from "../reuse/getCurrentTime";

// import Typography from '@mui/material/Typography';

const Notification = styled('div')(() => ({
    padding: '16px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    height: 64,
    // boxShadow: themeShadows[6],
    '& h5': {
        marginLeft: '8px',
        marginTop: 0,
        marginBottom: 0,
        fontWeight: '500',
    },
}))

const NotificationCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    '& .messageTime': {
        color: '#86868b',
        fontSize: '14px',
        marginTop: '2px',
        float: 'right'
    },
    '& .icon': { fontSize: '1.25rem' },
}))

const NotificationBar = ({ container }) => {

    const loginData = localStorage.getItem('loginUser');
    const loginInfor = JSON.parse(loginData);
    const loginUser = loginInfor.userInfo;

    const dispatch = useDispatch()
    const theme = useTheme()
    const [panelOpen, setPanelOpen] = React.useState(false)
    const [isUpdateArray, setIsUpdateArray] = React.useState(false);

    const [notifications, setNotications] = React.useState([]);

    const handleDrawerToggle = () => {
        setPanelOpen(!panelOpen)
    }

    const handleAcceptReject = (notifyId, visitor_id, flag, status , check_in_time) => {
        dispatch(editDeletenotifications({ 
            notifyId: notifyId, visitor_id: visitor_id, flag: flag, status: status ,
            check_in_time :  getCurrentTime() 
        }))
        setPanelOpen(!panelOpen)
        dispatch(getInvitationOrVisitorList({ host_name: loginUser.userId == undefined ? null : loginUser.userId }))   
    
    }

    const handleMultipleInput = (e, i) => {
        const array = notifications;
        let result = array[i];

        result[e.target.name] = e.target.value;
        array[i] = result;

        setNotications(array)
        setIsUpdateArray(isUpdateArray ? false : true);
    }

    const [shouldShowMsg, setShouldShowMsg] = useState(false);
    const responseMessage = useSelector(state => state.notification.message);

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

    const submitDetails = (e, index) => {
        const sendingData = {
            entryName: notifications[index].entryName,
        }
        // axios.post(basicURL + '', sendingData, {
        //     headers: {
        //         'x-access-token': sessionStorage.getItem('token')
        //     }
        // })
        //     .then((response) => {
        //         setPanelOpen(false);
        //         // getData()
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    const dateConversion = (date) => {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        const convDate = dd + "/" + mm + "/" + yyyy;
        return convDate;
    };

    const timeConversion = (meeting_time) => {
        var time = meeting_time
        var second = meeting_time.slice(0, 5)
        const convtime = time + second
        return convtime
    }

    const rows = useSelector(state => state.notification.notification)
    const rowsacceptednotification = useSelector(state => state.notification.notificationaccepted)
    console.log("acceptednotification", rowsacceptednotification)

    const fetchData = () => {
        dispatch(getNotificationList())
        dispatch(getAcceptedNotificationList())
        dispatch(getInvitationOrVisitorList({ host_name: loginUser.userId == undefined ? null : loginUser.userId }))
    }
    const count = Object.keys(rows === null ? '' : rows).length

    const acceptcount = Object.keys(rowsacceptednotification === null ? '' : rowsacceptednotification).length
    // console.log("acceptcount", acceptcount)

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Fragment>
            <IconButton sx={{ backgroundColor: '#ffffff !important' }} onClick={handleDrawerToggle}>
                <Badge color="error"
                    badgeContent={loginUser.userRole === "Employee" ? count : "0"}
                >
                    <NotificationsIcon sx={{ color: '#000000' }}></NotificationsIcon>
                </Badge>

                {/* {loginUser.userRole === "Employee" &&
                    <Badge color="error" badgeContent={count}>
                        <NotificationsIcon sx={{ color: '#000000' }}></NotificationsIcon>
                    </Badge>
                }
                {loginUser.userRole === "Security" &&
                    <Badge color="error" badgeContent={acceptcount}>
                        <NotificationsIcon sx={{ color: '#000000' }}></NotificationsIcon>
                    </Badge>
                } */}
                <Typography sx={{ color: '#000000' }}> Notifications </Typography>
            </IconButton>

            <Drawer
                width={'100%'}
                container={container}
                variant="temporary"
                anchor={'right'}
                open={panelOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Notification >
                        <Grid container spacing={2} >
                            <Grid item sx={1} md={1} xs={1}>
                                <NotificationsIcon style={{ color: "#ff0000" }}></NotificationsIcon>
                            </Grid>
                            <Grid item sx={10} md={10} xs={10}>
                                <Typography style={{ fontSize: '16px', marginLeft: '12px', fontWeight: 600, }}>All Notifications </Typography>
                            </Grid>
                            <Grid item sx={1} md={1} xs={1}>
                                <ClearIcon color="error" onClick={handleDrawerToggle} style={{ fontSize: '20px', fontWeight: 600, float: 'right', cursor: 'pointer' }} />
                            </Grid>
                        </Grid>
                    </Notification>
                    {/* {alertDetails.hostName === "Kartik Shubhedar " && */}
                    {rows && rows.map((alertDetails, index) => (
                        <span key={alertDetails.id}>
                            <NotificationCard>
                                {loginUser.userRole === "Employee" &&
                                    <>
                                        <>
                                            <Card
                                                elevation="7"
                                                style={{
                                                    borderRadius: "5px",
                                                    backgroundColor: "#F7F9F9",
                                                    marginLeft: "15px", marginRight: "15px", marginBottom: "15px", height: "100px"
                                                }}>
                                                <CardContent>
                                                    <Typography style={{ fontSize: "11px" }}>Visitor :  {alertDetails.visitor_name}</Typography>
                                                    <Typography style={{ fontSize: "11px" }}>Purpose :  {alertDetails.purposeName}</Typography>

                                                    <Grid container spacing={4}>
                                                        <Grid item xs={6}>
                                                            <Typography style={{ fontSize: "11px" }}>Time :  {alertDetails.meeting_time} </Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography style={{ fontSize: "11px" }}>Duration :  {alertDetails.expected_duration}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={6}>
                                                            <Button sx={{ fontSize: "10px", height: "18px", background: "#336699", textDecoration: 'none' }} variant='contained' color="primary" type="submit" onClick={() => handleAcceptReject(alertDetails.id, alertDetails.visitor_id, 1, 'Allowed', alertDetails.check_in_time)}>Accept</Button>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Button sx={{ fontSize: "10px", height: "18px" }} variant='contained' color="error" type="submit" onClick={() => handleAcceptReject(alertDetails.id, alertDetails.visitor_id, 2, 'Rejected')}>Reject22</Button>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </>
                                        {/* } */}
                                    </>
                                }
                                {/* {loginUser.userRole === "Security" &&
                                    <>
                                        {rowsacceptednotification && rowsacceptednotification.map((accepted, index) => (
                                            <span key={accepted.id}>
                                                <Card
                                                    elevation="7"
                                                    style={{
                                                        borderRadius: "5px",
                                                        backgroundColor: "#F7F9F9",
                                                        marginLeft: "15px", marginRight: "15px", marginBottom: "15px", height: "100px"
                                                    }}>
                                                    <CardContent>
                                                        <Typography style={{ fontSize: "11px" }}>Visitor :  {accepted.visitor_name}</Typography>
                                                        <Typography style={{ fontSize: "11px" }}>Purpose :  {accepted.purposeName}</Typography>
                                                        <Typography style={{ fontSize: "11px" }}>Host Name :  {alertDetails.hostName} </Typography>
                                                        <Grid container spacing={8}>
                                                            <Grid item xs={6}>
                                                                
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                            <Typography sx={{ fontSize: "12px", color: "green" , fontWeight:"bold"}} variant='contained' type="submit">Accepted</Typography> 
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </span>
                                        ))}
                                    </>
                                } */}
                            </NotificationCard>
                        </span>
                    ))}

                </Box>
            </Drawer>
        </Fragment >
    )
}

export default NotificationBar;

//    {alertDetails.hostName === "Kartik Shubhedar " && 
{/* <Typography style={{fontSize:"12px"}}> {alertDetails.visitor_name}</Typography> */ }