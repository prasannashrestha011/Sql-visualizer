import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorState {
  query: string;
}

const initialState: EditorState = {
  query: '',
};

const EditorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = EditorSlice.actions;
export default EditorSlice.reducer;
