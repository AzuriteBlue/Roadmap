/**
 * Created by RyanX on 5/2/2017.
 */
import { combineReducers } from 'redux';
import catalog from '../info/catalog.js'
import mapping from '../info/mapping'

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
// const EMPTY_TYPE = "empty"; // Empty node type
// const SPECIAL_TYPE = "special";
const EMPTY_EDGE_TYPE = "emptyEdge";
// const SPECIAL_EDGE_TYPE = "specialEdge";



// // AJAX
// var xmlHttp
// function fetchRecommendation(str)
// {
//     xmlHttp=GetXmlHttpObject()
//     if (xmlHttp===null)
//     {
//         alert ("Browser does not support HTTP Request")
//         return
//     }
//     var url="http://ilemfans.me/2021_project/decide_next_course.php"
//     url=url+"?q="+str
//     url=url+"&sid="+Math.random()
//     xmlHttp.onreadystatechange=stateChanged.bind(this)
//     xmlHttp.open("GET",url,true)
//     xmlHttp.send(null)
//
//     // this.props.store.dispatch({
//     //     type:'FETCH_REQUEST'
//     // })
// }
// function stateChanged()
// {
//     if (xmlHttp.readyState===4 || xmlHttp.readyState==="complete")
//     {
//         state = JSON.parse(xmlHttp.responseText)
//         // this.props.store.dispatch({
//         //     type:'FETCH_SUCCESS'
//         // })
//     }
// }
// function GetXmlHttpObject()
// {
//     var xmlHttp=null;
//
//     try
//     {
//         // Firefox, Opera 8.0+, Safari
//         xmlHttp=new XMLHttpRequest();
//     }
//     catch (e)
//     {
//         // Internet Explorer
//         // try
//         // {
//         //     xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
//         // }
//         // catch (e)
//         // {
//         //     xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
//         // }
//     }
//     return xmlHttp;
// }








const initState = {
    section: 'Course',
    semester: 0,
    semColors: ['#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#fed000'],
    graph:
        {
        "nodes": [
            {
                "id": 1,
                "title": "COMP 1021",
                "x": 258.3976135253906,
                "y": 331.9783248901367,
                "type": "shape0"
            },
            {
                "id": 2,
                "title": "MATH 1013",
                "x": 593.9393920898438,
                "y": 260.6060791015625,
                "type": "shape0"
            },
            {
                "id": 3,
                "title": "LANG 1002",
                "x": 237.5757598876953,
                "y": 61.81818389892578,
                "type": "shape0"
            },
        ],
        "edges": [
            {
                "source": 1,
                "target": 2,
                "type": EMPTY_EDGE_TYPE
            }
        ]
    },
    curCourses: ['AE002', 'FE000', 'BE002'],
    recommendedCourses: ["BD010","CE008","AE002","BB004","AE004","AE003","CB002","BE002","CF003","CB003","CB008","BE000","BE006","BE001","CE009"],
    selectedCourse: ['AE002', 'BE002'],
    selectedNodeEdge: {},
    deletedCourse: null,
    isFetching: false,
    isFetchFailed: false,
}










const section = (state = initState.section, action) => {
    switch (action.type) {
        case 'CHANGE_SECTION':
            // console.log('CHANGE_SECTION')
            return action.payload.section
        default:
            return state
    }
}

const semester = (state = initState.semester, action) => {
    switch (action.type) {
        case 'CHANGE_SEMESTER':
            // console.log('CHANGE_SEMESTER')
            return action.payload.semester
        default:
            return state
    }
};

const semColors = (state = initState.semColors, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            // console.log('CHANGE_COLOR')
            let nextState = []
            for (let index in state) {
                nextState.push(index === action.payload.index ? action.payload.color : state[index])
            }
            // console.log(nextState)
            return nextState
        default:
            return state
    }
}

