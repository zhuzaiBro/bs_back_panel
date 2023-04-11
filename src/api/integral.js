import request from '@/utils/request'

// 上传商品
export function uploadIntegralGood(data) {
    return request({
        url: '/api/integral/',
        method: 'post',
        data
    })
}


// 拉取商品列表
export function getIntegralGoodList(queryString) {
    return request({
        url: '/api/integral/goods?' + queryString,
        headers: {
            isToken: false
        },
        method: 'get'
    })
}


// 删除商品
export function deleteIntegralGood(id) {
    return request({
        url: `/api/integral/${id}/`,
        method: 'delete'
    })
}


// 修改商品信息
export function updateGoodInfo(data) {
    return request({
        url: '/api/integral/',
        method: 'put',
        data
    })
}