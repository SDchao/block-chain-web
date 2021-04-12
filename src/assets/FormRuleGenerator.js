import KeyNameTool from "@/assets/KeyNameTool";


function getRequiredRule(propList) {
    let result = {}
    for (let i in propList) {
        let name = KeyNameTool.keyToName(propList[i])
        if (name === "私钥") {
            result[propList[i]] = [{required: true, message: "请上传" + name}]
        } else {
            result[propList[i]] = [{required: true, message: "请输入" + name}]
        }

    }
    return result
}


const FormRuleGenerator = {getRequiredRule}

export default FormRuleGenerator