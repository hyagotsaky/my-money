import axios from 'axios';

const login = (username, password) => {
  return axios.get(
    `https://api.mlab.com/api/1/databases/hyago-mymoney/collections/user?q={"username": "${username}", "password": "${password}"}&apiKey=5aPAxLXs0iXeCbUpetKBKbl5Dta11DYj`
  )
    .then(
      response => {
        if (response.data.length) {
          localStorage.setItem('mymoney-user', JSON.stringify(response.data[0]))
          return true;
        }
        return false;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    )
};

const register = (payload) => {
  return axios.post(
    'https://api.mlab.com/api/1/databases/hyago-mymoney/collections/user?apiKey=5aPAxLXs0iXeCbUpetKBKbl5Dta11DYj',
    payload,
  )
    .then(response => {
      if (response.data) return true;
      return false;
    })
    .catch(error => {
      console.log(error);
    })
}

const getOperations = (username) => {
  return axios.get(
    `https://api.mlab.com/api/1/databases/hyago-mymoney/collections/operations?q={"username":"${username}"}&apiKey=5aPAxLXs0iXeCbUpetKBKbl5Dta11DYj`
  )
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    })
}

const createOperation = (payload) => {
  return axios.post(
    'https://api.mlab.com/api/1/databases/hyago-mymoney/collections/operations?apiKey=5aPAxLXs0iXeCbUpetKBKbl5Dta11DYj',
    payload,
  )
    .then(response => {
      if (response.data) return true;
      return false;
    })
    .catch(error => {
      console.log(error);
    })
}

export {
  login,
  register,
  getOperations,
  createOperation
};