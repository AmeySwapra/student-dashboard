import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { useReactToPrint } from "react-to-print";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../axiosIntsance";
import image from "../assets/aman.png";
import axios from "axios";
const StudentData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const studentRef = useRef();

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/students/get-students`);
      const studentData = response.data.find((s) => s.id === id);
      setStudent(studentData);
      console.log(studentData);
      formik.setValues(studentData);
    } catch (err) {
      setError("Failed to fetch student data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      section: "",
      email: "",
      phoneNumber: "",
      courses: [],
      isActive: false,
      imageFile: null,
      pdfFile: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      age: Yup.number().required("Age is required").positive().integer(),
      gender: Yup.string().required("Gender is required"),
      section: Yup.string().required("Section is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      courses: Yup.array()
        .of(Yup.string())
        .required("At least one course is required"),
    }),
    onSubmit: async (values) => {
      const studentData = new FormData();
      studentData.append("firstName", values.firstName);
      studentData.append("lastName", values.lastName);
      studentData.append("age", values.age);
      studentData.append("gender", values.gender);
      studentData.append("email", values.email);
      studentData.append("phoneNumber", values.phoneNumber);
      studentData.append("courses", values.courses.join(", "));
      studentData.append("isActive", values.isActive);
      studentData.append("section", values.section);

      if (values.imageFile) {
        studentData.append("image", values.imageFile);
      }
      if (values.pdfFile) {
        studentData.append("pdf", values.pdfFile);
      }

      try {
        const response = await axiosInstance.put(
          `/students/edit-student/${id}`,
          studentData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Student updated successfully", response.data);
        handleCloseModal();
        fetchStudent();
      } catch (error) {
        console.error("Error updating student:", error);
        alert("Failed to update student");
      }
    },
  });

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/students/delete-student/${id}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to delete student", error);
      setError("Failed to delete student.");
    }
  };



  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  if (!student) return <Typography variant="h6">Student not found</Typography>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={4}
      alignItems="flex-start"
    >
      <Stack direction="row" spacing={1} alignSelf="flex-end" marginBottom={2}>
        <Button
          onClick={handleOpenModal}
          color="primary"
          startIcon={<EditIcon />}
          variant="contained"
          size="small"
        >
          Edit
        </Button>
        <Button
          onClick={handleDelete}
          color="secondary"
          startIcon={<DeleteIcon />}
          variant="contained"
          size="small"
        >
          Delete
        </Button>
      </Stack>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }} 
        width="100%"
        ref={studentRef}
        alignItems="center" 
      >
        <Box
          flex="0 0 300px" 
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
             src={student.image ? `${import.meta.env.VITE_API_URL}/${student.image}` : image}
            alt="Student"
            style={{ width: 300, height: 300 }}
          />
        </Box>

        <Box flex="1" ml={{ md: 4 }}>
          {" "}
          
          <Typography variant="h4" gutterBottom>
            {student.firstName} {student.lastName}
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Age:</TableCell>
                <TableCell>{student.age}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender:</TableCell>
                <TableCell>{student.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Section:</TableCell>
                <TableCell>{student.section}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email:</TableCell>
                <TableCell>{student.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone:</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Courses:</TableCell>
                <TableCell>{student.courses.join(", ")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Active:</TableCell>
                <TableCell>{student.isActive ? "Yes" : "No"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PDF:</TableCell>
                <TableCell>
                  {student.pdf ? (
                    <a
                    href={`${import.meta.env.VITE_API_URL}/${student.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download PDF
                    </a>
                  ) : (
                    "No PDF Available"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Edit Student Information</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="dense"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              fullWidth
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              margin="dense"
              name="age"
              label="Age"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <FormControl component="fieldset" margin="dense">
              <RadioGroup
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                row
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              margin="dense"
              name="section"
              label="Section"
              value={formik.values.section}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.section && Boolean(formik.errors.section)}
              helperText={formik.touched.section && formik.errors.section}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="dense"
              name="phoneNumber"
              label="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              fullWidth
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
            <FormGroup>
              <TextField
                margin="dense"
                name="courses"
                label="Courses (comma separated)"
                value={formik.values.courses.join(", ")}
                onChange={(e) =>
                  formik.setFieldValue(
                    "courses",
                    e.target.value.split(",").map((course) => course.trim())
                  )
                }
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.isActive}
                    onChange={formik.handleChange}
                    name="isActive"
                  />
                }
                label="Is Active"
              />
            </FormGroup>
            <Typography variant="h6" gutterBottom>
              Upload Image
            </Typography>
            <input
              type="file"
              name="imageFile"
              onChange={(event) =>
                formik.setFieldValue("imageFile", event.currentTarget.files[0])
              }
            />
            <Typography variant="h6" gutterBottom>
              Upload PDF
            </Typography>
            <input
              type="file"
              name="pdfFile"
              onChange={(event) =>
                formik.setFieldValue("pdfFile", event.currentTarget.files[0])
              }
            />
            <DialogActions>
              <Button onClick={handleCloseModal} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default StudentData;
