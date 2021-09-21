import React from 'react';
import logo from '../../src/images/008_final.gif'

const ErrorPage = () => {
    return (
        <div style={{height:"100vh",marginTop:"5px" , width:"100vw",background:"white"}}>
            <img src={logo} style={{objectFit:"cover",height:"100vh",width:"100vw"}} alt="loading..." />
        </div>
    )
}

export default ErrorPage
