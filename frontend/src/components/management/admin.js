import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import'../../styles/managementAdmins.css';

import { deleteAdmin, addAdmin, findAllAdmins } from '../../store/actions/managementActions';

class admins extends Component{
    static propTypes = {
        management: propTypes.object.isRequired,
        auth: propTypes.object.isRequired,
        error: propTypes.object.isRequired,
        deleteAdmin: propTypes.func.isRequired,
        addAdmin: propTypes.func.isRequired
    }

    componentDidMount(){
        if(this.props.auth.type != "management")
            this.props.history.push('/');

            this.props.findAllAdmins();
    }

    state = {
        name: null,
        subjects: null,
        username: null,
        password: null
    }   

    updateState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addSubject = (e) => {
        this.setState((prevState) => ({
            subjects: [...prevState.subjects, {sub_id: "", sub_name: ""}],
        }));
    }

    deleteAdminFunc = (id,e) => {
        e.persist();

        // Call action to delete data
        this.props.deleteAdmin(id);
    }

    addAdminFunc = () => {
        // Check if all fields are filled
        if(!this.state.name || !this.state.username || !this.state.password)
            return alert('Please enter all fields');

        // Call action to post data
        this.props.addAdmin(this.state);
    }

    render(){
        const adminsArray = this.props.management.admins;
        let subjects = [];

        const admins = adminsArray && adminsArray.map(admin => {
            return(
                <div className = "col-lg-4 col-md-4 col-sm-6 pt-2 pb-2" key = { admin.id }>
                   <div className = "card">
                        <div className = "card-body">
                            <div className = "card-title text-muted">
                                <span>admin ID: { admin.id }</span><br/>                                
                            </div>
                            <div className = "card-text container text-left">
                                <span>NAME: { admin.name }</span><br/>
                            </div>
                        </div>
                        <div className = "card-footer">
                            <button className = "btn btn-danger" onClick = { (e) => this.deleteAdminFunc(admin.id,e) }>DELETE</button>
                        </div>
                   </div>
                </div>
            )
        });

        return(
            <div className = "managementadmins container">
                <br/><span className = "text-center header">LIST OF ALL admins</span><br/><br/>

                <div className = "managementadminsList container">
                    <div className = "row">
                        { admins }
                    </div>   
                </div><br/>

                <form className = "addadmin container bg-light">
                    <div className = "container">
                        <header className = "pt-3 pb-2 formHeader">ADD admin</header>
                        <div className = "row">
                            <div className = "form-group pt-2 col-lg-4 col-md-4 col-sm-7">
                                <label for = "addNewadminName">NAME</label>
                                <input name = "name" id = "addNewadminName" type = "text" className = "form-control" onChange = {this.updateState} />
                            </div>
                        </div>

                        <div className = "row">
                            <div className = "form-group pt-2 col-lg-6 col-md-6 col-sm-7">
                                <label for = "addNewadminUsername">USERNAME</label>
                                <input name = "username" id = "addNewadminUsername" type = "text" className = "form-control" onChange = {this.updateState} />
                            </div>

                            <div className = "form-group pt-2 col-lg-6 col-md-6 col-sm-7">
                                <label for = "addNewadminPassword">PASSWORD</label>
                                <input name = "password" id = "addNewadminPassword" type = "password" className = "form-control" onChange = {this.updateState} />
                            </div>
                        </div>     

                        <button onClick={this.addSubject}>Add admin subject</button>
                            {
                            subjects.map((val, idx)=> {
                                let subjectId = `subjectId-${idx}`, subjectName = `subjectName-${idx}`
                                return (
                                <div key={idx}>
                                    <label htmlFor={subjectId}>{`subject #${idx + 1}`}</label>
                                    <input type="text" name={subjectId} data-id={idx} id={subjectId} value={subjects[idx].sub_id}  className="sub_id" />
                                    <label htmlFor={subjectName}>Subject Name</label>
                                    <input type = "text" name={subjectName} data-id={idx} id={subjectName} value={subjects[idx].sub_name} className = "sub_name" /> 
                                </div>
                                )
                            })
                            }


                        <button className = "btn btn-primary" onClick = {this.addAdminFunc}>
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

export default connect(mapStateToProps,{ deleteAdmin, addAdmin, findAllAdmins })(admins);