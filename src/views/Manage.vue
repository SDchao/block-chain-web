<template>
    <div id="manage">
        <el-container>
            <el-header height="60px">
                <h1>区块链学历资质管理系统</h1>
            </el-header>
            <el-container>
                <el-aside width="15rem">
                    <el-card>管理事项</el-card>
                    <el-menu default-active="/manage/userinfo" router @select="handleSelect" :collapse="isCollapse">
                        <el-submenu index="0">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>证书管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/manage/cert_query">证书查询</el-menu-item>
                                <el-menu-item index="/manage/cert_upload">证书上传</el-menu-item>
                                <el-menu-item index="/manage/cert_modify">证书修改</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/logout">登出</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.el-header {
    background-color: black;
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}

.el-aside {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
}

.el-main {
    position: absolute;
    left: 15rem;
    top: 60px;
    right: 0;
    bottom: 0;
}

h1 {
    text-align: left;
    line-height: 60px;
    background: black;
    color: white;
    margin: 0;
    height: 60px;
}
</style>

<style>
/*for route*/
.el-form {
    margin: 1rem;
    width: 50rem;
}

.input-section {
    margin: 2rem;
}
</style>

<script>
export default {
    name: "Manage",
    data() {
        return {
            isCollapse: false,
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    created() {
        this.$axios.get("/verifyuser")
            .then((res) => {
                if (res.data.msg === "EXPIRED") {
                    window.location.href = "/login"
                }
            })
            .catch((err) => {
                this.$message.error("无法访问数据 " + err.message)
            })
    }
};
</script>