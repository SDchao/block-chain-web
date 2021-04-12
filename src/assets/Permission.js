let permission = -1

function getLevel() {
    return permission
}

function setLevel(lv) {
    permission = lv
}

const Permission = {getLevel, setLevel}

export default Permission