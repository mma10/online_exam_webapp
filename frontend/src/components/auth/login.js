import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import '../../styles/login.css';

import { login } from '../../store/actions/authActions';

class Login extends Component{
    static propTypes = {
        auth: propTypes.object.isRequired,
        error: propTypes.object.isRequired,
        login: propTypes.func.isRequired        
    }

    state = {
        username: null,
        password: null,
        actype: null
    }

    updateState = (e) => {
        e.persist();
        console.log(e.target.className);
        this.setState({
            [e.target.className]: e.target.value
        });
    }

    userLogin = (e) => {
        e.preventDefault();

        // Check if all credentials are filled
        if(!this.state.username || !this.state.password || !this.state.actype)
            return alert('Please enter all credentials');      

        // Send the credentials to login action
        this.props.login(this.state)
    }

    render(){
        // if(this.props.auth.loggedIn)
        //     this.props.history.push('/');

        return(
            <div>
                <div className="loginContainer">                                
                    <form className="loginForm" onSubmit={ e => this.userLogin(e) } >  
                        <div className="text">
                            <span>LOGIN</span>
                        </div>
                        
                        <div className="formEntity" >
                            <label htmlFor="username"> USERNAME : </label>
                            <input type="text" className="username" onChange={this.updateState} /> <br/><br/>
                        </div>

                        <div className="formEntity" >
                            <label htmlFor="password" > PASSWORD : </label>
                            <input type="password" className="password" onChange={this.updateState} /> <br/><br/>
                        </div>

                        <div className="formEntity" >                           
                            <div className = "container text-left">
                                <label className = "loginAs" htmlFor="password" > LOGIN AS :  </label>

                                <div>
                                    <input type="radio" name="actype" className = "actype" value = "student" onChange={this.updateState} />
                                    <span> </span>
                                    <label> STUDENT </label>
                                </div>

                                <div>
                                    <input type="radio" name="actype" className = "actype" value = "admin" onChange={this.updateState} />
                                    <span> </span>
                                    <label> FACULTY </label>
                                </div>

                                <div>
                                    <input type="radio" name="actype" className = "actype" value = "invigilator" onChange={this.updateState} />
                                    <span> </span>
                                    <label> INVIGILATOR </label>
                                </div>

                                <div>
                                    <input type="radio" name="actype" className = "actype" value = "management" onChange={this.updateState} />
                                    <span> </span>
                                    <label> MANAGEMENT </label>
                                </div>   
                            </div>                        
                        </div>

                        <button type="submit" className="submitButton btn btn-primary">
                           SUBMIT
                        </button>                   
                    </form>

                    { this.props.error.msg ?  <div className="error">
                        <p>{ this.props.error.msg }</p>
                        </div> : null 
                    }                
                </div>
            </div>     
        )
    }
}

const mapStateToProps = (state) => {
    return({
        auth: state.auth,
        error: state.error
    });
}

export default connect(mapStateToProps,{ login })(Login);