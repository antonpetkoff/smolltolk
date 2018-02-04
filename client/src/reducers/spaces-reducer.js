import { objectsHelper } from '../helpers/objects-helper';

const initialState = {
    isFetching: false,
    space: 
    {
        "spaceId": "",
        "resources": [ 
            {
                "id": "",
                "type": ""
            }
        ]
    }
};

const spaceContext = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SPACE':
            return objectsHelper.mergeObjects(state, {isFetching: true});
        case 'RECEIVE_SPACE':
            return objectsHelper.mergeObjects(state, {isFetching: false, space: action.space});
        default:
            return state;
    }
};

export { spaceContext };