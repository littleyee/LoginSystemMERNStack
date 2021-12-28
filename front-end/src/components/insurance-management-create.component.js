import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";


import { vinsurance_amount } from "../common/insurance-validators";

import InsuranceManagementDataService from "../services/insurance-management.service";


export default class InsuranceManagementCreate extends Component {
    constructor(props) {
      super(props);
      this.saveInsuranceManagement = this.saveInsuranceManagement.bind(this);
      //this.savePersonManagement = this.savePersonManagement.bind(this);
      //this.newInsuranceManagement = this.newInsuranceManagement.bind(this);
  
      this.onChangeInsuranceManagement = this.onChangeInsuranceManagement.bind(this);
      this.onChangePerson = this.onChangePerson.bind(this);
      
      this.state = {
        insurance_id: "",
  
        insurance_amount:"",

        person_id:"",

  
        submitted: false,
        message: "",
      };
    }
    
    onChangeInsuranceManagement(e) {
      this.setState({
        insurance_amount: e.target.value,
       
      });
    }

    onChangePerson(e) {
      this.setState({
        person_id: e.target.value
      });
    }
  
  
    
    
  
    saveInsuranceManagement(e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        loading: true
      });
    
    


     
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        var data = {
          insurance_id: this.state.insurance_id,
        
          insurance_amount: this.state.insurance_amount,

          person_id: this.state.person_id,
          
        };
        InsuranceManagementDataService.create(data)
          .then(
            response => {
              this.props.history.push("/insurance-management");
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
     
  
    render() {
      return (
        <div className="col-md-12">
            <Form
              onSubmit={this.saveInsuranceManagement}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.submitted && (
                <div>
  
                  <div className="form-group">
                    <label htmlFor="insurance_amount">Insurance Amount</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="insurance_amount"
                      value={this.state.insurance_amount}
                      onChange={this.onChangeInsuranceManagement}
                      validations={[vinsurance_amount]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="person name">Person Name</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="person_id"
                      value={this.state.person_id}
                      onChange={this.onChangePerson}
                      
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
  