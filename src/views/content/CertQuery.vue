<template>
  <div id="cert-query">
    <el-form
        ref="queryForm"
        :model="queryFormData"
        :rules="queryFormRule">
      <el-form-item label="学生身份号" prop="stuId">
        <el-input
            v-model="queryFormData.stuId"
            placeholder="学生身份证号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="trySubmitForm">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        v-loading="tableLoading"
        element-loading-text="信息查询中"
        style="width: 50%">
      <el-table-column
          prop="certId"
          label="证书编号"></el-table-column>
      <el-table-column
          prop="schoolName"
          label="学校名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name: "CertQuery",
    data() {
        return {
            queryFormData: {
                stuId: ""
            },
            queryFormRule: {
                stuId: {required: true, message: "请输入学生身份号"}
            },
            tableData: [],
            tableLoading: false
        }
    },
    methods: {
        trySubmitForm() {
            this.$refs.queryForm.validate((valid) => {
                if (valid) {
                    this.tableLoading = true
                    this.$axios.post("/querycert", {
                        pri_key: "",
                        stu_id: this.queryFormData.stuId
                    })
                        .then((response) => {
                            this.tableLoading = false
                            if (response.data.success == 1) {
                                console.log(response.data.certs)
                                this.tableData = response.data.certs
                            } else {
                                this.$message.error("无法查询到该学生信息")
                            }
                        })
                        .catch((error) => {
                            this.tableLoading = false
                            this.$message.error("无法查询 " + error.message)
                        })
                }
            })
        }
    }
}
</script>

<style scoped>

</style>