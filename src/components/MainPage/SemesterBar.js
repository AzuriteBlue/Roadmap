/**
 * Created by RyanX on 5/2/2017.
 */
import React, { Component } from 'react';
import { Menu, Popup } from 'semantic-ui-react';
import SemesterBarItem from './SemesterBarItem'
import { connect } from 'react-redux';
import ColorPicker from './ColorPicker';


class SemesterBarView extends Component {

    constructor(props) {
        super(props)
        this.style = {
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
                position: 'relative',
            }
        }
    }





    makeOnClick(x) {
        return function (e) {
            this.props.store.dispatch({
                type: 'CHANGE_SEMESTER',
                payload: {
                    semester: x
                }
            })
        }
    }


    getStyle(index) {
        // TODO: distinguish better
        if (index === this.props.semester) {
            return Object.assign({}, this.style.item,
                {backgroundColor: this.props.semColors[index]},
                {fontSize: '30px', fontWeight: '900', color:'#ffffff'})
        } else {
            return Object.assign({}, this.style.item,
                {backgroundColor: this.props.semColors[index]})
        }
    }


    render() {
        const { activeItem } = this.props.semester
        return (
            <Menu pointing vertical style={this.style.menu} fluid>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((x, i) =>
                        <Menu.Item key={x.toString()} name={x.toString()} active={activeItem === x} style={this.getStyle(x)} onClick={this.makeOnClick(x).bind(this)}>
                            <SemesterBarItem id={x}/>
                        </Menu.Item>
                    )}
            </Menu>

        )
    }

// <Popup
// trigger={
//     <Menu.Item key={x.toString()} name={x.toString()} active={activeItem === x} style={this.getStyle(x)} onClick={this.makeOnClick(x).bind(this)}>
//         <SemesterBarItem id={x}/>
//     </Menu.Item>
// }
// flowing
// hoverable
// >
// <ColorPicker
// store={this.props.store}
// index={x.toString()}
// key={x.toString()}
// />
// </Popup>
}

function mapStateToProps(state) {
    return {
        semColors: state.semColors,
        semester: state.semester
    }
}

const SemesterBar = connect(mapStateToProps)(SemesterBarView)


export default SemesterBar
