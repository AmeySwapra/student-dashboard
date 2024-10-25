import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, Grid, TextField, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import axiosInstance from '../../axiosIntsance';
import image from '../assets/aman.png'
const DashboardGrid = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Array of colors to assign to each card
  const cardColors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4', '#D1C4E9', '#FFE0B2'];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get('/students/get-students');
        setStudents(response.data);
        console.log(response.data)
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
  };

  // Filter students by full name or partial matches based on searchQuery
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div style={{ padding: 20 }}>
      {/* Search Bar */}
      <TextField
        label="Search by Full Name"
        variant="outlined"
        fullWidth
        style={{ marginBottom: 20 }}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        onChange={handleSearch}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredStudents.map((student, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={student._id}>
              <Card
                style={{
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  maxWidth: 250,
                  backgroundColor: cardColors[index % cardColors.length], // Rotate colors based on index
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={image}
                  alt="Student placeholder"
                />
                <CardContent>
                  <Typography variant="h6">
                    {student.firstName} {student.lastName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Age: {student.age}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Gender: {student.gender}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Section: {student.section}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="edit" onClick={() => console.log('Edit student', student._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => console.log('Delete student', student._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default DashboardGrid;
