import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Title from '../../components/Title';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TimelapseIcon from '@mui/icons-material/Timelapse';

type PropsType = {
  headerText: string,
  handleOnSubmit: any,
  handleSubmit: Function,
  register: Function,
  errors: any,
  isError: boolean,
  isSuccess: boolean,
  successMessage: string,
  isLoading: boolean,
  errorMessage: string,
}

export default function ContactForm({
  headerText, handleOnSubmit, handleSubmit, register, errors, isError, isSuccess, isLoading, errorMessage
}: PropsType) {

  const isValidEmail = email =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  
  const isValidPhone = phone => {
    // eslint-disable-next-line no-useless-escape
      const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
      return regex.test(phone);
    }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', paddingBottom: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Title>{headerText}</Title>
          </Grid>
          <Grid item xs={2} textAlign={"right"}>
            <Button type='submit' data-cy={"button-save"}>
              <SaveIcon /> Save
            </Button>
            <Button component={Link} to={"/contacts"} data-cy={"button-cancel"}>
              <CancelIcon /> Cancel
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

        {isSuccess &&
          <Grid item xs={12} marginBottom={3}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              The contact was saved.
            </Alert>
          </Grid>
        }

        {isError &&
          <Grid item xs={12} marginBottom={3}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {errorMessage}
            </Alert>
          </Grid>
        }

        {!isLoading &&
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors?.firstName?.message}
                label="First name"
                data-cy={"field-firstName"}
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
                {...register("firstName", { required: "This is required." })}
                helperText={errors?.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors?.lastName?.message}
                label="Last name"
                data-cy={"field-lastName"}
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
                {...register("lastName", { required: "This is required." })}
                helperText={errors?.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors?.email?.message}
                label="Email"
                data-cy={"field-email"}
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
                {...register("email", {
                  required: "This is required.", validate: email => {
                    const isValid = isValidEmail(email);
                    return isValid || "Enter a valid email.";
                  }
                })}
                helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors?.phone?.message}
                label="Phone"
                data-cy={"field-phone"}
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
                {...register("phone", {
                  required: "This is required.", validate: phone => {
                    const isValid = isValidPhone(phone);
                    return isValid || "Enter a valid phone.";
                  } })}
                helperText={errors?.phone?.message}
              />
            </Grid>
          </Grid>
        }
      </Paper>
    </form>
  );
}
