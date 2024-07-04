import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserLogedContext } from "../../context/UserLogedContext";
import avtar from "../../assets/avtar.jpeg"

export default function Login() {
  // to chanck whether user login state changes or not
  const { isUserLoged, setIsUserLoged } = useContext(UserLogedContext);
  // for navigation
  const navigate = useNavigate();

  // schema for formik form
  const userFormSchema = yup.object().shape({
    image: yup.mixed(),
    username: yup.string(),
    email: yup.string().email().required("enter valid email"),
    password: yup.string().min(4).max(16).required("password required"),
    contact_num: yup.string(),
  });

  // formik form
  const [selectedImage, setSelectedImage] = useState();
  const [loginSignupState, setLoginSignupState] = useState("signup");

  // to handle form submit
  const handleFormSubmit = async (values) => {
    console.log("hello")
    let url = `${process.env.REACT_APP_BACKEND_IP}/user/`;
    url += loginSignupState === "signup" ? `createuser` : `userlogin`;
    let data;
    let response;

    if (loginSignupState === "signup") {
      const formdata = new FormData();
      if (selectedImage) formdata.append("image", selectedImage);
      for (let [key, value] of Object.entries(values)) {
        formdata.append(key, value);
      }

      response = await fetch(url, {
        method: "POST",
        body: formdata,
      });
      console.log(response);
      data = await response.json();
      console.log(data);
    } else {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      data = await response.json();
      // console.log(data);
    }

    if (data.signal === "red") alert(data.error);
    else {
      console.log(data.usertoken);
      localStorage.setItem("usertoken", data.usertoken);
      setIsUserLoged(true);
      navigate("/result");
    }
  };

  // to toggle login and signup
  const handleLoginSignupToggle = () => {
    if (loginSignupState === "signup") setLoginSignupState("login");
    else setLoginSignupState("signup");
  };

  // formik form -------------
  const formik = (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        contact_num: "",
      }}
      validationSchema={userFormSchema}
      onSubmit={(values) => {
        console.log('onsubmit');
        handleFormSubmit(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              height: "70vh",
              width: "40vw",
            }}
            className=" items-center justify-center"
          >
            {loginSignupState === "signup" && (
              <div
                style={{
                  width: 100,
                  height: 100,
                  cursor: "pointer",
                }}
                className="border-2 border-gray-300 rounded-lg overflow-hidden"
                onClick={() => document.getElementById("image").click()}
              >
                {selectedImage ? (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      overflow: "hidden",
                    }}
                    src={URL.createObjectURL(selectedImage)}
                    alt="uploaded img"
                  />
                ) :
                (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      overflow: "hidden",
                    }}
                    src={avtar}
                    alt="uploaded img"
                  />
                )}
              </div>
            )}

            {/* hidden input used by image avtar  */}
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />

            {loginSignupState === "signup" && (
              <div width={"100%"}>
                <input
                  className="rounded-md p-1 w-[20vw] active:border-gray-400 border-gray-300 border-[1px]"
                  label="userName"
                  type="txt"
                  name="username"
                  id="username"
                  placeholder="User Name (*)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {!values.username && touched.username && (
                  <div className="text-red-800"> username required </div>
                )}
              </div>
            )}

            <div width={"100%"}>
              <input
                className="rounded-md p-1 w-[20vw] active:border-gray-400 border-gray-300 border-[1px]"
                variant="standard"
                label="email"
                type="email"
                name="email"
                placeholder="Email (*)"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && <div className="text-red-800">{errors.email} </div>}
            </div>
            {loginSignupState === "signup" && (
              <div width={"100%"}>
                <input
                  className="rounded-md p-1 w-[20vw] active:border-gray-400 border-gray-300 border-[1px]"
                  variant="standard"
                  label="Contact Number"
                  type="txt"
                  name="contact_num"
                  id="contact_num"
                  placeholder="Contact Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact_num}
                />
                {errors.contact_num && touched.contact_num && (
                  <div className="text-red-800">{errors.contact_num} </div>
                )}
              </div>
            )}
            <div width={"100%"}>
              <input
                className="rounded-md p-1 w-[20vw] active:border-gray-400 border-gray-300 border-[1px]"
                variant="standard"
                label="Password"
                type="txt"
                name="password"
                id="password"
                placeholder="Password (*)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <div className="text-red-800">{errors.password} </div>
              )}
            </div>
            <button
              className=" mt-5 border hover:bg-blue-600 bg-blue-500 w-[20vw] h-[7vh] shadow-blue-500 border-none shadow-lg flex items-center justify-center text-white font-bold rounded-lg cursor-pointer"
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
                Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );

  // to check weather user already logged or not
  useEffect(() => {
    if (localStorage.getItem("usertoken")) navigate("/result");
  }, []);

  return (
    <div
      style={{
        position: "relative",
        zIndex: "100",
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "8vh",
      }}
      >
      <div
        sx={{
          width: "30%",
        }}
        className="border-[1px] p-2 border-gray-500 shadow-lg shadow-blue-500/50 flex flex-col rounded-md"
      >
        <button
              className="font-bold text-blue-500 hover:text-blue-600 hover:decoration-solid hover:underline"
              onClick={handleLoginSignupToggle}
            >
              Click here to{" "}
              {loginSignupState === "signup" ? "Login" : "Sign-Up"}
            </button>
        {formik}
      </div>
    </div>
  );
}
