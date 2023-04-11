import request from '@/utils/request'

export function getExam(query) {
    return request({
        url: '/api/question/' + query,
        method: 'get'
    })
}