import request from '../utils/request'


export function getArticles() {
    return request({
        method: 'get',
        headers: {
            isToken: false
        },
        url: '/api/article/'
    })
}

export function deleteArticle(ids) {
    return request({
        headers: {
            isToken: false
        },
        method: 'delete',
        url: `/api/article/`,
        data: ids
    })
}