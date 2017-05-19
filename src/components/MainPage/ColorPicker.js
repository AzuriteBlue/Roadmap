/**
 * Created by RyanX on 5/4/2017.
 */
import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import { connect } from 'react-redux';

class ColorPickerView extends Component {
    // constructor(props) {
    //     super(props)
    // }

    handleChangeComplete(color) {
        // console.log(this.props.index)
        this.props.store.dispatch({
            type: 'CHANGE_COLOR',
            payload: {
                color: color.hex,
                index: this.props.index
            }
        })
    }


    render() {
        // console.log(this.props.index)
        const semColors = this.props.semColors;
        const index = this.props.index
        return(
            <CirclePicker
                color={semColors[index.valueOf()]}
                onChangeComplete={ this.handleChangeComplete.bind(this) }
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        semColors: state.semColors,
        semester: state.semester
    }
}

const ColorPicker = connect(mapStateToProps)(ColorPickerView)


export default ColorPicker