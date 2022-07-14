// 记得要在main.js引用！！！！！
import Vue from "vue";
import router from "@/router";
Vue.directive('permission', {
    inserted(el, binding) {
        // console.log(el);
        // console.log(binding);
        let routeName = router.currentRoute.name    // 当前所处的路由组件的名字
        let buttons = JSON.parse(sessionStorage.getItem('buttons'))     // 用户btn所有权限
        buttons = buttons.filter(item => item && item.includes(routeName))
        // console.log(buttons);
        let action = `btn.${routeName}.${binding.value.action}`    // 待确认的权限
        let effect = binding.value.effect
        if (!buttons.includes(action)) {
            // 没有权限
            if (effect == 'disabled') {
                el.disabled = true
                el.classList.add('is-disabled')
            } else {
                el.parentNode.removeChild(el)
            }
        }

    }
})