import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, Divider } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";

const About = () => {
  return (
    <Box padding={4} sx={{ backgroundColor: "#f7f8fa" }}>
      <Box textAlign="center" marginBottom={5}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#3f51b5" }}>
          About Our Student Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#666" }}>
          Empowering students to track their progress, manage tasks, and achieve academic excellence.
        </Typography>
      </Box>

      <Grid container spacing={4}>
      
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                Our Mission
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography variant="body1" sx={{ color: "#555" }}>
                We aim to provide students with the tools and resources needed to monitor their academic progress, 
                stay organized, and achieve success. Our dashboard offers an easy-to-use interface with comprehensive 
                features for students to track their goals and celebrate achievements.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

       
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} sm={6}>
              <Card elevation={3} sx={{ textAlign: "center" }}>
                <CardContent>
                  <Avatar sx={{ bgcolor: "#3f51b5", margin: "auto" }}>
                    <PeopleIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
                    5,000+
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Students Enrolled
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6}>
              <Card elevation={3} sx={{ textAlign: "center" }}>
                <CardContent>
                  <Avatar sx={{ bgcolor: "#4caf50", margin: "auto" }}>
                    <StarIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
                    1,200+
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Achievements Unlocked
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6}>
              <Card elevation={3} sx={{ textAlign: "center" }}>
                <CardContent>
                  <Avatar sx={{ bgcolor: "#ff9800", margin: "auto" }}>
                    <SchoolIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
                    300+
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Active Courses
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6}>
              <Card elevation={3} sx={{ textAlign: "center" }}>
                <CardContent>
                  <Avatar sx={{ bgcolor: "#f44336", margin: "auto" }}>
                    <StarIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
                    50+
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Key Milestones Reached
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
