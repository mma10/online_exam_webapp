// Conatains exam list
import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import {  } from '../../store/actions/adminActions';

class admin extends Component{
    static propTypes = {
      admin: propTypes.object.isRequired
    }

    state = {
        sub_id: null,
        questions: null, // Array of question objects
        start_time: null,
        end_time: null,
        passing_marks: null
    }

    submitSetExam(){
       // Submit the set exam by calling the corresponding action
       
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