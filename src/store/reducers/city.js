function city(state='北京', action) {
    switch (action.type) {
        case 'SETCITY':
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default city;