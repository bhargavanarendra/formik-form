import "./App.css";
import { Form, Formik } from "formik";
import axios from "axios";
import { useState } from "react";

function App() {
  const [isSecond, setissecond] = useState(false);
  const [isAlluploaded, setisAlluploaded] = useState(false);
  return (
    <Formik
      initialValues={{
        front: null,
        back: null,
      }}
      onSubmit={(values, props) => {
        let data = new FormData();

        data.append("front", values.front);
        data.append("back", values.back);

        console.log(values.front);
        console.log(values.back);
        axios
          .post("http://localhost:8080/getSizes", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((response) => {
            console.log(response);
            setissecond(false);
            setisAlluploaded(false);
          })
          .catch((err) => {
            console.log(err);
          });
        props.setSubmitting(false);
      }}
    >
      {(formik) => {
        return (
          <>
            <Form>
              <input
                id="filefront"
                name="front"
                type="file"
                onChange={(event) => {
                  const files = event.target.files;
                  let myFiles = Array.from(files);
                  formik.setFieldValue("front", myFiles[0]);
                  setissecond(true);
                }}
              />

              {isSecond && (
                <input
                  id="fileback"
                  name="back"
                  type="file"
                  onChange={(event) => {
                    const files = event.target.files;
                    let myFiles = Array.from(files);
                    formik.setFieldValue("back", myFiles[0]);
                    setisAlluploaded(true);
                  }}
                />
              )}
              {isAlluploaded && (
                <button type="submit" disabled={formik.isSubmitting}>
                  Submit
                </button>
              )}
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default App;
