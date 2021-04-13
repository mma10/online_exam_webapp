// Conatains exam list
import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { showStudentSubjects } from '../../store/actions/studentActions';

class student extends Component{
    componentDidMount(){
        this.props.showStudentSubjects();
    }

    static propTypes = {
        subjects: propTypes.array.isRequired
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
        subjects: state.student.subjects
    });
}

export default connect(mapStateToProps,{ showStudentSubjects })(student);