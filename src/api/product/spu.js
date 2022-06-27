import request from '@/utils/request'

// 获取spu数据列表
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}?category3Id=${category3Id}`, method: 'get' })

// 根据id获取SPU数据
export const reqSpuInfo = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// 获取SPU图片
export const reqSpuImage = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 获取销售属性
export const reqSaleAttr = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })

// 获取品牌信息
export const reqBaseTradeMark = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })

// 保存按钮--保存数据
export const reqAddOrUpdate = (spuInfo) => {
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
    } else {
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
    }
}

// 删除spu
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

// 根据id获取SPU销售属性
export const reqSpuSaleAttr = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })

// 保存sku信息
export const reqSaveSku = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })

// 根据id获取spu的sku信息
export const reqSkuInfo = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })