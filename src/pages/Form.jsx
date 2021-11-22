import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Grid } from "@mui/material";
import { api } from "../api";

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    api.post("/", { text: data.text }).then(({ data }) => console.log(data));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <TextField
            required
            multiline
            name="text"
            label=" text"
            fullWidth
            margin="dense"
            {...register("text")}
            error={errors.text ? true : false}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            SEND
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default Form;
