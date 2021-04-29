import './App.css';
import react,{ Component } from 'react';

import login from '../src/components/auth/login';

import Navbar from '../src/components/navbar/Navbar';

import student from '../src/components/students/student';
import subjects from '../src/components/students/subjects';
import results from '../src/components/students/results';
import giveExam from '../src/components/students/giveExam';

import invigilator from '../src/components/invigilator/invigilator';

import students from '../src/components/management/students';
import invigilators from '../src/components/management/invigilators';

import { Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component{
  componentDidMount(){
    // Get the token from the backend and store locally
    
    const token = localStorage.getItem('token');
    console.log(token,"Frontend token");
    axios.get("http://localhost:4000/api/auth/" + token)
    .then(res => {
      if(res.data.id)
        localStorage.setItem('token',res.data.id);
    })
    .catch(err => {
      throw err;
    });
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

        {/* <Route exact path = "/admin" component = { admin }/> */}
        {/* <Route exact path = "/admin/setExam" component = { setExam }/> */}
        {/* <Route exact path = "/admin/studentResults_admin" component = { studentResults_admin }/> */}

        <Route exact path = "/invigilator" component = { invigilator }/>   

        <Route exact path = "/management/students" component = { students }/>
        <Route exact path = "/management/invigilators" component = { invigilators }/>
        {/* <Route exact path = "/management/admins" component = { student }/>         */}
        {/* <Route exact path = "/management/exams" component = { student }/> */}
      </div>
    );
  }
  
}

export default App;
