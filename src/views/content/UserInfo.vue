<template>
    <div id="user-info">
        <el-form
                ref="userInfo"
                :model="infoFormData"
                :rules="rules"
                label-width="5rem">
            <el-form-item label="姓名" prop="userName">
                <el-input class="middle-width" v-model="infoFormData.userName" placeholder="请输入姓名"
                          maxlength="10"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input class="middle-width" v-model="infoFormData.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-form-item label="性别">
                <el-select v-model="infoFormData.sex" placeholder="请选择">
                    <el-option label="男" :value="0"></el-option>
                    <el-option label="女" :value="1"></el-option>
                    <el-option label="未知" :value="2" disabled></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="学校">
                <el-input class="middle-width" v-model="infoFormData.school" placeholder="请输入学校"></el-input>
            </el-form-item>

            <el-form-item label="学号" prop="stuId">
                <el-input class="middle-width" v-model="infoFormData.stuId" placeholder="请输入学号"></el-input>
            </el-form-item>

            <el-form-item label="个人简介">
                <el-input v-model="infoFormData.description"
                          type="textarea" maxlength="100" show-word-limit
                          :autosize="{ minRows: 5, maxRows: 10}"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="trySubmitForm">更新资料</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "UserInfo",
    data() {
        return {
            infoFormData: {
                userName: "",
                email: "",
                sex: 2,
                school: "",
                stuId: "",
                description: ""
            },
            rules: {
                userName: [
                    {required: true, message: "用户名不能为空", trigger: "blur"}
                ],
                email: [
                    {type: "email", required: true, message: "不正确的邮箱格式", trigger: "blur"}
                ],
                stuId: {
                    validator: (rule, value, callback) => {
                        if (!value)
                            return callback();
                        else {
                            if (!/^\d+$/.test(value))
                                return callback(new Error("学号不为纯数字"));
                            else
                                return callback();
                        }
                    }
                }
            }
        }
    },
    methods: {
        trySubmitForm() {
            this.$refs.userInfo.validate((valid) => {
                if (valid)
                    this.$message("提交完毕")
                else
                    this.$message.error("信息存在错误")
            })
        }
    }
}
</script>

<style scoped>

.el-form {
    margin: 1rem;
    width: 50rem;
}

.input-section {
    margin: 2rem;
}

.middle-width {
    width: 15rem;
}
</style>