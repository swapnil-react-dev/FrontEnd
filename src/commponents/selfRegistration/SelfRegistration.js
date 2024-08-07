import { Box, Button, ButtonGroup, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import visitor from "../images/guest_pass.jpeg"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import QRCode from 'qrcode'
import { useNavigate } from "react-router-dom";
import { generateCode } from "../../actions/actions";
import { getCurrentDateTime } from "../reuse/getCurrentDateTime";



const SelfRegistration = (props) => {
    const navigate = useNavigate()
    const loginData = localStorage.getItem('loginUser');
    const loginInfor = JSON.parse(loginData);
    const loginUser = loginInfor.userInfo;

    const [isVisible, setIsVisible] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(300);
    const [finalCode, setFinalCode] = useState('')
    // const generatedCodeData = useSelector(state => state.invitationOrVisitor.generateCode)
    const generatedCodeData = useSelector(state => state.invitationOrVisitor.generateCode)
    console.log("barcode" , generatedCodeData)
    const { handleSubmit } = useForm();
    const dispatch = useDispatch()
    const code = Math.random().toString(36).slice(5);
    const [shouldShowMsg, setShouldShowMsg] = useState(false);
    const responseMessage = useSelector(state => state.invitationOrVisitor.message);
    const editData = props.editInfo;
    const editid = editData && editData.id;
    
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
            }
        }
    }, [shouldShowMsg, responseMessage]);
    
    //when upload on server change Ip address of barcode
    // QRCode.toDataURL(`http://192.168.1.5:3000/visitorDetails?invitationCode=${code}`, { 
    const onSubmit = (event) => {
        QRCode.toDataURL(`http://192.168.43.125:3000/visitorDetails?invitationCode=${code}`, { 
            width: 800,
            margin: 2,
        }, (err, scanncode) => {
            if (err) return console.error(err)
            let sendingData = {
            code: code,
            scanCode: scanncode,
                selfReg: 1,
                purpose: null,
                host_name: null,
                department: null,
                // created_by: loginUser.fullName + ' (' + loginUser.userName + ')',
                created_by : loginUser.userId,
                created_at: getCurrentDateTime(),
                modified_by: null,
                modified_at: null,
                status: '',
                VType: editData ? editData.VType : loginUser.userRole == "Security" ? 'Walk-In Visitor' : 'Invited Visitor',
            }
            setFinalCode(code)
            dispatch(generateCode(sendingData));
            setSecondsLeft(300);
            setIsVisible(true);
        })
        
    }  
    useEffect(() => {
        if (secondsLeft > 0) {
            const timer = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [secondsLeft]);
    
    const convertToDisplayTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };
    
    return (
        <>
            <Paper className="listPaper" sx={{ boxShadow: 'none', }}>
                <Grid container spacing={2} sx={{ mt: 2, }}>

                    <Grid item md={12} xs={12} style={{ justifyContent: 'center', display: 'flex', position: 'relative', top: '40%', }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Button variant="contained" type="submit" style={{ background: '#336699', textAlign: 'center', maxWidth: '300px', maxHeight: '100px', minWidth: '250px', minHeight: '100px', fontSize: '20px', fontWeight: 'bold', }}>
                                Generate QR Code
                            </Button>
                        </form>
                    </Grid>
                    <Grid item md={12} xs={12} style={{ justifyContent: 'center', display: 'flex', position: 'relative', top: '40%' }}>
                        {isVisible === true &&
                            <Box>
                                <Typography> Scan QR  with help of Google Lens</Typography>
                                <img src={generatedCodeData} width="250" height='250' />
                                <h4 style={{ display: 'flex', justifyContent: 'center', marginTop: '0px', width: '250px' }}>{finalCode}</h4>
                                <h1 style={{ display: 'flex', justifyContent: 'center', }}>{convertToDisplayTime(secondsLeft)}</h1>
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Paper >
        </>
    )
}
export default SelfRegistration;