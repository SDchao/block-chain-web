<template>
    <div id="cert-history">
        <el-form
          ref="queryForm"
          :model="queryFormData"
          :rules="queryFormRule">
            <el-form-item label="证书编号" prop="cert_id">
                <el-input
                  v-model="queryFormData.cert_id"
                  placeholder="证书编号"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="trySubmitForm">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          v-loading="tableLoading"
          element-loading-text="历史查询中"
          stripe
          style="width: 50%">
            <el-table-column
              prop="tx_id"
              label="交易编号"></el-table-column>
            <el-table-column
              prop="time"
              label="时间"></el-table-column>
            <el-table-column
              prop="value"
              label="哈希值"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import FormRuleGenerator from "@/assets/FormRuleGenerator";

export default {
    name: "CertHistory",
    data() {
        return {
            queryFormData: {
                "cert_id": ""
            },
            queryFormRule: FormRuleGenerator.getRequiredRule(["cert_id"]),
            tableData: [],
            tableLoading: false
        }
    },
    methods: {
        trySubmitForm() {
            this.$refs["queryForm"].validate((valid) => {
                if (valid) {
                    this.tableLoading = true
                    this.$axios.post("/history", this.queryFormData)
                        .then((res) => {
                            if (res.data.msg === "SUCCESS") {
                                this.tableLoading = false
                                this.tableData = res.data.history
                                for (let data of this.tableData) {
                                    data["time"] = this.timestampToStr(data["timestamp"] * 1000)
                                }
                            } else {
                                this.tableLoading = false
                                this.$message.error("无法查询历史记录" + res.data.msg)
                            }
                        })
                        .catch((err) => {
                            this.tableLoading = false
                            this.$message.error("无法查询历史记录" + err.message)
                        })
                }
            })
        },
        timestampToStr(timestamp) {
            let date = new Date(timestamp)
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y + M + D + h + m + s;
        }
    }
}
</script>

<style scoped>

</style>