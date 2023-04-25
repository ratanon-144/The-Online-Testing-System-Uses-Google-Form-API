import Layout from "@/components/Layouts/Layout";
import * as React from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import {
  DataGridPro,
  GridActionsCellItem,
  GridCellCheckboxRenderer,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid-pro";
type Props = {};
// 63015031 เจษฎา วงศ์คำดี
const rows1 = [
  {
    id: 0,
    tite: "ผศ.",
    fullName: "ผศ. ธนา หงษ์สุวรรณ",
    email: "khthana@kmitl.ac.th",
  },
  {
    id: 1,
    fullName: "ผศ.ดร. ชมพูนุท เต็งเจริญ",
    email: "chompoonuch.ji@kmitl.ac.th",
  },
];
export default function StudentList({}: Props) {
  const columns1: GridColDef[] = [
    {
      field: "fullName",
      headerName: "ชื่อ-นามสกุล",
      width: 350,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "อีเมล",
      width: 250,
      headerClassName: "super-app-theme--header",
    },
  ];
  return (
    <Layout>
      <Stack spacing={2}>
        <Typography text-align="left" variant="h3">
          เพิ่มผู้สอน
        </Typography>
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
              justifyContent="flex-end"
              alignItems="flex-start"
              spacing={2}
            >
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  spacing={4}
                >
                  <TextField
                    id="standard-basic"
                    label="อีเมล"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    label="ชื่อ-นามสกุล"
                    variant="standard"
                  />
                  <Box sx={{ "& button": { m: 1 } }}>
                    <Button variant="contained" color="primary">
                      เพิ่ม
                    </Button>
                    <Button variant="contained">อัปโหลด</Button>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            <Box sx={{ height: 300, width: "100%" }}>
              <DataGridPro
                checkboxSelection
                rows={rows1}
                columns={columns1}
                getRowHeight={() => "auto"}
              />
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Layout>
  );
}
