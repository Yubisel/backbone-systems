import React from 'react';
import { useParams, Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from '../../components/Title';
import useFetch from "../../hooks/useFetch";
import APP_CONFIG from "../../config/AppConfig";
import Alert from '@mui/material/Alert';
import Grid from "@mui/material/Grid";
import AlertTitle from '@mui/material/AlertTitle';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from "@mui/material/Button";


type ResultsType = {
  _id: string,
  firstName: string,
  email: string,
  phone: number,
  lastName: string,
  createdAt: string,
  updatedAt: string,
}

export default function ContactDetails() {
  let params = useParams();
  const { isLoading, isError, data } = useFetch<ResultsType>(`${APP_CONFIG.API_URL}/contacts/${params.id}`);

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', paddingBottom: 5}}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Title>Contact details</Title>
        </Grid>
        <Grid item xs={2} textAlign={"right"}>
          <Button component={Link} to={"/contacts"}>
            <ArrowBackIcon />
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

      {data &&
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name:</TableCell>
              <TableCell>{data.firstName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lastname:</TableCell>
              <TableCell>{data.lastName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email:</TableCell>
              <TableCell>{data.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone:</TableCell>
              <TableCell>{data.phone}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      }
    </Paper>
  );
}
