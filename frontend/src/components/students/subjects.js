import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { showStudentSubjects } from '../../store/actions/studentActions';

class student extends Component{
    static propTypes = {
        student: propTypes.object.isRequired,
        auth: propTypes.object.isRequired
    }

    componentDidMount(){
        if(this.props.auth.type != "student")
            this.props.history.push('/');
        
        this.props.showStudentSubjects(this.props.student.id);
    }    

    render(){
        // Make subjects into JSX code as table rows

        var subjects = this.props.student.subjects;
        subjects = subjects && subjects.map((sub,i) => {
            return(
                <tr key = { sub.sub_id }>
                    <th scope="row">{ i+1 }</th>
                    <td>{ sub.sub_name }</td>
                    <td>{ sub.sub_id }</td>
                    <td>{ sub.admin_name }</td>
                </tr>
            );
        }); 
        
        return(
            <div className = "studentSubjects">                
                <div className = "header">
                    <br/>
                    <h4>REGISTERED SUBJECTS</h4>
                </div>                               

                <div className = "container">
                    <div className = "text-left font-weight-bold">                    
                        <span>NAME: { this.props.student.name }</span><br/>
                        <span>ROLL NO: { this.props.student.rollNo }</span><br/>
                        <span>CLASS: { this.props.student.class }</span><br/>
                        <br/>
                    </div>
                    
                    <table className = "table table-hover table-bordered table-light">     
                        <tbody>
                            <tr>
                                <th scope = "col">SL NO</th>
                                <th scope = "col">SUBJECT NAME</th>
                                <th scope = "col">SUBJECT ID</th>
                                <th scope = "col">FACULTY NAME</th>
                            </tr>
                        </tbody>               
                        
                        <tbody>
                            { subjects }
                        </tbody>                                       
                    </table>
                </div>
                
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return({
        student: state.student,
        auth: state.auth
    });
}

export default connect(mapStateToProps,{ showStudentSubjects })(student);