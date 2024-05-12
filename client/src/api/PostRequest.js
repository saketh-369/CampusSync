import axios from "axios"

const API = axios.create({baseURL: "http://localhost:5000"})

export const getTimelinePosts = (id)=> API.get(`/post/${id}/timeline`)
export const likePost=(id, userId)=>API.put(`/post/${id}/like`, {userId: userId})
export const getPost = async ()=>{
    try {
        const response = await API.get('/post/fetch/all')
        if(response.status === 200){
            return Promise.resolve(response.data)
        }
        else{
            return Promise.reject(response.data)
        }
    } catch (error) {
        return Promise.reject(error.response)
    }

}

export const getPostSync = async (id)=>{
    try {
        const response = await API.get(`/post/${id}`)
        if(response.status === 200){
            return Promise.resolve(response.data)
        }
        else{
            return Promise.reject(response.data)
        }
    } catch (error) {
        return Promise.reject(error.response)
    }

}