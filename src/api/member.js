import request from '@/utils/request'

export function getMemberList(query) {
    return request({
        method: 'get',
        url: '/api/user/' + query
    })
}