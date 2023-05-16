import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  category: yup.string().required('Category is required'),
  capacity: yup.string().required('Capacity is required'),
  description: yup.string().required('Description is required'),
});

export function EventForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      capacity: '',
      description: '',
      // startTime: '',
      // endTime: '',
      // headerImage: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission logic here
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="Event Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        margin="normal"
      />
      <TextField
        id="category"
        name="category"
        label="Category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.category && Boolean(formik.errors.category)}
        helperText={formik.touched.category && formik.errors.category}
        margin="normal"
      />
      <TextField
        id="capacity"
        name="capacity"
        label="Capacity"
        value={formik.values.capacity}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.capacity && Boolean(formik.errors.capacity)}
        helperText={formik.touched.capacity && formik.errors.capacity}
        margin="normal"
      />

      <TextField
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        margin="normal"
      />

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default EventForm;
