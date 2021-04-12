import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login.vue"
import Manage from "@/views/Manage.vue"

import CertUpload from "@/views/content/CertUpload";
import CertQuery from "@/views/content/CertQuery";
import Verify from "@/views/Verify";
import CertModify from "@/views/content/CertModify";
import Logout from "@/views/Logout";

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
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: Register
    // },
    {
        path: '/verify',
        name: "Verify",
        component: Verify
    },
    {
        path: '/manage',
        name: 'Manage',
        component: Manage,
        children: [
            {
                path: 'cert_upload',
                name: 'CertUpload',
                component: CertUpload
            },
            {
                path: "cert_query",
                name: "CertQuery",
                component: CertQuery
            },
            {
                path: "cert_modify",
                name: "CertModify",
                component: CertModify
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
