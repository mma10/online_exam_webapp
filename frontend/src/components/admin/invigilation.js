// Conatains exam list
import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { findInvigilationSubjects  } from '../../store/actions/adminActions';

class admin extends Component{
    componentDidMount(){
        // Get invilgilation data of admin
        this.props.findInvigilationSubjects();
    }

    static propTypes = {
      admin: propTypes.object.isRequired
    }

    render(){
        // Display subjects to be invililated
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

export default connect(mapStateToProps,{ findInvigilationSubjects })(admin);