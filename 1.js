setTimeout(() => {
    throw Error('宏任务')
}, 0);
// 创建10000个微任务
for(let i = 0; i < 100000; i++) {
    Promise.resolve().then(() => {
        console.log('微任务:', i)
    })
}