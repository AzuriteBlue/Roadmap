/**
 * Created by RyanX on 2017/4/13.
 */
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Graph from './Graph';

class Canvas extends Component {

    constructor(props) {
        super(props)

        this.style = {
            box: {
                position: 'relative',
                height: '470px',
                padding: '0 0 0 0'

                // display: 'flex',
                // // eslint-disable-next-line
                // display: '-webkit-flex',
                // alignItems: 'center',
                // justifyContent: 'space-between',
                //
                // flexWrap: 'wrap'
            }
        }
    }

    render() {
        return(
            <Segment raised style={this.style.box}>
                <Graph store={this.props.store}/>
            </Segment>
        )
    }
}

export default Canvas
