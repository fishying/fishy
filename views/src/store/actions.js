import * as types from './mutation-types'
import Vue from 'vue'

export const checklogin = ({commit, state }) => {
    return new Promise((resolve, reject)=>{
        if(!state.login.status){
            Vue.http.post("/api/checklogin")
            .then(function(response) {
                return response.json()
            }).then(function(data) {
                if(data.status == "success"){
                    commit(types.CHECK_LOGIN, data)
                    resolve(state.login)
                }
            })
        }else {
            resolve(state.login)
        }
    })
}

export const getindex = ({commit, state}) =>{
    Vue.http.get("/api/index")
    .then(response=>{
        return response.json()
    }).then(data=>{
        commit(types.GET_INDEX, data.data)
    })
}