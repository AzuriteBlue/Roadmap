/**
 * Created by RyanX on 2017/4/13.
 */
import React, { Component } from 'react';
import { Icon, Modal, Button, Header } from 'semantic-ui-react';

class MyHeader extends Component {

    constructor() {
        super()

        this.style = {
            header: {
                position: 'relative',
                background: '#ff5851',
                height: '50px',

                display: 'flex',
                // eslint-disable-next-line
                display: '-webkit-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
            },

            span: {
                marginLeft: '2%',
                color: '#ffffff',
                fontSize: '23px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold'
            },

            icon: {
                margin: '0px 20px 0px 20px',
                color: '#ffffff',
            }
        }
    }

    state = { modalOpen: false }

    handleOpen = (e) => this.setState({
        modalOpen: true,
    })

    handleClose = (e) => this.setState({
        modalOpen: false,
    })

    render() {
        return (
            <div style={this.style.header}>

                <span style={this.style.span}>roadmap.io</span>

                <span>
                    <Modal
                        trigger={<Icon style={this.style.icon} onClick={this.handleOpen} name="settings" size="large" link/>}
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                        basic
                        size='small'
                    >
                    <Header icon='browser' content='Not Available' />
                    <Modal.Content>
                      <h3>This function is currently under development.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Got it
                      </Button>
                    </Modal.Actions>
                  </Modal>

                  <Modal
                      trigger={<Icon style={this.style.icon} onClick={this.handleOpen} name="users" size="large" link/>}
                      open={this.state.modalOpen}
                      onClose={this.handleClose}
                      basic
                      size='small'
                  >
                    <Header icon='browser' content='Not Available' />
                    <Modal.Content>
                      <h3>This function is currently under development.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color='red' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Got it
                      </Button>
                    </Modal.Actions>
                  </Modal>

                </span>

            </div>)
    }
}

export default MyHeader