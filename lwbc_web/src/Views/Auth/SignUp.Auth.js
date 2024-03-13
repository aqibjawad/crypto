import React, { useRef, useState, useEffect } from "react";

import { Button, Form, Row, Col, Container } from "react-bootstrap";


import "./auth.css"

import { toast } from "react-toastify";
import { POST } from "../../apicontroller/ApiController";

import { useNavigate } from "react-router-dom"

const Signup = () => {

  const history = useNavigate();

  const [isValid, setIsValidPass] = useState(false);

  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  // ---------------------- Password Validation Start -------------------------------------- //

  const validatePassword = () => {
    // Define your validation criteria
    const lengthRegex = /^.{8,}$/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Update validation state based on criteria
    setValidations({
      length: lengthRegex.test(password),
      uppercase: uppercaseRegex.test(password),
      number: numberRegex.test(password),
      special: specialRegex.test(password),
    });
  };


  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState('');


  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Perform password validation
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword);
    const hasAlphabet = /[a-zA-Z]/.test(newPassword);

    setIsValidPass(hasNumber && hasSpecialCharacter && hasAlphabet);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password Check
  const [passError, setPassError] = useState(false);

  /* Function to match password */
  const matchPass = (confirm, password) => {
    if (confirm.length != 0 || password.length != 0) {
      if (password === confirm) {
        setPassError(false);
      } else {
        setPassError(true);
      }
    } else {
      setPassError(true);
    }
  };


  // ---------------------- Password Validation End -------------------------------------- //


  // ---------------------- Email Validation Start -------------------------------------- //
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Perform email validation using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(newEmail));
  };
  // ---------------------- Email Validation End -------------------------------------- //

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const referralcodeRef = useRef();

  const submit = async (event) => {
    event.preventDefault();
    const formData = {
        firstname: firstnameRef.current.value,
        lastname: lastnameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        referralcode: referralcodeRef.current.value,
        role: 3,
    };
    POST("auth", formData).then((res) => {
        toast("Your Login Added Successfully")
        history("/signin")
    });
};


  return (
    <Container className="d-flex justify-content-center" style={{ padding: "50px 0px" }} >
      <Form className="">
        <h2 className="text-center">Sign Up</h2>
        <div className="d-flex justify-content-center">
            <img className="logo" src="/Family Loan Insurance Logo.png" />
        </div>
        <Row className="mt-4">
          <Col sm={6} >
            <Form.Group className="" controlId="formBasicName" >
              <Form.Control ref={firstnameRef} className="input-field" type="text" placeholder="First Name" />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group className="" controlId="formBasicEamil" >
              <Form.Control ref={lastnameRef} className="input-field" type="text" placeholder="Last Name" />
            </Form.Group>
          </Col>

          <Col sm={6} >
            <Form.Group className="mt-4" controlId="formBasicName" >
              <Form.Control ref={emailRef} className="input-field" type="email" placeholder="Email" onChange={handleEmailChange} />
            </Form.Group>


            {isEmailValid ? (
              <p style={{ color: 'green' }}>Email is valid!</p>
            ) : (
              <p style={{ color: 'red' }}>Invalid email.</p>
            )}

          </Col>

          <Col sm={6} >
            <Form.Group className="mt-4" controlId="formBasicName" >
              <Form.Control ref={referralcodeRef} className="input-field" type="text" placeholder="Reffral Code" />
            </Form.Group>
          </Col>

          <Col sm={6} >
            <Form.Group className="mb-3 mt-4" controlId="formBasicPassword"  >
              <div className="d-flex">
                <Form.Control ref={passwordRef} className="input-field" placeholder="Password" type="password" />
              </div>
            </Form.Group>

          </Col>

          <Col sm={6} >
            <Form.Group className="mb-3 mt-4" controlId="formBasicPassword"  >
              <div className="d-flex">
                <Form.Control className="input-field" placeholder="Confirm Password" type="password"
                />
              </div>
            </Form.Group>

          </Col>

          <Col sm={6}>
            <Form.Group className="mt-4">
              <Form.Label> Front ID Card </Form.Label> <br />
              <input
                accept="image/*"
                type="file"
                className="fs-6 form-control-file"
                id="exampleFormControlFile1"
              // onChange={(e) => setBannerImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group className="mt-4">
              <Form.Label> Back ID Card </Form.Label> <br />
              <input
                accept="image/*"
                type="file"
                className="fs-6 form-control-file"
                id="exampleFormControlFile1"
              // onChange={(e) => setBannerImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-center">
          <Button
            onClick={submit}
            // disabled={!Object.values(validations).every(Boolean)}
            className="border-0 mt-5"
            type="submit"
            style={{ width: "290px", backgroundColor: "#233D7B", color: 'white' }}
          >
            Create Account
          </Button>
        </div>
      </Form>
    </Container >
  )
}
export default Signup