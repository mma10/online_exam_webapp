import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import '../../styles/invigilator.css';

import getInvigilatorExams from '../../store/actions/invigilatorActions';

const moment = require('moment');

class admin extends Component{
    componentDidMount(){
        // Check if authenticated
        console.log(this.props.auth.type);
        if(this.props.auth.type != "invigilator")
            this.props.history.push('/');

        // Get invilgilator exams
        this.props.getInvigilatorExams(this.props.invigilator.id);
    }

    static propTypes = {
      invigilator: propTypes.object.isRequired,
      auth: propTypes.object.isRequired
    }

    render(){
        // Display exams of the invigilator and highlight the one being conducted at the present time

        var startTime, endTime, examDate;
        var exams = this.props.invigilator.exams;
        console.log(exams);
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
                <div className = "col-lg-3 col-md-4 col-sm-6 pt-3 pb-3" key = { exam.eid }>
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
            <div className = "invigilator container">               
                <header className = "text-left">
                    <br/>
                    <span>ID: { this.props.invigilator.id }</span><br/>
                    <span>NAME: { this.props.invigilator.name }</span><br/>               
                </header>
                <large className = "text-center d-block title">
                    EXAMS<br/><br/>
                </large>
                <div className = "examList">
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
        invigilator: state.invigilator,
        auth: state.auth
    });
}

export default connect(mapStateToProps,{ getInvigilatorExams })(admin);