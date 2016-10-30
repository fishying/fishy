import * as types from '../mutation-types'

const state = {
    article:[]
}

const mutations = {
    [types.GET_INDEX](state,data){
        state.article = data
    }
}
export default {
    state,
    mutations
}