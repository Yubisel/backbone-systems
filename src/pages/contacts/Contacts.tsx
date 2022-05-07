import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
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
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

type ResultsType = {
  count: number,
  perPage: number,
  currentPage: number,
  totalPages: number
  results: any[]
}

export default function Contacts() {
  const [page, setPage] = React.useState(1);
  const [idToDelete, setIdToDelete] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ResultsType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/contacts?perPage=10&page=${page}`);
      const data = await response.json();
      setIsLoading(false);
      setData(data);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [page]);
  useEffect(() => {
    fetchData()
  }, [fetchData, isDeleteSuccess]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setIsLoading(true);
    setPage(value);
    setIsDeleteSuccess(false);
  };


  const handleOpenDeleteModal = (id: string) => {
    setIdToDelete(id);
    setIsModalOpen(true);
  }
  const handleDelete = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsDeleteSuccess(false);
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/contacts/${idToDelete}`, {
        method: "DELETE",
        headers: new Headers({ 'content-type': 'application/json' })
      });
      const data = await response.json();
      if (response.status === 200) {
        setIsError(false);
        setIsDeleteSuccess(true);
        setErrorMessage("");
      } else {
        setIsError(true);
        setIsDeleteSuccess(false);
        setErrorMessage(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
    setIdToDelete("");
    setIsModalOpen(false);
  }
  const handleCloseModal = () => {
    setIdToDelete("");
    setIsModalOpen(false);
  }

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
          {errorMessage || "There was an error"}
        </Alert>
      }

      {isDeleteSuccess &&
        <Alert severity="success">
          <AlertTitle>Error</AlertTitle>
          {"The contact was deleted."}
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
                  <TableCell>
                    <Button component={Link} to={`/contacts/edit/${row._id}`} size="small">
                      <EditIcon />
                    </Button>
                    <Button component={Link} to={`/contacts/details/${row._id}`} size="small">
                      <RemoveRedEyeIcon />
                    </Button>
                    <Button onClick={() => handleOpenDeleteModal(row._id)} size="small">
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
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete the contact?
          </Typography>

        <Grid item xs={12} textAlign={"center"} marginTop={3}>
          <Button onClick={handleDelete}>
            <DeleteIcon /> Delete
          </Button>
          <Button onClick={handleCloseModal}>
            <CancelIcon /> Cancel
          </Button>
        </Grid>
        </Box>
      </Modal>
    </Paper>
  );
}
