<template>
  <div id="Register">
    <h1>欢迎加入区块链学历认证系统</h1>
    <el-steps :active="step" align-center finish-status="success">
      <el-step title="账户信息"></el-step>
      <el-step title="身份信息"></el-step>
      <el-step title="确认信息"></el-step>
    </el-steps>

    <el-card class="content" v-if="step === 0" shadow="hover">
      <el-form ref="accountForm" :model="form" :rules="rules">
        <el-form-item label="注册邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-tooltip placement="right">
            <div slot="content">密码至少8位<br/>且包含字母和数字</div>
            <el-input v-model="form.passwd" show-password></el-input>
          </el-tooltip>

        </el-form-item>
        <el-form-item label="确认密码" prop="checkPasswd">
          <el-input v-model="form.checkPasswd" show-password></el-input>
        </el-form-item>
        <el-form-item label="机构类型" prop="instituteType">
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
          <el-button @click="submitAccount" type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="content" v-if="step === 1" shadow="hover">
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
          <el-upload
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
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
          <el-upload
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
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

      <!-- STUDENT -->
      <el-form ref="stuForm" :model="form" :rules="rules" v-if="form.instituteType === 2">
        <el-form-item label="学生姓名" prop="stuName">
          <el-input v-model="form.stuName"></el-input>
        </el-form-item>
        <el-form-item label="所在学校" prop="stuSchoolName">
          <el-input v-model="form.stuSchoolName"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="stuMajor">
          <el-input v-model="form.stuMajor"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="stuNo">
          <el-input v-model="form.stuNo"></el-input>
        </el-form-item>
        <el-form-item label="入学时间" prop="stuEnterDate">
          <el-date-picker type="month" v-model="form.stuEnterDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="证明材料" prop="verify">
          <el-upload
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="step--">上一步</el-button>
          <el-button
              type="primary"
              @click="submitStu"
              ref="schoolNextButton">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="content" v-if="step === 2" shadow="hover">
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
    <el-card class="content" v-if="step === 3" shadow="hover">
      <h3>提交成功</h3>
      您的信息将会被审核，结果将通过邮件通知
    </el-card>
  </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            step: 0,
            form: {
                email: "",
                passwd: "",
                checkPasswd: "",
                instituteType: "",
                // SCHOOL
                schoolName: "",
                schoolAddr: "",
                applicantPosition: "",

                // BUSINESS
                bizName: "",
                bizAddr: "",
                bizType: "",

                // STUDENT
                stuName: "",
                stuSchoolName: "",
                stuMajor: "",
                stuNo: "",
                stuEnterDate: null,

                // GENERAL
                applicant: "",
                verifyFileList: []
            },
            instituteTypeOptions: [
                {label: "学校", value: 0}, {label: "企业", value: 1}, {label: "学生", value: 2}
            ],
            rules: {
                email: [
                    {required: true, message: "请输入邮箱", trigger: "blur"},
                    {type: "email", message: "邮箱格式不正确", trigger: "blur"}
                ],
                passwd: [
                    {required: true, message: "请输入密码", trigger: "blur"},
                    {
                        trigger: "blur", validator: (rule, value, callback) => {
                            if (value.length < 7)
                                return callback(new Error("密码长度不足7位"))
                            else if (value.length > 128)
                                return callback(new Error("密码长度多于128位"))
                            else {
                                let hasNum = /[0-9]/.test(value);
                                let hasAlpha = /[a-zA-Z]/.test(value);
                                if (!(hasNum && hasAlpha))
                                    return callback(new Error("密码必须包括字母和数字"))
                            }
                            callback();
                        }
                    }
                ],
                checkPasswd: [
                    {required: true, message: "请确认密码", trigger: "blur"},
                    {
                        trigger: "blur", validator: (rule, value, callback) => {
                            if (value !== this.form.passwd)
                                return callback(new Error("两次密码输入不一致"))
                            callback();
                        }
                    }
                ],
                instituteType: {required: true, message: "请选择机构类型", trigger: "select"},
                // SCHOOL
                schoolName: {required: true, message: "请输入学校名称", trigger: "blur"},
                schoolAddr: {required: true, message: "请输入学校地址", trigger: "blur"},
                // BUSINESS
                bizName: {required: true, message: "请输入企业名称", trigger: "blur"},
                bizAddr: {required: true, message: "请输入企业地址", trigger: "blur"},
                // STUDENT
                stuName: {required: true, message: "请输入学生姓名", trigger: "blur"},
                stuSchoolName: {required: true, message: "请输入所在学校", trigger: "blur"},

                // GENERAL
                applicant: {required: true, message: "请输入申请人", trigger: "blur"}
            },
            finalVerifyTableData: []
        }
    },
    methods: {
        submitAccount() {
            this.$refs["accountForm"].validate((valid) => {
                if (valid) {
                    this.step++;
                } else {
                    this.$message.error("信息填写错误")
                    return false;
                }
            })
        },
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
                    this.$message.error("信息填写错误")
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
                    this.$message.error("信息填写错误")
                    return false;
                }
            })
        },
        submitStu() {
            this.$refs["stuForm"].validate((valid) => {
                if (valid) {
                    this.finalVerifyTableData = [
                        {name: "机构类型", value: "学生"},
                        {name: "学生姓名", value: this.form.stuName},
                        {name: "所在学校", value: this.form.stuSchoolName}
                    ]

                    if (this.form.stuMajor)
                        this.finalVerifyTableData.push({name: "专业", value: this.form.stuMajor})
                    if (this.form.stuNo)
                        this.finalVerifyTableData.push({name: "学号", value: this.form.stuNo})
                    if (this.form.stuEnterDate)
                        this.finalVerifyTableData.push({
                            name: "入学时间",
                            value: this.formatEnterDate(this.form.stuEnterDate)
                        })

                    this.step++;
                } else {
                    this.$message.error("信息填写错误")
                    return false;
                }
            })
        },
        finalSubmit() {
            this.step++;
        },
        formatEnterDate(date) {
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            return year.toString() + "-" + month.toString()
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
    margin: 10vh auto;
}

.el-form {
    width: 25rem !important;
}

.final-button {
    margin: 1rem !important;
}

</style>