const graph = (state = initState.graph, action) => {
    switch (action.type) {

        case 'UPDATE_GRAPH':
            // console.log('UPDATE_GRAPH')
            return action.payload.graph

        case 'ADD_COURSE':
            // console.log('ADD_COURSE')
            let nextGraph = state
            // console.log(action.payload.semester)
            nextGraph.nodes.push({
                "id": state.nodes.length + 1,
                "title": catalog[action.payload.ourID]['courseID'],
                "x": state.nodes[state.nodes.length - 1] ? state.nodes[state.nodes.length - 1].x + 70 : 70,
                "y": state.nodes[state.nodes.length - 1] ? state.nodes[state.nodes.length - 1].y : 100,
                "type": 'shape'+action.payload.semester.toString()
            })
            // console.log(nextGraph)
            return nextGraph
            // return Object.assign({}, state, {nodes: state.nodes.concat([generateNode(action.payload.ourID)])})

        case 'DELETE_COURSE':

            return state

        case 'ADD_EDGE':
            // console.log('ADD_EDGE')
            // let edges = state.edges
            // edges.push(action.payload.edge)
            return Object.assign({}, state, {edges: state.edges.concat([action.payload.edge])})

        case 'DELETE_EDGE':
            // console.log('DELETE_EDGE')
            return state

        default:
            return state
    }
}

const curCourses = (state = initState.curCourses, action) => {

    let index;

    switch (action.type) {

        case 'ADD_COURSE':
            console.log('ADD_COURSE')
            index = state.indexOf(action.payload.ourID)

            if (index > -1) {
                //TEST
                console.log(state)
                return state
            } else {
                // TEST
                console.log(state.concat([action.payload.ourID]))//.forEach((x, i) => console.log(mapping[x]))
                return state.concat([action.payload.ourID])
            }


        case 'DELETE_COURSE':
            console.log('DELETE_COURSE')

            let ourID = mapping[action.payload.title]
            index = state.indexOf(ourID)

            if (index > -1) {
                // TEST
                console.log(state.filter((a) => (state.indexOf(a) !== index)))//.forEach((x, i) => console.log(mapping[x]))
                return state.filter((a) => (state.indexOf(a) !== index))
            } else {
                // TEST
                console.log(state)//.forEach((x, i) => console.log(mapping[x]))
                return state
            }


        default:
            return state
    }
}

const recommendedCourses = (state = initState.recommendedCourses, action) => {
    switch (action.type) {
        case 'ADD_COURSE':
            // try {
            //     var nextRecomm = fetchRecommendation(action.payload.curCourses)
            // } catch (e) {}
            // return nextRecomm
            return state
        case 'FETCH_SUCCESS':
            // console.log('FETCH_SUCCESS')
            // console.log(action.payload.result)
            return action.payload.result
        default:
            return state
    }
}

const selectedCourse = (state = initState.selectedCourse, action) => {
    let nextState = []
    switch (action.type) {
        case 'SELECT_COURSE':
            // console.log('SELECT_COURSE')
            if (action.payload.node) {
                let ourID = mapping[action.payload.node.title]
                nextState[0] = ourID
                nextState[1] = state[0]
                return nextState
            } else {
                return state
            }
        case 'ADD_COURSE':
            // console.log('ADD_COURSE')
            nextState[1] = state[0]
            nextState[0] = action.payload.ourID
            return nextState
        case 'DELETE_COURSE':
            // console.log('DELETE_COURSE')
            nextState[0] = state[1]
            nextState[1] = null
            return nextState
        default:
            return state
    }
}

const selectedNodeEdge = (state = initState.selectedNodeEdge, action) => {
    switch (action.type) {
        case 'SELECT_NODE':
            // console.log('SELECT_NODE')
            return action.payload.node
        case 'SELECT_EDGE':
            // console.log('SELECT_EDGE')
            return action.payload.edge
        case 'CLEAR_SELECTED':
            return {}
        default:
            return state
    }
}


const deletedCourse = (state = initState.deletedCourse, action) => {
    switch (action.type) {
        case 'DELETE_COURSE':
            // console.log('DELETE_COURSE')
            return mapping[action.payload.title]
        default:
            return state
    }
}

const isFetching = (state = initState.isFetching, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            // console.log('FETCH_REQUEST')
            return true
        case 'FETCH_SUCCESS':
            // console.log('FETCH_SUCCESS')
            return false
        default:
            return state
    }
}

const isFetchFailed = (state = initState.isFetchFailed, action) => {
    switch (action.type) {
        case 'FETCH_FAILED':
            // console.log('FETCH_FAILED')
            return true
        case 'FETCH_SUCCESS':
            // console.log('FETCH_SUCCESS')
            return false
        default:
            return state
    }
}


let reducer = combineReducers({section, semester, semColors, graph, curCourses, recommendedCourses,
    selectedCourse, selectedNodeEdge, deletedCourse, isFetching, isFetchFailed})

export default reducer
