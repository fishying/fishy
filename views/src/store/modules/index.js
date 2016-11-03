import * as types from '../mutation-types'

const state = {
    article:{},
    articles:[],
}

const mutations = {
    [types.GET_INDEX](state,data){
        state.articles = data
    }
}
export default {
    state,
    mutations
}