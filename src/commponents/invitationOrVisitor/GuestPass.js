import { Box, Button, Grid, IconButton, MenuItem, Paper, Snackbar, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import visitor from "../images/guest_pass.jpeg"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';

const GuestPass = (props) => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const { handleSubmit } = useForm();
    const dispatch = useDispatch()
    const editData = props.editInfo;
    const editid = editData && editData._id;
    const [successMessage, setSuccessMessage] = useState(null)

    const [data, setData] = useState({
        _id: editid,
        visitor_name: editData ? editData.visitor_name : '',
        company_name: editData ? editData.company_name : '',
        mobile_number: editData ? editData.mobile_number : '',
        account_type: editData ? editData.account_type : '',
        branch_name: editData ? editData.branch_name : '',
        ifsc_code: editData ? editData.ifsc_code : '',
    })


    const dateConversion = (date) => {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        const convDate = dd + "/" + mm + "/" + yyyy;
        return convDate;
    };

    const handleShareAndGeneratePDF = (mobNo) => {
        const shareUrl = `https://api.whatsapp.com/send?phone=${mobNo}&text=Check out this PDF file`;
        window.open(shareUrl, '_blank')
        // // old
        // generatePDF()
        //   .then(function (pdfBase64) {
        //     handleShare(pdfBase64);
        //   })
      };
      
    //   const handleShare = (pdfBase64) => {
    //     // Function to share PDF through WhatsApp
    //     const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(pdfBase64)}`;
    //     window.open(shareUrl, '_blank')
    //   }
      
    //   const handleShare = (pdfBase64) => {
    //     // const pdfData = 'data:application/pdf;filename=generated.pdf;base64,JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIuIDc5Mi5dCi9Db250ZW50cyA0IDAgUgo+PgplbmRvYmoKNCAwIG9iago8PAovTGVuZ3RoIDY2Cj4+CnN0cmVhbQoxNC40MDE4MDAwMDAwMDAwMDE1IHcKMCBHCnEKNTQwLiAwIDAgMzkwLjc1IDM2LiAzNjUuMjUgY20KL0kwIERvClEKZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqCjw8L1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUiBdCi9Db3VudCAxCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNh…4gCjAwMDAwMDEwNzAgMDAwMDAgbiAKMDAwMDAwMTIwMiAwMDAwMCBuIAowMDAwMDAxMzM4IDAwMDAwIG4gCjAwMDAwMDE0NjYgMDAwMDAgbiAKMDAwMDAwMTU5MyAwMDAwMCBuIAowMDAwMDAxNzIyIDAwMDAwIG4gCjAwMDAwMDE4NTUgMDAwMDAgbiAKMDAwMDAwMTk1NyAwMDAwMCBuIAowMDAwMDAyMDUzIDAwMDAwIG4gCjAwMDAyMTA2NjQgMDAwMDAgbiAKMDAwMDIxMDc1MCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDIyCi9Sb290IDIxIDAgUgovSW5mbyAyMCAwIFIKL0lEIFsgPEQxQ0Q1NDEwNDkzOEE5MDIwQjA3RTg3QTMwODlDNzI4PiA8RDFDRDU0MTA0OTM4QTkwMjBCMDdFODdBMzA4OUM3Mjg+IF0KPj4Kc3RhcnR4cmVmCjIxMDg1NAolJUVPRg==';
    //   const pdfData = pdfBase64;
    //     // converts base64 PDF data to Uint8Array
    //     const byteCharacters = atob(pdfData.split(';base64,')[1]);
    //     const byteNumbers = new Array(byteCharacters.length);
    //     for (let i = 0; i < byteCharacters.length; i++) {
    //       byteNumbers[i] = byteCharacters.charCodeAt(i);
    //     }
    //     const byteArray = new Uint8Array(byteNumbers);
      
    //     // creates a blob of PDF data and sets href attribute of a link to PDF object URL
    //     const blob = new Blob([byteArray], { type: 'application/pdf' });
    //     const pdfUrl = URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = pdfUrl;
      
    //     // triggers click event of link to initiate WhatsApp share
    //     link.addEventListener('click', () =>
    //       window.open(
    //         `https://api.whatsapp.com/send?phone=${}&text=Check out this PDF file&data=${pdfUrl}`,
    //         '_blank'
    //       )
    //     );
    //     link.click();
    //   };
      
    // const handleShare = (pdfBase64) => {
    //     const pdfData = pdfBase64;

    //     // convert base64 PDF data to a Blob
    //     const pdfBlob = new Blob([atob(pdfData.split(',')[1])], {type: 'application/pdf'});
        
    //     // create a new URL object
    //     const url = new URL('https://web.whatsapp.com/send');
    //     // add text message to URL object
    //     url.searchParams.append('text', 'Check out this PDF file');
        
    //     // create a new blob object and add it to URL object
    //     url.searchParams.append('data', encodeURIComponent(URL.createObjectURL(pdfBlob)));
        
    //     // open WhatsApp web with pre-filled send message form with the PDF file attachment and text message
    //     window.open(url.toString(), '_blank');
    //   };
      
      
    //   const generatePDF = () => {
    //     return new Promise((resolve, reject) => {
    //       // Function to generate PDF
    //       const opt = {
    //         margin: 0.5,
    //         filename: 'GuestPass.pdf',
    //         image: { type: 'jpeg', quality: 0.98 },
    //         html2canvas: { scale: 2 },
    //         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    //       };
    //       html2pdf().from(componentRef.current).set(opt).toPdf().get('pdf').then(function (pdf) {
    //         const pdfBase64 = pdf.output('datauristring');
    //         resolve(pdfBase64);
    //       }).catch(reject);
    //     });
    //   }

    return (
        <>
            <Paper sx={{ boxShadow: 'none', }} >
                <Grid container spacing={1} >
                    <Grid item md={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                        <Box >
                            <Icon onClick={handlePrint} icon="flat-color-icons:print" width="38" height="38" className="guestPassBtn" style={{ marginRight: '8px' }} />
                            <Icon icon="logos:whatsapp-icon" width="38" height="38" className="guestPassBtn" onClick={() => handleShareAndGeneratePDF(editData.mobile_number)} />
                        </Box>
                    </Grid>
                    <Grid item md={12} ref={componentRef}>
                        <Box style={{ border: '2px solid #3366cc', margin: '20px' }}>
                            <Box>
                                <Typography sx={{ color: 'red', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}> PERFECT INDUSTRIES LTD </Typography>
                                <Typography sx={{ color: 'black', fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}>VISITOR PASS </Typography>
                            </Box>
                            <Box>
                                <Grid container spacing={1} sx={{ pl: 2 }}>
                                    <Grid item md={4}>
                                        <img src={editData.upload_photo === '' ? visitor : editData.upload_photo } style={{ height: '140px', width: '150px' }} />
                                    </Grid>
                                    <Grid item md={8} >
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}> {editData.visitor_name} </Typography>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}> {editData.company_name} </Typography>
                                        <Box >
                                            <img src={editData.scanCode} width="150" height='150' />
                                            <h4 style={{ display: 'flex', justifyContent: 'center', marginTop: '0px', width: '150px' }}>{editData.code}</h4>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Grid container spacing={1} sx={{ pl: 2 }}>
                                    <Grid item md={4}>
                                        <Icon icon="bxs:camera-off" width="45" height="54" />
                                        <Typography sx={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}>{editData.meeting_time}</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}> To Meet : {editData.hostName}</Typography>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}> Dept: {editData.department} </Typography>
                                        <Typography sx={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}> {dateConversion(editData.meeting_date)} </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Grid container spacing={1} sx={{ pl: 2 }}>
                                    <Grid item md={12}>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}> 1. In case of fire, please follow the safety instruction
                                            and proceed to nearest Assembly area immediately.
                                        </Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}> 2. In case of emergency please call 01493-512051
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
export default GuestPass;