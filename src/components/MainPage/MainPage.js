/**
 * Created by RyanX on 2017/4/13.
 */
import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import MyHeader from './MyHeader';
import HeadMenu from "./HeadMenu";
import Canvas from "./Canvas";
import InfoZone from "./InfoZone";
import SideBar from './SideBar';
import SemesterBar from "./SemesterBar";

class MainPage extends Component {
    constructor(props) {
        super(props)
        this.style = {
            content: {
                position: 'relative',
                padding: '0 3% 0 3%'
            }
        }
    }

    render() {
        return(

            <div>
                <MyHeader store={this.props.store}/>
                <br/>
                <div style={this.style.content}>
                    <HeadMenu store={this.props.store}/>

                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <SideBar store={this.props.store}/>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Canvas store={this.props.store}/>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <SemesterBar store={this.props.store}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <InfoZone store={this.props.store}/>


                </div>
                {/*<BottomBar/>*/}
            </div>

        )
    }
}

export default MainPage



