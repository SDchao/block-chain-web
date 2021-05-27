<template>
    <div id="home">
        <div class="title">
            <h1>区块链学历认证系统</h1>
            <h3>安全 可靠 保密 溯源</h3>
        </div>
        <button class="btn" @click="onClick">立即体验</button>


        <el-carousel height="100vh" indicator-position="none" arrow="never">
            <el-carousel-item>
                <img src="@/assets/bg1.png" alt="" height="1080">
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/bg2.png" alt="" height="1080">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>

export default {
    name: 'Home',
    data() {
        return {}
    },
    methods: {
        onClick() {
            window.location.href = '/login'
        }
    }
}
</script>

<style scoped>
#home {
    text-align: center;
    background: black;
    color: white;
}

.btn {
    z-index: 10;
    bottom: 17vh;
    left: 50%;
    transform: translateX(-50%);
    position: fixed;
    color: white;
    background: rgba(0, 0, 0, 0);
    font-size: 30px;
    border-color: white;
    border-style: solid;
    border-radius: 10px;
    cursor: pointer;
    outline: black;
}

.title {
    position: fixed;
    z-index: 10;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
}

h1 {
    font-size: 5rem;
    margin: 0;
}

h3 {
    margin: 10px 0 0 0;
}
</style>