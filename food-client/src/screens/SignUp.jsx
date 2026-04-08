import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SignUp() {
    const[credentials,setcredentials] = useState({
        name:"",
        email:"",
        password:"",
        geolocation:""
    })
    const navigate = useNavigate();
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/createuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name ,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        });
         const json = await response.json();
         console.log(json);
         navigate('/loginuser')

         if(!json.success){
            alert("Enter valid credentials")

         }


    }

    const handleChange = (e)=>{
        setcredentials({...credentials,[e.target.name]: e.target.value});

    }
    
  return (
    <div>
        <Navbar/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            name="name"
            value={credentials.name}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email 
            </label>
            <input type="text" placeholder="enter your email"
             className="form-control"
              name="email" 
              value={credentials.email}
               onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
           name="password"
            placeholder="Password"
            value={credentials.password}
             onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            name="geolocation"
            placeholder="Enter your address"
            value={credentials.geolocation}
             onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/loginuser" className="m-3 btn btn-danger">Already a User</Link>
      </form>
    </div>
  );
}
