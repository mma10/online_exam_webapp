import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import {  } from '../../store/actions/adminActions';

class admin extends Component{
    componentDidMount(){
        // Call getAdminSubjects action

    }

    static propTypes = {
      admin: propTypes.object.isRequired
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
        admin: state.admin
    });
}

export default connect(mapStateToProps,{  })(admin);