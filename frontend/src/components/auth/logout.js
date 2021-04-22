import { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import { logout } from '../../store/actions/authActions'

class Logout extends Component{ 
    static propTypes = {
        logout: propTypes.func.isRequired
    }

    logout = () => {
        this.props.logout();
    }

    render(){
        return (                       
            <span onClick={this.logout}>LOGOUT</span>        
        )
    }    
}

export default connect(null, { logout })(Logout);