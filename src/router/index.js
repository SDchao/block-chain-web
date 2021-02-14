import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login.vue"
import Manage from "@/views/Manage.vue"
import Register from "@/views/Register";

import TestPanel from "@/views/content/TestPanel.vue"
import TestPanelSecond from "../views/content/TestPanelSecond.vue"
import UserInfo from "@/views/content/UserInfo";
import CertUpload from "@/views/content/CertUpload";

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
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/manage',
        name: 'Manage',
        component: Manage,
        children: [
            {
                path: 'test',
                name: 'TestPanel',
                component: TestPanel
            },
            {
                path: 'test2',
                name: 'TestPanelSecond',
                component: TestPanelSecond
            },
            {
                path: 'userinfo',
                name: 'UserInfo',
                component: UserInfo
            },
            {
                path: 'certupload',
                name: 'CertUpload',
                component: CertUpload
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
