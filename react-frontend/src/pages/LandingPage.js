import React from 'react';
import person from '../assets/img/person.svg';
 //build landing page here
const LandingPage = () => {
  return (
    <div className="container-fluid p-5 mt-5">
      <div className="row justify-content-center">
        <div className='col-md-6 text-center mb-5'>  
          <h1>Welcome to the app</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, quisquam.
          </p>
          <a href="/register" className="btn btn-outline-primary">
            Get Started
          </a>

        </div>
        <div className="col-md-6 text-center mb-5">
        <img src={person} className="mw-100" alt="logo" />
        </div>
      </div>
      </div>
  );
};
export default LandingPage;
    



