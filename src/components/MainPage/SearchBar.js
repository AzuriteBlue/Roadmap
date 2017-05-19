/**
 * Created by RyanX on 4/21/2017.
 */
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import source from '../../info/searchSource';
import _ from 'lodash';
import { connect } from 'react-redux'
import { fetchRecomm } from '../../redux/action'

class SearchBarView extends Component {
    constructor(props) {
        super(props)
        this.style = {
            search: {
                alignSelf: 'auto',
                padding: '0px 20px 0px 0px',
                width: '230px'
            }
        }
    }

    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    // TODO
    handleResultSelect = (e, result) => {
        this.setState({ value: result.title })

        this.props.store.dispatch({
            type: 'ADD_COURSE',
            payload: {
                ourID: result.id,
                semester: this.props.semester,
                curCourses: this.props.curCourses
            }
        })

        let curCourses = this.props.curCourses;
        let index = this.props.curCourses.indexOf(result.id)
        if (index > -1) {
        } else {
              curCourses = curCourses.concat([result.id])
        }

        console.log(curCourses)
        this.props.store.dispatch(fetchRecomm(curCourses))

        // this.props.store.dispatch(fetchRecomm(this.props.curCourses))
    }

    handleSearchChange = (e, value) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),

            })
        }, 500)
    }

    render() {
        const { isLoading, value, results } = this.state

        return (
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect.bind(this)}
                        onSearchChange={this.handleSearchChange}
                        results={results}
                        value={value}
                        minCharacters={2}
                        {...this.props}
                    />

        )
    }
}

function mapStateToProps(state) {
    return {
        semester: state.semester,
        curCourses: state.curCourses
    }
}
const SearchBar = connect(mapStateToProps)(SearchBarView)

export default SearchBar