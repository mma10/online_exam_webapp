import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import '../../styles/managementStudents.css';

import { getAllStudents, deleteStudent, addStudent } from '../../store/actions/managementActions';

class students extends Component{
    static propTypes = {
        management: propTypes.object.isRequired,
        auth: propTypes.object.isRequired,
        error: propTypes.object.isRequired,
        deleteStudent: propTypes.func.isRequired,
        addStudent: propTypes.func.isRequired
    }

    componentDidMount(){
        if(this.props.auth.type != "management")
            this.props.history.push('/');

        this.props.getAllStudents();
    }

    state = {
        name: null,
        class: null,
        batch: null,
        username: null,
        password: null
    }   

    updateState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    deleteStudent = (id,e) => {
        e.persist();

        // Call action to delete data
        this.props.deleteStudent(id);
    }

    addStudent = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if(!this.state.name || !this.state.class || !this.state.batch || !this.state.username || !this.state.password)
            return alert('Please enter all fields');

        // Call action to post data
        this.props.addStudent(this.state);
    }

    render(){      
        const studentsArray = this.props.management.students;
            
        const students = studentsArray && studentsArray.map(student => {
            return(
                <div className = "col-lg-4 col-md-4 col-sm-6 pt-2 pb-2" key = { student.id }>
                   <div className = "card">
                        <div className = "card-body">
                            <div className = "card-title text-muted">
                                <span>STUDENT ID: { student.id }</span><br/>                                
                            </div>
                            <div className = "card-text container text-left">
                                <span>NAME: { student.name }</span><br/>
                                <span>CLASS: { student.class }</span><br/>
                                <span>BATCH: { student.batch }</span><br/>
                            </div>
                        </div>
                        <div className = "card-footer">
                            <button className = "btn btn-danger" onClick = { (e) => this.deleteStudent(student.id,e) }>DELETE</button>
                        </div>
                   </div>
                </div>
            )
        });

        return(
            <div className = "managementStudents container">
                <br/><span className = "text-center header">LIST OF ALL STUDENTS</span><br/><br/>

                <div className = "managementStudentsList container">
                    <div className = "row">
                        { students }
                    </div>   
                </div><br/>

                <form className = "addStudent container bg-light" onSubmit = { e => this.addStudent(e) }>
                    <div className = "container">
                        <header className = "pt-3 pb-2 formHeader">ADD STUDENT</header>
                        <div className = "row">
                            <div className = "form-group pt-2 col-lg-4 col-md-4 col-sm-7">
                                <label for = "addNewStudentName">NAME</label>
                                <input name = "name" id = "addNewStudentName" type = "text" className = "form-control" onChange = {this.updateState} />
                            </div>

                            <div className = "form-group pt-2 col-lg-4 col-md-4 col-sm-7">
                                <label for = "addNewStudentClass">CLASS</label>
                                <input name = "class" id = "addNewStudentClass" type = "text" className = "form-control" onChange = {this.updateState} />
                            </div>

                            <div className = "form-group pt-2 col-lg-4 col-md-4 col-sm-7">
                                <label for = "addNewStudentBatch">BATCH</label>
                                <input name = "batch" id = "addNewStudentBatch" type = "text" className = "form-control" onChange = {this.updateState} />
                            </div>
                        </div>

                        <div className = "row">
                            <div className = "form-group pt-2 col-lg-6 col-md-6 col-sm-7">
                                <label for = "addNewStudentUsername">USERNAME</label>
                                <input name = "username" id = "addNewStudentUsername" type = "text" className = "form-control" onChange = {this.updateState} />
                            </div>

                            <div className = "form-group pt-2 col-lg-6 col-md-6 col-sm-7">
                                <label for = "addNewStudentPassword">PASSWORD</label>
                                <input name = "password" id = "addNewStudentPassword" type = "password" className = "form-control" onChange = {this.updateState} />
                            </div>
                        </div>                    

                        <button className = "btn btn-primary">
                            ADD
                        </button><br/>
                    </div>                    
                </form><br/>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        management: state.management,
        auth: state.auth,
        error: state.error
    });
} 

export default connect(mapStateToProps,{ getAllStudents,addStudent,deleteStudent })(students);