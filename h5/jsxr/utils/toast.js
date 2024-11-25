class Toast {
    constructor() {
        if (Toast.instance) {
            return Toast.instance; // 如果实例已存在，直接返回
        }

        this.toastElement = null; // 存放 Toast DOM 元素
        Toast.instance = this; // 保存实例
    }

    // 初始化 Toast DOM
    _createToast() {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.top = '50%';
        toast.style.left = '50%';
        toast.style.transform = 'translate(-50%, -50%)';
        toast.style.padding = '1rem 2rem';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        toast.style.color = '#fff';
        toast.style.borderRadius = '0.4rem';
        toast.style.fontSize = '1.4rem';
        toast.style.lineHeight = '1.2';
        toast.style.boxShadow = '0 .2rem .5rem rgba(0, 0, 0, 0.2)';
        toast.style.zIndex = '1000';
        toast.style.display = 'none'; // 初始隐藏
        document.body.appendChild(toast);
        this.toastElement = toast;
    }

    // 显示 Toast
    showToast(message, duration = 3000) {
        if (!this.toastElement) {
            this._createToast(); // 如果未创建 DOM，则创建
        }

        this.toastElement.textContent = message; // 设置消息
        this.toastElement.style.display = 'block'; // 显示 Toast

        clearTimeout(this.timeout); // 清除上一次的隐藏计时器
        this.timeout = setTimeout(() => {
            this.toastElement.style.display = 'none'; // 隐藏 Toast
        }, duration);
    }
}

// 单例使用
const toast = new Toast();