import request from '@/utils/request'

export function getExam(query) {
    return request({
        url: '/api/question/' + query,
        method: 'get'
    })
}

export function deleteQuestion(ids) {
    return request({
        url: '/api/question/',
        method: 'delete',
        data: ids
    })
}

export function addQuestion(data) {
    return request({
        url: '/api/question/',
        method: 'post',
        data
    })
}

export function updateQuestion(data) {
    return request({
        url: '/api/question/',
        method: 'put',
        data
    })
}