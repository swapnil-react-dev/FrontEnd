import { Box, Button, ButtonGroup, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import visitor from "../images/guest_pass.jpeg"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { editDeleteInvitationOrVisitor, visitorDetailsThroughCode } from "../../actions/actions";
import { useNavigate } from "react-router-dom";


const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

const Authorization = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get("visitorCode")
    const navigate = useNavigate();

    const dispatch = useDispatch()
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
                if (responseMessage === 'Record updated successfully!') {
                    navigate('/selfRegistrationMgs?msg=success')
                } else {
                    navigate('/selfRegistrationMgs?msg=failure')
                }
                dispatch({ type: 'RESET_MESSAGE' }); // Dispatch an action to reset the message
            }
        }
    }, [shouldShowMsg, responseMessage]);

    const visitorDetails = useSelector(state => state.invitationOrVisitor.visitorDetailsThroughCode)

    useEffect(() => {
        dispatch(visitorDetailsThroughCode({ invitationCode: code }))
    }, []);

    const handleStatus = (info) => {
        dispatch(editDeleteInvitationOrVisitor({ code: code, _id: visitorDetails._id, changedUpdatedValue: info }));
    }

    return (
        <>
            {visitorDetails && visitorDetails.status === 'Request Sent' &&
                <Paper sx={{ boxShadow: 'none', maxWidth: '500px', marging: 2 }}>
                    <Box style={{ border: '2px solid #c0c0c0' }}>
                        <Grid container spacing={1} sx={{ pt: 1, pl: 2 }}>
                            <Grid item md={5}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Host Details </Typography>
                            </Grid>
                            <Grid item md={7}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Visitor Details </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Box>
                            <Grid container spacing={1} sx={{ pt: 1, pl: 2 }}>
                                <Grid item md={5} >
                                    <Typography className="guestpass">{visitorDetails.host_name.employee_name}</Typography>
                                    <Typography className="guestpass"> Meeting At: {visitorDetails.meeting_location} </Typography>
                                    <Typography className="guestpass"> Meeting Time: {visitorDetails.meeting_time}</Typography>
                                    <Typography className="guestpass"> Expected Duration:{visitorDetails.expected_duration}</Typography>
                                    <Typography className="guestpass"> </Typography>
                                </Grid>
                                <Grid item md={7}>
                                    <img src={visitor} style={{ height: '150px', marginBottom: '10px' }} />
                                    <Typography className="guestpass"> {visitorDetails.visitor_name} </Typography>
                                    <Typography className="guestpass"> {visitorDetails.company_name} </Typography>
                                    <Typography className="guestpass"> {visitorDetails.mobile_number} </Typography>
                                    <Typography className="guestpass"> Metting Purpose: {visitorDetails.purpose.purpose} </Typography>
                                    {/* <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography className="guestpass"> Vehicle Allowed :  </Typography>
                                    <Typography className="guestpass">NO</Typography>
                                    <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                    <Typography className="guestpass">Yes</Typography>
                                </Stack> */}
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ margin: '10px' }}>

                            <ButtonGroup variant="outlined" aria-label="text button group" >
                                <Button onClick={() => handleStatus('allow')}>Allow</Button>
                                <Button onClick={() => handleStatus('reject')}>Reject</Button>
                            </ButtonGroup>
                            {/* <Icon icon="logos:whatsapp-icon"  width="25" height="25" style={{float:'right', marginLeft:'10px'}}/>  */}
                        </Box>

                        {/* <WhatsAppIcon sx={{float:'right'}}/> */}
                    </Box>
                </Paper>
            }
        </>
    )
}
export default Authorization;