//Register.js

import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";
const Register = () => {
  const history=useHistory()
  const { enqueueSnackbar } = useSnackbar();


   


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
   const handleInput=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
   }
   const [formData,setFormData]=React.useState({username:'',password:'',confirmPassword:''});


  //  const [password,setPassword]=React.useState("");


  //  const [confirmPassword,setcnfPassword]=React.useState("");
   const [loadind,isLoading]=React.useState(false);
  const register = async (data) => {
    // console.log(username,password,confirmPassword)
    isLoading(true)
 
    // const registerApicall=async (body)=>{
      let url =config.endpoint+"/auth/register";
      try{
        let responce=await axios.post(url,data);
        console.log(responce,"bkbkb")
        if(responce.data.success===true){
          enqueueSnackbar("Register Successfull",{ variant: 'success' })
          isLoading(false)
          history.push('/login')
        }else{
          enqueueSnackbar(responce?.messag,{ variant: 'error' })
          isLoading(false)
        }
      }catch(err){
        console.log(err?.response?.data?.message
          )
        isLoading(false);
        if (err.response && err.response.data && err.response.data.message) {
          enqueueSnackbar(err.response.data.message, { variant: 'error' });
        } else {
          enqueueSnackbar('An error occurred', { variant: 'error' });
        }
      }
     
     }
     
 


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    // enqueueSnackbar("ssss")


    console.log(data)
    if(!data?.username){
      enqueueSnackbar("Username is a required field",{ variant: 'warning' })
    }else if(data?.username.length<7){
      enqueueSnackbar("Username must be at least 6 characters",{ variant: 'warning' })
    }else if(!data?.password){
      enqueueSnackbar("Password is a required field",{ variant: 'warning' })
    }else if(data?.password.length<7){
      enqueueSnackbar("Password must be at least 6 characters",{ variant: 'warning' })
    }
    else if(data?.password!==data?.confirmPassword){
      enqueueSnackbar("Passwords do not match",{ variant: 'warning' })
    }else{
      let body={"username":data.username,"password":data.password}
      register(body)
    }
  };


  return (
    <Box
      display="block"
      flexDirection="column"
      // justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <form onSubmit={(e)=>{
           e.preventDefault();
           let data={"username":formData.username,"password":formData.password,"confirmPassword":formData.confirmPassword}
           validateInput(data)
           }}>
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            onChange={(e)=>{handleInput(e)}}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            onChange={(e)=>{handleInput(e)}}
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={(e)=>{handleInput(e)}}
            fullWidth
          />
          {loadind &&
         <Box sx={{ display: 'flex' ,justifyContent:"center"}}>
         <CircularProgress color="success"  />
       </Box>      
           }  
           {! loadind &&
           <Button className="button" variant="contained" type="submit">
           
           Register Now
          </Button>


           }
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
             
             
          </p>
        </Stack>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};


export default Register;



