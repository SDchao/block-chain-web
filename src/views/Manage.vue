<template>
    <div id="manage">
        <el-container>
            <el-header height="60px">
                <h1>区块链学历资质管理系统</h1>
            </el-header>
            <el-container>
                <el-aside width="20rem">
                    <el-card>管理事项</el-card>
                    <el-menu default-active="/manage/test" router @select="handleSelect" :collapse="isCollapse">
                        <el-submenu index="0">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>测试0</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/manage/test">0-0</el-menu-item>
                                <el-menu-item index="/manage/test2">0-1</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>测试1</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-0" disabled>1-0</el-menu-item>
                                <el-menu-item index="1-1" disabled>1-1</el-menu-item>
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
    left: 20rem;
    top: 60px;
}

h1 {
    text-align: left;
    background: black;
    color: white;
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
};
</script>