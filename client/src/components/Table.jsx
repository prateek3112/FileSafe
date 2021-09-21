import React ,{useState,useEffect}from 'react'

const Table = (userData) => {
    
    const [userFiles, setUserFiles] = useState();


    let newFiles   
const onfileClick = (index)=>{
    debugger;
 newFiles =  userData.userData.files.splice(index,1)
    setUserFiles(newFiles);
}



useEffect(() => {
    
    setUserFiles(userData.userData.files)
 }, [newFiles,userData.userData.files]);


  return (
      <>
      <table className="table caption table-dark table-hover tableClass">
            <caption>Got Your Files Right Here {userData.name}!</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">File</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {userData.userData.files.map((file,index) => (  
          <tr key={index}>
          <th scope="row">{index+1}</th>
          <td>{file.name}</td>
          <td><a href={file.file}>Have a look</a></td>
          <td>{file.createdAt}</td>
          <td onClick={() =>{onfileClick(index)}} style={{cursor:'pointer'}}>Delete</td>
        </tr>  
        ))}
                     
            </tbody>
          </table>
      </>
  )
}

export default Table