import Layout from "@/components/Layouts/Layout";
import {
    Box,
    Button,
    Card,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useMemo } from "react";

import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridColumns,
    GridValueGetterParams,
} from "@mui/x-data-grid";

type Props = {};

const columns1: GridColDef[] = [
    { field: "id", headerName: "Sec", width: 100 },
    {
        field: "firstName",
        headerName: "เริ่มและวันที่",
        width: 150,
        editable: true,
    },
    { field: "lastName", headerName: "เวลา", width: 100, editable: true },
];

const rows1 = [
    { id: 101, firstName: "09/09/65, 13:00:00", lastName: "60 นาที" },
    { id: 102, firstName: "09/09/65, 13:00:00", lastName: "60 นาที" },
    { id: 53, firstName: "ตั้งวันที่", lastName: "ตั้งเวลา" },
];

const rows2 = [
    {
        id: 1,
        title: "Application Layer",
        level: "X",
        setchoice: "X",
        setrandom: "X",
        answer: "X",
    },
    {
        id: 2,
        title: "Transport Layer",
        level: "X",
        setchoice: "X",
        setrandom: "X",
        answer: "X",
    },
];

export default function CreateTest() {
    const columns2 = useMemo<GridColumns>(() => [
           { field: "id", headerName: "ลำดับ", width: 10 ,},
           { field: "title", headerName: "ชื่อเรื่อง", width: 150 },
           { field: "level", headerName: "Level", width: 100 },
           { field: "setchoice", headerName: "จำนวนข้อ", width: 100 },
            { field: "setrandom", headerName: "สุ่ม", width: 100 },
            { field: "answer", headerName: "สลับตัวเลือก", width: 100 },
           {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 200,
            getActions: (params) => [
                // eslint-disable-next-line react/jsx-key
                <GridActionsCellItem icon={<ModeEditIcon />} label='Editter' />, // eslint-disable-next-line react/jsx-key
                <GridActionsCellItem icon={<DeleteIcon />} label='Delete' />,
            ],
        }, 
    ],[]
    );

    return (
        <Layout>
            <Stack spacing={2}>
                <Box sx={{ margin: "10", padding: "30px 25px" }}>
                    <Typography text-align='left' variant='h3'>
                        สร้างการทดสอบ
                    </Typography>
                </Box>
                <Card  sx={{  margin: "10",   padding: "30px 25px",  textTransform: "capitalize", minWidth: 300,  }}>
                    <Stack direction='row' spacing={2}>
                        <Box>
                            <TextField  fullWidth     label='ชื่อการทดสอบ'     id='fullWidth'    focused    size='small' />
                        </Box>
                        <Box>
                            <TextField   fullWidth  label='ครั้งที่' id='fullWidth'  focused  size='small' />
                        </Box>
                        {/* <Button component='a' href='/gom'>
                            Click
                        </Button> */}
                    </Stack>
                </Card>
                <Card
                    sx={{
                        margin: "10",
                        padding: "30px 25px",
                        textTransform: "capitalize",
                    }}>
                    <Stack spacing={2}>
                        <Typography text-align='left' variant='h5'>
                            ตั้งเวลา
                        </Typography>
                        <Box
                            sx={{
                                height: 300,
                                width: "100%",
                                "& .super-app-theme--header": {
                                    backgroundColor: "#FF9800",
                                    color: "#FFFF",
                                },
                            }}>
                            <DataGrid
                                editMode='row'
                                rows={rows1}
                                columns={columns1}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                            />
                        </Box>
                    </Stack>
                </Card>
                <Card
                    sx={{
                        margin: "10",
                        padding: "30px 25px",
                        textTransform: "capitalize",
                    }}>
                    <Stack spacing={2}>
                        <Typography text-align='left' variant='h5'>
                            ตั้งต่าการทดสอบ
                        </Typography>
                        <Box
                            sx={{
                                height: 400,
                                width: "100%",
                                "& .super-app-theme--header": {
                                    backgroundColor: "#FF9800",
                                    color: "#FFFF",
                                },
                            }}>
                            <DataGrid
                                rows={rows2}
                                columns={columns2}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                            />
                        </Box>
                        <Box display='flex' justifyContent='flex-end'>
                        <Button
                            sx={{ margin: 1 }}
                            size='large'
                            variant='contained'>
                           สร้างการทดสอบ
                        </Button>
                    </Box>
                    </Stack>
                </Card>
            </Stack>
        </Layout>
    );
}
