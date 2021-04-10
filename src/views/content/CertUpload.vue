<template>
  <div id="cert-upload">
    <el-form
        ref="certUpload"
        :model="certFormData"
        :rules="certFormRule">

      <el-form-item label="学生姓名" prop="stuName" required>
        <el-input v-model="certFormData.stuName"></el-input>
      </el-form-item>

      <el-form-item label="所在学校" prop="stuInstitute" required>
        <el-input v-model="certFormData.stuInstitute"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="note">
        <el-input v-model="certFormData.note"
                  type="textarea" maxlength="100" show-word-limit
                  :autosize="{ minRows: 5, maxRows: 10}"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button ref="submitButton" type="primary" @click="trySubmitForm">上传证书</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
    name: "CertUpload",
    data() {
        return {
            certFormData: {
                stuName: "",
                stuInstitute: "",
                note: ""
            },
            certFormRule: {
                stuName: {required: true, message: "请输入学生姓名"},
                stuInstitute: {required: true, message: "请输入学生所在学校"}
            }
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
                    this.$axios.post("/issuecert", {
                        pri_key: "",
                        stu_name: this.certFormData.stuName,
                        school_name: this.certFormData.stuInstitute
                    })
                        .then((response) => {
                            console.log(response)
                            loading.close()
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
}
</script>

<style scoped>
</style>