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
                }else {
                    resolve(state.login)
                }
            })
        }else {
            resolve(state.login)
        }
    })
}

export const getIndex = ({commit, state}, page, limit) => {
    Vue.http.get(`/api/article?page=${page ? page : 0}`)
    .then(response=>{
        return response.json()
    }).then(data=>{
        commit(types.GET_INDEX, data.data)
    })
}

export const getArticle = ({commit, state}, id) => {
    Vue.http.get(`/api/article/${id}`)
    .then(response=>{
        return response.json()
    }).then(data=>{
        console.log(data)
        commit(types.GET_ARTICLE, data.data)
    })
}

export const delArticle = ({commit, state}, id) => {
    return new Promise((resolve, reject)=>{
        Vue.http.delete(`/api/article/${id}`)
        .then(response=>{
            return response.json()
        }).then(data=>{
            if(data.status == "success"){
                resolve()
            }else {
                reject(data.msg)
            }
        })
    })
}

export const getType = ({commit, state}) => {
    Vue.http.get("/api/type")
    .then(response=>{
        return response.json()
    }).then(data=>{
        commit(types.GET_TYPE, data.data)
    })
}