import * as React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  message: yup.string().required('Message is required'),
});

export function EventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      // perform submit here, e.g. send data to server
      console.log(values);
      resetForm();
      setIsSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        fullWidth
        margin="normal"
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
        margin="normal"
      />
      <TextField
        id="message"
        name="message"
        label="Message"
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.message && Boolean(formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}
