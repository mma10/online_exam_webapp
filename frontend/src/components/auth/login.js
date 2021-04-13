import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { login } from '../../store/actions/authActions';

class Login extends Component{
    static propTypes = {
        error: propTypes.object.isRequired,
        login: propTypes.func.isRequired        
    }

    state = {
        username: null,
        password: null,
        actype: null
    }

    updateState(e){
        e.persist();

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    userLogin(){
        // Check if all credentials are filled
        if(!this.state.username || !this.state.password || !this.state.actype)
            return alert('Please enter all credentials');      

        // Send the credentials to login action
        this.props.login(this.state)
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
        error: state.error
    });
}

export default connect(mapStateToProps,{ login })(Login);