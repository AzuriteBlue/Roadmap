/**
 * Created by RyanX on 4/21/2017.
 */
import React, { Component } from 'react';
import { Menu, Dimmer, Loader } from 'semantic-ui-react';
import SideBarItem from "./SideBarItem";
import { connect } from 'react-redux';
import { fetchRecomm } from '../../redux/action'



class SideBarView extends Component {
    // recommended = ["AE000", "AE001", "AE002", "AE003", "AE004", "AE005", "AE006", "AE007", "AE008", "AE009", "AE010"]

    constructor(props) {
        super(props)

    }

    style = {
        menu: {
            // position: 'relative',
            overflowX: 'hidden',
            overflowY: 'auto',
            height: '470px',
            // paddingLeft: '0',
            paddingRight: '-14px',
            boxShadow: '0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)',
            border: '1px solid rgba(34,36,38,.15)'
        },
        item: {
            padding: '10% 5%',
            height: '12.5%',
            position: 'relative'
        }


    }

    // componentWillReceiveProps(nextProps) {
    //     // console.log('force update')
    //     this.forceUpdate()
    // }

    componentWillUpdate() {

    }

    makeOnClick(x) {
        return (e) => {

            this.props.store.dispatch({
                type: 'ADD_COURSE',
                payload: {
                    ourID: x,
                    semester: this.props.semester,
                    curCourses: this.props.curCourses
                }
            })

            let curCourses = this.props.curCourses;
            let index = this.props.curCourses.indexOf(x)

            if (index > -1) {
            } else {
                // // TEST
                // console.log(state.concat([action.payload.ourID]))//.forEach((x, i) => console.log(mapping[x]))
                curCourses = curCourses.concat([x])
            }

            console.log(curCourses)
            this.props.store.dispatch(fetchRecomm(curCourses))
        }
    }


    render() {


        return (
                <Menu vertical style={this.style.menu} fluid>

                    <Dimmer active={this.props.isFetching} inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>

                    {this.props.recommended.map((x, i) =>
                        <Menu.Item key={x} name={x} style={this.style.item} onClick={this.makeOnClick(x)}>
                            <SideBarItem id={x}/>
                        </Menu.Item>)}
                </Menu>
        )
    }
}


function mapStateToProps(state) {
    return {
        curCourses: state.curCourses,
        recommended: state.recommendedCourses,
        semester: state.semester,
        isFetching: state.isFetching
    }
}

const SideBar = connect(mapStateToProps)(SideBarView)

export default SideBar