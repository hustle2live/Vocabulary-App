export const saveStatsDispatcher = (dispatch, dataPayload) => {
  dispatch({
    type: 'SAVE_STATS_DATA',
    payload: `${dataPayload} % correct answers`
  });

  dispatch({
    type: 'CLEAR_TEST_DATA'
  });
};
