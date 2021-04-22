import './App.css';
import react,{ Component } from 'react';

import Navbar from '../src/components/navbar/Navbar'

import student from '../src/components/students/student';
import subjects from '../src/components/students/subjects';
import results from '../src/components/students/results';
import giveExam from '../src/components/students/giveExam';

import { Route } from 'react-router-dom'
import axios from 'axios';

class App extends Component{
  componentDidMount(){
    axios.get("http://localhost:4000/api/auth");
  }

  render(){
    return (
      <div className = "App">
        <Navbar/>
        {/* <Route exact path = "/login" component = { login }/>   */}

        <Route exact path = "/student/exams" component = { student }/>
        <Route exact path = "/student/giveExam" component = { giveExam }/>
        <Route exact path = "/student/subjects" component = { subjects }/>        
        <Route exact path = "/student/results" component = { results }/>

        {/* <Route exact path = "/admin" component = { admin }/>
        <Route exact path = "/admin/setExam" component = { setExam }/>
        <Route exact path = "/admin/studentResults_admin" component = { studentResults_admin }/>

        <Route exact path = "/invigilator" component = { invigilator }/>    */}
      </div>
    );
  }
  
}

export default App;
