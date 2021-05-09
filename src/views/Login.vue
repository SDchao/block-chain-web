<template>
    <div id="login">
        <el-container direction="vertical">
            <h1>系统登录</h1>
            <el-form
              ref="loginForm"
              style="text-align: center; margin: 0 auto; max-width: 400px;"
              :model="loginFormData"
              :rules="loginFormRule">
                <el-form-item
                  prop="stu_id"
                  label="身份证号">
                    <el-input v-model="loginFormData.stu_id"></el-input>
                </el-form-item>

                <el-form-item
                  prop="pri_key_sum"
                  label="私钥文件">
                    <el-tooltip placement="right" content="仅上传校验码，不会泄露密钥信息">
                        <el-button v-if="!loginFormData.pri_key_sum" icon="el-icon-upload" @click="onPrettyUploadClick"
                                   size="small">点击上传
                        </el-button>
                        <el-button v-if="loginFormData.pri_key_sum" icon="el-icon-check" @click="onPrettyUploadClick"
                                   size="small">点击上传
                        </el-button>
                    </el-tooltip>
                </el-form-item>

            </el-form>

            <input id="file-input" type="file" style="display: none;" @change="onUploadFile">

            <div class="button_group">
                <el-button
                  type="primary"
                  icon="el-icon-user-solid"
                  @click="onLoginClicked">
                    登录
                </el-button>
                <el-button icon="el-icon-s-check" @click="onRegisterClicked">免登录验证证书</el-button>
            </div>
        </el-container>
    </div>
</template>

<script>

import FormRuleGenerator from "@/assets/FormRuleGenerator";
import Sha256 from "crypto-js/sha256"

const rawLoginForm = {
    stu_id: "",
    pri_key_sum: ""
}

export default {
    name: "Login",
    data() {
        return {
            loginFormData: rawLoginForm,
            loginFormRule: FormRuleGenerator.getRequiredRule(Object.keys(rawLoginForm))
        };
    },
    methods: {
        onPrettyUploadClick() {
            document.getElementById("file-input").click()
        },
        onUploadFile(event) {
            let reader = new FileReader()
            reader.onload = (e) => {
                let data = e.target.result
                // if (data.search(/^-----BEGIN RSA PRIVATE KEY/) === -1) {
                //     this.$message.error("所选文件不为私钥文件")
                //     this.loginFormData.pri_key_sum = ""
                //     return
                // }
                this.loginFormData.pri_key_sum = Sha256(data).toString()

            }
            reader.readAsText(event.target.files[0])
        },
        onLoginClicked() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$axios.post('/login', rawLoginForm)
                        .then((res) => {
                            console.log(res)
                            if (res.data.msg === "SUCCESS") {
                                window.location.href = "/manage/cert_query"
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                        .catch((err) => {
                            this.$message.error(err.message)
                        })
                }
            })
        },
        onRegisterClicked() {
            window.location.href = "/verify"
        }
    },
    created() {
        document.title = "用户登录"
        this.$axios.get('/verifyuser')
            .then((res) => {
                if (res.data.msg === "SUCCESS") {
                    window.location.href = '/manage'
                }
            })
    }
};
</script>

<style scoped>

h1 {
    text-align: center;
    line-height: 5rem;
    background: black;
    color: white;
    margin: 0 0 3rem 0;
    height: 5rem;
}

#login {
    text-align: center;
    margin: 0;
}

.el-button {
    margin: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>