import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
class itemModal extends Component {
  state = {
    modal: false,
    name: '',
  };

  toogle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
    };
    // Add Item via addItem actions
    this.props.addItem(newItem);

    // Close modal
    this.toogle();
  };

  render() {
    return (
      <div>
        <Button
          color='dark'
          style={{ marginTop: '2rem' }}
          onClick={this.toogle}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toogle}>
          <ModalHeader toggle={this.toogle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add Shopping Item'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(itemModal);
