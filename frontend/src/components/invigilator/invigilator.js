import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { getInvigilatorExams  } from '../../store/actions/invigilatorActions';

class admin extends Component{
    componentDidMount(){
        // Get invilgilator exams
        this.props.getInvigilatorExams();
    }

    static propTypes = {
      invigilator: propTypes.object.isRequired
    }

    render(){
        // Display exams of the invigilator and highlight the one being conducted at the present time
        return(
            <div className = "">
                
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return({
        invigilator: state.invigilator
    });
}

export default connect(mapStateToProps,{ getInvigilatorExams })(admin);