<template>
    <div id="verify">

        <h1>证书验证</h1>
        <el-form v-if="!resultTableData"
                 ref="verifyForm"
                 :model="formData"
                 :rules="formRule">
            <el-form-item
              prop="stu_id"
              required>
                <el-input placeholder="学生身份证" v-model="formData.stu_id"></el-input>
            </el-form-item>

            <el-form-item
              prop="cert_id"
              required>
                <el-input placeholder="证书编号" v-model="formData.cert_id"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onVerifyClicked">查询</el-button>
                <el-button @click="onBackClicked">返回</el-button>
            </el-form-item>
        </el-form>

        <div id="verify-result" v-if="resultTableData">
            <div
              style="color: red">
                请核对以下信息
            </div>

            <el-table
              :data="resultTableData"
              style="width: 30vw"
              :cell-style="{'text-align': 'center'}"
              stripe>
                <el-table-column
                  prop="name"></el-table-column>
                <el-table-column
                  prop="value"></el-table-column>
            </el-table>

            <el-button type="primary" @click="resultTableData = undefined">返回</el-button>
        </div>
    </div>
</template>

<script>
import KeyNameTool from "@/assets/KeyNameTool";
import FormRuleGenerator from "@/assets/FormRuleGenerator";

const rawForm = {
    stu_id: "",
    cert_id: ""
}

export default {
    name: "Verify",
    data() {
        return {
            resultTableData: undefined,
            formData: rawForm,
            formRule: FormRuleGenerator.getRequiredRule(Object.keys(rawForm))
        }
    },
    methods: {
        onBackClicked() {
            window.location.href = "/"
        },
        onVerifyClicked() {
            this.$refs.verifyForm.validate((valid) => {
                if (valid) {
                    const loading = this.$loading({
                        lock: true,
                        text: "正在查询信息"
                    })
                    this.$axios.post('/query', this.formData)
                        .then((res) => {
                            loading.close()
                            if (res.data.msg === "SUCCESS") {
                                let cert = res.data.certs[0]
                                cert["stu_name"] = res.data.stu_name
                                this.resultTableData = KeyNameTool.certDataToTable(cert)
                            }
                        })
                        .catch((err) => {
                            loading.close()
                            this.$message.error("无法验证 " + err.message)
                        })
                }
            })
        }
    }
}
</script>

<style scoped>
#verify {
    text-align: center;
}

h1 {
    text-align: center;
    line-height: 5rem;
    background: black;
    color: white;
    margin: 0 0 3rem 0;
    height: 5rem;
}

.el-form {
    max-width: 300px;
    margin: 5px auto;
}

.el-table {
    text-align: center;
    margin: 5px auto;
}
</style>