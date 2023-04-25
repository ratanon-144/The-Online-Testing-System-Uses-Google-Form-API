import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import React from "react";
import {
  DataGridPro,
  GridActionsCellItem,
  GridRowParams,
} from "@mui/x-data-grid-pro";
import {
  Box,
  Card,
  Stack,
  Typography,
} from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type Props = {};

const initialRows = [
  {
    id: 1,
    student_id: "63015007",
    student_name: "นาย	กฤตนัย	สุยานะ",
    isAdmin: true,
    score: "51/100",
  },
  {
    id: 2,
    student_id: "63015025",
    student_name: "นาย	จิรศิลป์	เอก",
    isAdmin: true,
    score: "99/100",
  },
  {
    id: 3,
    student_id: "63015031",
    student_name: "นาย	เจษฎา	วงศ์คำดี",
    isAdmin: true,
    score: "14/100",
  },
];

type Row = (typeof initialRows)[number];

const Instructor = ({}: Props) => {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const columns = React.useMemo(
    () => [
      {
        field: "student_id",
        type: "string",
        headerName: "รหัสนักศึกษา",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "student_name",
        type: "string",
        headerName: "ชื่อ - นามสกุล",
        flex: 1,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "score",
        type: "singleSelect",
        headerClassName: "super-app-theme--header",
        headerName: "คะแนนที่ได้",
        width: 100,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "รายละเอียด",
        width: 200,
        headerClassName: "super-app-theme--header",
        getActions: (params: GridRowParams) => [
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem icon={<OpenInNewIcon />}  onClick={()=> {""}} label="OpenInNew"/>,
        ],
      },
    ],
    []
  );

  return (
    <Layout>
      <Stack spacing={2}>
      <Typography text-align='left' variant='h3'>คะแนน</Typography>  
        <Card
          sx={{
            margin: "10",
            padding: "30px 25px",
            textTransform: "capitalize",
          }}
        >
          <Typography Text-align="" variant="h5">
            จำนวนนักศึกษาทำข้อสอบ 49/50 คน
          </Typography>
          <Box
            sx={{
              height: 300,
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "#FF9800",
                color: "#FFFF",
              },
            }}
          >
            <DataGridPro columns={columns} rows={rows} />
          </Box>
        </Card>
      </Stack>
    </Layout>
  );
};

export default withAuth(Instructor);
