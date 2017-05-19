/**
 * Created by RyanX on 5/4/2017.
 */
import React, { Component } from 'react';
// import {  } from 'semantic-ui-react';

class BottomBar extends Component {

    constructor() {
        super()

        this.style = {
            header: {
                position: 'relative',
                // background: '#ff5851',
                height: '50px',


                display: 'flex',
                // eslint-disable-next-line
                display: '-webkit-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
            },

            span: {
                marginLeft: '2%',
                color: '#000000',
                fontSize: '16px',
                fontFamily: 'Montserrat, sans-serif',
            },

            hr: {
                backgroundColor: '#ff5851',
            }
        }
    }

    render() {
        return (
            <div style={{marginTop: '20px'}}>

                <div style={this.style.header}>
                    <span style={this.style.span}>About</span>
                    <span style={this.style.span}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style={this.style.span}>Contact</span>
                </div>

            </div>)
    }
}

export default BottomBar
