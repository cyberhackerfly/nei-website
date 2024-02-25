import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { registerUser } from "@src/api/UserRoutes";
import { toast, Bounce } from "react-toastify";
import { IUser } from "@src/interfaces/IUser";
import { ICourse } from "@src/interfaces/ICourse";
import { useEffect } from "react";
import { getCourses } from "@src/api/CourseRoutes";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";

const defaultTheme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Register() {
  const [courses, setCourses] = React.useState<ICourse[]>([]);

  const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);
  const [selectedYear, setSelectedYear] = React.useState<string>("");

  useEffect(() => {
    document.title = "Register - NEI";
    getCourses()
      .then((courses) => setCourses(courses))
      .catch(() => {
        toast.error("Ocorreu um erro ao aceder aos Cursos! Por favor tenta novamente!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  }, []);

  const handleChangeCourses = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setSelectedCourses(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  const handleChangeYear = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value as string);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedCoursesObj = courses.filter((course) => selectedCourses.includes(course.abbreviation));

    const signUp: IUser = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
      first_name: event.currentTarget.firstName.value,
      last_name: event.currentTarget.lastName.value,
      email: event.currentTarget.email.value,
      profilemodel: {
        course: selectedCoursesObj,
        year: parseInt(selectedYear),
      },
    };
    try {
      await registerUser(signUp);
      window.location.href = "/login";
    } catch (error) {
      toast.error("There was an error with your registration!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="course-label">Course</InputLabel>
                  <Select
                    labelId="course-label"
                    id="course"
                    multiple
                    required
                    value={selectedCourses} //? Ignore this error
                    onChange={handleChangeCourses}
                    input={<OutlinedInput label="Course" />}
                    renderValue={(selected) => selected + " "}
                    MenuProps={MenuProps}
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.abbreviation} value={course.abbreviation}>
                        <Checkbox
                          checked={
                            selectedCourses.indexOf(course.abbreviation) > -1
                          }
                        />
                        <ListItemText primary={course.abbreviation} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="year-label">Year</InputLabel>
                  <Select
                    labelId="year-label"
                    id="year"
                    value={selectedYear}
                    label="Age"
                    required
                    onChange={handleChangeYear}
                  >
                    <MenuItem value={1}>1st</MenuItem>
                    <MenuItem value={2}>2nd</MenuItem>
                    <MenuItem value={3}>3rd</MenuItem>
                    <MenuItem value={4}>Erasmus</MenuItem>
                    <MenuItem value={5}>Alumni</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
