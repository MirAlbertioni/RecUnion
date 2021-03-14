import { actionTypes } from '../DashboardConstant';

const initialState = {
    artists: []
};

function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ARTISTS:
            return Object.assign({}, state, { artists: action.data });
        default:
            return state;
    }
}

export default dashboardReducer;