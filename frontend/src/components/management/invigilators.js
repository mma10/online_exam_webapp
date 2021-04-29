import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import $ from 'jquery';

import '../../styles/managementInvigilators.css';

import { deleteInvigilator, addInvigilatorExam, removeInvigilatorExam } from '../../store/actions/managementActions';

class invigilators extends Component{
    static propTypes = {
        management: propTypes.object.isRequired,
        auth: propTypes.object.isRequired,
        error: propTypes.object.isRequired,
        deleteInvigilator: propTypes.func.isRequired,
        addInvigilatorExam: propTypes.func.isRequired,
        removeInvigilatorExam: propTypes.func.isRequired
    }

    componentDidMount(){
        if(this.props.auth.type != "management")
            this.props.history.push('/');
    }

    state = {
        name: null,
        username: null,
        password: null,
        addEid: null,
        removeEid: null
    }   

    updateState = (e) => {
        e.persist();

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addInvExam = (id) => {
        // Check if all fields are filled
        if(!this.state.addEid)
            return alert('Please enter all fields');

        // Call action to post data
        this.props.addInvigilatorExam(id);
    }

    removeInvExam = (id) => {
        // Check if all fileds are filled
        if(!this.state.removeEid)
            return alert('Please enter all fields');

        // Call action to delete data
        this.props.removeInvigilatorExam(id);
    }

    deleteInv = (id) => {
        // Call action to delete invigilator
        this.props.deleteInvigilator(id);
    }

    addInv = () => {
        // Check if all fields are filled
        if(!this.state.name || !this.state.username || !this.state.password)
            return alert('Please enter all fileds');
        
        // Call action to post data
        this.props.addInvigilatorExam(this.state);
    }

    render(){
        const invigilatorsArray = this.props.management.invigilators;
        const invigilators = invigilatorsArray && invigilatorsArray.map(invigilator => {
            return(
                <div className = "col-lg-4 col-md-4 col-sm-7 pt-2 pb-2" key = { invigilator.id }>
                   <div className = "card">
                        <div className = "card-body">
                            <div className = "card-title text-muted">
                                <span>INVIGILATOR ID: { invigilator.id }</span><br/>                                
                            </div>

                            <div className = "card-text container text-left">
                                <span>NAME: { invigilator.name }</span><br/>
                                <span>EXAMS ASSIGNED: { invigilator.exams }</span>
                            </div><br/> 

                            <div className = "row">
                                <div className = "col-lg-6 col-md-6 col-sm-7">
                                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#addExamModal">
                                    ASSIGN
                                    </button> 
                                    <div class="modal fade" id="addExamModal" tabindex="-1" role="dialog" aria-labelledby="addExamModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">ADD INVIGILATOR EXAM</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div className = "form-group container">                                                     
                                                        <label for = "addNewExamIdForInv">EXAM ID</label>
                                                        <input name = "addEid" id = "addNewExamIdForInv" type = "text" className = "form-control" onChange = {this.updateState} />
                                                    </div>                                                                              
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-success" onClick = { () => this.addInvExam(invigilator.id) }>Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    
                                <div className = "col-lg-6 col-md-6 col-sm-7">
                                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#removeExamModal">
                                    REMOVE
                                    </button>  

                                    <div class="modal fade" id="removeExamModal" tabindex="-1" role="dialog" aria-labelledby="removeExamModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="removeExamModalLabel">REMOVE INVIGILATOR EXAM</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">                                           
                                                    <div className = "form-group container">
                                                        <label for = "deleteExamIdForInv">EXAM ID</label>
                                                        <input name = "removeEid" id = "deleteExamIdForInv" type = "text" className = "form-control" onChange = {this.updateState} />
                                                    </div>                                                                                                                                       
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-danger" onClick = { () => this.removeInvExam(invigilator.id) }>Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                          
                            </div>                                          
                        </div>

                        <div className = "card-footer">
                            <button className = "btn btn-danger" onClick = { () => this.deleteInv(invigilator.id) }>DELETE</button>
                        </div>

                        
                   </div>
                </div>
            )
        });

        return(
            <div className = "managementStudents container">
                <br/><span className = "text-center header">LIST OF ALL INVIGILATORS</span><br/><br/>

                <div className = "managementStudentsList container">
                    <div className = "row">
                        { invigilators }
                    </div>   
                </div><br/>

                <form className = "addStudent container bg-light">
                    <div className = "container">
                        <header className = "pt-3 pb-2 formHeader">ADD INVIGILATOR</header>
                        <div className = "row">
                            <div className = "form-group pt-2 col-lg-4 col-md-4 col-sm-7">
                                <label for = "addNewExamNameForInv">NAME</label>
                                <input name = "name" id = "addNewExamNameForInv" type = "text" className = "form-control" onChange = {this.updateState} />
                            </div>

                            <div className = "form-group pt-2 col-lg-4 col-md-4 col-sm-7">
                                <label for = "addNewInvUsername">USERNAME</label>
                                <input name = "username" id = "addNewInvUsername" type = "text" className = "form-control" onChange = {this.updateState} />
                            </div>

                            <div className = "form-group pt-2 col-lg-4 col-md-4 col-sm-7">
                                <label for = "addNewInvPassword">PASSWORD</label>
                                <input name = "password" id = "addNewInvPassword" type = "password" className = "form-control" onChange = {this.updateState} />
                            </div>
                        </div>                        
                        <button className = "btn btn-primary" onClick = {this.addInv}>
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


export default connect(mapStateToProps,{ })(invigilators);