<template>
    <div id="Register">
        <h1>欢迎加入区块链学历认证系统</h1>
        <el-steps :active="step" align-center>
            <el-step title="选择您的身份"></el-step>
            <el-step title="填写信息"></el-step>
            <el-step title="确认信息"></el-step>
        </el-steps>

        <el-card class="content" v-if="step === 1">
            <el-row type="flex" justify="center">
                <el-form>
                    <el-form-item label="机构类型">
                        <el-select v-model="form.instituteType" placeholder="请选择机构类型">
                            <el-option
                                    v-for="item in instituteTypeOptions"
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="step++" type="primary" :disabled="form.instituteType === ''">下一步</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-card>

        <el-card class="content" v-if="step === 2">
            <!--SCHOOL FORM-->
            <el-form ref="schoolForm" :model="form" :rules="rules" v-if="form.instituteType === 0">
                <el-form-item label="学校名称" prop="schoolName">
                    <el-input v-model="form.schoolName"></el-input>
                </el-form-item>
                <el-form-item label="学校地址" prop="schoolAddr">
                    <el-input v-model="form.schoolAddr"></el-input>
                </el-form-item>
                <el-form-item label="申请人" prop="applicant">
                    <el-input v-model="form.applicant"></el-input>
                </el-form-item>
                <el-form-item label="申请人职位" prop="applicantPosition">
                    <el-input v-model="form.applicantPosition"></el-input>
                </el-form-item>

                <el-form-item label="证明材料" prop="verify">
                    TODO
                </el-form-item>

                <el-form-item>
                    <el-button @click="step--">上一步</el-button>
                    <el-button
                            type="primary"
                            @click="submitSchool"
                            ref="schoolNextButton">
                        下一步
                    </el-button>
                </el-form-item>
            </el-form>

            <!-- BUSINESS-->
            <el-form ref="bizForm" :model="form" :rules="rules" v-if="form.instituteType === 1">
                <el-form-item label="企业名称" prop="bizName">
                    <el-input v-model="form.bizName"></el-input>
                </el-form-item>
                <el-form-item label="企业地址" prop="bizAddr">
                    <el-input v-model="form.bizAddr"></el-input>
                </el-form-item>
                <el-form-item label="申请人" prop="applicant">
                    <el-input v-model="form.applicant"></el-input>
                </el-form-item>
                <el-form-item label="申请人职位" prop="bizPosition">
                    <el-input v-model="form.applicantPosition"></el-input>
                </el-form-item>
                <el-form-item label="证明材料" prop="verify">
                    TODO
                </el-form-item>
                <el-form-item>
                    <el-button @click="step--">上一步</el-button>
                    <el-button
                            type="primary"
                            @click="submitBiz"
                            ref="schoolNextButton">
                        下一步
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="content" v-if="step === 3">
            <h5>请确认您的信息</h5>
            <el-table :data="finalVerifyTableData" stripe>
                <el-table-column
                        prop="name"
                        label="项目名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="value"
                        label="提交内容"
                        align="center">
                </el-table-column>
            </el-table>
            <el-button class="final-button" @click="step--">上一步</el-button>
            <el-button class="final-button" type="primary" @click="finalSubmit">提交</el-button>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            step: 1,
            form: {
                instituteType: "",
                // SCHOOL
                schoolName: "",
                schoolAddr: "",
                applicantPosition: "",

                // BUSINESS
                bizName: "",
                bizAddr: "",
                bizType: "",

                // GENERAL
                applicant: "",
                verifyImg: ""
            },
            instituteTypeOptions: [
                {label: "学校", value: 0}, {label: "企业", value: 1}, {label: "学生", value: 2}
            ],
            rules: {
                // SCHOOL
                schoolName: {required: true, message: "请输入学校名称", trigger: "blur"},
                schoolAddr: {required: true, message: "请输入学校地址", trigger: "blur"},
                // BUSINESS
                bizName: {required: true, message: "请输入企业名称", trigger: "blur"},
                bizAddr: {required: true, message: "请输入企业地址", trigger: "blur"},

                // GENERAL
                applicant: {required: true, message: "请输入申请人", trigger: "blur"}
            },
            finalVerifyTableData: []
        }
    },
    methods: {
        submitSchool() {
            this.$refs["schoolForm"].validate((valid) => {
                if (valid) {
                    this.finalVerifyTableData = [
                        {name: "机构类型", value: "学校"},
                        {name: "学校名称", value: this.form.schoolName},
                        {name: "学校地址", value: this.form.schoolAddr},
                        {name: "申请人", value: this.form.applicant}
                    ]
                    if (this.form.applicantPosition)
                        this.finalVerifyTableData.push({name: "申请人职务", value: this.form.applicantPosition});
                    this.step++;
                } else {
                    console.log("ERROR SUBMIT")
                    return false;
                }
            })
        },
        submitBiz() {
            this.$refs["bizForm"].validate((valid) => {
                if (valid) {
                    this.finalVerifyTableData = [
                        {name: "机构类型", value: "企业"},
                        {name: "企业名称", value: this.form.bizName},
                        {name: "企业地址", value: this.form.bizAddr},
                        {name: "申请人", value: this.form.applicant}
                    ]
                    if (this.form.applicantPosition)
                        this.finalVerifyTableData.push({name: "申请人职务", value: this.form.applicantPosition});
                    this.step++;
                } else {
                    console.log("ERROR SUBMIT")
                    return false;
                }
            })
        },
        finalSubmit() {

        }
    },
    created() {
        document.title = "用户注册"
    }
}
</script>

<style>
h1 {
    text-align: center;
    line-height: 5rem;
    background: black;
    color: white;
    margin: 0 0 3rem 0;
    height: 5rem;
}

.content {
    width: 30rem;
    min-height: 10rem;
    text-align: center;
    margin: 20vh auto;
}

.el-form {
    width: 25rem !important;
}

.final-button {
    margin: 1rem !important;
}

</style>