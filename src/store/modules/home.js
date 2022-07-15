import mockRequest from '@/utils/mockRequest';

const actions = {
    // 获取mock数据
    async getMockData({ commit }) {
        // 发请求
        let result = await mockRequest.get('/home/list')
        if (result.code == 20000) {
            commit('GETDATA', result.data)
        }
    }
}
const mutations = {
    GETDATA(state, data) {
        state.data = data
    }
}
const state = {
    data: {}
}
const getters = {
    // 销售额
    orderFullYear({ data }) {
        return data.orderFullYear || []
    },
    // 访问量
    userFullYear({ data }) {
        return data.userFullYear || []
    },
    // 销售额类占比
    saleRank({ data }) {
        return data.saleRank || {}
    }
}

export default {
    namespaced: true,
    actions, mutations, state, getters
}