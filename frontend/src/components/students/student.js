import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import { showStudentExams } from '../../store/actions/studentActions';
const moment = require('moment');

class student extends Component{
    componentDidMount(){
        this.props.showStudentExams();
    }

    static propTypes = {
        student: propTypes.object.isRequired
    }

    render(){
        var exams = this.props.student.exams;
        var startTime, endTime, examDate;
        exams = exams && exams.map(exam => {
            // Convert to date and time 

            var dateArray = exam.start_time.split(' ');
            examDate = dateArray[0];
            startTime = dateArray[1];

            dateArray = exam.end_time.split(' ');
            endTime = dateArray[1];

            return(
                <div className = "col-lg-3 col-md-4 col-sm-6 pt-3 pb-3">
                    <div className = "card">                        
                            <div className = "card-header">
                                <h5>{ exam.name }</h5>
                            </div>
                            <div className = "card-block">
                                <div className = "card-body">
                                    <div className = "card-title">
                                        <h6>SUBJECT ID: { exam.sub_id }</h6>
                                    </div>
                                    <div className = "card-text">     
                                        <h6>ON: { moment(examDate).format('DD MMMM YYYY') }</h6>                       
                                        <p>TIMINGS: { startTime } { " " } TO { " " } { endTime }</p> 
                                        <Link className = "text-white" to = "/student/giveExam">
                                            <button className = "btn btn-primary">
                                                <span>TAKE EXAM</span> 
                                            </button>                     
                                        </Link>                                                               
                                    </div>
                                </div>
                            </div>
                            <div className = "card-footer">
                                <p className = "text-muted">DURATION: { /*endTime - startTime*/ }</p>
                            </div>
                        </div>                                                               
                </div>                
            )
        })
        
        return(
            <div className = "studentDashboard">
                <header className = "text-left font-weight-bold container">
                    <span><br/>NAME: { this.props.student.name }</span><br/>
                    <span>CLASS: { this.props.student.class }</span>
                    <div className = "text-center">                        
                        <h4>UPCOMMING EXAMS </h4><br/>
                    </div>                    
                </header>

                <div className = "container">
                    <div className = "row">
                        { exams }
                    </div>                    
                </div>                
                
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return({
        student: state.student
    });
}

export default connect(mapStateToProps,{ showStudentExams })(student);