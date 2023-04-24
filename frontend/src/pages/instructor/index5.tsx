import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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
  GridRenderCellParams,
} from '@mui/x-data-grid-pro';
import withAuth from '@/components/withAuth';
import Layout from "@/components/Layouts/Layout";
import { Card, Stack, Typography } from '@mui/material';
import { useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { courseSelector, getCourses } from '@/store/slices/courseSlice';
import { getSession, userID } from '@/store/slices/userSlice';
import Moment from "react-moment";
import { CourseData } from "@/models/course.model";
import { addCourse,editCourse,deleteCourse } from "@/services/serverService";


const initialValues: CourseData = {
  id_code: "",
  name: "",
};

type Props = {
  Course?: CourseData;
};

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

const Instructor = ({ Course }: Props) => {
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
  
  const handleSaveClick = (id: GridRowId) => async () => {
     
  //  await addCourse(setRowModesModel);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log(rowModesModel)
  };
  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      await deleteCourse(id);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      // Handle error if any
    }
  };
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false } as CourseData;
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel} = props;
    const id_num = Math.max(...rows.map((rows) => rows.id), 0) + 1;
    const handleClick = () => {
      const id = Math.max(...rows.map((rows) => rows.id), 0) + 1;
     
       setRows((oldRows) => [...oldRows, { id,id_code:'', name: '', isNew: true }]);
       setRowModesModel((oldModel) => ({
         ...oldModel,
         [id]: { mode: GridRowModes.Edit, fieldToFocus: 'id_code' },
       }));
       console.log(setRows);
     };
   
     return (
       <GridToolbarContainer>
         <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
           Add record {id_num}
         </Button>
       </GridToolbarContainer>
     );
   }
  
   console.log(setRowModesModel)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 50, editable: true },
    { field: 'id_code', headerName: 'รหัสวิชา', width: 120, editable: true },
    { field: 'name', headerName: 'ชื่อวิชา', flex: 1, editable: true },
    {
      headerName: "เวลาสร้าง", field: "createdAt", width: 220,
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    }, {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },]


  return (
    <Layout>
      <Stack spacing={2}>
        <Typography text-align='left' variant='h3'>รายการวิชา  {rowModesModel}</Typography>
        <Card sx={{ margin: "10", padding: "30px 25px", textTransform: "capitalize", }}>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={2}>
              <Button size='large' variant='contained' href='/instructor/add'>เพิ่มรายวิชา</Button>
            </Stack>
            <Box sx={{
              height: 500,
              width: '100%',
              '& .actions': {
                color: 'text.secondary',
              },
              '& .textPrimary': {
                color: 'text.primary',
              },
            }}>
              <DataGridPro
                rows={rows ?? []}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                  toolbar: EditToolbar,
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel },
                }}
              />
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Layout>
  );
};
   

export default withAuth(Instructor);