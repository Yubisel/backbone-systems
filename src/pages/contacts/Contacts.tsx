import React, { useEffect, useState, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Title from '../../components/Title';
import APP_CONFIG from "../../config/AppConfig";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Grid from "@mui/material/Grid";
import AlertTitle from '@mui/material/AlertTitle';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

type ResultsType = {
  count: number,
  perPage: number,
  currentPage: number,
  totalPages: number
  results: any[]
}

export default function Contacts() {
  const [page, setPage] = React.useState(1);
  const [data, setData] = useState<ResultsType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/contacts?perPage=10&page=${page}`);
      const data = await response.json();
      setIsLoading(false);
      setData(data);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  }, [page]);
    useEffect(() => {
      fetchData()
    }, [fetchData]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setIsLoading(true);
    setPage(value);
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', paddingBottom: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Title>Contacts list</Title>
        </Grid>
        <Grid item xs={2} textAlign={"right"}>
          <Button component={Link} to={"/contacts/create"}>
            <AddIcon /> Create
          </Button>
        </Grid>
      </Grid>

      {isLoading &&
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign={"center"}>
            <TimelapseIcon />
          </Grid>
        </Grid>
      }

      {isError &&
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          There was an error
        </Alert>
      }

      {!isLoading && !isError && data &&
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.results.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  {/* <TableCell align="right">{`$${row.phone}`}</TableCell> */}
                  <TableCell>
                    <Button component={Link} to={`/contacts/edit/${row._id}`} size="small">
                      <EditIcon />
                    </Button>
                    <Button component={Link} to={`/contacts/details/${row._id}`} size="small">
                      <RemoveRedEyeIcon />
                    </Button>
                    <Button component={Link} to={"/"} size="small">
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid item xs={12} marginTop={3}>
            <Pagination count={data.totalPages} page={page} onChange={handleChange} />
          </Grid>
        </>
      }
    </Paper>
  );
}
