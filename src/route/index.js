import { createRouter, createWebHistory } from "vue-router";
import FatherItem from "../components/FatherItem.vue";
import CalculateItem from "../components/CalculateItem.vue";
import Root from "../components/Root.vue";
import Proxy from "../components/Proxy.vue";
import VisualScroll from "../components/VisualScroll.vue";
const routes = [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'Root', component: Root},
    {path: '/Father', name: 'Father', component: FatherItem},
    {path: '/calculate', name: 'Calculator', component: CalculateItem},
    {path: '/proxy', name:'Proxy', component:Proxy},
    {path: '/api/list', name:'VisualScrollTest', component:VisualScroll}
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router