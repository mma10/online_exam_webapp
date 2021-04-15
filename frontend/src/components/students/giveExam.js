import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { showExamPaper,submitStudentExam } from '../../store/actions/studentActions';

class student extends Component{
    static propTypes = {
        student: propTypes.object.isRequired
    }

    state = {
        responses: null
    }

    componentDidMount(){
        // Get the question paper. Dont show if student have alrady submitted before - handled by backend
        this.props.showExamPaper();

        // Store the responses in browser as localStorage and set the initial state
        
        this.props.student.currentExam.questions.sort(function(a,b){
            if(a.qid <= b.qid)
                return -1;
            else
                return 1;
        });
        if(!localStorage.getItem('responses')){
            var responses = [];
            this.props.student.currentExam.questions.forEach(q => {
                var obj = {
                    qid: q.qid,
                    res: -1,
                    qMarks: q.max_marks
                }
                responses.push(obj);                
            });
            localStorage.setItem('responses',responses);
            this.setState({
                responses
            });
        }
        else{
            this.setState({
                responses: localStorage.getItem('responses')
            });
        }       
    } 

    submitExam(){
        // Make student body

        var max_marks = 0;
        this.props.student.currentExam.question.forEach(q => {
            max_marks += q.max_marks;
        });
        const examBody = {
            responses: this.state.responses,
            class: this.props.student.class, 
            sub_id: this.props.student.currentExam.examDetails.sub_id,
            year: 2021, // Make it as academic current year
            max_marks
        };

        this.props.submitStudentExam(examBody);
        localStorage.removeItem('responses');

        // Redirect to results page
        this.history.props.redirect('/student/results');

    }

    render(){

        return(
            <div className = "">
                
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return({
        student: state.student
    });
}

export default connect(mapStateToProps,{ showExamPaper,submitStudentExam })(student);