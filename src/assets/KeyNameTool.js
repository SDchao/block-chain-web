const KEY_NAME_PAIR = {
    "stu_id": "身份证",
    "stu_name": "学生姓名",
    "cert_id": "证书编号",
    "school_name": "学校名称",
    "degree": "学位",
    "edu_system": "学制",
    "stu_major": "专业",
    "pri_key": "私钥",
    "pri_key_sum": "私钥"
}

function keyToName(key) {
    if (key in KEY_NAME_PAIR) {
        return KEY_NAME_PAIR[key]
    } else {
        return "UNKNOWN"
    }
}

function certDataToTable(certData) {
    let data = []
    for (let key in certData) {
        let name = keyToName(key)
        let value = certData[key]
        data.push({name: name, value: value})
    }
    return data
}

let KeyNameTool = {keyToName, certDataToTable};

export default KeyNameTool;