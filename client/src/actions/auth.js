import { AUTH } from '../constants/actionType';
import * as api from '../Api/index';
import { NotificationManager } from 'react-notifications';
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    NotificationManager.success("Success");
    dispatch({ type: AUTH, data });

    router.push('/');
    
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 404 || err.response.status === 400)
    )
      NotificationManager.error(err.response.data.message);
    else NotificationManager.error("Something Went Wrong");
    
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    
    const { data } = await api.signUp(formData);
    NotificationManager.success("Success");
    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    NotificationManager.error(error.response.data.message);
    console.log(error);
  }
};