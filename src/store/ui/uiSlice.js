import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        onOpenDataModal: (state) => {
            state.isDateModalOpen = true;

        }, 
        onCloseDataModal: (state) => {
            state.isDateModalOpen = false;

        }
    },
},

);

// Action creators are generated for each case reducer function
export const { onOpenDataModal, onCloseDataModal } = uiSlice.actions;