// attr
import request from '@/utils/request'

// 获取一级分类数据
export const reqCategory1 = () => request({ url: '/admin/product/getCategory1', method: 'get' })

// 获取二级分类数据
export const reqCategory2 = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })

// 获取三级分类数据
export const reqCategory3 = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })

// 获取分类展示数据
export const reqAttrInfo = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })


// 添加属性和属性值
export const reqSaveAttr = (data) => request({ url: `/admin/product/saveAttrInfo`, method: 'post', data })
