import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { api } from "./api";
import Form from "./pages/Form";

const App = () => {
  const [successText, setSuccessText] = useState(null);

  useEffect(() => {
    api
      .get("/test")
      .then(({ data }) => setSuccessText(data))
      .catch((err) => console.error(err));
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", padding: 0, margin: 0 }}
      spacing={0}
    >
      <Grid item>
        <p>Fetched api response from server: {successText}</p>

        <Form />
      </Grid>
    </Grid>
  );
};

export default App;
