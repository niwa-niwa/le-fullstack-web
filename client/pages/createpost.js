import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuthContext } from "../helpers/AuthContext";

export default function CreatePost() {
  const router = useRouter();
  const { authState } = useAuthContext();

  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!authState.status) {
      router.push("/login");
    }
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log("post is Worked", response.data);
      })
      .finally(() => {
        router.push("/");
      });
  };

  return (
    <Layout>
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

            <button type="submit">Create a Post</button>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
}
