import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login.vue"
import Manage from "@/views/Manage.vue"

import TestPannel from "@/views/content/TestPannel.vue"
import TestPannelSecond from "../views/content/TestPannelSecond.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // name: 'Home',
        // component: Home
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/manage',
        name: 'Manage',
        component: Manage,
        children: [
            {
                path: 'test',
                name: 'TestPannel',
                component: TestPannel
            },
            {
                path: 'test2',
                name: 'TestPannelSecond',
                component: TestPannelSecond
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
