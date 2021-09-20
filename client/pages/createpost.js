import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navigation from "../components/Navigation";
import router, { useRouter } from "next/router";

export default function CreatePost() {
  const router = useRouter();

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data)
      .then((response) => {
        console.log("post is Worked", response.data);
      })
      .finally(() => {
        router.push("/");
      });
  };

  return (
    <>
      <Navigation />
      <div className="createPostPage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label htmlFor="">Title: </label>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="(Ex. Title...)"
            />
            <label htmlFor="">Post: </label>
            <ErrorMessage name="postText" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="postText"
              placeholder="(Ex. Post...)"
            />
            <label htmlFor="">Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. John123...)"
            />
            <button type="submit">Create a Post</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
