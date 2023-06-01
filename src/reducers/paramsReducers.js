const INITIAL_STATE = {
    page: 1,
    next: 2,
    per_page: 10,
    sort: "name"
}

function updateURL(page, per_page, sort){
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    url.searchParams.set('per_page', per_page);
    url.searchParams.set('sort', sort);
    window.history.replaceState({}, '', `${url.toString()}`);
}

function paramsReducer (state, actions) {
    switch(actions.type){
        case 'NEXT_PAGE':
            updateURL(state.next, state.per_page, state.sort)
            return {
                ...state,
                page: state.next,
                next: state.next + 1,
            }
        case 'PREV_PAGE':
            updateURL(state.page - 1, state.per_page, state.sort)
            return {
                ...state,
                page: state.page - 1,
                next: state.next - 1,
            }
        case 'SET_PARAMS':
            updateURL(actions.payload.page, actions.payload.per_page, actions.payload.sort)
            return {
                page: actions.payload.page,
                next: actions.payload.next,
                per_page: actions.payload.per_page,
                sort: actions.payload.sort,
            }
        default:
            alert('Error: paramsReducer')
            return state
    }
}

export {paramsReducer, INITIAL_STATE}
