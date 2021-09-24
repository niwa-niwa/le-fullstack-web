import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navigation from "../components/Navigation";

export default function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <>
      <Navigation />

      <div className="App">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label htmlFor="">Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. john123...)"
            />

            <label htmlFor="">Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="password"
              placeholder="Your Password..."
            />

            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}