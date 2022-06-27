import request from '@/utils/request'

// 获取trademark
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 新增品牌或修改品牌
export const reqAddOrUpdate = (trademark) => {
    if (trademark.id) {
        // 有id--修改
        return request({ url: `/admin/product/baseTrademark/update`, method: 'put', data: trademark })
    } else {
        // 无id--新增
        return request({ url: `/admin/product/baseTrademark/save`, method: 'post', data: trademark })
    }
}

// 删除品牌
export const reqDelete = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })