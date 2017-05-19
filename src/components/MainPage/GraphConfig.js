/**
 * Created by RyanX on 4/22/2017.
 */
import React from 'react';

const EmptyShape = (
    <symbol viewBox="0 0 100 100" id="empty" key="0">
        <circle cx="50" cy="50" r="45" ></circle>
    </symbol>
)

const SpecialShape = (
    <symbol viewBox="0 0 100 100" id="special" key="1">
        <rect transform="translate(50) rotate(45)" width="70" height="70"></rect>
    </symbol>
)

const SpecialChildShape = (
    <symbol viewBox="0 0 100 100" id="specialChild" key="0">
        <rect x="2.5" y="0" width="95" height="97.5" fill="rgba(30, 144, 255, 0.12)"></rect>
    </symbol>
)

const EmptyEdgeShape = (
    <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
        <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
    </symbol>
)

const SpecialEdgeShape = (
    <symbol viewBox="0 0 50 50" id="specialEdge" key="1">
        <rect transform="rotate(45)"  x="25" y="-4.5" width="15" height="15" fill="currentColor"></rect>
    </symbol>
)

function generateShape(colorStr) {

    const style = {fill: colorStr}
    return(
    <symbol viewBox="0 0 100 100" id="empty" key="0">
        <circle cx="50" cy="50" r="45" style={style}></circle>
    </symbol>
    )
}

function generateType(colorStrArray) {
    let NodeTypes = {}
    NodeTypes["empty"] = {
        typeText: "",
        shapeId: "#empty",
        shape: EmptyShape
    }
    // colorStrArray.forEach((x, i) => {
    //     NodeTypes['shape'+i.toString()] = {
    //         shapeId: "#shape" + i.toString(),
    //         shape: generateShape(x)
    //     }
    // })

    return ({
        NodeTypes: NodeTypes,
        NodeSubtypes: {
            specialChild: {
                shapeId: "#specialChild",
                shape: SpecialChildShape
            }
        },
        EdgeTypes: {
            emptyEdge: {
                shapeId: "#emptyEdge",
                shape: EmptyEdgeShape
            },
            specialEdge: {
                shapeId: "#specialEdge",
                shape: SpecialEdgeShape
            }
        }})

}

let basicType = {
    NodeTypes: {"empty": {
        typeText: "",
        shapeId: "#empty",
        shape: EmptyShape
    }},
    NodeSubtypes: {
        specialChild: {
            shapeId: "#specialChild",
            shape: SpecialChildShape
        }
    },
    EdgeTypes: {
        emptyEdge: {
            shapeId: "#emptyEdge",
            shape: EmptyEdgeShape
        },
        specialEdge: {
            shapeId: "#specialEdge",
            shape: SpecialEdgeShape
        }
    }}

export default {basicType}
export default {generateShape}