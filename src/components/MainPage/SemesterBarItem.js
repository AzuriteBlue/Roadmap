/**
 * Created by RyanX on 5/2/2017.
 */
import React, { Component } from 'react';

class SemesterBarItem extends Component {
    constructor(props) {
        super(props)
        this.style = {
            div: {
                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                fontSize: '14px',
                textAlign: 'center',
            }
        }

    }



    render() {
        let correTable = ["Freshman/ fall", "Freshman/ spring", "Sophomore/ fall", "Sophomore/ spring",
            "Junior/ fall", "Junior/ spring", "Senior/ fall", "Senior/ spring"]

        return (
            <div style={this.style.div}>
                {correTable[this.props.id].substring(0, correTable[this.props.id].indexOf("/"))}
                <br/>
                {correTable[this.props.id].substring(correTable[this.props.id].indexOf("/"))}
            </div>
        )
    }
}

export default SemesterBarItem;