import React, { Component } from "react";
import MsgManagementDataService from "../services/msg-management.service";
import { Link } from "react-router-dom";



export default class MsgManagementList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchMsgManagement = this.onChangeSearchMsgManagement.bind(this);
   

    this.deleteMsgManagement = this.deleteMsgManagement.bind(this);
    this.retrieveMsgManagement = this.retrieveMsgManagement.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMsgManagement = this.setActiveMsgManagement.bind(this);
    this.searchMsg = this.searchMsg.bind(this);

    this.state = {
      MsgManagement: [],
      currentMsgManagement: null,
      currentIndex: -1,
      searchParams: {
        
        msg_text: "",

        person_id:""
      }
    }
  }

  componentDidMount() {
    this.retrieveMsgManagement();
  }

  deleteMsgManagement() {    
    MsgManagementDataService.delete(this.state.currentMsgManagement.msg_id)
      .then(() => {
        
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeSearchMsgManagement(e) {
    const searchMsgManagement = e.target.value;
    this.setState({ 
      searchParams: { ...this.state.searchParams, msg_text: searchMsgManagement} 
    });
    console.log(this.state);
  }

 

  retrieveMsgManagement() {
    MsgManagementDataService.getAll()
      .then(response => {
        this.setState({
          msgnManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMsgManagement();
    this.setState({
      currentMsgManagement: null,
      currentIndex: -1
    });
  }

  setActiveMsgManagement(msgManagement, index) {console.log(msgManagement);
    this.setState({
      currentMsgManagement: msgManagement,
      currentIndex: index
    });
  }

  searchMsg() {
    this.setState({
      currentMsgManagement: null,
      currentIndex: -1
    });

    MsgManagementDataService.findMsg(this.state.searchParams)
      .then(response => {
        this.setState({
          msgManagement: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { msgManagement, currentMsgManagement, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Msg Text"
              value={this.state.searchParams.msgManagement}
              onChange={this.onChangeSearchMsgManagement}
            />
            
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchMsg}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Msg Management List</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Msg Text</th>
                
              </tr>
            </thead>
            <tbody>
              {msgManagement &&
                msgManagement.map((msgManagement, index) => (
                  <tr 
                    role="row" 
                    key={msgManagement.msg_id}
                    onClick={() => this.setActiveMsgManagement(msgManagement, index)}
                  >
                    <td>{msgManagement.msg_text}</td>
                  
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          {currentMsgManagement ? ( 
            <div>
              <h4>Msg Ammount</h4>
              <div>
                <label>
                  <strong>Text:</strong>
                </label>{" "}
                {currentMsgManagement.msg_id} {currentMsgManagement.msg_text}
              </div>
             

              <Link
                to={"/msg-management/" + currentMsgManagement.msg_id}
                className="btn btn-primary btn-block"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger btn-block"
                onClick={this.deleteMsgManagement}
              >
                Delete
              </button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Msg...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}