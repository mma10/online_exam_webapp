import './App.css';
import react,{ Component } from 'react';

import login from '../src/components/auth/login';

import Navbar from '../src/components/navbar/Navbar';

import student from '../src/components/students/student';
import subjects from '../src/components/students/subjects';
import results from '../src/components/students/results';
import giveExam from '../src/components/students/giveExam';

import admin from '../src/components/admin/admin';
import setExam from '../src/components/admin/setExam';

import invigilator from '../src/components/invigilator/invigilator';

import students from '../src/components/management/students';
import invigilators from '../src/components/management/invigilators';
import admins from '../src/components/management/admin';
// import exam from '../src/components/management/students'

import { Route } from 'react-router-dom';
import axios from 'axios';


import { loadUser } from './store/actions/authActions'; 
import { connect } from 'react-redux';

class App extends Component{
  componentDidMount(){
    // Get the token from the backend and store locally    
    const token = localStorage.getItem('token');
    axios.get("http://localhost:4000/api/auth/" + token)
    .then(res => {
      if(res.data.id)
        localStorage.setItem('token',res.data.id);
    })
    .catch(err => {
      throw err;
    });

    // Check if the user if already logged in. If yes, retrieve the corresponsing data
    const auth = localStorage.getItem('auth');
    if(auth){
      // Call the loadUser action
      this.props.loadUser();
    }
  }

  render(){
    return (
      <div className = "App">
        <Navbar/>
        <Route exact path = "/login" component = { login }/>  

        <Route exact path = "/student/exams" component = { student }/>
        <Route exact path = "/student/giveExam" component = { giveExam }/>
        <Route exact path = "/student/subjects" component = { subjects }/>        
        <Route exact path = "/student/results" component = { results }/>

        <Route exact path = "/admin" component = { admin }/>
        <Route exact path = "/admin/setExam" component = { setExam }/>

        <Route exact path = "/invigilator" component = { invigilator }/>   

        <Route exact path = "/management/students" component = { students }/>
        <Route exact path = "/management/invigilators" component = { invigilators }/>
        <Route exact path = "/management/admins" component = { admins }/>        
        {/* <Route exact path = "/management/exams" component = { exam }/> */}
      </div>
    );
  }
  
}

export default connect(null,{ loadUser })(App);
