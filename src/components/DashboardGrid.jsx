import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Grid,
  TextField,
  IconButton,
  CircularProgress,
  InputAdornment,
  Pagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import image from '../assets/aman.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../axiosIntsance';

const DashboardGrid = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const studentsPerPage = 8;
  const cardColors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4', '#D1C4E9', '#FFE0B2'];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get('/students/get-students');
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

 
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      email: '',
      phoneNumber: '',
      courses: '',
      section: '',
      isActive: true,
      image: null,
      pdf: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      age: Yup.number().required('Required'),
      gender: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phoneNumber: Yup.string().required('Required'),
      section: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'courses') {
          formData.append(key, JSON.stringify(values[key].split(',')));
        } else if (key === 'image' || key === 'pdf') {
          formData.append(key, values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });

      try {
        await axiosInstance.post('/students/create-student', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setStudents([...students, values]); 
        resetForm();
        handleCloseDialog();
      } catch (error) {
        console.error('Error creating student:', error);
      }
    },
  });

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Search by Full Name"
        variant="outlined"
        fullWidth
        style={{ marginBottom: 20 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleSearch}
      />

      <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ marginBottom: 20 }}>
        Create Student
      </Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Create Student</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
              label="First Name"
              {...formik.getFieldProps('firstName')}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Last Name"
              {...formik.getFieldProps('lastName')}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Age"
              type="number"
              {...formik.getFieldProps('age')}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Gender"
              {...formik.getFieldProps('gender')}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              {...formik.getFieldProps('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Phone Number"
              {...formik.getFieldProps('phoneNumber')}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Courses (comma-separated)"
              {...formik.getFieldProps('courses')}
              error={formik.touched.courses && Boolean(formik.errors.courses)}
              helperText={formik.touched.courses && formik.errors.courses}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Section"
              {...formik.getFieldProps('section')}
              error={formik.touched.section && Boolean(formik.errors.section)}
              helperText={formik.touched.section && formik.errors.section}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isActive}
                  onChange={(event) => formik.setFieldValue('isActive', event.target.checked)}
                  color="primary"
                />
              }
              label="Active"
            />
            <Typography variant="subtitle1" style={{ marginTop: 15 }}>
              Upload Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
              style={{ marginTop: 10 }}
            />
            <Typography variant="subtitle1" style={{ marginTop: 15 }}>
              Upload PDF
            </Typography>
            <input
              type="file"
              accept=".pdf"
              onChange={(event) => formik.setFieldValue('pdf', event.currentTarget.files[0])}
              style={{ marginTop: 10 }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={formik.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {currentStudents.map((student, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
                <Link
                  to={{
                    pathname: `/students/${student.id}`,
                    state: { student },
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <Card
                    style={{
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      maxWidth: '100%',
                      backgroundColor: cardColors[index % cardColors.length],
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={student.image ? `${import.meta.env.VITE_API_URL}/${student.image}` : image}
                      alt="student image"
                    />
                    <CardContent>
                      <Typography variant="h6" color="textPrimary">
                        {student.firstName} {student.lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Age: {student.age}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Gender: {student.gender}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Email: {student.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Phone: {student.phoneNumber}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton color="primary" onClick={() => handleEdit(student)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(student.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={Math.ceil(filteredStudents.length / studentsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
          />
        </>
      )}
    </div>
  );
};

export default DashboardGrid; 