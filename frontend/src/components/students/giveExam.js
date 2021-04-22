import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import $ from 'jquery';

import '../../styles/giveExam.css'
import { showExamPaper,submitStudentExam } from '../../store/actions/studentActions';

class student extends Component{
    static propTypes = {
        student: propTypes.object.isRequired,
        error: propTypes.object.isRequired
    }

    state = {
        responses: null
    }

    componentDidMount(){
        if(!this.props.student.currentExam)
            this.props.history.push('/student/exams');
        // Get the question paper. Dont show if student have alrady submitted before - handled by backend
        this.props.showExamPaper(this.props.student.curretnExam.examDetails.sub_id);
               
        

        // Sort questions ordered by qid
        this.props.student.currentExam.questions.sort(function(a,b){
            if(a.qid <= b.qid)
                return -1;
            else
                return 1;
        });
        
        // Set the initial state

        var responses = [];
            this.props.student.currentExam.questions.forEach(q => {
                var obj = {
                    qid: q.qid,
                    res: -1,
                    qMarks: q.max_marks
                }
                responses.push(obj);                
            });
            console.log(responses);
            this.setState({
                responses
            });

        // Store the responses in browser as localStorage and set the initial state
        // if(!localStorage.getItem('responses')){
        //     var responses = [];
        //     this.props.student.currentExam.questions.forEach(q => {
        //         var obj = {
        //             qid: q.qid,
        //             res: -1,
        //             qMarks: q.max_marks
        //         }
        //         responses.push(obj);                
        //     });
        //     console.log(responses);
        //     localStorage.setItem('responses',responses);
        //     this.setState({
        //         responses
        //     });
        // }
        // else{
        //     this.setState({
        //         responses: localStorage.getItem('responses')
        //     });
        // }       
    } 

    submitExam = () => {
        // Make student body

        var max_marks = 0;
        this.props.student.currentExam.questions.forEach(q => {
            max_marks += q.max_marks;
        });
        const examBody = {
            responses: this.state.responses,
            class: this.props.student.class, 
            sub_id: this.props.student.currentExam.examDetails.sub_id,
            year: new Date().getFullYear(), // Make it as academic current year
            max_marks
        };

        this.props.submitStudentExam(examBody);
        localStorage.removeItem('responses');

        // Redirect to results page
        this.props.history.push('/student/results');
    }

    setTimer = () => {
       
    }

    render(){
        if(this.props.student.currentExam){
            var questions = this.props.student.currentExam.questions;
            questions = questions && questions.map(q => {
                return(
                    <div className = "question bg-light container text-left pt-3 pb-3" key = { q.id }>
                        <div className = "card ">
                            <div className = "container pt-3 pb-3">
                                <div className = "text-right font-weight-bold">
                                    <span>
                                        MARKS: { q.marks }
                                    </span> 
                                </div>
                                
                                <div className = "card-title questionStatement">
                                    <p>
                                        <span className = "questionIndex">{ q.qid } { ". " }</span>
                                        { q.statement }
                                    </p>                            
                                </div>
                                <div id = { q.id } className = "card-body questionOptions">
                                    <div className = "row text-justify options">
                                        <div className = "col-lg-3 col-sm-6">                                            
                                            <input type = "radio" name = { q.qid } value = { q.op1 }/>
                                            <span> </span>
                                            <label> a.) { q.op1 } </label>                                        
                                        </div>

                                        <div className = "col-lg-3 col-sm-6">
                                            <input type = "radio" name = { q.qid } value = { q.op2 }/>
                                            <span> </span>
                                            <label> b.) { q.op2 } </label>
                                        </div>

                                        <div className = "col-lg-3 col-sm-6">                                            
                                            <input type = "radio" name = { q.qid } value = { q.op3 }/>
                                            <span> </span>
                                            <label> c.) { q.op3 } </label>
                                        </div>

                                        <div className = "col-lg-3 col-sm-6">                                            
                                            <input type = "radio" name = { q.qid } value = { q.op4 }/>
                                            <span> </span>
                                            <label> d.) { q.op4 } </label>
                                        </div>                                                                                                                            
                                    </div>                                                      
                                </div>
                            </div>
                        </div>
                    </div>
                    
                )
            });
        }
        
        // Create countdown timer for the exam  

        var myFunc = setInterval(() => {
            var nowTime = new Date().getTime();
            var endTime = new Date(this.props.student.currentExam.examDetails.end_time).getTime();
            var timeLeft = endTime - nowTime;
            
            var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            var dayString = days ? days + " days " : "";

            if (timeLeft <= 0) {     
                clearInterval(myFunc);       
                timer = "TIME IS UP"
    
                // Submit the response
                this.submitExam();
                $('.timer').html(timer);
                return;
            }      
            var timer = dayString + hours + " hrs " + minutes + " mins " + seconds + " secs";
            $('.timer').html(timer);           
        },1000);        

        return(
            <div className = "giveExam container">
                     <header>
                        <br/>
                        <div className = "row">                            
                            <div className = "col-lg-6 col-md-4 col-sm-3 text-left">
                                <large>NAME: { this.props.student.name }</large><br/>
                                <large>ROLL NO: { this.props.student.rollNo }</large><br/>
                                <large>CLASS: {this.props.student.class }</large><br/>
                                <large>INVIGILATOR: { this.props.student.currentExam.examDetails.invigilator }</large>
                            </div>
                            <div className = "col-lg-6 col-md-4 col-sm-3 text-justify text-right">
                                <large>SUBJECT ID: { this.props.student.currentExam.examDetails.sub_id }</large><br/>                                
                                <large>MAX MARKS: { this.props.student.currentExam.examDetails.max_marks }</large><br/>
                                <large>PASSING MARKS: { this.props.student.currentExam.examDetails.passing_marks }</large><br/><br/>
                            </div>
                        </div> 
                        <large className = "subject text-justify font-weight-bold">SUBJECT: { this.props.student.currentExam.examDetails.name }</large><br/><br/>                                                      
                     </header>

                     <div className = "questionsList">
                        { questions }
                     </div>

                     <div className = " container text-right">
                         <br/>
                        <button className = "btn btn-primary" onClick = { this.submitExam }>
                            SUBMIT
                        </button>
                        <br/><br/>
                     </div>

                     <footer className = "font-weight-bold text-left fixed-bottom text-white">
                        <large className = "bg-dark d-inline-block p-1">TIME LEFT: <span className = "timer"></span></large>        
                     </footer>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return({
        student: state.student,
        error: state.error
    });
}

export default connect(mapStateToProps,{ showExamPaper,submitStudentExam })(student);