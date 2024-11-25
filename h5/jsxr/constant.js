const ERROR = {
    NetworkError: '网络错误，请联系管理员',
}


// 最高投保年龄
const MAX_AGE = {
    10: 57,
    15: 52,
    20: 47,
    30: 41
};

// =IF(《建信人寿康乐安享重大疾病保险》试算表!C6<18,200000,IF(《建信人寿康乐安享重大疾病保险》试算表!C6<40,100000,50000))
// 求最低保额
const getMinAmount = (age) => {
    if (age < 18) return 200000
    if (age < 40) return 100000
    return 50000
}