import {
    GET_TUTOR_LECTURES,
    GET_TUTOR_CLASSROOMS
} from '../actions/types';

const initialState = {
    loading: true,
    lectures: [],
    classrooms: []
};

export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case GET_TUTOR_LECTURES:
            return {
                loading: false,
                lectures: payload,
                classrooms: []
            }
        case GET_TUTOR_CLASSROOMS:
            return {
                loading: false,
                lectures: [],
                classrooms: payload
            }
        default:
            return {
                loading: true,
                lectures: [],
                classrooms: []
            }
    }
}