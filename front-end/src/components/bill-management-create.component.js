import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";


import { vbill_amount } from "../common/bill-validators";

import BillManagementDataService from "../services/bill-management.service";


export default class BillManagementCreate extends Component {
    constructor(props) {
      super(props);
      this.saveBillManagement = this.saveBillManagement.bind(this);
      //this.savePersonManagement = this.savePersonManagement.bind(this);
      //this.newBillManagement = this.newBillManagement.bind(this);
  
      this.onChangeBillManagement = this.onChangeBillManagement.bind(this);
      this.onChangePerson = this.onChangePerson.bind(this);
      
      this.state = {
        bill_id: "",
  
        bill_amount:"",

        person_id:"",

  
        submitted: false,
        message: "",
      };
    }
    
    onChangeBillManagement(e) {
      this.setState({
        bill_amount: e.target.value,
       
      });
    }

    onChangePerson(e) {
      this.setState({
        person_id: e.target.value
      });
    }
  
  
    
    
  
    saveBillManagement(e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        loading: true
      });
    
    


     
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        var data = {
          bill_id: this.state.bill_id,
        
          bill_amount: this.state.bill_amount,

          person_id: this.state.person_id,
          
        };
        BillManagementDataService.create(data)
          .then(
            response => {
              this.props.history.push("/bill-management");
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
              onSubmit={this.saveBillManagement}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.submitted && (
                <div>
  
                  <div className="form-group">
                    <label htmlFor="bill_amount">Bill Amount</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="bill_amount"
                      value={this.state.bill_amount}
                      onChange={this.onChangeBillManagement}
                      validations={[vbill_amount]}
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
  