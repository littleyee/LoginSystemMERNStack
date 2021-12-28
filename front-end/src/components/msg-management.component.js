import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";

import { vmsg_text } from "../common/msg-validators";

import MsgManagementDataService from "../services/msg-management.service";


export default class MsgManagement extends Component {
  constructor(props) {
    super(props);
    this.onChangeMsgID = this.onChangeMsgID.bind(this);
    this.onChangeMsgManagement = this.onChangeMsgManagement.bind(this);
    

    this.getMsgManagement = this.getMsgManagement.bind(this);
    this.updateMsgManagement = this.updateMsgManagement.bind(this);

    this.state = {
      currentMsgManagement: {
        msg_id: "",

        msg_text: "",

        person_id:""
        
      }
    };
  }

  onChangeMsgID(e) {
    const msg_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMsgManagement: {
          ...prevState.currentMsgManagement,
          msg_id: msg_id,
          
        }
      };
    });
  }

  onChangeMsgManagement(e) {
    const msg_text = e.target.value;   
    const person_id = e.target.value;

    this.setState(prevState => ({
      currentMsgManagement: {
        ...prevState.currentMsgManagement,
        msg_text: msg_text,
        person_id: person_id
      }
    }));
  }



  

  getMsgManagement(msg_id) {
    MsgManagementDataService.get(msg_id)
      .then(response => {
        this.setState({
          currentMsgManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMsgManagement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      MsgManagementDataService.update(
        this.state.currentMsgManagement.msg_id,
        this.state.currentMsgManagement
      ).then(
        response => {
          this.props.history.push('/msg-management')
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
    const { currentMsgManagement } = this.state;

    return (
      <div>
        {currentMsgManagement ? (
          <div className="edit-form">
            <h4>Edit Msg</h4>
              <Form
                onSubmit={this.updateMsgManagement}
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
                        value={currentMsgManagement.msg_text}
                        onChange={this.onChangeMsgManagement}
                        validations={[vmsg_text]}
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
            <p>Could not find msg</p>
          </div>
        )}
      </div>
    );
  }
}
