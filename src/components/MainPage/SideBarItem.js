/**
 * Created by RyanX on 4/24/2017.
 */
import React, { Component } from 'react';
import catalog from '../../info/catalog'
import { connect } from 'react-redux';
import { fetchRecomm } from '../../redux/action'


class SideBarItemView extends Component {
    constructor(props) {
        super(props)
        this.style = {
            div: {
                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                fontSize: '14px',
                textAlign: 'center'
            },

        }
    }
    
    render() {
        return (

                <div style={this.style.div}>
                    {catalog[this.props.id]["courseID"]}
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        semester: state.semester,
        curCourses: state.curCourses
    }
}

// function mapDispatchToProps(dispatch) {
//     return { onClick: () => {
//
//         this.props.store.dispatch({
//             type: 'ADD_COURSE',
//             payload: {
//                 ourID: this.props.id,
//                 semester: this.props.semester,
//                 curCourses: this.props.curCourses
//             }
//         })
//         this.props.store.dispatch(fetchRecomm(this.props.curCourses))
//     }}
// }

const SideBarItem = connect(mapStateToProps)(SideBarItemView)

export default SideBarItem;