/**
 * Created by RyanX on 2017/4/13.
 */
import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import { Segment, Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';


class HeadMenuView extends Component {

    style = {
            segment: {
                position: 'relative',
                height: '70px',
                paddingTop: '8px',
                paddingBottom: '8px',
                marginBottom:'28px',
                marginTop:'7px',
                
                // overflowY: 'auto',

                display: 'flex',
                // eslint-disable-next-line
                display: '-webkit-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            },

            menu: {
                // display: 'flex',
                // // eslint-disable-next-line
                // display: '-webkit-flex',
                // alignItems: 'center',
                // justifyContent: 'space-between',
                //
                // flexWrap:'wrap'
                marginTop: '8px',
                marginBottom: '8px',
            },

     }



    handleItemClickLeft = (e) => {}
    MakeHandleItemClickRight(name) {
        return function (e) {
            this.props.store.dispatch({
                type: 'CHANGE_SECTION',
                payload: {
                    section: name
                }
            })
        }
    }

    handleSave(e) {
        this.handleItemClickLeft(e)
        // console.log(this.props.graph)
        let myHeaders = new Headers();
        myHeaders['data'] = ["id" + Math.random(),this.props.graph]
        let myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        }


        fetch('http://ilemfans.me/2021_project/save.php', myInit)
    }



    render() {

        const activeSection = this.props.section
        return (

            <Segment raised style={this.style.segment}>

                        <Menu stackable secondary style={this.style.menu}>
                                <Menu.Item name='arrow left'  onClick={this.handleItemClickLeft} style={{width: '40px'}}>
                                    <Icon name='arrow left' size="large" />
                                </Menu.Item>

                                <Menu.Item name='write'  onClick={this.handleItemClickLeft} style={{width: '40px'}}>
                                  <Icon name='write' size="large" />
                                </Menu.Item>

                                <Menu.Item name='save'  onClick={this.handleSave.bind(this)} style={{width: '40px'}}>
                                  <Icon name='save' size="large"/>
                                </Menu.Item>

                                <Menu.Item name='trash'  onClick={this.handleItemClickLeft} style={{width: '40px'}}>
                                    <Icon name='trash' size="large" />
                                </Menu.Item>
                        </Menu>

                        <Menu stackable secondary style={this.style.menu}>

                                <Menu.Item name='Course' active={activeSection === 'Course'} onClick={this.MakeHandleItemClickRight('Course').bind(this)} />
                                <Menu.Item name='Project' active={activeSection === 'Project'} onClick={this.MakeHandleItemClickRight('Project').bind(this)} />
                                <Menu.Item name='Intern' active={activeSection === 'Intern'} onClick={this.MakeHandleItemClickRight('Intern').bind(this)} />
                                <Menu.Item name='Research' active={activeSection === 'Research'} onClick={this.MakeHandleItemClickRight('Research').bind(this)} />

                        </Menu>
                        <Menu stackable secondary style={{width:'230px', borderRight: '50px', marginTop: '8px', marginBottom: '8px'}}>
                                <SearchBar store={this.props.store}/>
                        </Menu>
            </Segment>
        )
    }
}


function mapStateToProps(state) {
    return {
        section: state.section,
        graph: state.graph
    }
}

const HeadMenu = connect(mapStateToProps)(HeadMenuView)

export default HeadMenu