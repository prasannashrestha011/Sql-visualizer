import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edge, Node } from "reactflow";

interface TableNodeState{
    items:{
        nodes:Node[],
        edges:Edge[]
    }
}
const initialState:TableNodeState={
    items:{
        nodes:[],
        edges:[]
    }
}
const TableNodesSlice=createSlice({
    name:'tableNodesSlice',
    initialState,
    reducers:{
        setNodesAndEdges(state,action:PayloadAction<{nodes:Node[];edges:Edge[]}>){
            if(state.items){
                console.log(action.payload)
                state.items=action.payload
            }
        }
    }
})
export const {setNodesAndEdges}=TableNodesSlice.actions
export default TableNodesSlice.reducer