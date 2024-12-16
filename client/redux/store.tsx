
import { configureStore } from '@reduxjs/toolkit';
import TableNodeSlice from './Slices/TableNodesSlice'
import LogDataSlice from './Slices/LogSlice'
import EditorSlice from './Slices/EditorSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
export const store=configureStore({
    reducer:{
        'tableNodesSlice':TableNodeSlice,
        'logDataSlice':LogDataSlice,
        'editorSlice':EditorSlice
    }
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch

export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;
