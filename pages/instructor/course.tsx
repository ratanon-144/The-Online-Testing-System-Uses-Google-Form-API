import Layout from "@/components/Layouts/Layout";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {};
// SelectTextFields
const currencies = [
  {
    value: "semester",
    label: "1/2565",
   
    
  },

];
// ตาราง
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  id:string,
  subjectname: string,
  group: string,
  Action: any,
 
) {
  return { id, subjectname, group, Action };
}

const rows = [
  createData('01076010', 'Computer Network', '101', ),
  createData('01076010', 'Computer Network', '101', ),
];

export default function course({}: Props) {
  return (
    <Layout>
        
       <Typography Text-align="" variant="h3">รายวิชา</Typography>
     

      {/* SelectTextFields */}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-select-currency"
            select
            label="ภาคการศึกษาที่ "
            
            defaultValue="EUR"
            // helperText="Please select your currency"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
   <div>
   </div>


      {/* ตารางรายวิชา */}

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">รหัสวิชา</StyledTableCell>
            <StyledTableCell align="center">ชื่อวิชา</StyledTableCell>
            <StyledTableCell align="center">กลุ่ม</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">{row.id}</StyledTableCell>
              

              <StyledTableCell component="th" scope="row"  align="left">
                {row.subjectname}
              </StyledTableCell>
              
              <StyledTableCell align="center">{row.group}</StyledTableCell>
              <StyledTableCell align="center">{row.action}</StyledTableCell>
              
            </StyledTableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
    </Layout>
  );
}
