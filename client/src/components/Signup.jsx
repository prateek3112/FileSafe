import React, { useState } from "react";
import { NavLink , useHistory} from "react-router-dom";
import Swal from 'sweetalert2'

const Signup = () => {

	const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name,value;
  const handleChange = (e)=>{

	name = e.target.name;
	value= e.target.value
setUser({...user,[name]:value});

  }

  const submitForm = async (e)=>{

	e.preventDefault();
	const { name, email, password, cpassword } = user;

	const res =  await fetch("/register",
	{
		method : "POST",
		headers :{
			"Content-Type" : "application/json"
		},
		body : JSON.stringify({name, email, password, cpassword})
	})

	const data = await res.json();


	if(res.status === 422 || !res || res.status === 404 || res.status === 500){
		const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
      })
      
      Toast.fire({
      icon: 'error',
      title: data.Error
      })
	}
	else if(res.status === 200 || res.status === 201){
		const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
      })
      
      Toast.fire({
      icon: 'success',
      title: data.message
      })
		  history.push('/login');
	}
  }
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Sign Up</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <form action="#" className="signin-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
					  onChange={handleChange}
					  value={user.name}
                      placeholder="Name"
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
					  value={user.email}
                      className="form-control"
                      name="email"
					  onChange={handleChange}
                      id="email"
                      placeholder="Email"
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
					  value={user.password}
                      name="password"
                      id="password"
					  onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                      required
                    ></input>
                    <span
                      toggle="#password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="cpassword"
					  value={user.cpassword}
					  onChange={handleChange}
                      id="cpassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                    ></input>
                    <span
                      toggle="#password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      name="signup"
                      className="form-control form-submit btn btn-primary submit px-3"
					  onClick={submitForm}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-100">
                      <label className="checkbox-wrap">
                        <NavLink to="/login" className="checkmark">
                          Already a User? Login!
                        </NavLink>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
