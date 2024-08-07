import React, { Fragment } from 'react'
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
        marginTop: '3px',
        float: 'right'
    },
    '& .icon': { fontSize: '1.25rem' },
}))

const MessagesBar = ({ container }) => {
    const theme = useTheme()
    const [panelOpen, setPanelOpen] = React.useState(false)
    const [isUpdateArray, setIsUpdateArray] = React.useState(false);

    const [notifications, setNotications] = React.useState([ ]);

    const handleDrawerToggle = () => {
        setPanelOpen(!panelOpen)
    }

    const handleMultipleInput = (e, i) => {
        const array = notifications;
        let result = array[i];

        result[e.target.name] = e.target.value;
        array[i] = result;

        setNotications(array)
        setIsUpdateArray(isUpdateArray ? false : true);
    }
    useEffect(() => {
        // getData()
    }, [])

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

    return (
        <Fragment>
            <IconButton onClick={handleDrawerToggle} >
                <Badge color="error" badgeContent={4}>
                    <NotificationsIcon sx={{ color: '#ffffff' }}>    </NotificationsIcon>
                </Badge>
                <Typography sx={{ color: '#ffffff' }}> Messages </Typography>
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
                                <NotificationsIcon style={{ color: "#ff0000",  }}></NotificationsIcon>
                            </Grid>
                            <Grid item sx={10} md={10} xs={10}>
                                <Typography style={{ fontSize: '16px', marginLeft:'12px', fontWeight: 600, }}>All Messages </Typography>
                            </Grid>
                            <Grid item sx={1} md={1} xs={1}>
                                <ClearIcon color="error" onClick={handleDrawerToggle} style={{ fontSize: '20px', fontWeight: 600, float: 'right', cursor: 'pointer' }} />
                            </Grid>
                        </Grid>
                    </Notification>

                    {notifications?.map((alertDetails, index) => (
                        <NotificationCard >
                           
                        </NotificationCard>
                    ))}

                </Box>
            </Drawer>
        </Fragment >
    )
}

export default MessagesBar
