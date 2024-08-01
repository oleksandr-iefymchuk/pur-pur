import axios from 'axios';
import { logout, showMessage, setUserData } from './actionCreators';
import { setLoading } from '../appReduser/actionCreators';
import { BASE_URL } from '../../constants/constants';

export const loginUserThunk = (user, onLoginSucces) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post(
        `${BASE_URL}/users/login`,
        user,
        config
      );
      dispatch(setUserData(data));
      dispatch(setLoading(false));
      onLoginSucces();
      localStorage.setItem('userInfo', JSON.stringify(data.token));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        showMessage(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          'error'
        )
      );
    }
  };
};

export const getUserProfileThunk = token => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.get(`${BASE_URL}/users/profile`, config);
      dispatch(setUserData(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      // if (error.response && error.response.status === 401) {
      //   localStorage.removeItem('userInfo');
      // }
    }
  };
};

export const updateUserProfileThunk = (userData, token, onUpdateUserSucces) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.put(
        `${BASE_URL}/users/update-profile`,
        userData,
        config
      );

      dispatch(setUserData(data));
      onUpdateUserSucces();
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        showMessage(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          'error'
        )
      );
    }
  };
};

export const updateUserPasswordThunk = (passwordData, token) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.put(
        `${BASE_URL}/users/update-password`,
        passwordData,
        config
      );

      dispatch(setLoading(false));
      dispatch(showMessage(data.message, 'success'));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        showMessage(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          'error'
        )
      );
    }
  };
};

export const registrationUserThunk = (user, onRegistrationSuccess) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      await axios.post(`${BASE_URL}/users/register`, user, config);
      onRegistrationSuccess();
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        showMessage(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          'error'
        )
      );
    }
  };
};

export const googleUserRegistrationThunk = (
  userData,
  onRegistrationSuccess
) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/users/register/google`,
        userData,
        config
      );

      if (data.token) {
        localStorage.setItem('userInfo', JSON.stringify(data.token));
      }
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        showMessage(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          'error'
        )
      );
    }
  };
};

export const userLogout = () => {
  return async dispatch => {
    localStorage.removeItem('userInfo');
    dispatch(logout());
  };
};

export const addToFavoritesThunk = productId => async dispatch => {
  try {
    const tokenString = localStorage.getItem('userInfo');
    if (!tokenString) {
      dispatch(
        showMessage('Ви не авторизовані. Авторизуйтесь будь-ласка!', 'error')
      );
      return;
    }
    const token = JSON.parse(tokenString);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.put(
      `${BASE_URL}/users/favorites/add`,
      { productId },
      config
    );

    dispatch(setUserData(data));
  } catch (error) {
    dispatch(
      showMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        'error'
      )
    );
  }
};

export const removeFromFavoritesThunk = productId => async dispatch => {
  try {
    const tokenString = localStorage.getItem('userInfo');
    if (!tokenString) {
      dispatch(
        showMessage('Ви не авторизовані. Авторизуйтесь будь-ласка!', 'error')
      );
      return;
    }
    const token = JSON.parse(tokenString);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.put(
      `${BASE_URL}/users/favorites/remove`,
      { productId },
      config
    );

    dispatch(setUserData(data));
  } catch (error) {
    dispatch(
      showMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        'error'
      )
    );
  }
};

export const addToBasketThunk = (productId, quantity) => async dispatch => {
  try {
    const tokenString = localStorage.getItem('userInfo');
    if (!tokenString) {
      dispatch(
        showMessage('Ви не авторизовані. Авторизуйтесь будь-ласка!', 'error')
      );
      return;
    }
    const token = JSON.parse(tokenString);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.put(
      `${BASE_URL}/users/basket/add`,
      { productId, quantity },
      config
    );

    dispatch(setUserData(data));
  } catch (error) {
    dispatch(
      showMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        'error'
      )
    );
  }
};

export const removeFromBasketThunk = productId => async dispatch => {
  try {
    const tokenString = localStorage.getItem('userInfo');
    if (!tokenString) {
      dispatch(
        showMessage('Ви не авторизовані. Авторизуйтесь будь-ласка!', 'error')
      );
      return;
    }
    const token = JSON.parse(tokenString);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.put(
      `${BASE_URL}/users/basket/remove`,
      { productId },
      config
    );

    dispatch(setUserData(data));
  } catch (error) {
    dispatch(
      showMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        'error'
      )
    );
  }
};

export const clearBasketThunk = () => async dispatch => {
  try {
    const tokenString = localStorage.getItem('userInfo');
    if (!tokenString) {
      dispatch(
        showMessage('Ви не авторизовані. Авторизуйтесь будь-ласка!', 'error')
      );
      return;
    }
    const token = JSON.parse(tokenString);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.put(
      `${BASE_URL}/users/basket/clear`,
      null,
      config
    );

    dispatch(setUserData(data));
  } catch (error) {
    dispatch(
      showMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        'error'
      )
    );
  }
};

export const increaseQuantityInBasketThunk = productId => async dispatch => {
  try {
    const tokenString = localStorage.getItem('userInfo');
    if (!tokenString) {
      dispatch(
        showMessage('Ви не авторизовані. Авторизуйтесь будь-ласка!', 'error')
      );
      return;
    }
    const token = JSON.parse(tokenString);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.put(
      `${BASE_URL}/users/basket/inc`,
      { productId },
      config
    );

    dispatch(setUserData(data));
  } catch (error) {
    dispatch(
      showMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        'error'
      )
    );
  }
};

export const decreaseQuantityInBasketThunk = productId => async dispatch => {
  try {
    const tokenString = localStorage.getItem('userInfo');
    if (!tokenString) {
      dispatch(
        showMessage('Ви не авторизовані. Авторизуйтесь будь-ласка!', 'error')
      );
      return;
    }
    const token = JSON.parse(tokenString);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.put(
      `${BASE_URL}/users/basket/dec`,
      { productId },
      config
    );

    dispatch(setUserData(data));
  } catch (error) {
    dispatch(
      showMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        'error'
      )
    );
  }
};
