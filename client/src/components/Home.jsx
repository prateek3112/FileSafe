import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import Table from "./Table";

const Home = () => {
  const [userData, setUserData] = useState();
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState("");
  const [preview,setPreview] = useState('');

  const history = useHistory();
  const checkValidity = async () => {
    try {
      const res = await fetch("/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

     setUserData(data);
      
      
    } catch (ex) {
      console.log(ex);
      history.push("/login");
    }
  };

  useEffect(() => {
    checkValidity();
  },[]);

  const onFileSelect = (e)=>{
    console.log('clicked')
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    
if(e.target.files[0]){
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onloadend = async() =>{
    setPreview(reader.result);
    
    console.log(file);

  }
  console.log(preview);
  

  
  
}
  }
  const onPreview = ()=>{
    
    if(preview){
      Swal.fire({
        title: 'Sweet!',
        
        html: "<b>You sure you want to upload ?</b>" +"<img src='"+preview+"' style='width:400px;'>",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, upload it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // onUpload();
          uploadOnServer(preview,file);
        }
      })
    }
  }
const getfile = ()=>{
return file;
}
  const uploadOnServer = async(base64EncodedImage,file)=>{
    var fileObject = getfile();
debugger;
    // reCreate new Object and set File Data into it
    var newObject  = {
       'lastModified'     : fileObject.lastModified,
       'lastModifiedDate' : fileObject.lastModifiedDate,
       'name'             : fileObject.name,
       'size'             : fileObject.size,
       'type'             : fileObject.type
    };
    try {
      const res = await fetch('/server/upload',{
        method : "POST",
        headers :{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({data : base64EncodedImage , fileData : newObject}),
        
      });
console.log(res);
if(res.status ===200){
  Swal.fire(
    'Good job! :)',
    'Your File was Uploaded!',
    'success'
  )
  
}
else{
  Swal.fire(
    'Ohh No! :)',
    'Your File was not Uploaded!',
    'error'
  )
}
    } catch (error) {
      console.log(error);
    }

  } 
  // const onUpload = async (e)=>{
  //   // e.preventDefault();
  //   console.log(file);
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("fileName", fileName);
  //   const res = await fetch('/upload',{
  //     method : "POST",
      
      
  //     body : formData
  //   });

  //   console.log(res);

  //   if(res.status ===200){
  //     Swal.fire(
  //       'Good job! :)',
  //       'Your File was Uploaded!',
  //       'success'
  //     )
      
  //   }
  //   else{
  //     Swal.fire(
  //       'Ohh No! :)',
  //       'Your File was not Uploaded!',
  //       'error'
  //     )
  //   }
  // }

  if (userData) {
    return (
      <>
        <div className="container">
          <div className="mb-4 fileInputDiv">
            <form className="fileInputDiv">
              <div className="form-group">
                <input
                  className="form-control fileInput"
                  type="file"
                  
                  onChange = {(e) =>{onFileSelect(e)}}
                  id="formFile"
                ></input>
              </div>
              <div className="form-group">
                <button
                onClick={onPreview}
                  type="button"
                  style={{
                    height: "34px",
                    width: "102px",
                    position: "absolute",
                    top: "-18.6px",
                  }}
                  name="upload"
                  
                  className="form-control fileSubmit form-submit submit px-3"
                >
                  Preview
                </button>
              </div>
            </form>
          </div>
          
          {/* <span className="badge bg-dark text-light">Got Your Files Right Here!</span> */}
          
          <Table userData = {userData}/>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="mb-4 fileInputDiv">
            <form className="fileInputDiv">
              <div className="form-group">
                <input
                  className="form-control fileInput"
                  type="file"
                  id="formFile"
                ></input>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  style={{
                    height: "34px",
                    width: "102px",
                    position: "absolute",
                    top: "-18.6px",
                  }}
                  name="upload"
                  className="form-control fileSubmit form-submit submit px-3"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default Home;
