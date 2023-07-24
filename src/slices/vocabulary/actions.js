import { createAsyncThunk } from '@reduxjs/toolkit';

import { ActionTypes } from './common.js';

const addWord = createAsyncThunk(
    ActionTypes.ADD_WORD,
    async ({ name, translate }, {getState}) => {
        if (name && translate) return { name, translate }
        return;
    }

)
const updateWord = createAsyncThunk(
    ActionTypes.UPDATE_WORD,
    async (payload, {getState}) => {

        return;
    }

)
const deleteWord = createAsyncThunk(
    ActionTypes.DELETE_WORD,
    async (payload, {getState}) => {

        const { vocabulary } = getState();
        console.log(vocabulary);
        if (payload && vocabulary.find((word) => word === payload)) return payload;

        return;
    }

)
const setAchievedWord = createAsyncThunk(
    ActionTypes.SET_ACHIEVED_WORD,
    async (payload, {getState}) => {

        return;
    }

)
const setPracticeWord = createAsyncThunk(
    ActionTypes.SET_PRACTICE_WORD,
    async (payload, {getState}) => {

        return;
    }

)
const sortByName = createAsyncThunk(
    ActionTypes.SORT_BY_NAME,
    async (payload, {getState}) => {

        return;
    }

)
const sortByStatus = createAsyncThunk(
    ActionTypes.SORT_BY_STATUS,
    async (payload, {getState}) => {

        return;
    }

)
const sortRandom = createAsyncThunk(
    ActionTypes.SORT_RANDOM,
    async (payload, {getState}) => {

        return;
    }

)

export {
    addWord,
    updateWord,
    deleteWord,
    setAchievedWord,
    setPracticeWord,
    sortByName,
    sortByStatus,
    sortRandom
}