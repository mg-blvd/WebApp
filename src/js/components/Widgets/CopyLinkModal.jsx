import React, { Component, PropTypes } from "react";
import { Modal } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";

export default class CopyLinkModal extends Component {
  static propTypes = {
    urlBeingShared: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.state = {
      value: "",
      copied: false
    };
  }

  componentWillMount () {
    this.setState({
      copied: false
    });
  }

  componentWillReceiveProps () {
    this.setState({
      copied: false
    });
  }

render () {
  let urlBeingShared = this.props.urlBeingShared;
  let browser_supports_CopyToClipboard = false; //latest iOS update supports CopyToClipboard, check for users version and let them copy if latest, perhaps with npm pckg "mobile-detect"
  let copy_btn_className;
  let select_all_button;
  if (browser_supports_CopyToClipboard) {
    copy_btn_className = "copy-btn"; // display copy button at all times
    select_all_button = null;
  } else {
    copy_btn_className = "copy-btn__hide-mobile"; // display: none; in mobile view
    select_all_button = <button className="select-all-btn btn btn-default" onClick={()=>{this.refs.input.select();}}>Select All</button>;
  }

  return <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">Copy link to clipboard</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="input-group">
        <input ref="input" value={urlBeingShared} className="form-control" style={{marginTop: "17px"}} onChange={({target: {value}}) => this.setState({value, copied: false})} onFocus={()=>{this.refs.input.select();}} />&nbsp;
          <span className="input-group-btn">
            <CopyToClipboard text={urlBeingShared} onCopy={() => this.setState({copied: true})}>
              <button className={"btn btn-default " + copy_btn_className}>Copy</button>
            </CopyToClipboard>
            {select_all_button}
          </span>
      </div>
    {this.state.copied ? <span style={{color: "red"}}>Copied.  Can now paste into an email or social media!</span> : null}
    </Modal.Body>
  </Modal>;
  }
}
