import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vemail, vdate } from "../common/validators";
import { vfirstName, vlastName, vaddress, vcity, vzip } from "../common/person-validators";

import LabManagementDataService from "../services/lab-management.service";


export default class LabManagement extends Component {
  constructor(props) {
    super(props);

    this.onChangePatientId = this.onChangePatientId.bind(this);
    this.onChangeOrderedBy = this.onChangeOrderedBy.bind(this);
    this.onChangeOrderedDate = this.onChangeOrderedDate.bind(this);
    this.onChangeLabDoneDate = this.onChangeLabDoneDate.bind(this);
    this.onChangeLabReviewedBy = this.onChangeLabReviewedBy.bind(this);
    this.onChangeLabReviewedDate = this.onChangeLabReviewedDate.bind(this);
    this.getLabManagement = this.getLabManagement.bind(this);
    this.updateLabManagement = this.updateLabManagement.bind(this);

    this.state = {

      currentLabManagement: {
        patient_id: "",
        ordered_by_id: "",
        ordered_date: "",

        lab_done_date: "",
        lab_reviewed_by: "",
        lab_reviewed_date:""
      },
      patients:[],
      orderedBys: [],
      reviewedBys:[],

      message: "",
      submitted: false,
        
    };
     
  }
  
  onChangePatientId(e) {
    const patient_id = e.target.value;
    this.setState(function(prevState) {
      return {
        currentLabManagement: {
          ...prevState.currentLabManagement,
          patient_id:patient_id
        }
      };
    });
  }

  onChangeOrderedBy(e) {
    const ordered_by_id = e.target.value;
    this.setState(function(prevState) {
      return {
        currentLabManagement: {
          ...prevState.currentLabManagement,
          ordered_by_id:ordered_by_id
        }
      };
    });
  }

  onChangeOrderedDate(e) {
    const ordered_date = e.target.value;
    this.setState(function(prevState) {
      return {
        currentLabManagement: {
          ...prevState.currentLabManagement,
          ordered_date:ordered_date
        }
      };
    });
  }

  onChangeLabDoneDate(e) {
    const lab_done_date = e.target.value;
    this.setState(function(prevState) {
      return {
        currentLabManagement: {
          ...prevState.currentLabManagement,
          lab_done_date:lab_done_date
        }
      };
    });
  }

  onChangeLabReviewedBy(e) {
    const lab_reviewed_by = e.target.value;
    this.setState(function(prevState) {
      return {
        currentLabManagement: {
          ...prevState.currentLabManagement,
          lab_reviewed_by:lab_reviewed_by
        }
      };
    });
  }

  onChangeLabReviewedDate(e) {
    const lab_reviewed_date = e.target.value;
    this.setState(function(prevState) {
      return {
        currentLabManagement: {
          ...prevState.currentLabManagement,
          lab_reviewed_date:lab_reviewed_date
        }
      };
    });
  }


  getLabManagement(lab_id) {
    LabManagementDataService.findByLabID(lab_id)
      .then(response => {
        this.setState({
          currentLabManagement: response.data
        });
        console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateLabManagement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      LabManagementDataService.update(
        this.state.currentLabManagement.lab_id,
        this.state.currentLabManagement
      ).then(
        response => {
          this.props.history.push('/person-management/'+this.state.currentLabManagement.patient_id+'/labs')
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  componentDidMount() {
    this.getLabManagement(this.props.match.params.lab_id);
    
    // get drop down information
    LabManagementDataService.getPatients().then(
        response => {
          this.setState({
            patients: response.data.result
          });
        },
        error => {
          this.setState({
             patients:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      );
 

   LabManagementDataService.getOrderedBys().then(
     response => {
       this.setState({
        orderedBys: response.data.result
       });
     },
     error => {
       this.setState({
        orderedBys:
           (error.response &&
             error.response.data &&
             error.response.data.message) ||
           error.message ||
           error.toString()
       });
     }
   );

   LabManagementDataService.getReviewedBys().then(
     response => {
       this.setState({
        reviewedBys: response.data.result
       });
     },
     error => {
       this.setState({
        reviewedBys:
           (error.response &&
             error.response.data &&
             error.response.data.message) ||
           error.message ||
           error.toString()
       });
     }
   );
  }

  render() {
    const { currentLabManagement } = this.state;
    return (
      <div>
        {currentLabManagement ? (
          <div className="edit-form">
            <h4>Edit Lab</h4>
              <Form
                onSubmit={this.updateLabManagement}
                ref={c => {
                  this.form = c;
                }}
              >
                {!this.state.submitted && ( <div>
                <div className="form-group">
                  <label htmlFor="patient_id">Patient</label>
                  <Select
                    value={currentLabManagement.patient_id}
                    onChange={this.onChangePatientId}
                    validations={[vrequired]}
                  >
                    <option value="">Select One</option>
                    {this.state.patients.length > 0 &&
                      this.state.patients.map(item => (
                        <option key={item.person_id} value={item.person_id}>
                          {item.firstName} {item.lastName}
                        </option>
                      ))}
                  </Select>
                </div>

                <div className="form-group">
                  <label htmlFor="ordered_date">Ordered Date</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="ordered_date"
                    value={currentLabManagement.ordered_date}
                    onChange={this.onChangeOrderedDate}
                    validations={[vrequired]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lab_ordered_by">Lab Ordered By</label>
                  <Select
                    value={currentLabManagement.ordered_by_id}
                    onChange={this.onChangeOrderedBy}
                    validations={[vrequired]}
                  >
                    <option value="">Select One</option>
                    {this.state.orderedBys.length > 0 &&
                      this.state.orderedBys.map(item => (
                        <option key={item.person_id} value={item.person_id}>
                          {item.firstName} {item.lastName}
                        </option>
                      ))}
                  </Select>
                </div>



                  <div className="form-group">
                  <label htmlFor="lab_done_date">Lab Done Date</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lab_done_date"
                    value={currentLabManagement.lab_done_date}
                    onChange={this.onChangeLabDoneDate}
                    validations={[vrequired]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lab_reviewed_by">Lab Reviewed By</label>
                  <Select
                    value={currentLabManagement.lab_reviewed_by}
                    onChange={this.onChangeLabReviewedBy}
                    validations={[vrequired]}
                  >
                    <option value="">Select One</option>
                    {this.state.reviewedBys.length > 0 &&
                      this.state.reviewedBys.map(item => (
                        <option key={item.person_id} value={item.person_id}>
                          {item.firstName} {item.lastName}
                        </option>
                      ))}
                  </Select>
                </div>

                <div className="form-group">
                  <label htmlFor="lab_reviewed_date">Lab Reviewed Date</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lab_reviewed_date"
                    value={currentLabManagement.lab_reviewed_date}
                    onChange={this.onChangeLabReviewedDate}
                    validations={[vrequired]}
                  />  
                </div>


                   
                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Save</button>
                    </div>
                  </div>
                )}

                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
                
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
          </div>
        ) : (
          <div>
            <br />
            <p>Could not find lab</p>
          </div>
        )}
      </div>
    );
  }
}
