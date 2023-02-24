import Layout from '@/components/Layouts/Layout'
import { Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';

type Props = {}

export default function FullWidthTextField() {
  return (
    <Layout>
        
    
    <Typography Text-align="left" variant="h3">สร้างการทดสอบ</Typography>
    <Stack 
     direction="row"
     justifyContent="center"
     alignItems="center"
     spacing={2}>

    
    {/* ชื่อการทดสอบ */}
    <Box
      sx={{
        width: 350,
        maxWidth: '100%',
        
      }}
    >

      <TextField  fullWidth label="ชื่อการทดสอบ"  id="fullWidth"  focused size="small"/>
    </Box>


   {/* ครั้งที่ */}
    <Box
      sx={{
        width: 100,
        maxWidth: '100%',
      }}
    >

      <TextField fullWidth label="ครั้งที่" id="fullWidth"  focused size="small"/>
      
    
    </Box>
    

    </Stack>
    <Typography Text-align="left" variant="body1">ตั้งเวลาการทดสอบ</Typography>
    </Layout>
  )
}