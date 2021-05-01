import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { submitExamForm } from '../../store/actions/adminActions';

class admin extends Component{
    static propTypes = {
      admin: propTypes.object.isRequired,
      auth: propTypes.object.isRequired,
      error: propTypes.object.isRequired
    }

    componentDidMount(){
        if(this.props.auth.type != "admin")
            this.props.history.push('/');
        
    }

    state = {
        sub_id: null,
        questions: null, // Array of question objects
        start_time: null,
        end_time: null,
        passing_marks: null
    }

    updateState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addQuestion = (e) => {
        this.setState((prevState) => ({
            subjects: [...prevState.questions, {qid: "", statement: "", op1: "", op2: "", op3: "", op4: "", marks: "", ans: ""}],
        }));
    }

    submitExamForm(){
       // Submit the set exam by calling the corresponding action
       // Check if all fields are filled
       if(!this.state.sub_id || !this.state.start_time || !this.state.end_time || !this.state.passing_marks)
       return alert('Please enter all fields');

        // Call action to post data
        this.props.submitExamForm(this.state);
       
    }

    render(){
        var questions,subjects;
    return(
        <div className = "addQuestionPaper container">

            <form className = "addQuestionPaperForm container bg-light">
                <div className = "container">
                    <header className = "pt-3 pb-2 formHeader">ADD Question Paper</header>
                    <div className = "row">
                        <div className = "form-group pt-2 col-lg-4 col-md-4 col-sm-7">
                            <label for = "subjectId">Subject ID</label>
                            <input name = "sub_id" id = "subjectId" type = "text" className = "form-control" onChange = {this.updateState} />
                        </div>
                        <div className = "form-group pt-2 col-lg-4 col-md-4 col-sm-7">
                            <label for = "passingmarks">Passing Marks</label>
                            <input name = "passing_marks" id = "passingmarks" type = "text" className = "form-control" onChange = {this.updateState} />
                        </div>
                    </div>

                    <div className = "row">
                        <div className = "form-group pt-2 col-lg-6 col-md-6 col-sm-7">
                            <label for = "addStartTime">Start time </label>
                            <input name = "start_time" id = "addStartTime" type = "text" className = "form-control" onChange = {this.updateState} />
                        </div>

                        <div className = "form-group pt-2 col-lg-6 col-md-6 col-sm-7">
                            <label for = "addEndTime">End time</label>
                            <input name = "end_time" id = "addEndTime" type = "text" className = "form-control" onChange = {this.updateState} />
                        </div>
                    </div>     

                    <button onClick={this.addQuestion}>Add question</button>
                        {
                        questions.map((val, idx)=> {
                            let qid_ = `qid-${idx}`, statement_ = `statement-${idx}`, op1_ = `op1-${idx}`, op2_ = `op2-${idx}`, op3_ = `op3-${idx}`, op4_ = `op4-${idx}`, ans_ = `ans-${idx}`,marks_ = `marks-${idx}`
                            return (
                            <div key={idx}>
                                <label htmlFor={qid_}>{`question no. #${idx + 1}`}</label>
                                <input type="text" name={qid_} data-id={idx} id={qid_} value={questions[idx].qid}  className="qid" />
                                <label htmlFor={statement_}>Statement</label>
                                <input type = "text" name={statement_} data-id={idx} id={statement_} value={subjects[idx].statement} className = "statement" />
                                <label htmlFor={op1_}>Option 1</label>
                                <input type = "text" name={op1_} data-id={idx} id={op1_} value={subjects[idx].op1} className = "op1" />
                                <label htmlFor={op2_}>Option 2</label>
                                <input type = "text" name={op2_} data-id={idx} id={op2_} value={subjects[idx].op2} className = "op2" /> 
                                <label htmlFor={op3_}>Option 3</label>
                                <input type = "text" name={op3_} data-id={idx} id={op3_} value={subjects[idx].op3} className = "op3" /> 
                                <label htmlFor={op4_}>Option 4</label>
                                <input type = "text" name={op4_} data-id={idx} id={op4_} value={subjects[idx].op4} className = "op4" />
                                <label htmlFor={ans_}>Correct option</label>
                                <input type = "text" name={ans_} data-id={idx} id={ans_} value={subjects[idx].ans} className = "ans" />
                                <label htmlFor={marks_}>question marks</label>
                                <input type = "text" name={marks_} data-id={idx} id={marks_} value={subjects[idx].marks} className = "marks" />    
                            </div>
                            )
                        })
                        }


                    <button className = "btn btn-primary" onClick = {this.addadmin}>
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
        admin: state.admin,
        auth: state.auth,
        error: state.error
    });
}

export default connect(mapStateToProps,{ submitExamForm })(admin);