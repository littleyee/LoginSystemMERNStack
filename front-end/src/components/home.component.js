import React, { Component } from "react";
import medicalImage from "./medical.jpg";
 
class Home extends Component {
  render() {
    return (
      <div
      class= 'home'
      style={{
        backgroundImage: `url(${medicalImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        color: "#f5f5f5"
        
      }}
      >
         
        <h2>Welcome to the Home Page of our Healthcare Software</h2>
        
        <p>This software was developed jointly by Pratik,Lexie and Zhu. We hope to provide you with the best health care services.</p>
      
        </div>
      
    );
  }
}
 
export default Home;