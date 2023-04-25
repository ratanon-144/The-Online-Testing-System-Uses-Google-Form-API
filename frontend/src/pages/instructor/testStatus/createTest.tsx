import Layout from "@/components/Layouts/Layout";
import {
  Box, 
  Card,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useMemo, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColumnApi,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { GridRowParams } from "@mui/x-data-grid";

type Props = {};

const rows1 = [
  { id: 101 },
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

const CountButton = () => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox />} label="ยาก" />
      <FormControlLabel control={<Checkbox />} label="ปลานกลาง" />
      <FormControlLabel control={<Checkbox />} label="ง่าย" />
    </FormGroup>
  );
};
const CountButto2n = () => {
  return (
    <FormControl variant="standard">
      <TextField
        id="standard-basic"
        variant="standard"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
    </FormControl>
  );
};

const DatePicker1 = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-07"));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
};

const DateTime1 = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17T15:30"));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
        value={value}
        onChange={(newValue: any) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};

export default function CreateTest() {
  const columns1: GridColDef[] = [
    { field: "id", headerName: "Sec", width: 100 },
    {
      field: "firstName",
      headerName: "เริ่มและวันที่",
      width: 250,
      renderCell: ({ value }: GridRenderCellParams<any>) => <DatePicker1 />,
    },
    {
      field: "lastName",
      headerName: "เวลา",
      width: 200,
      renderCell: ({ value }: GridRenderCellParams<any>) => <DateTime1 />,
    },
  ];

  const columns2 = useMemo(
    () => [
      { field: "id", headerName: "ลำดับ", width: 10 },
      { field: "title", headerName: "ชื่อเรื่อง", width: 150 },
      {
        field: "level",
        headerName: "Level",
        width: 180,
        renderCell: ({ value }: GridRenderCellParams<any>) => <CountButton />,
      },
      {
        field: "setchoice",
        headerName: "จำนวนข้อ",
        width: 200,
        renderCell: ({ value }: GridRenderCellParams<any>) => <CountButto2n />,
      },
      {
        field: "setrandom",
        headerName: "สุ่ม",
        width: 100,
        renderCell: ({ value }: GridRenderCellParams<any>) => <Checkbox />,
      },
      {
        field: "answer",
        headerName: "สลับตัวเลือก",
        width: 100,
        renderCell: ({ value }: GridRenderCellParams<any>) => <Checkbox />,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 200,
        getActions: (params: GridRowParams) => [
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem icon={<ModeEditIcon />} label="Editter" />,
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
        ],
      },
    ],
    []
  );

  return (
    <Layout>
      <Stack spacing={2}>
        <Box sx={{ margin: "10", padding: "0px 5px" }}>
          <Typography text-align="left" variant="h3">
            สร้างการทดสอบ
          </Typography>
        </Box>
        <Card
          sx={{
            margin: "10",
            padding: "30px 25px",
            textTransform: "capitalize",
            minWidth: 300,
          }}
        >
          <Stack direction="row" spacing={2}>
            <Box>
              <TextField
                fullWidth
                label="ชื่อการทดสอบ"
                id="fullWidth"
                focused
                size="small"
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="ครั้งที่"
                id="fullWidth"
                focused
                size="small" 
              />
            </Box> 
          </Stack>
        </Card>
        <Card
          sx={{
            margin: "10",
            padding: "30px 25px",
            textTransform: "capitalize",
          }}
        >
          <Stack spacing={2}>
            <Typography text-align="left" variant="h5">
              ตั้งเวลา
            </Typography>
            <Box
              sx={{
                height: 300,
                width: "100%", 
              }}
            >
              <DataGrid
                editMode="row"
                rows={rows1}
                columns={columns1}
                getRowHeight={() => "auto"}
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
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Typography text-align="left" variant="h5">
                ตั้งค่าการทดสอบ
              </Typography>
              <Button   sx={{margin: 1, "&:hover": { backgroundColor: "#1976d2" } }}size="large" variant="contained">
                เพิ่มเรื่อง
              </Button>
            </Stack>
            <Box
              sx={{
                height: 400,
                width: "100%", 
              }}
            >
              {/* <DataGrid    rows={rows2} columns={columns2}  pageSize={5} rowsPerPageOptions={[5]} checkboxSelection/> */}
              <DataGrid
                rows={rows2}
                columns={columns2}
                getRowHeight={() => "auto"}
              />
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="baseline"
              spacing={1}
            >
              <Button size="medium" variant="contained" >
                บันทึก
              </Button>
              <Button size="medium" variant="contained" color="error" >
                ยกเลิก
              </Button>
              <Button size="medium"  variant="contained"  color="success">
                สร้าง Form API
              </Button>
            </Stack>
          </Stack>
          <Stack spacing={2} direction="row"> 
    </Stack>
        </Card>
      </Stack>
    </Layout>
  );
}
