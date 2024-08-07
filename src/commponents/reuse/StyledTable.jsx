import { TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        // backgroundColor: 'whitesmoke',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        borderTop: '1px solid #A9A9A9 !important',
        borderBottom: '1px solid #A9A9A9 !important',
        color: '#000',
        backgroundColor:'#D8D8D8',
        fontSize: 13,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        padding:'2px 4px 2px 4px'
    },
}));