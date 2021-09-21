import React, { useState } from "react";
import { NavLink , useHistory} from "react-router-dom";
import Swal from 'sweetalert2'

const Login = () => {
	const history = useHistory();
  const [currentUser, SetCurrentUser] = useState({
    email: "",
    password: "",
  });

  let name,value;
  const handleChange = (e) => {
    
    
	name = e.target.name;
	value= e.target.value
    
	SetCurrentUser({
	...currentUser,	[name]:value
	})
  };

  const loginUser = async (e)=>{
e.preventDefault();
const {email , password} = currentUser;

const res = await fetch('/login',{
	method : "POST",
	headers :{
		"Content-Type" : "application/json"
	},
	body : JSON.stringify({email, password})
});

const data = await res.json();
console.log(data);

if(res.status === 422 || !res || res.status === 404 ||  res.status === 500){
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
	  history.push('/home');
}
  }
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Login</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <form className="signin-form">
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
					  value={currentUser.email}
					  onChange={handleChange}
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      id="password"
                      type="password"
                      name="password"
					  value={currentUser.password}
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
                    <button
                      type="submit"
                      name="signin"
					  onClick={loginUser}
                      className="form-control btn btn-primary form-submit submit px-3"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-100">
                      <label className="checkbox-wrap">
                        <NavLink to="/signup" className="checkmark text-center">
                          Not a User? Sign up Now!
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

export default Login;
