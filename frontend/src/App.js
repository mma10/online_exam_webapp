import './App.css';
import react,{ Component } from 'react';

import Navbar from '../src/components/navbar/Navbar'
//import createMeme from '../src/components/createMeme';
//import MemeList from '../src/components/memeList';

import { Route } from 'react-router-dom'

class App extends Component{
  render(){
    return (
      <div className = "App">
        <Navbar/>
        {/* <Route exact path = "/login" component = { login }/>  

        <Route exact path = "/student" component = { student }/>
        <Route exact path = "/student/giveExam" component = { giveExam }/>
        <Route exact path = "/student/subjects" component = { subjects }/>        
        <Route exact path = "/student/results" component = { results }/>

        <Route exact path = "/admin" component = { admin }/>
        <Route exact path = "/admin/setExam" component = { setExam }/>
        <Route exact path = "/admin/studentResults_admin" component = { studentResults_admin }/>

        <Route exact path = "/invigilator" component = { invigilator }/>    */}
      </div>
    );
  }
  
}

export default App;
