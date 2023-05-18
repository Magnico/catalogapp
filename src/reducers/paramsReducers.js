const INITIAL_STATE = {
    page: 1,
    next: 2,
    per_page: 10,
    sort: "name"
}

function paramsReducer (state, actions) {
    switch(actions.type){
        case 'NEXT_PAGE':
            
            return {
                ...state,
                page: state.next,
                next: state.next + 1,
            }
        case 'PREV_PAGE':
            return {
                ...state,
                page: state.page - 1,
                next: state.next - 1,
            }
        case 'SET_PAGE':
            return {
                ...state,
                page: actions.payload,
                next: actions.payload + 1,
            }
        case 'SET_PER_PAGE':
            return {
                ...state,
                per_page: actions.payload,
            }
        case 'SET_PARAMS':
            return {
                page: actions.payload.page,
                next: actions.payload.next,
                per_page: actions.payload.per_page,
                sort: actions.payload.sort,
            }
        case 'SET_ORDER':
            return {
                ...state,
                sort: actions.payload,
            }
        default:
            return state
    }
}

export {paramsReducer, INITIAL_STATE}
