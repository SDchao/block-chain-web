<template>
    <div id="Manage">
        <el-container>
            <el-header>
                <h1>区块链学历资质管理系统</h1>
            </el-header>

            <el-aside width="250px">
                <h5>管理事项</h5>
                <el-menu default-active="0-0" @select="handleSelect">
                    <el-submenu index="0">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>测试0</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="0-0">0-0</el-menu-item>
                            <el-menu-item index="0-1">0-1</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view> </router-view>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
.el-header {
    background-color: black;
    color: black;
    margin: 0;
}

h5 {
    text-align: center;
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
        return {};
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
};
</script>