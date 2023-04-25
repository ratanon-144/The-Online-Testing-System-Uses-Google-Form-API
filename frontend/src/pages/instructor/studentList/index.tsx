import Layout from "@/components/Layouts/Layout";
import * as React from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import {
    DataGridPro,
    GridColDef,
} from "@mui/x-data-grid-pro";
type Props = {};

const rows1 = [
    { id: 0, student_id: 63015024, fullName: "จิรพัฒน์ ชโลธร", email: "63015024@kmitl.ac.th" },
    { id: 1, student_id: 63015025, fullName: "จิรศิลป์ เอก", email: "63015025@kmitl.ac.th" },
    { id: 2, student_id: 63015031, fullName: "เจษฎา วงศ์คำดี", email: "63015031@kmitl.ac.th" }
];
export default function StudentList({ }: Props) {
    const url = "http://localhost:8080/api/accounts";

    const columns1: GridColDef[] = [
        { field: "student_id", headerName: "รหัสนักศึกษา", width: 250, headerClassName: 'super-app-theme--header' },
        { field: "fullName", headerName: "ชื่อ-นามสกุล", width: 350, headerClassName: 'super-app-theme--header', },
        { field: "email", headerName: "Emali", width: 250, headerClassName: 'super-app-theme--header', },
    ];
    return (
        <Layout>
            <Stack spacing={2}>
            <Typography text-align='left' variant='h3'>รายชื่อนักศึกษา</Typography>  
                <Card sx={{ margin: "10", padding: "30px 25px", }}>
                    <Stack spacing={2}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={4}>
                            <TextField id="standard-basic" label="รหัสนักศึกษา" variant="standard" />
                            <TextField id="standard-basic" label="ชื่อ-นามสกุล" variant="standard" />
                            <Box sx={{ '& button': { m: 1 } }}>
                                <Button size='large' variant='contained' color="primary">เพิ่ม</Button>
                                <Button size='large' variant='contained' color="primary">อัปโหลด</Button>
                            </Box>
                        </Stack>
                        <Box sx={{ height: 300, width: "100%" }}>
                            <DataGridPro checkboxSelection rows={rows1} columns={columns1}  getRowHeight={() => "auto"} />
                        </Box>
                    </Stack>
                </Card>
            </Stack>
        </Layout>
    );
}
