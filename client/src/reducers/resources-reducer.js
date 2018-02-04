import { objectsHelper } from '../helpers/objects-helper';

const initialState = {
    isFetching: false,
    resources: [
        {
            "id": "",
            "type": ""
        }
    ]
};

const resourcesContext = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_RESOURCE':
            return objectsHelper.mergeObjects(state, {isFetching: true});
            break;
        case 'RECEIVE_RESOURCE':
            return objectsHelper.mergeObjects(state, {isFetching: false, resource: action.resource});
            break;
        default:
            return state;
    }
};

export { resourcesContext };