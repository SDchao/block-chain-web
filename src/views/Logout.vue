<template>
    <el-card v-if="success">
        登出成功，即将跳转回登录界面
        <br>
        <div style="color: cornflowerblue; font-size: 13px; margin-top: 5px;">
            页面将在3秒后跳转
            <br>
            <a href="/login">手动跳转</a>
        </div>

    </el-card>
</template>

<script>
export default {
    name: "Logout",
    data() {
        return {
            success: false
        }
    },
    mounted() {
        this.$axios.get("/logout")
            .then(() => {
                this.success = true
                setTimeout(() => {
                    window.location.href = "/login"
                }, 3000)
            })
            .catch(() => {
                this.$message.error("无法登出，将在3秒后重试")
                setTimeout(() => {
                    window.location.href = "/logout"
                }, 3000)
            })

    }
}
</script>

<style scoped>
.el-card {
    position: fixed;
    margin: 10vh auto;
    left: 0;
    right: 0;
    width: 300px;
    text-align: center;
}
</style>