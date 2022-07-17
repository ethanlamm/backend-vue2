**业务逻辑的简略记录**

下载模板：https://github.com/PanJiaChen/vue-admin-template/tree/4.4.0

一、登录（views/login/index.vue）

1.换背景图：给class="login-container"加background

2.实现登录业务

api/acl/user.js ==> 修改成真正的接口 ==> 查看其封装的 request (utils/request)

==> 请求拦截器token关键字根据实际修改 ==> 响应拦截器 res.code != (20000 && 200)

3.实现退出业务

二、搭建路由页面

1.先删除不需要的页面：views下不需要的，留下dashboard(首页)、login(登录)

2.再在router.js中删除上述已删除页面的路由

3.在views中新建需要的页面以及在router.js中注册(icon：可以用 el-icon-xx)

4.styles/index.css中有 .app-container{padding：20px}；在AppMain.vue中，将<router-view :key="key" /> 外层包裹 <div class="app-container"></div>

5.使用element-UI搭建

三、创建api以及挂载至Vue.prototype上

api/index.js ==> 其他分文件 ==> main.js：先引入API，挂载beforeCreate(){Vue.prototype.$api = API}

四、分页器的分装

详细：views/product/trademark.vue

五、表单验证

详细：views/product/trademark.vue

[组件 | Element](https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng)

六、表格数据的展示和收集

1.扩展运算符的第一层深拷贝功能

2.删除功能：

弹框信息 [组件 | Element](https://element.eleme.cn/#/zh-CN/component/message-box#que-ren-xiao-xi)；

删除后，判断当前页展示数据条数，展示当前页还是上一页(注意第一页的处理)

七、三级联动

1.3个id的变化：用watch实现

2.是否禁用el-select：用watch实现(flag)

八、数据的增加

1.span与input的显示与隐藏

点击span显示input，并且自动获取焦点($nextTick)

input框blur事件：

1）校验：是否为空、是否重复(先排除自身：views/product/attr/AttrList/index.vue	第226行)

2）隐藏input框，显示span

2.删除属性：气泡确认框	[组件 | Element](https://element.eleme.cn/#/zh-CN/component/popconfirm#ji-chu-yong-fa)

九、什么是SPU和SKU

**SPU = Standard Product Unit  （标准产品单位）**

 \* 概念 : SPU 是商品信息聚合的最小单位，是一组可复用、易检索的标准化信息的集合，该集合描述了一个产品的特性。

 \* 通俗点讲，属性值、特性相同的货品就可以称为一个 SPU。

 \* 例如： **iphone7 就是一个 SPU，与商家，与颜色、款式、套餐都无关。**

​                                                              

**SKU=stock keeping unit( 库存量单位)**

 \* SKU 即库存进出计量的单位， 可以是以件、盒、托盘等为单位。

 \* SKU 是物理上不可分割的最小存货单元。在使用时要根据不同业态，不同管理模式来处理。

 \* 在服装、鞋类商品中使用最多最普遍。

 \* 例如：**灰色 64g 的 iphone7 就是一个SKU** ; 纺织品中一个 SKU 通常表示：规格、颜色、款式。

十、spu的搭建

1.通过screen显示不同的区块

2.this.$refs.xxx：父组件调用、获取子组件的方法和数据(主线)

3.动态编辑标签：[组件 | Element](https://element.eleme.cn/#/zh-CN/component/tag#dong-tai-bian-ji-biao-qian)

4.照片墙：[组件 | Element](https://element.eleme.cn/#/zh-CN/component/upload#zhao-pian-qiang)

- 照片墙中展示的数据是 file-list，其为一个数组，数组中的元素为包含 name，url关键字的对象，name，url为固定关键字；可先通过对服务器返回的数据进行处理，在赋值给 file-list 进行展示(views/product/spu/SpuList/spuForm.vue	第219行)

- 同时，在整理数据发请求给服务器时，要的关键字为 imgName、imgUrl，需要转换(views/product/spu/SpuList/spuForm.vue	第308行)

5.未选择的销售属性

views/product/spu/SpuList/spuForm.vue	computed { unSelectAttr }

6.清空数据的方法：methods:{cancel}

7.添加销售属性的方法：methods:{handleAddAttr}

8.平台属性和销售属性的收集方法(skuForm.vue)：添加到自身上，点击保存时进行整理

十一、spku的搭建

1.el-switch：[组件 | Element](https://element.eleme.cn/#/zh-CN/component/switch#ji-ben-yong-fa)

上架与下架；显示标签：可用a链接包裹

2.显示sku信息：

抽屉 [组件 | Element](https://element.eleme.cn/#/zh-CN/component/drawer#bu-tian-jia-title)

抽屉内嵌套布局 [组件 | Element](https://element.eleme.cn/#/zh-CN/component/layout#ji-chu-bu-ju)

布局内嵌套轮播图 [组件 | Element](https://element.eleme.cn/#/zh-CN/component/carousel#ji-chu-yong-fa)

3.未完成：编辑和删除

<img src="C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20220715163926038.png" alt="image-20220715163926038" style="zoom: 50%;" />

十二、mock数据

1.准备数据源：mock/data.json

2.封装mock服务：mock/homeMock.js

3.引入到 mock/index.js中

4.mock/mock-server.js：修改process.env.VUE_APP_BASE_API；改为 VUE_APP_MOCK_API

5.在utils中，f复制一份request.js，重命名为mockRequest.js，并将 baseURL: process.env.VUE_APP_BASE_API 改为 VUE_APP_MOCK_API

6.在 .env.development 中，新增 VUE_APP_MOCK_API = '/mock-api'

7.配置文件修改，需要重新启动

十三、权限管理

