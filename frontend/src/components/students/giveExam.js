import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import $ from 'jquery';

import '../../styles/giveExam.css'
import { showExamPaper,submitStudentExam } from '../../store/actions/studentActions';

class student extends Component{
    static propTypes = {
        student: propTypes.object.isRequired,
        auth: propTypes.object.isRequired,
        error: propTypes.object.isRequired
    }

    state = {
        res: []
    }

    componentDidMount(){
        if(this.props.auth.type != "student")
            this.props.history.push('/');

        // if(!this.props.student.currentExamId)
        //     this.props.history.push('/student/exams');
        // Get the question paper. Dont show if student have alrady submitted before - handled by backend
        this.props.showExamPaper(this.props.student.currentExamSubId);  
    } 
    
    submitExam = (e) => {
        e.preventDefault();

        // Make student body

        var max_marks = 0;
        this.props.student.questions.forEach(q => {
            max_marks += q.max_marks;
        });
        const examBody = {
            responses: this.state.res,
            class: this.props.student.class, 
            sub_id: this.props.student.currentExam.sub_id,
            year: new Date().getFullYear(), // Make it as academic current year
            passing_marks: this.props.student.currentExam.passing_marks,
            max_marks
        };

        console.log(this.state.res,"State before submitting");
        this.props.submitStudentExam(this.props.student.currentExam.eid,this.props.student.id,examBody);
        // localStorage.removeItem('responses');

        // Redirect to results page
        this.props.history.push('/student/results');
    }

    updateState = (e) => {
        e.persist();
        var responses = [];

        var count = 0;
        responses = this.state.res && this.state.res.map(res => {
            if(res.qid == e.target.name){
                count++;
                return({
                    ...res,
                    res: parseInt(e.target.value)
                });
            }
            else return(res)            
        });

        if(count == 0){
            responses.push({
                qid: parseInt(e.target.name),
                res: parseInt(e.target.value),
                qMarks: parseInt(e.target.id)
            });
        }

        this.setState({
            res: responses
        });   
        //
        console.log(this.state.res,'latest response');    
    }

    render(){ 
            if(this.props.student.currentExam.length == 0)
                return(
                    <div>
                        
                    </div>
                );

            if(this.props.questions){
                // Sort questions ordered by qid
                this.props.student.questions.sort(function(a,b){
                    if(a.qid <= b.qid)
                        return -1;
                    else
                        return 1;
                });
            }          

            var count = 1;
            var questions = this.props.student.questions;
            questions = questions && questions.map(q => {
                return(
                    <div className = "question bg-light container text-left pt-3 pb-3" key = { q.id }>
                        <div className = "card ">
                            <div className = "container pt-3 pb-3">
                                <div className = "text-right font-weight-bold">
                                    <span>
                                        MARKS: { q.max_marks }
                                    </span> 
                                </div>
                                
                                <div className = "card-title questionStatement">
                                    <p>
                                        <span className = "questionIndex">{ count++ } { ". " }</span>
                                        { q.statement }
                                    </p>                            
                                </div>
                                <div id = { q.id } className = "card-body questionOptions">
                                    <div className = "row text-justify options">
                                        <div className = "col-lg-3 col-sm-6">                                            
                                            <input type = "radio" id = { q.max_marks } name = { q.qid } value = { 1 } onChange = { this.updateState }/>
                                            <span> </span>
                                            <label> a.) { q.op1 } </label>                                        
                                        </div>

                                        <div className = "col-lg-3 col-sm-6">
                                            <input type = "radio" id = { q.max_marks } name = { q.qid } value = { 2 } onChange = { this.updateState }/>
                                            <span> </span>
                                            <label> b.) { q.op2 } </label>
                                        </div>

                                        <div className = "col-lg-3 col-sm-6">                                            
                                            <input type = "radio" id = { q.max_marks } name = { q.qid } value = { 3 } onChange = { this.updateState }/>
                                            <span> </span>
                                            <label> c.) { q.op3 } </label>
                                        </div>

                                        <div className = "col-lg-3 col-sm-6">                                            
                                            <input type = "radio" id = { q.max_marks } name = { q.qid } value = { 4 } onChange = { this.updateState }/>
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

            var invigilator = this.props.student.currentExam.invigilator;
            var sub_id = this.props.student.currentExam.sub_id;
            var max_marks = this.props.student.currentExam.max_marks;
            var passing_marks = this.props.student.currentExam.passing_marks;
            var subject = this.props.student.currentExam.name;   
            var end_time = this.props.student.currentExam.end_time;   
            var currentExam = this.props.student.currentExam;             

                // Create countdown timer for the exam  

                var myFunc = setInterval(() => {
                    var nowTime = new Date().getTime();
                    var endTime = new Date(end_time).getTime();
                    var timeLeft = endTime - nowTime;
                    
                    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                    var dayString = days ? days + " days " : "";

                    if (timeLeft == 0) {     
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
                                <large>INVIGILATOR: { currentExam ? invigilator : "" }</large>
                            </div>
                            <div className = "col-lg-6 col-md-4 col-sm-3 text-justify text-right">
                                <large>SUBJECT ID: { sub_id }</large><br/>                                
                                <large>MAX MARKS: { max_marks }</large><br/>
                                <large>PASSING MARKS: { passing_marks }</large><br/><br/>
                            </div>
                        </div> 
                        <large className = "subject text-justify font-weight-bold">SUBJECT: { subject }</large><br/><br/>                                                      
                     </header>

                     <div className = "questionsList">
                        { questions ? questions : "No questions" }
                     </div>

                     <div className = " container text-right">
                         <br/>
                        <button className = "btn btn-primary" onClick = { e => this.submitExam(e) }>
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
        error: state.error,
        auth: state.auth
    });
}

export default connect(mapStateToProps,{ showExamPaper,submitStudentExam })(student);