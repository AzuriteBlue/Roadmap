/**
 * Created by RyanX on 4/21/2017.
 */
import React, { Component } from 'react';
import GraphView from 'react-digraph'
import {connect} from 'react-redux'



function generateShape(colorStr, index) {

    const style = {fill: colorStr}
    return(
        <symbol viewBox="0 0 100 100" id={"shape"+index.toString()} key={(index + 1).toString()}>
            <circle cx="50" cy="50" r="45" style={style}></circle>
        </symbol>
    )
}

function generateType() {
    this.type = {
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
    this.props.semColors.forEach((x, i) => {
        this.type.NodeTypes['shape'+ i.toString()] = {
            shapeId: "#shape" + i.toString(),
            shape: generateShape(x, i)
        }
    })
}

const EmptyShape = (
    <symbol viewBox="0 0 100 100" id="empty" key="0">
        <circle cx="50" cy="50" r="45" ></circle>
    </symbol>
)

// const SpecialShape = (
//     <symbol viewBox="0 0 100 100" id="special" key="1">
//         <rect transform="translate(50) rotate(45)" width="70" height="70"></rect>
//     </symbol>
// )

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

const EMPTY_TYPE = "empty"; // Empty node type
const EMPTY_EDGE_TYPE = "emptyEdge";


// const sample =
//     {
//     "nodes": [
//         {
//             "id": 1,
//             "title": "COMP 1021",
//             "x": 258.3976135253906,
//             "y": 331.9783248901367,
//             "type": EMPTY_TYPE
//         },
//         {
//             "id": 2,
//             "title": "MATH 1013",
//             "x": 593.9393920898438,
//             "y": 260.6060791015625,
//             "type": EMPTY_TYPE,
//         },
//         {
//             "id": 3,
//             "title": "LANG 1002",
//             "x": 237.5757598876953,
//             "y": 61.81818389892578,
//             "type": EMPTY_TYPE
//         },
//     ],
//     "edges": [
//         {
//             "source": 1,
//             "target": 2,
//             "type": EMPTY_EDGE_TYPE
//         }
//     ]
// }



const styles = {
    graph: {
        height: '100%',
        width: '100%'
    }
};


const NODE_KEY = "id" // Key used to identify nodes

class MyGraphView extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     graph: sample,
        //     selected: {}
        // }

        // this.type = generateType(this.props.semColors)

        generateType = generateType.bind(this)

        generateType()

        this.getViewNode = this.getViewNode.bind(this);
        this.onSelectNode = this.onSelectNode.bind(this);
        this.onCreateNode = this.onCreateNode.bind(this);
        this.onUpdateNode = this.onUpdateNode.bind(this);
        this.onDeleteNode = this.onDeleteNode.bind(this);
        this.onSelectEdge = this.onSelectEdge.bind(this);
        this.onCreateEdge = this.onCreateEdge.bind(this);
        this.onSwapEdge = this.onSwapEdge.bind(this);
        this.onDeleteEdge = this.onDeleteEdge.bind(this);

    }

    // Helper to find the index of a given node
    getNodeIndex(searchNode) {
        return this.props.graph.nodes.findIndex((node)=>{
            return node[NODE_KEY] === searchNode[NODE_KEY]
        })
    }

    // Helper to find the index of a given edge
    getEdgeIndex(searchEdge) {
        return this.props.graph.edges.findIndex((edge)=>{
            return edge.source === searchEdge.source &&
                edge.target === searchEdge.target
        })
    }

    // Given a nodeKey, return the corresponding node
    getViewNode(nodeKey) {
        const searchNode = {};
        searchNode[NODE_KEY] = nodeKey;
        const i = this.getNodeIndex(searchNode);
        return this.props.graph.nodes[i]
    }

    /*
     * Handlers/Interaction
     */

    // Called by 'drag' handler, etc..
    // to sync updates from D3 with the graph
    onUpdateNode(viewNode) {
        const graph = this.props.graph;
        const i = this.getNodeIndex(viewNode);

        graph.nodes[i] = viewNode;
        this.props.store.dispatch({
            type: 'UPDATE_GRAPH',
            payload: {
                graph: graph
            }
        });
    }

    // Node 'mouseUp' handler
    onSelectNode(viewNode) {
        // Deselect events will send Null viewNode
        if (!!viewNode){
            this.props.store.dispatch({
                type: 'SELECT_NODE',
                payload: {
                    node: viewNode
                }
            });
            this.props.store.dispatch({
                type: 'SELECT_COURSE',
                payload: {
                    node: viewNode
                }
            })
        } else{
            this.props.store.dispatch({
                type: 'CLEAR_SELECTED',
            });
        }
    }

    // Edge 'mouseUp' handler
    onSelectEdge(viewEdge) {
        this.props.store.dispatch({
            type: 'SELECT_EDGE',
            payload: {
                edge: viewEdge
            }
        })
    }

    // Updates the graph with a new node
    onCreateNode(x,y) {
        // const graph = this.props.graph;
        // // There is also support for subtypes. (see 'sample' above)
        // // The subtype geometry will underlay the 'type' geometry for a node
        // const type = EMPTY_TYPE;
        //
        // const viewNode = {
        //     id: this.props.graph.nodes.length + 1,
        //     title: '',
        //     type: type,
        //     x: x,
        //     y: y
        // }
        //
        // graph.nodes.push(viewNode);
        // this.setState({graph: graph});
    }

    // Deletes a node from the graph
    onDeleteNode(viewNode) {
        // TODO: dispatch an action
        const graph = this.props.graph;
        const i = this.getNodeIndex(viewNode);
        graph.nodes.splice(i, 1);

        // Delete any connected edges
        const newEdges = graph.edges.filter((edge, i)=>{
            // eslint-disable-next-line
            return  edge.source != viewNode[NODE_KEY] &&
                // eslint-disable-next-line
                edge.target != viewNode[NODE_KEY]
        })

        graph.edges = newEdges;

        this.props.store.dispatch({
            type: 'DELETE_COURSE',
            payload: {
                title: viewNode.title
            }
        })

        this.props.store.dispatch({
            type: 'UPDATE_GRAPH',
            payload: {
                graph: graph
            }
        })
        this.props.store.dispatch({
            type: 'CLEAR_SELECTED',
        })

        // this.setState({graph: graph, selected: {}});
    }

    // Creates a new node between two edges
    onCreateEdge(sourceViewNode, targetViewNode){
        const graph = this.props.graph;

        // This is just an example - any sort of logic
        // could be used here to determine edge type
        const type = EMPTY_EDGE_TYPE;

        const viewEdge = {
            source: sourceViewNode[NODE_KEY],
            target: targetViewNode[NODE_KEY],
            type: type
        }
        graph.edges.push(viewEdge);

        this.props.store.dispatch({
            type: 'UPDATE_GRAPH',
            payload: {
                graph: graph
            }
        })

        // this.setState({graph: graph});
    }

    // Called when an edge is reattached to a different target.
    onSwapEdge(sourceViewNode, targetViewNode, viewEdge){
        const graph = this.props.graph;
        const i = this.getEdgeIndex(viewEdge);
        const edge = JSON.parse(JSON.stringify(graph.edges[i]));

        edge.source = sourceViewNode[NODE_KEY];
        edge.target = targetViewNode[NODE_KEY];
        graph.edges[i] = edge;

        this.props.store.dispatch({
            type: 'UPDATE_GRAPH',
            payload: {
                graph: graph
            }
        })
        // this.setState({graph: graph});
    }

    // Called when an edge is deleted
    onDeleteEdge(viewEdge){
        const graph = this.props.graph;
        const i = this.getEdgeIndex(viewEdge);
        graph.edges.splice(i, 1);

        this.props.store.dispatch({
            type: 'UPDATE_GRAPH',
            payload: {
                graph: graph
            }
        })
        this.props.store.dispatch({
            type: 'CLEAR_SELECTED',
        })

        // this.setState({graph: graph, selected: {}});
    }

    /*
     * Render
     */

    render() {

        generateType()

        const nodes = this.props.graph.nodes;
        const edges = this.props.graph.edges;
        const selected = this.props.selected;

        // const NodeTypes = GraphConfig.NodeTypes;
        // const NodeSubtypes = GraphConfig.NodeSubtypes;
        // const EdgeTypes = GraphConfig.EdgeTypes;


        return (
            <div id='graph' style={styles.graph}>

                <GraphView  ref='GraphView'
                            nodeKey={NODE_KEY}
                            emptyType={EMPTY_TYPE}
                            nodes={nodes}
                            edges={edges}
                            selected={selected}
                            nodeTypes={this.type.NodeTypes}
                            nodeSubtypes={this.type.NodeSubtypes}
                            edgeTypes={this.type.EdgeTypes}
                            getViewNode={this.getViewNode}
                            onSelectNode={this.onSelectNode}
                            onCreateNode={this.onCreateNode}
                            onUpdateNode={this.onUpdateNode}
                            onDeleteNode={this.onDeleteNode}
                            onSelectEdge={this.onSelectEdge}
                            onCreateEdge={this.onCreateEdge}
                            onSwapEdge={this.onSwapEdge}
                            onDeleteEdge={this.onDeleteEdge}/>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        graph: state.graph,
        selected: state.selectedNodeEdge,
        semColors: state.semColors
    }
}

const Graph = connect(mapStateToProps)(MyGraphView)

export default Graph;