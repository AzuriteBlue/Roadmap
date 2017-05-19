/**
 * Created by RyanX on 2017/4/13.
 */
import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import HalfInfo from "./HalfInfo";
import { connect } from 'react-redux'

class InfoZoneView extends Component {

    constructor(props) {
        super(props)

        this.style = {
            box: {
                position: 'relative',
                height: '200px',
                marginTop:'28px',

                // display: 'flex',
                // // eslint-disable-next-line
                // display: '-webkit-flex',
                // alignItems: 'center',
                // justifyContent: 'space-between',
                //
                // flexWrap: 'wrap'
                overflow: 'hide'
            }
        }
    }

    render() {
        return(
            <Segment raised style={this.style.box}>
                <Grid columns='two' divided>
                        <Grid.Column>
                            <HalfInfo id={this.props.selectedCourse[0]}/>
                        </Grid.Column>
                        <Grid.Column>
                            <HalfInfo id={this.props.selectedCourse[1]}/>
                        </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}


function mapStateToProps(state) {
    return {
        selectedCourse: state.selectedCourse
    }
}

const InfoZone = connect(mapStateToProps)(InfoZoneView)

export default InfoZone
