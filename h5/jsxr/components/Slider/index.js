class Slider {
    constructor(options) {
        const {
            root, // 容器根元素
            min = 0,
            max = 100,
            step = 1,
            initial = 0,
            leftColor = '#4caf50', // 默认左侧颜色
            rightColor = '#e0e0e0', // 默认右侧颜色
            onChange = () => { },
        } = options;

        this.root = root; // 根容器
        this.min = min; // 最小值
        this.max = max; // 最大值
        this.step = step; // 步长
        this.value = Math.min(Math.max(initial, min), max); // 初始值
        this.leftColor = leftColor; // 左侧颜色
        this.rightColor = rightColor; // 右侧颜色
        this.onChange = onChange; // 值改变时的回调

        this._initialize(); // 初始化
    }

    _initialize() {
        // 获取必要的 DOM 元素
        this.thumb = this.root.querySelector('.thumb');
        this.track = this.root.querySelector('.track');
        this.leftTrack = this.root.querySelector('.track-left');
        this.rightTrack = this.root.querySelector('.track-right');
        this.tooltip = this.root.querySelector('.tooltip');
        this.decreaseButton = this.root.querySelector('.button#decrease');
        this.increaseButton = this.root.querySelector('.button#increase');

        // 初始化样式
        this.leftTrack.style.backgroundColor = this.leftColor;
        this.rightTrack.style.backgroundColor = this.rightColor;

        // 初始化滑块 UI
        this._updateUI();

        // 绑定事件
        this._attachEvents();

        // 执行onChange
        this.onChange(this.value);
    }

    _attachEvents() {
        // 左侧按钮事件
        this.decreaseButton.addEventListener('click', () => {
            if (!this.decreaseButton.classList.contains('disabled')) {
                this.updateValue(this.value - this.step);
            }
        });

        // 右侧按钮事件
        this.increaseButton.addEventListener('click', () => {
            if (!this.increaseButton.classList.contains('disabled')) {
                this.updateValue(this.value + this.step);
            }
        });

        // 鼠标事件
        this._bindMouseEvents();

        // 触摸事件
        this._bindTouchEvents();
    }

    updateValue(newValue) {

        if (newValue === this.value || newValue < this.min || newValue > this.max) {
            return;
        }

        this.value = Math.min(Math.max(newValue, this.min), this.max);
        this._updateUI();

        // 加入震感（仅在移动设备生效）
        if (navigator.vibrate && this._isMobileDevice()) {
            try {
                navigator.vibrate(50); // 震动 50ms
            } catch (error) {
                console.warn('Vibration failed:', error);
            }
        }

        this.onChange(this.value);
    }

    /**
     * 辅助函数：判断是否是移动设备
     */
    _isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    }

    _updateUI() {
        // 更新滑块位置
        const percent = this._valueToPosition(this.value);
        this.thumb.style.left = `${percent}%`;

        // 更新左侧和右侧轨道宽度
        this.leftTrack.style.width = `${percent}%`;
        this.rightTrack.style.width = `${100 - percent}%`;

        // 更新提示文字
        if (this.tooltip) {
            this.tooltip.textContent = `${this.value}岁`;
            this.tooltip.style.left = `${percent}%`;
        }

        // 更新按钮状态
        this._updateButtonState();
    }

    _updateButtonState() {
        // 检查左侧按钮是否达到最小值
        if (this.value <= this.min) {
            this.decreaseButton.classList.add('disabled');
        } else {
            this.decreaseButton.classList.remove('disabled');
        }

        // 检查右侧按钮是否达到最大值
        if (this.value >= this.max) {
            this.increaseButton.classList.add('disabled');
        } else {
            this.increaseButton.classList.remove('disabled');
        }
    }

    _valueToPosition(value) {
        // 将值转换为百分比位置
        return ((value - this.min) / (this.max - this.min)) * 100;
    }

    _positionToValue(percent) {
        // 将百分比位置转换为值
        const rawValue = this.min + ((this.max - this.min) * percent) / 100;
        return Math.round(rawValue / this.step) * this.step;
    }

    _bindMouseEvents() {
        let isDragging = false;

        // 鼠标按下时开始拖动
        this.thumb.addEventListener('mousedown', () => {
            isDragging = true;
            document.body.style.userSelect = 'none'; // 禁止文本选择
        });

        // 鼠标移动时更新滑块值
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const rect = this.track.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            const newValue = this._positionToValue(percent);

            // 只有值改变时才更新
            this.updateValue(newValue);
        });

        // 鼠标释放时停止拖动
        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = ''; // 恢复文本选择
        });
    }

    _bindTouchEvents() {
        let isDragging = false;

        // 触摸开始时开始拖动
        this.thumb.addEventListener('touchstart', (e) => {
            isDragging = true;
            document.body.style.userSelect = 'none'; // 禁止文本选择
            if (e.cancelable) e.preventDefault(); // https://www.uriports.com/blog/easy-fix-for-intervention-ignored-attempt-to-cancel-a-touchmove-event-with-cancelable-false/
        });

        // 触摸移动时更新滑块值
        document.addEventListener('touchmove', (e) => {
            if (!isDragging || !e.touches || e.touches.length !== 1) return;

            const touch = e.touches[0];
            const rect = this.track.getBoundingClientRect();
            const percent = ((touch.clientX - rect.left) / rect.width) * 100;
            const newValue = this._positionToValue(percent);

            // 只有值改变时才更新
            this.updateValue(newValue);
        });

        // 触摸结束时停止拖动
        document.addEventListener('touchend', () => {
            isDragging = false;
            document.body.style.userSelect = ''; // 恢复文本选择
        });
    }
}