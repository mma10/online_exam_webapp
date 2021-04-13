import { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import propTypes from 'prop-types';

import Logout from '../auth/logout';
import logout from '../../store/actions/authActions';

class navbar extends Component{
    static propTypes = {
        logout: propTypes.func.isRequired
    }

    render(){
        const studentLinks = (
            <div className = "">
                <NavLink to = "/student/subjects">
                    <span>REGISTERED SUBJECTS</span>
                </NavLink>

                <NavLink to = "/student/exams">
                    <span>EXAMS</span>
                </NavLink>  

                <NavLink to = "/student/results">
                    <span>RESULTS</span>
                </NavLink>
            </div>
        );
        const adminLinks = (
            <div className = "">
                <NavLink to = "/admin/subjects">
                    <span>SUBJECTS UNDERTAKEN</span>
                </NavLink>

                <NavLink to = "/admin/studentInfo">
                    <span>STUDENTS</span>
                </NavLink>  

                <NavLink to = "/student/setExam">
                    <span>SET EXAM</span>
                </NavLink>
            </div>
        );
        const managementLinks = (
            <div className = "">
                <NavLink to = "/management/exams">
                    <span>EXAMS</span>
                </NavLink>

                <NavLink to = "/management/students">
                    <span>STUDENTS</span>
                </NavLink>  

                <NavLink to = "/management/admins">
                    <span>STAFF</span>
                </NavLink>
            </div>
        );

        //

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

        const authLinks = (
            <div className = "">

                { this.props.student.id ? studentInfo : null }
                { this.props.admin.id ? adminInfo : null }
                { this.props.management.id ? managementInfo : null }

                <NavLink to = "/login">
                    <Logout />
                </NavLink>
            </div>
        );
        const guestLinks = (
            <div className = "">
                <NavLink to = "/login">
                    <span>LOGIN</span>
                </NavLink>
            </div>
        );

        return(
            <div>
                <p>navbar</p>

                { this.props.student.id ? studentLinks : null }
                { this.props.admin.id ? adminLinks : null }
                { this.props.management.id ? managementLinks : null }

                { this.props.auth.status ? authLinks : guestLinks }
                
            </div>
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

