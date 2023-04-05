import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import React from "react";
import {  DataGrid,  GridActionsCellItem,  GridColDef,  GridColumns,  GridRenderCellParams, GridToolbar, GridToolbarContainer,  GridToolbarFilterButton,  GridValueGetterParams,} from "@mui/x-data-grid";
import { useAppDispatch } from "@/store/store";
import {  deleteProduct,  getProducts,  productSelector,} from "@/store/slices/productSlice";
import { useSelector } from "react-redux";
import { productImageURL } from "@/utils/commonUtil";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {  Box,  Button,  Card,  Dialog,  DialogActions,  DialogContent,  DialogContentText,  DialogTitle,  Fab,  Grid,  IconButton,  Slide,  Stack,  TextField,  Typography,} from "@mui/material";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import router from "next/router";
import EditIcon from "@mui/icons-material/Edit";
 
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";
import { Add,  AddShoppingCart,  AssignmentReturn,  Clear,  NewReleases,  Search,  Star,} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
 
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

type Row = typeof initialRows[number];

const Instructor = ({}: Props) => {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const columns = React.useMemo<GridColumns<Row>>(
    () => [  { field: "student_id", type: "string", headerName: "รหัสนักศึกษา",  width: 150,   headerClassName: "super-app-theme--header", },
        { field: "student_name", type: "string",  headerName: "ชื่อ - นามสกุล",  flex: 1,headerClassName: "super-app-theme--header"},
        {  field: "score",  type: "singleSelect",  headerClassName: "super-app-theme--header",  headerName: "คะแนนที่ได้",  width: 100},  
        {  field: "actions",type: "actions",headerName: "รายละเอียด",   width: 200,  headerClassName: "super-app-theme--header", 
         getActions: (params) => [
              // eslint-disable-next-line react/jsx-key
                <GridActionsCellItem icon={<OpenInNewIcon />} />
              
              ],},
    ],
    []
);
  const dispatch = useAppDispatch();
  const productList = useSelector(productSelector);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  //const [selectedProduct, setSelectedProduct] =
    //React.useState<ProductData | null>(null);

 // const [filterButtonEl, setFilterButtonEl] =React.useState<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Layout>
         <Stack spacing={2}>
                <Typography Text-align='' variant='h2'>
                    คะแนน
                </Typography>
                <Card
                    sx={{
                        margin: "10",
                        padding: "30px 25px",
                        textTransform: "capitalize",
                    }}> 
                       <Typography Text-align='' variant='h5'>
                       จำนวนนักศึกษาทำข้อสอบ 49/50 คน
                </Typography>
                    <Box
                        sx={{  height: 600, width: "100%",  "& .super-app-theme--header": {      backgroundColor: "#FF9800",      color: "#FFFF",  }, }}>
                        <DataGrid columns={columns} rows={rows} />
                    </Box>
                 </Card>
            </Stack>

    
    </Layout>
  );
};

export default withAuth(Instructor);
