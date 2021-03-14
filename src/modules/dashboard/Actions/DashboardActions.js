import { dashboardRoutes } from './../DashboardRoutes';
import { actionTypes } from './../DashboardConstant';

function getArtists(name) {
  return dispatch => {
    fetch(dashboardRoutes.getArtists(name))
      .then(res => res.json())
      .then((result) => {
        dispatch({
          type: actionTypes.GET_ARTISTS,
          data: result.artists.items
        });
      });
  }
}

export {
  getArtists
};