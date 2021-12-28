import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";

import { vinsurance_amount } from "../common/insurance-validators";

import InsuranceManagementDataService from "../services/insurance-management.service";


export default class InsuranceManagement extends Component {
  constructor(props) {
    super(props);
    this.onChangeInsuranceID = this.onChangeInsuranceID.bind(this);
    this.onChangeInsuranceManagement = this.onChangeInsuranceManagement.bind(this);
    

    this.getInsuranceManagement = this.getInsuranceManagement.bind(this);
    this.updateInsuranceManagement = this.updateInsuranceManagement.bind(this);

    this.state = {
      currentInsuranceManagement: {
        insurance_id: "",

        insurance_amount: "",

        person_id:""
        
      }
    };
  }

  onChangeInsuranceID(e) {
    const insurance_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentInsuranceManagement: {
          ...prevState.currentInsuranceManagement,
          insurance_id: insurance_id,
          
        }
      };
    });
  }

  onChangeInsuranceManagement(e) {
    const insurance_amount = e.target.value;   
    const person_id = e.target.value;

    this.setState(prevState => ({
      currentInsuranceManagement: {
        ...prevState.currentInsuranceManagement,
        insurance_amount: insurance_amount,
        person_id: person_id
      }
    }));
  }



  

  getInsuranceManagement(insurance_id) {
    InsuranceManagementDataService.get(insurance_id)
      .then(response => {
        this.setState({
          currentInsuranceManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateInsuranceManagement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      InsuranceManagementDataService.update(
        this.state.currentInsuranceManagement.insurance_id,
        this.state.currentInsuranceManagement
      ).then(
        response => {
          this.props.history.push('/insurance-management')
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

 

  render() {
    const { currentInsuranceManagement } = this.state;

    return (
      <div>
        {currentInsuranceManagement ? (
          <div className="edit-form">
            <h4>Edit Insurance</h4>
              <Form
                onSubmit={this.updateInsuranceManagement}
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
                        value={currentInsuranceManagement.insurance_amount}
                        onChange={this.onChangeInsuranceManagement}
                        validations={[vinsurance_amount]}
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
            <p>Could not find insurance</p>
          </div>
        )}
      </div>
    );
  }
}
