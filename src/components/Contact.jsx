import React from "react";
import { Box, Typography, Grid, Card, CardContent, TextField, Button, IconButton, Divider } from "@mui/material";
import { Email, Phone, LocationOn, Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const Contact = () => {
  return (
    <Box padding={4} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box textAlign="center" marginBottom={5}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#3f51b5" }}>
          Get in Touch
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#666" }}>
          We'd love to hear from you! Whether you have questions or need assistance, feel free to reach out.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
       
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ padding: 3 }}>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                Contact Us
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />

              <form noValidate autoComplete="off">
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  margin="normal"
                  sx={{ marginBottom: 3 }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ padding: "10px 0", fontWeight: "bold" }}
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ padding: 3, backgroundColor: "#3f51b5", color: "#fff" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Contact Details
              </Typography>
              <Divider sx={{ marginBottom: 2, backgroundColor: "#fff" }} />

              <Box display="flex" alignItems="center" mb={2}>
                <Email sx={{ marginRight: 2 }} />
                <Typography variant="body1">info@example.com</Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Phone sx={{ marginRight: 2 }} />
                <Typography variant="body1">+123 456 7890</Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <LocationOn sx={{ marginRight: 2 }} />
                <Typography variant="body1">123 Street, City, Country</Typography>
              </Box>

             
              <Box marginTop={3}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Connect with us:
                </Typography>
                <IconButton color="inherit" href="#" sx={{ color: "#fff" }}>
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" href="#" sx={{ color: "#fff" }}>
                  <Twitter />
                </IconButton>
                <IconButton color="inherit" href="#" sx={{ color: "#fff" }}>
                  <LinkedIn />
                </IconButton>
              </Box>
            </CardContent>
          </Card>

        
          <Box mt={3}>
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093144!2d144.9537354153168!3d-37.81720997975133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577ed0e64d0207b!2sVictoria%20Australia!5e0!3m2!1sen!2sin!4v1597413792729!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: "0" }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
