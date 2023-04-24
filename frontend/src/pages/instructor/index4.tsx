import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 130, editable: true },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridCellParams) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

interface Data {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export default function CrudDataGrid() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://reqres.in/api/users');
      setData(result.data.data);
    };

    fetchData();
  }, []);

  const handleRowUpdate = ({ id, field, value }: any) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setData(newData);
  };

  const handleRowAdd = ({ newRow }: any) => {
    const newId = data.length + 1;
    const newData = [...data, { ...newRow, id: newId }];
    setData(newData);
  };

  const handleRowDelete = ({ id }: any) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={data}
        disableRowSelectionOnClick
        editMode="row"
        onEditCellChangeCommitted={(params) =>
          handleRowUpdate({ id: params.id, field: params.field, value: params.props.value })
        }
        onRowAdd={(newRow) => handleRowAdd({ newRow })}
        onRowDelete={(params) => handleRowDelete({ id: params.id })}
      />
    </div>
  );
}
