import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogStruct{
    message:string,
    is_err:boolean,
    created_at?:string,
}
interface LogDataState{
    items:LogStruct[]
}
const initialState:LogDataState={
    items:[]
}
export const LogDataSlice=createSlice({
    name:'logDataSlice',
    initialState,
    reducers:{
        addLogs(state,action:PayloadAction<LogStruct>){
            if(state.items){
                const logEntry={
                    ...action.payload,
                    created_at:new Date().toISOString()
                }
                console.log(logEntry)
                state.items.unshift(action.payload)
            }
        }
    }
})

export const {addLogs}=LogDataSlice.actions
export default LogDataSlice.reducer