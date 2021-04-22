import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import { showStudentExams } from '../../store/actions/studentActions';

const moment = require('moment');

class student extends Component{   
    componentDidMount(){
        if(this.props.auth != "student")
            this.props.history.push('/');
            
        this.props.showStudentExams(this.props.student.id);
    }

    static propTypes = {
        student: propTypes.object.isRequired,
        auth: propTypes.object.isRequired
    }

    render(){
        var exams = this.props.student.exams;
        var startTime, endTime, examDate;
        exams = exams && exams.map(exam => {
            // Convert to date and time 

            var dateArray = exam.start_time.split('T');
            examDate = exam.start_time;
            startTime = dateArray[1].split('.')[0];

            dateArray = exam.end_time.split('T');
            endTime = dateArray[1].split('.')[0];

            // Set duration of exam
            
            var examStartTime = new Date(exam.start_time).getTime();
            var examEndTime = new Date(exam.end_time).getTime();
            
            var durationTime = examEndTime - examStartTime;
            var hours = Math.floor((durationTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((durationTime % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((durationTime % (1000 * 60)) / 1000);
            
            var secString =  seconds ? seconds + " secs " : "";
            var minString = minutes ? minutes + " mins " : "";
            var hourString = hours ? hours + " hrs " : "";
            var duration = hourString + minString + secString;

            return(
                <div className = "col-lg-3 col-md-4 col-sm-6 pt-3 pb-3">
                    <div className = "card">                        
                            <div className = "card-header">
                                <large className = "font-weight-bold">{ exam.name }</large>
                            </div>
                            <div className = "text-muted">
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
                                <p className = "text-muted">DURATION: { duration }</p>
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
                        <h4>EXAMS </h4><br/>
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
        student: state.student,
        auth: state.auth
    });
}

export default connect(mapStateToProps,{ showStudentExams })(student);