<template>
    <div id="cert-modify">
        <el-form
          ref="queryForm"
          :model="queryFormData"
          :rules="queryFormRule">
            <el-form-item
              label="证书编号"
              prop="cert_id"
              required>
                <el-input placeholder="需要修改的证书编号" v-model="queryFormData.cert_id"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="queryCert">确认</el-button>
            </el-form-item>
        </el-form>
        <div id="modify">

            <el-form
              ref="certUpload"
              v-if="nowCertData"
              :model="modifyFormData"
              :rules="certFormRule">

                <el-form-item label="证书编号" prop="cert_id" required>
                    <el-input v-model="modifyFormData.cert_id"></el-input>
                </el-form-item>

                <el-form-item label="学生姓名" prop="stu_name" required>
                    <el-input v-model="modifyFormData.stu_name"></el-input>
                </el-form-item>

                <el-form-item label="所在学校" prop="school_name" required>
                    <el-input v-model="modifyFormData.school_name"></el-input>
                </el-form-item>

                <el-form-item label="学位" prop="degree" required>
                    <el-input v-model="modifyFormData.degree"></el-input>
                </el-form-item>

                <el-form-item label="学制" prop="edu_system" required>
                    <el-input v-model="modifyFormData.edu_system"></el-input>
                </el-form-item>

                <el-form-item label="学生专业" prop="stu_major" required>
                    <el-input v-model="modifyFormData.stu_major"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button ref="submitButton" type="primary" @click="trySubmitForm">修改证书</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>

import FormRuleGenerator from "@/assets/FormRuleGenerator";

const rawQueryForm = {
    cert_id: ""
}

const rawModifyForm = {
    cert_id: "",
    stu_name: "",
    school_name: "",
    degree: "",
    edu_system: "",
    stu_major: ""
}

export default {
    name: "CertModify",
    data() {
        return {
            nowCertData: undefined,
            queryFormData: rawQueryForm,
            queryFormRule: FormRuleGenerator.getRequiredRule(Object.keys(rawQueryForm)),
            modifyFormData: rawModifyForm,
            certFormRule: FormRuleGenerator.getRequiredRule(Object.keys(rawModifyForm))
        }
    },
    methods: {
        queryCert() {
            this.$refs.queryForm.validate((valid) => {
                if (valid) {
                    const loading = this.$loading({
                        lock: true,
                        text: "正在查询"
                    })
                    this.$axios.post("/querycert", this.queryFormData)
                        .then((response) => {
                            loading.close()
                            if (response.data.msg === "SUCCESS") {
                                this.modifyFormData = response.data.certs[0]
                                this.modifyFormData.stu_name = response.data.stu_name
                            } else {
                                this.$message.error("无法查询到证书信息 " + response.data.msg)
                            }
                        })
                        .catch((error) => {
                            loading.close()
                            this.$message.error("无法查询 " + error.message)
                        })
                }
            })
        }
    },
    trySubmitForm() {
        this.$refs.certUpload.validate((valid) => {
            if (valid) {
                const loading = this.$loading({
                    lock: true,
                    text: "正在更新",
                })
                let submitCertInfo = Object.assign({}, this.certFormData)
                delete submitCertInfo.stu_name
                this.$axios.post("/modifycert", {
                    stu_name: this.certFormData.stu_name,
                    certs: [
                        submitCertInfo
                    ]
                })
                    .then((response) => {
                        loading.close()
                        if (response.data.msg === "SUCCESS") {
                            this.$message("更新成功")
                            this.queryFormData = rawQueryForm
                            this.modifyFormData = rawModifyForm
                        } else {
                            this.$message.error(response.data.msg)
                        }
                    })
                    .catch((error) => {
                        console.log(error.message)
                        this.$message.error("无法上传 " + error.message)
                        loading.close()
                    })
            }
        })
    }
}
</script>

<style scoped>
</style>