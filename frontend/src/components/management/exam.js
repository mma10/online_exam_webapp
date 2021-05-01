import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import managementStudents from '../../styles/managementExams.css';

import { findAllExams, deleteExam, checkExamTime } from '../../store/actions/managementActions';

class students extends Component{
    static propTypes = {
        management: propTypes.object.isRequired,
        auth: propTypes.object.isRequired,
        error: propTypes.object.isRequired,
        deleteExam: propTypes.func.isRequired,
        checkExamTime: propTypes.func.isRequired,
        findAllExams: propTypes.func.isRequired
    }

    componentDidMount(){
        if(this.props.auth.type != "management")
            this.props.history.push('/');
    }

    state = {
        eid: null,
        start_time: null,
        end_time: null,
        sub_id: null,
        class: null
    }   

    // updateState = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

    deleteExam =(id,e) => {
        e.persist();

        // Call action to delete data
        this.props.deleteExam(id);
    }

    render(){
        const examsArray = this.props.management.exams;
        examsArray.sort(function(a,b){
            if(a.class <= b.class)
                return -1;
            else    
                return 1;
        });
        const exams = examsArray && examsArray.map(exam => {
            return(
                <div className = "col-lg-4 col-md-4 col-sm-6 pt-2 pb-2" key = { exam.eid }>
                   <div className = "card">
                        <div className = "card-body">
                            <div className = "card-title text-muted">
                                <span>Exam ID: { exam.eid }</span><br/>                                
                            </div>
                            <div className = "card-text container text-left">
                                <span>Start time: { exam.start_time }</span><br/>
                                <span>End time: { exam.end_time }</span><br/>
                                <span>Subject ID: { exam.sub_id }</span><br/>
                                <span>Class: { exam.class }</span><br/>
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
            <div className = "managementExams container">
                <br/><span className = "text-center header">LIST OF ALL EXAMS</span><br/><br/>

                <div className = "managementExamsList container">
                    <div className = "row">
                        { exams }
                    </div>   
                </div><br/>
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

export default connect(mapStateToProps,{ findAllExams, deleteExam, checkExamTime })(students);