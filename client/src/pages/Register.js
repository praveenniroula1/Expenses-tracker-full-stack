import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { postNewUser } from "../helpers/axiosHelper";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
  fName: "",
  lName: "",
  confirmPassword: "",
};
const Register = () => {
  const [form, setForm] = useState(initialState);
  const [resp, setResp] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return alert("Password do not match");
    }

    const { status, message } = await postNewUser(rest);
    setResp({ status, message });

    toast[status](message);
    status === "success" && setForm(initialState);
  };

  return (
    <MainLayout>
      <div className="register login-page d-flex justify-content-center mt-5 ">
        <div className="login-form border p-4 shadow-lg bg-light mt-2">
          <h3>Register new user</h3>
          <hr />
          <Form onSubmit={handleOnSubmit}>
            {resp.message && (
              <Alert variant={resp.status === "success" ? "success" : "danger"}>
                {resp.message}
              </Alert>
            )}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="fName"
                required
                onChange={handleOnChange}
                type="text"
                placeholder="Enter email"
                value={form.fName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lName"
                required
                onChange={handleOnChange}
                type="text"
                placeholder="Enter email"
                value={form.lName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                required
                onChange={handleOnChange}
                type="email"
                placeholder="Enter email"
                value={form.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                onChange={handleOnChange}
                type="password"
                placeholder="Password"
                value={form.password}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                onChange={handleOnChange}
                type="password"
                placeholder="Password"
                value={form.confirmPassword}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <div className="text-end">
            Already have account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
