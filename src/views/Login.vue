<template>
    <div id="login">
        <el-container direction="vertical">
            <h1>系统登录</h1>
            <el-input
                    class="input"
                    v-model="username_input"
                    placeholder="用户名"
            ></el-input>
            <el-input
                    class="input"
                    v-model="passwd_input"
                    placeholder="密码"
                    show-password
            ></el-input>
            <el-checkbox v-model="remember_checkbox" label="记住密码"></el-checkbox>
            <div class="button_group">
                <el-button
                        type="primary"
                        icon="el-icon-user-solid"
                        @click="onLoginClicked">
                    登录
                </el-button>
                <el-button icon="el-icon-s-check">注册</el-button>
            </div>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            username_input: "",
            passwd_input: "",
            remember_checkbox: false,
        };
    },
    methods: {
        onLoginClicked() {
            console.log("Submit " + this.username_input + " " + this.passwd_input);
            window.location.replace("/manage");
        },
    },
};
</script>

<style scoped>
#login {
    text-align: center;
    margin: 8px 0;
}

.input {
    max-width: 300px;
    margin: 5px auto;
}

.el-checkbox {
    margin: 5px;
}

.el-button {
    margin: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>