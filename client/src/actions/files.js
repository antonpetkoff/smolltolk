import { FetchHelper } from '../api/index';

const api = new FetchHelper(process.env.FILE_STORAGE_APP_API_URL);

export function createSpace(username) {
  let data = {"username": username};
  return (dispatch) =>  {
    return api.post(`/spaces`,data)
    .then(response => {
      dispatch({ type: 'CREATE_USER_SPACE_SUCCESS'});
    })
    .catch(err => {
      console.log('Failed to create space');
    }); 
  };
};

export function getSpace(username) {
  return (dispatch, getState) => { 
    dispatch({type: 'FETCH_SPACE'});
    return api.fetch(`/spaces/${username}`)
    .then( response => {
      dispatch({ type: 'RECEIVE_SPACE', response})
    })
    .catch(err => {
      console.log(err);
    });
  };
};

//FIXME: make it send multipart and auth header
export function addResource(spaceId, resourceType) {
  let data = {
    "id": spaceId,
    "type": resourceType
  };
  return (dispatch) =>  {
    return api.post(`/resources`, data)
    .then(response => {
      dispatch({ type: 'ADD_RESOURCE_SUCCESS'});
    })
    .catch(err => {
      console.log('Failed to add resource');
    }); 
  };
}

export function getResource(resourceId) {
  return (dispatch, getState) => { 
    return api.fetch(`/resources/${resourceId}`)
    .then( response => {
      dispatch({ type: 'RECEIVE_RESOURCE', response})
    })
    .catch(err => {
      console.log(err);
    });
  };
}

export function shareResource(resourceId, otherUsername) {
  let data = {
    "username": otherUsername
  };
  return (dispatch) =>  {
    return api.post(`/resources/${resourceId}/share`, data)
    .then(response => {
      dispatch({ type: 'SHARE_RESOURCE_SUCCESS'});
    })
    .catch(err => {
      console.log('Failed to share resource');
    }); 
  };
}