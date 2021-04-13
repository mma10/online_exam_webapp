// Conatains exam list
import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { showStudentResults } from '../../store/actions/studentActions';

class student extends Component{
    componentDidMount(){
        this.props.showStudentResults();
    }

    static propTypes = {
        results: propTypes.array.isRequired
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
        results: state.student.results
    });
}

export default connect(mapStateToProps,{ showStudentResults })(student);