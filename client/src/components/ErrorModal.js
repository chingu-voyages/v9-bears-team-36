import React from 'react';
import Modal from 'react-modal';

import './ErrorModal.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    padding: '20px',
    width: '25%',
    fontSize: '2em'
  }
};

Modal.setAppElement('#root');

class ErrorModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }

  closeModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    this.props.getDisastersAgain();
  };

  componentDidMount() {
    setTimeout(() => this.setState(() => ({ modalIsOpen: true })), 300);
  }

  render() {
    return (
      <div>
        <Modal
          closeTimeoutMS={200}
          contentLabel="Error"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          {this.props.apiCalls < 5 ? (
            <>
              <h1>Uh Oh. Something went wrong!</h1>
              <button onClick={this.closeModal}>Try Again!</button>
            </>
          ) : (
            <>
              <h1>Looks like we're broken right now :(</h1>
              <h2>Please refresh the page or try again later!</h2>
            </>
          )}
        </Modal>
      </div>
    );
  }
}

export default ErrorModal;
