import { createSlice } from '@reduxjs/toolkit';
import { SUPPORTED_LANGUAGE } from '../../configs/constant';

export interface LanguageState {
    languageSelected: string;
}

const initialState: LanguageState = {
    languageSelected: SUPPORTED_LANGUAGE[0],
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.languageSelected = action.payload;
        },
    },
    selectors: {
        selectLanguage: (state) => state.languageSelected 
    }
});

export const { setLanguage } = languageSlice.actions;
export const { selectLanguage } = languageSlice.selectors


