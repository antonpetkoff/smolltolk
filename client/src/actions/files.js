import { FetchHelper } from '../api/index';

const api = new FetchHelper(process.env.FILE_STORAGE_APP_API_URL);

export function createSpace(data) {
  return (dispatch) =>  api.post(`/spaces`,data)
    .then((response) => {
      dispatch({ type: 'CREATE_USER_SPACE_SUCCESS'});
    }); 
}