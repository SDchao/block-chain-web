<template>
    <div id="cert-upload">
        <el-form
          ref="certUpload"
          :model="certFormData"
          :rules="certFormRule">

            <el-form-item label="证书编号" prop="cert_id" required>
                <el-input v-model="certFormData.cert_id"></el-input>
            </el-form-item>

            <el-form-item label="学生身份证" prop="stu_id" required>
                <el-input v-model="certFormData.stu_id"></el-input>
            </el-form-item>

            <el-form-item label="学生姓名" prop="stu_name" required>
                <el-input v-model="certFormData.stu_name"></el-input>
            </el-form-item>

            <el-form-item label="所在学校" prop="school_name" required>
                <el-input v-model="certFormData.school_name"></el-input>
            </el-form-item>

            <el-form-item label="学位" prop="degree" required>
                <el-input v-model="certFormData.degree"></el-input>
            </el-form-item>

            <el-form-item label="学制" prop="edu_system" required>
                <el-input v-model="certFormData.edu_system"></el-input>
            </el-form-item>

            <el-form-item label="学生专业" prop="stu_major" required>
                <el-input v-model="certFormData.stu_major"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button ref="submitButton" type="primary" @click="trySubmitForm">上传证书</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
import FormRuleGenerator from "@/assets/FormRuleGenerator";

const rawForm = {
    cert_id: "",
    stu_id: "",
    stu_name: "",
    school_name: "",
    degree: "",
    edu_system: "",
    stu_major: ""
}

export default {
    name: "CertUpload",
    data() {
        return {
            certFormData: Object.assign({}, rawForm),
            certFormRule: FormRuleGenerator.getRequiredRule(Object.keys(rawForm))
        }
    },
    methods: {
        trySubmitForm() {
            this.$refs.certUpload.validate((valid) => {
                if (valid) {
                    const loading = this.$loading({
                        lock: true,
                        text: "正在上传",
                    })

                    this.$axios.post("/issuecert", this.certFormData)
                        .then((response) => {
                            console.log(response)
                            loading.close()
                            if (response.data.msg === "SUCCESS") {
                                this.$message("上传成功")
                                this.certFormData = Object.assign({}, rawForm)
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
        document.title = "证书上传"
    }
}
</script>

<style scoped>
</style>