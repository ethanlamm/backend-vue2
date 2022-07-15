// 引入数据源
const data = require('./data.json')
// 导出mock数据服务器
module.exports = [
    {
        // 配置请求地址
        url: '/home/list',
        // 配置请求方式
        type: 'get',
        // 数据返回
        response: () => {
            // 将所有数据返回
            return {
                code: 20000,
                data
            }
        }
    }
]
