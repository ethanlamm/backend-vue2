import request from '@/utils/request'

// 获取sku列表数据
export const reqSku = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

// 要上架的sku
export const reqOnSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })

// 要下架的sku
export const reqCancelSale = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

// 根据id获取sku信息
export const reqSkuInfo = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })