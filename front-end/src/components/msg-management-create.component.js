import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";


import { vmsg_text } from "../common/msg-validators";

import MsgManagementDataService from "../services/msg-management.service";


export default class MsgManagementCreate extends Component {
    constructor(props) {
      super(props);
      this.saveMsgManagement = this.saveMsgManagement.bind(this);
      //this.savePersonManagement = this.savePersonManagement.bind(this);
      //this.newMsgManagement = this.newMsgManagement.bind(this);
  
      this.onChangeMsgManagement = this.onChangeMsgManagement.bind(this);
      this.onChangePerson = this.onChangePerson.bind(this);
      
      this.state = {
        msg_id: "",
  
        msg_text:"",

        person_id:"",

  
        submitted: false,
        message: "",
      };
    }
    
    onChangeMsgManagement(e) {
      this.setState({
        msg_text: e.target.value,
       
      });
    }

    onChangePerson(e) {
      this.setState({
        person_id: e.target.value
      });
    }
  
  
    
    
  
    saveMsgManagement(e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        loading: true
      });
    
    


     
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        var data = {
          msg_id: this.state.msg_id,
        
          msg_text: this.state.msg_text,

          person_id: this.state.person_id,
          
        };
        MsgManagementDataService.create(data)
          .then(
            response => {
              this.props.history.push("/msg-management");
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
              onSubmit={this.saveMsgManagement}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.submitted && (
                <div>
  
                  <div className="form-group">
                    <label htmlFor="msg_text">Msg Text</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="msg_text"
                      value={this.state.msg_text}
                      onChange={this.onChangeMsgManagement}
                      validations={[vmsg_text]}
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
  