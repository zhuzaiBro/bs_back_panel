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

export function deleteArticle(id) {
    return request({
        method: 'delete',
        url: `/api/article/${id}/`
    })
}