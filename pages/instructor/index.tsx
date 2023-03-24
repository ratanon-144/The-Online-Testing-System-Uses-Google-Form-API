import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import React from "react";
import {  DataGrid,  GridActionsCellItem,  GridColDef,  GridColumns,  GridRenderCellParams,  GridToolbarContainer,  GridToolbarFilterButton,  GridValueGetterParams,} from "@mui/x-data-grid";
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
import { ProductData } from "@/models/product.model";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";
import { Add,  AddShoppingCart,  AssignmentReturn,  Clear,  NewReleases,  Search,  Star,} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
type Props = {};

const initialRows = [
  {
      id: 1,
      subjectid: "01076010",
      subjectname: "Computer Network",
      isAdmin: true,
      secid: "101",
  },
  {
      id: 2,
      subjectid: "01076010",
      subjectname: "Computer Network",
      isAdmin: true,
      secid: "53",
  },
  {
      id: 3,
      subjectid: "01076015",
      subjectname: "Computer Engineering Professional Development",
      isAdmin: true,
      secid: "101",
  },
];

type Row = typeof initialRows[number];

const Instructor = ({}: Props) => {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const columns = React.useMemo<GridColumns<Row>>(
    () => [  { field: "subjectid", type: "string", headerName: "รหัสวิชา",  width: 150,   headerClassName: "super-app-theme--header", },
        { field: "subjectname", type: "string",  headerName: "ชื่อวิชา",  flex: 1,headerClassName: "super-app-theme--header"},
        {  field: "secid",  type: "singleSelect",  headerClassName: "super-app-theme--header",  headerName: "กลุ่ม",  width: 100,
          valueOptions: ({ row }) => { return ["101", "102", "53"];   },},  
        {  field: "actions",type: "actions",headerName: "Actions",   width: 200,  headerClassName: "super-app-theme--header", 
         getActions: (params) => [
                // eslint-disable-next-line react/jsx-key
                <GridActionsCellItem icon={<ModeEditIcon />}  label='Editter' />, 
                // eslint-disable-next-line react/jsx-key
                <GridActionsCellItem   icon={<DeleteIcon />}   label='Delete'  />,],},
    ],
    []
);
  const dispatch = useAppDispatch();
  const productList = useSelector(productSelector);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductData | null>(null);

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Layout>
         <Stack spacing={2}>
                <Typography Text-align='' variant='h2'>
                    รายวิชา
                </Typography>
                <Card
                    sx={{
                        margin: "10",
                        padding: "30px 25px",
                        textTransform: "capitalize",
                    }}> 
                    <Box
                        sx={{  height: 600, width: "100%",  "& .super-app-theme--header": {      backgroundColor: "#FF9800",      color: "#FFFF",  }, }}>
                        <DataGrid columns={columns} rows={rows} />
                    </Box>
                    <Box display='flex' justifyContent='flex-end'>
                        <Button
                            sx={{ margin: 1 }}
                            size='large'
                            variant='contained'>
                            สร้างรายวิชา{" "}
                        </Button>
                    </Box>
                </Card>
            </Stack>

    
    </Layout>
  );
};

export default withAuth(Instructor);
