import React, { Component } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vemail, vdate } from "../common/validators";
import { vfirstName, vlastName, vaddress, vcity, vzip } from "../common/person-validators";

import LabManagementDataService from "../services/lab-management.service";



export default class LabManagementCreate extends Component {
  constructor(props) {
    super(props);
    this.saveLabManagement = this.saveLabManagement.bind(this);
    // this.onChangePatientId = this.onChangePatientId.bind(this);
    this.onChangeLabId = this.onChangeLabId.bind(this);
    this.onChangeOrderedById = this.onChangeOrderedById.bind(this);
    this.onChangeOrderedDate = this.onChangeOrderedDate.bind(this);
    this.onChangeLabDoneDate = this.onChangeLabDoneDate .bind(this);
    this.onChangeLabReviewedBy = this.onChangeLabReviewedBy.bind(this);
    this.onChangeLabReviewedDate= this.onChangeLabReviewedDate.bind(this);
    

    this.state = {
        patient_id: this.props.match.params.patient_id,// null,

        lab_id:"",
        ordered_by_id: "",
        ordered_date: "",
        lab_done_date: "",
        lab_reviewed_by: "",
        lab_reviewed_date:"",
        
        patients:[],
        orderedBys: [],
        reviewedBys:[],

        submitted: false,
        message: "",
    };
    console.log(this.state);
  }


  onChangeLabId(e) {
    this.setState({
      lab_id: e.target.value
    });
  }

  onChangeOrderedById(e) {
    this.setState({
      ordered_by_id: e.target.value
    });
  }

  onChangeOrderedDate(e) {
    this.setState({
      ordered_date: e.target.value
    });
  }

  onChangeLabDoneDate(e) {
    this.setState({
      lab_done_date: e.target.value
    });
  }

  onChangeLabReviewedBy(e) {
    this.setState({
      lab_reviewed_by: e.target.value
    });
  }

  onChangeLabReviewedDate(e) {
    this.setState({
      lab_reviewed_date: e.target.value
    });
  }


  saveLabManagement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      var data = {
        patient_id: this.state.patient_id,
        lab_id: this.state.lab_id,
        ordered_by_id: this.state.ordered_by_id,
        ordered_date: this.state.ordered_date,
        lab_done_date: this.state.lab_done_date,
        lab_reviewed_by: this.state.lab_reviewed_by,
        lab_reviewed_date: this.state.lab_reviewed_date
      };

      LabManagementDataService.create(data)
        .then(
          response => {
            this.props.history.push("/person-management/"+ this.state.patient_id+ "/labs");
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
          }
        )
        .catch(e => {
          console.log(e);
        });
    }
  }

   componentDidMount() {
     // get drop down information
     LabManagementDataService.getPatients().then(
      response => {
        this.setState({
          patients: response.data.result
        });
        console.log(this.state);
      },
      error => {
        this.setState({
          doctors:
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
    return (
      <div className="col-md-12">
          <Form
            onSubmit={this.saveLabManagement}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.submitted && (
              <div>
            
                <div className="form-group">
                  <label htmlFor="patient_id">Patient</label>
                  <Select
                    value={this.state.patient_id}
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
                  <label htmlFor="ordered_by_id">Ordered By</label>
                  <Select
                    value={this.state.ordered_by_id}
                    onChange={this.onChangeOrderedById}
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
                  <label htmlFor="ordered_date">Ordered Date</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="ordered_date"
                    value={this.state.ordered_date}
                    onChange={this.onChangeOrderedDate}
                    validations={[vrequired, vdate]}
                  />
                </div> 

                <div className="form-group">
                  <label htmlFor="lab_done_date">Lab Done Date</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lab_done_date"
                    value={this.state.lab_done_date}
                    onChange={this.onChangeLabDoneDate}
                    validations={[vrequired, vdate]}
                  />
                </div> 

                <div className="form-group">
                  <label htmlFor="ordered_by_id">Reviewed By</label>
                  <Select
                    value={this.state.lab_reviewed_by}
                    onChange={this.onChangeLabReviewedBy}
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
                  <label htmlFor="lab_reviewed_date">Lab Reviewed Date</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lab_reviewed_date"
                    value={this.state.lab_reviewed_date}
                    onChange={this.onChangeLabReviewedDate}
                    validations={[vrequired, vdate]}
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
    );
  }
}
