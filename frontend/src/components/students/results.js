import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import $ from 'jquery';
import { addTableClass } from '../../jquery/students/resultsJQ'

import { getStudentResults } from '../../store/actions/studentActions';

class student extends Component{
    componentDidMount(){
        this.props.getStudentResults(this.props.student.id);

        var results = this.props.student.results;
        results.years.forEach(year => {
            var tableColor = "table-success";
            var resultArray = results[year.toString()];
            resultArray.forEach(r => {
                if(r.marks < r.passing_marks)
                    tableColor = "table-danger";
            });
            addTableClass(year,tableColor);
        });
    }

    static propTypes = {
        student: propTypes.object.isRequired
    }

    render(){
        var results = this.props.student.results;
        var resultsTables = results && results.years.map((year) => {
            var tableColor = "table-success";
            var resultsArray = results[year.toString()];
            var securedMarks = 0, totalMarks = 0;
            var Class = resultsArray[0].class, status = "PASS";
                        
            resultsArray.forEach(r => {
                if(r.marks < r.passing_marks){
                    tableColor = "table-danger";
                    status = "FAIL";
                }
                
                securedMarks += r.marks;
                totalMarks += r.max_marks;
            });
            
            resultsArray = resultsArray && resultsArray.map((r,i) => {
                return(
                    <tr key = { r.sub_id }>
                        <th scope="row">{ i+1 }</th>
                        <td>{ r.sub_name }</td>
                        <td>{ r.sub_id }</td>
                        <td>{ r.marks }</td>
                        <td>{ r.passing_marks }</td>
                        <td>{ r.max_marks }</td>
                    </tr>
                )
            });

            return(
                <div>
                    <div className = "card bg-light border-light" key = { year } id = { year.toString() }>
                        <div className = "tableHeader card-header text-left">
                            <span className = "class">CLASS: { Class }</span><br/>
                            <span className = "year">YEAR: { year }</span>
                        </div>
                        <br/>

                        <div className = "card-body">
                            <table className = "table table-hover">
                                <tbody>
                                    <tr>
                                        <th scope = "col">SL NO</th>
                                        <th scope = "col">SUBJECT NAME</th>
                                        <th scope = "col">SUBJECT ID</th>
                                        <th scope = "col">MARKS</th>
                                        <th scope = "col">PASSING MARKS</th>
                                        <th scope = "col">MAX MARKS</th>
                                    </tr>
                                </tbody>  
                                                    
                                <tbody>
                                    { resultsArray }
                                </tbody>
                            </table>
                        </div>
                        
                        <div className = "">
                            <h6 className = " text-right">PERCENTAGE: { securedMarks * 100/totalMarks }%  </h6>
                            <h5 className = " text-center tableStatus">   { status }</h5>
                            <br/>
                        </div>
                        
                    </div>     
                    <br/><br/> 
                </div>
                    
            )
        })

        return(
            <div className = "studentResults">
                <div className = "header">
                    <br/>
                    <h4>RESULTS</h4>                    
                </div>
                
                <div className = "container pt-3 pl-5 pr-5">
                    <div className = "text-left font-weight-bold">
                        <span>NAME: { this.props.student.name }</span><br/>
                        <span>ROLL NO: { this.props.student.rollNo }</span><br/>
                        <br/>
                    </div>

                    { resultsTables }
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return({
        student: state.student
    });
}

export default connect(mapStateToProps,{ getStudentResults })(student);