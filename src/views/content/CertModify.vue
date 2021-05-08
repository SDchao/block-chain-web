<template>
    <div id="cert-modify">
        <el-form
          v-if="!hasQueried"
          ref="queryForm"
          :model="queryFormData"
          :rules="queryFormRule">
            <el-form-item
              label="证书编号"
              prop="cert_id"
              required>
                <el-input placeholder="需要修改的证书编号" v-model="queryFormData.cert_id"></el-input>
            </el-form-item>

            <el-form-item label="学生身份证" prop="stu_id" required>
                <el-input placeholder="证书对应学生身份证" v-model="queryFormData.stu_id"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="queryCert">确认</el-button>
            </el-form-item>
        </el-form>


        <div id="modify" v-if="hasQueried">

            <el-form
              ref="certUpload"
              :model="modifyFormData"
              :rules="modifyFormRule">

                <el-form-item label="证书编号" prop="cert_id" required>
                    <el-input v-model="modifyFormData.cert_id"></el-input>
                </el-form-item>

                <el-form-item label="学生身份证" prop="stu_id" required>
                    <el-input v-model="modifyFormData.stu_id"></el-input>
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
    stu_id: "",
    cert_id: ""
}

const rawModifyForm = {
    cert_id: "",
    stu_id: "",
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
            hasQueried: false,
            queryFormData: Object.assign({}, rawQueryForm),
            queryFormRule: FormRuleGenerator.getRequiredRule(Object.keys(rawQueryForm)),
            modifyFormData: Object.assign({}, rawModifyForm),
            modifyFormRule: FormRuleGenerator.getRequiredRule(Object.keys(rawModifyForm))
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
                                Object.assign(this.modifyFormData, response.data)
                                this.hasQueried = true
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
        },
        trySubmitForm() {
            this.$refs.certUpload.validate((valid) => {
                if (valid) {
                    const loading = this.$loading({
                        lock: true,
                        text: "正在更新",
                    })
                    this.$axios.post("/modifycert", this.modifyFormData)
                        .then((response) => {
                            loading.close()
                            if (response.data.msg === "SUCCESS") {
                                this.$message("更新成功")
                                this.queryFormData = Object.assign({}, rawQueryForm)
                                this.modifyFormData = Object.assign({}, rawModifyForm)
                                this.hasQueried = false
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
    },
    created() {
        document.title = "证书修改"
    }
}
</script>

<style scoped>
</style>