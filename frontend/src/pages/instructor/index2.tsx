import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import Moment from "react-moment";
import React from "react";
import { useAppDispatch } from "@/store/store";
import { courseSelector, getCourseById, getCourses, addCourse,editCourse,deleteCourse } from "@/store/slices/courseSlice";
import { userID, getSession } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGridPro,
  GridColDef,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid-pro';
import { Card, IconButton, Stack, Typography } from "@mui/material";
import router from "next/router";
import Link from "next/link";

type Props = {};

const Instructor = ({ }: Props) => {
  const dispatch = useAppDispatch();
  const courseList = useSelector(courseSelector);
  const userId = useSelector(userID);

  React.useEffect(() => {
    dispatch(getCourses());
    dispatch(getSession());
  }, [dispatch]);

  React.useEffect(() => {
    setRows(courseList);
  }, [courseList]);
  const [rows, setRows] = React.useState(courseList);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    const editedRow = rows.find((row) => row.id === id);
    const updatedRow = processRowUpdate(editedRow!);
    dispatch(editCourse(updatedRow));
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(deleteCourse(id));
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      dispatch(deleteCourse(id));
    } else {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
      setRows(rows.map((row) => (row.id === id ? editedRow! : row)));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleAddCourseClick = () => {
    const newCourse: Course = {
      id: new Date().getTime().toString(),
      id_code: "",
      name: "",
      created_at: new Date().toISOString(),
    };
    dispatch(addCourse(newCourse));
  };

const columns = [
  { field: 'id_code', headerName: 'รหัสวิชา', width: 120, editable: true },
  { field: 'name', headerName: 'ชื่อวิชา', flex: 1, editable: true },
  {
    headerName: "TIME", field: "เวลาสร้าง", width: 220,
    renderCell: ({ value:any }) => (
      <Typography variant="body1">
        <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
      </Typography>
    ),
  },
  {
    headerName: "ACTION", field: ".", width: 120,
    renderCell: ({ row:any }) => (
      <Stack direction="row">
        <IconButton
          aria-label="edit"
          size="large"
          onClick={() => {
            const newRowModesModel = { ...rowModesModel };
            newRowModesModel[row.id] = true;
            setRowModesModel(newRowModesModel);
          }}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => handleDeleteClick(row.id)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    ),
  },
];


  return (
    <Layout>
      <Stack spacing={2}>
        <Typography text-align='left' variant='h3'>รายการวิชา {userId}</Typography>
        <Card sx={{ margin: "10", padding: "30px 25px", textTransform: "capitalize", }}>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={2}>
              <Button size='large' variant='contained' href='/instructor/add'>เพิ่มรายวิชา</Button>
            </Stack>
            <Box sx={{ height: 600, width: "100%", "& .super-app-theme--header": { backgroundColor: "#FF9800", color: "#FFF" } }}>
              <DataGrid
                rows={rows ?? []}
                columns={columns}
              />
            </Box>

          </Stack>

          {/* <Box>
      <Link href="/instructor/add" passHref>  
        <Button>
          เพิ่มรายวิชา
        </Button>
        </Link>
      </Box> */}
        </Card>
      </Stack>
    </Layout>
  );
};

export default withAuth(Instructor);