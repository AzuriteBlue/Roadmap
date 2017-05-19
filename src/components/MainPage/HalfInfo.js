/**
 * Created by RyanX on 4/24/2017.
 */
import React, { Component } from 'react';
import catalog from '../../info/catalog'

export default class HalfInfo extends Component {

    style = {
        div: {
            fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
            fontSize: '14px',
            textAlign: 'left',
            height: '172px',
            overflow: 'auto'
        }
    }

    render() {
        if (this.props.id) {
            let classObj = catalog[this.props.id];
            return (
                <div style={this.style.div}>
                    <strong>
                        {classObj['courseID']}
                        <span style={{float: 'right'}}>
                            {classObj['courseName']}&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                    </strong>
                    <hr/>
                    Introduction: {classObj['intro']}
                    <br/>
                    Credit(s): {classObj['credit']}
                    <br/><br/>
                    Exclusion: {classObj['exclusion']}
                    <br/>
                    Co-requisite: {classObj['coReq']}
                    <br/>
                    Pre-requisite: {classObj['preReq']}
                    <br/>
                    <br/>
                    References:&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href={"https://ust.space/review/" + classObj['courseID'].replace(/ /, "")} target="_blank">UST.space
                        Page</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href={"http://ihome.ust.hk/~msssug/cwiki_catalog/" + classObj['courseID'].replace(/ /, "")}
                       target="_blank">Cwiki Page</a>
                    <br/>
                </div>
            )
        } else {
            return null
        }
    }
}