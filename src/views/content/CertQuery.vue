<template>
    <div
      id="cert-query">
        <el-form
          ref="queryForm"
          :model="queryFormData"
          :rules="queryFormRule"
          style="z-index: 0"
        >
            <el-form-item label="学生身份号" prop="stu_id">
                <el-input
                  v-model="queryFormData.stu_id"
                  placeholder="学生身份证号"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="trySubmitForm">查询</el-button>
            </el-form-item>
        </el-form>

        <el-divider></el-divider>

        <el-table
          :data="tableData"
          v-loading="tableLoading"
          element-loading-text="信息查询中"
          :cell-style="{'text-align': 'center'}"
          style="width: 50%">
            <el-table-column
              prop="cert_id"
              label="证书编号"></el-table-column>
            <el-table-column
              prop="school_name"
              label="学校名称"></el-table-column>
            <el-table-column
              label="操作">
                <template slot-scope="scope">
                    <el-button @click="onRowInspectClicked(scope.row)" size="small" type="primary">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div
          v-if="inspectingData"
          class="background"></div>

        <el-card
          v-if="inspectingData"
          class="inspect-card">
            <div v-if="inspectingData"
                 class="inspect-card">
                <el-scrollbar style="height: 100%;">
                    <el-table
                      :data="inspectingData"
                      stripe>
                        <el-table-column
                          prop="name"></el-table-column>
                        <el-table-column
                          prop="value"></el-table-column>
                    </el-table>
                    <el-button @click="onInspectCloseClicked" class="inspect-button" type="primary">关闭</el-button>
                </el-scrollbar>
            </div>
        </el-card>

    </div>
</template>

<script>
import KeyNameTool from "@/assets/KeyNameTool";

export default {
    name: "CertQuery",
    data() {
        return {
            queryFormData: {
                stu_id: ""
            },
            queryFormRule: {
                stu_id: {required: true, message: "请输入学生身份号"}
            },
            tableData: [],
            tableLoading: false,
            inspectingData: undefined,
        }
    },
    methods: {
        trySubmitForm() {
            this.$refs.queryForm.validate((valid) => {
                if (valid) {
                    this.tableLoading = true
                    this.$axios.post("/querycert", this.queryFormData)
                        .then((response) => {
                            this.tableLoading = false
                            if (response.data.msg === "SUCCESS") {
                                this.tableData = response.data.certs
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                        .catch((error) => {
                            this.tableLoading = false
                            this.$message.error("无法查询 " + error.message)
                        })
                }
            })
        },
        onRowInspectClicked(row) {
            this.inspectingData = KeyNameTool.certDataToTable(row)
        },
        onInspectCloseClicked() {
            this.inspectingData = undefined
        }
    },
    created() {
        document.title = "证书查询"
        this.$axios.get("/verifyuser")
            .then((response) => {
                if (response.data.msg === "SUCCESS") {
                    this.queryFormData.stu_id = response.data.id
                }
            })
    }
}
</script>

<style scoped>
.inspect-card {
    z-index: 2;
    position: fixed;
    margin: auto;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 50rem;
    height: 23rem;
}

.inspect-button {
    float: right;
    margin: 1rem;
}

.background {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1;
}
</style>