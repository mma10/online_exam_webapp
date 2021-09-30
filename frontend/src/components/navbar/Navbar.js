import { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import propTypes from 'prop-types';

import '../../styles/navbar.css'

import Logout from '../auth/logout';
import { logout } from '../../store/actions/authActions';

class navbar extends Component{
    static propTypes = {
        logout: propTypes.func.isRequired
    }

    render(){
        // Auth links

        const guestLinks = (
            <ul className = "navbar-nav ml-auto">
                <li className = "nav-item">
                    <NavLink to = "/login" className = "nav-link">
                        <span>LOGIN</span>
                    </NavLink>
                </li>
            </ul>
        );

        // Info variables

        const studentInfo = (
            <div>
                <span>WELCOME </span>
                <span>{ this.props.auth.name }</span>

                <span>ROLL NO: </span>
                <span>{ this.props.student.rollNo }</span>
            </div>
        );
        const adminInfo  = (
            <div>
                <span>WELCOME </span>
                <span>{ this.props.auth.name }</span>

            </div>
        );
        const managementInfo = (
            <div>
                <span>WELCOME </span>
                <span>{ this.props.auth.name }</span>

            </div>
        );

        // NavLinks 
        
        const studentLinks = (
            <ul className = "navbar-nav ml-auto">
                <li className = "nav-item">
                    <NavLink to = "/student/subjects" className = "nav-link">
                        <span>REGISTERED SUBJECTS</span>
                    </NavLink>
                </li>

                <li className = "nav-item">
                    <NavLink to = "/student/exams" className = "nav-link">
                        <span>EXAMS</span>
                    </NavLink> 
                </li>

                <li className = "nav-item">
                    <NavLink to = "/student/results" className = "nav-link">
                        <span>RESULTS</span>
                    </NavLink>
                </li>                                                              

                <li className = "nav-item">                    
                    <NavLink to = "/login" className = "nav-link">
                        <Logout />
                    </NavLink>
                </li>                                                
            </ul>            
        );
        const adminLinks = (
            <ul className = "navbar-nav ml-auto">
                <li className = "nav-item">
                    <NavLink to = "/admin/subjects" className = "nav-link">
                        <span>SUBJECTS UNDERTAKEN</span>
                    </NavLink>
                </li>

                <li className = "nav-item">
                    <NavLink to = "/admin/setExam" className = "nav-link">
                        <span>SET EXAM</span>
                    </NavLink>
                </li >

                <li className = "nav-item">
                    <NavLink to = "/login" className = "nav-link">
                        <Logout />
                    </NavLink>
                </li>                                               
            </ul>
        );
        const managementLinks = (
            <ul className = "navbar-nav ml-auto">
                <li className = "nav-item">
                    <NavLink to = "/management/exams" className = "nav-link">
                        <span>EXAMS</span>
                    </NavLink>
                </li>

                <li className = "nav-item">
                    <NavLink to = "/management/students" className = "nav-link">
                        <span>STUDENTS</span>
                    </NavLink>
                </li>

                <li className = "nav-item">
                    <NavLink to = "/management/admins" className = "nav-link">
                        <span>STAFF</span>
                    </NavLink>
                </li>

                <li className = "nav-item">
                    <NavLink to = "/management/invigilators" className = "nav-link">
                        <span>INVIGILATORS</span>
                    </NavLink>
                </li>

                <li className = "nav-item">
                    <NavLink to = "/login" className = "nav-link">
                        <Logout />
                    </NavLink>
                </li>
            </ul>
        );
        const invigilatorLinks = (
            <ul className = "navbar-nav ml-auto">  
                <li className = "nav-item">
                    <NavLink to = "/invigilator" className = "nav-link">
                        <span>EXAMS ASSIGNED</span>
                    </NavLink>
                </li>
                <li className = "nav-item">
                    <NavLink to = "/login" className = "nav-link">
                        <Logout />
                    </NavLink>
                </li>
            </ul>
        )

        return(
            <nav className = "navbar navbar-expand-lg pt-1 pb-1 sticky-top">            
                { this.props.auth.type == "student" ? studentLinks : null }
                { this.props.auth.type == "admin" ? adminLinks : null }
                { this.props.auth.type == "management" ? managementLinks : null }
                { this.props.auth.type == "invigilator" ? invigilatorLinks : null } 

                { !this.props.auth.loggedIn ? guestLinks : null }                
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        student: state.student,
        admin: state.admin,
        management: state.management,
        auth: state.auth
    });
}

export default connect(mapStateToProps,{ logout })(navbar);

