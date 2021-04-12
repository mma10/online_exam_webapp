// Conatains exam list
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class student extends Component{
    static propTypes = {
        exams: propTypes.array.isRequired
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
        exams: state.student.exams
    });
}

export default connect(mapStateToProps)(student);