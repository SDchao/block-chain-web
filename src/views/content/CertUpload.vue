<template>
    <div id="cert-upload">
        <el-form
                ref="certUpload"
                :model="certFormData">
            <el-form-item label="证书名称" prop="certName">
                <el-input v-model="certFormData.certName"></el-input>
            </el-form-item>

            <el-form-item label="签发单位" prop="certInstitute">
                <el-input v-model="certFormData.certInstitute"></el-input>
            </el-form-item>

            <el-form-item label="学生姓名" prop="stuName">
                <el-input v-model="certFormData.stuName"></el-input>
            </el-form-item>

            <el-form-item label="所在学校/机构" prop="stuInstitute">
                <el-input v-model="certFormData.stuInstitute"></el-input>
            </el-form-item>

            <el-form-item label="学生专业" prop="stuMajor">
                <el-input v-model="certFormData.stuMajor"></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="note">
                <el-input v-model="certFormData.note"
                          type="textarea" maxlength="100" show-word-limit
                          :autosize="{ minRows: 5, maxRows: 10}"></el-input>
            </el-form-item>

            <el-form-item label="签发人" prop="operator">
                <el-input v-model="certFormData.operator"></el-input>
            </el-form-item>

            <el-form-item label="签发日期" prop="date">
                <el-date-picker v-model="certFormData.date"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="trySubmitForm">上传证书</el-button>
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
                certName: "",
                certInstitute: "",
                stuName: "",
                stuInstitute: "",
                stuMajor: "",
                note: "",
                date: new Date(),
                operator: ""
            }
        }
    },
    methods: {
        trySubmitForm() {

        }
    }
}
</script>

<style scoped>
</style>