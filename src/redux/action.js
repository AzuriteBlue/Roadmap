/**
 * Created by RyanX on 5/4/2017.
 */
import fetch from 'isomorphic-fetch'


export function requestRecomm() {
    return {
        type: 'FETCH_REQUEST',
    }
}


export function receivedRecomm(jsonText) {
    console.log("received")
    // console.log(jsonText)
    console.log(JSON.parse(jsonText))

    return {
        type: 'FETCH_SUCCESS',
        payload: {
            result: JSON.parse(jsonText)
        }
    }
}


export function fetchRecomm(curCourses) {
    return dispatch => {
        dispatch(requestRecomm())
        // return fetch('http://ilemfans.me/2021_project/decide_next_course.php?q='+ JSON.stringify(curCourses).replace(/'/g, "\""))
        //     .then(json => receivedRecomm(json))
        return fetch('http://ilemfans.me/2021_project/decide_next_course.php?q='+ JSON.stringify(curCourses).replace(/'/g, "\"")).then((response) => response.text()).then((text) => dispatch(receivedRecomm(text)))
    }
}
