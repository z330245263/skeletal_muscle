// 滑动丝模型交互动画
class SlidingFilamentAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.container.innerHTML = '';
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // 动画参数
        this.isPlaying = false;
        this.animationFrame = null;
        this.progress = 0;
        this.speed = 0.005;
        
        // 肌节参数
        this.sarcomereWidth = this.canvas.width * 0.8;
        this.sarcomereHeight = this.canvas.height * 0.4;
        this.sarcomereX = (this.canvas.width - this.sarcomereWidth) / 2;
        this.sarcomereY = (this.canvas.height - this.sarcomereHeight) / 2;
        
        // 绘制初始状态
        this.draw();
    }
    
    draw() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 计算当前肌节宽度（随动画进度缩短）
        const currentWidth = this.sarcomereWidth * (1 - this.progress * 0.3);
        const currentX = this.sarcomereX + (this.sarcomereWidth - currentWidth) / 2;
        
        // 绘制Z线
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(currentX, this.sarcomereY, 4, this.sarcomereHeight);
        this.ctx.fillRect(currentX + currentWidth - 4, this.sarcomereY, 4, this.sarcomereHeight);
        
        // 绘制细肌丝（肌动蛋白）
        this.ctx.fillStyle = '#e74c3c';
        const thinFilamentLength = currentWidth * 0.4;
        this.ctx.fillRect(currentX + 4, this.sarcomereY + this.sarcomereHeight * 0.25, thinFilamentLength, this.sarcomereHeight * 0.1);
        this.ctx.fillRect(currentX + 4, this.sarcomereY + this.sarcomereHeight * 0.65, thinFilamentLength, this.sarcomereHeight * 0.1);
        this.ctx.fillRect(currentX + currentWidth - 4 - thinFilamentLength, this.sarcomereY + this.sarcomereHeight * 0.25, thinFilamentLength, this.sarcomereHeight * 0.1);
        this.ctx.fillRect(currentX + currentWidth - 4 - thinFilamentLength, this.sarcomereY + this.sarcomereHeight * 0.65, thinFilamentLength, this.sarcomereHeight * 0.1);
        
        // 绘制粗肌丝（肌凝蛋白）
        this.ctx.fillStyle = '#3498db';
        const thickFilamentLength = currentWidth * 0.6;
        this.ctx.fillRect(currentX + (currentWidth - thickFilamentLength) / 2, this.sarcomereY + this.sarcomereHeight * 0.4, thickFilamentLength, this.sarcomereHeight * 0.2);
        
        // 绘制交叉桥
        if (this.progress > 0) {
            this.ctx.fillStyle = '#2c3e50';
            const crossBridgeCount = 8;
            const crossBridgeLength = this.sarcomereHeight * 0.15;
            const crossBridgeWidth = 2;
            const crossBridgeSpacing = thickFilamentLength / (crossBridgeCount + 1);
            
            for (let i = 1; i <= crossBridgeCount / 2; i++) {
                const x = currentX + (currentWidth - thickFilamentLength) / 2 + i * crossBridgeSpacing;
                
                // 上方交叉桥
                this.ctx.save();
                this.ctx.translate(x, this.sarcomereY + this.sarcomereHeight * 0.4);
                this.ctx.rotate(-Math.PI / 4 - this.progress * Math.PI / 4);
                this.ctx.fillRect(0, 0, crossBridgeWidth, crossBridgeLength);
                this.ctx.restore();
                
                // 下方交叉桥
                this.ctx.save();
                this.ctx.translate(x, this.sarcomereY + this.sarcomereHeight * 0.6);
                this.ctx.rotate(Math.PI / 4 + this.progress * Math.PI / 4);
                this.ctx.fillRect(0, 0, crossBridgeWidth, crossBridgeLength);
                this.ctx.restore();
            }
            
            for (let i = 1; i <= crossBridgeCount / 2; i++) {
                const x = currentX + (currentWidth - thickFilamentLength) / 2 + thickFilamentLength - i * crossBridgeSpacing;
                
                // 上方交叉桥
                this.ctx.save();
                this.ctx.translate(x, this.sarcomereY + this.sarcomereHeight * 0.4);
                this.ctx.rotate(Math.PI / 4 + this.progress * Math.PI / 4);
                this.ctx.fillRect(0, 0, crossBridgeWidth, crossBridgeLength);
                this.ctx.restore();
                
                // 下方交叉桥
                this.ctx.save();
                this.ctx.translate(x, this.sarcomereY + this.sarcomereHeight * 0.6);
                this.ctx.rotate(-Math.PI / 4 - this.progress * Math.PI / 4);
                this.ctx.fillRect(0, 0, crossBridgeWidth, crossBridgeLength);
                this.ctx.restore();
            }
        }
        
        // 添加标签
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Z线', currentX, this.sarcomereY - 10);
        this.ctx.fillText('Z线', currentX + currentWidth - 4, this.sarcomereY - 10);
        this.ctx.fillText('肌动蛋白（细肌丝）', currentX + thinFilamentLength / 2, this.sarcomereY + this.sarcomereHeight + 20);
        this.ctx.fillText('肌凝蛋白（粗肌丝）', currentX + currentWidth / 2, this.sarcomereY + this.sarcomereHeight + 40);
        
        // 显示进度
        this.ctx.fillStyle = '#333';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`肌肉收缩进度: ${Math.round(this.progress * 100)}%`, this.canvas.width / 2, 30);
    }
    
    play() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        const animate = () => {
            if (!this.isPlaying) return;
            
            this.progress += this.speed;
            if (this.progress > 1) {
                this.progress = 1;
                this.isPlaying = false;
            }
            
            this.draw();
            
            if (this.isPlaying) {
                this.animationFrame = requestAnimationFrame(animate);
            }
        };
        
        this.animationFrame = requestAnimationFrame(animate);
    }
    
    pause() {
        this.isPlaying = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
    
    reset() {
        this.pause();
        this.progress = 0;
        this.draw();
    }
}

// 肌纤维类型比较交互工具
class FiberTypeComparison {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.container.innerHTML = `
            <div class="fiber-type-controls">
                <div class="fiber-type-selector">
                    <label>选择比较项目：</label>
                    <select id="comparison-property">
                        <option value="contraction">收缩速度</option>
                        <option value="force">力量产生能力</option>
                        <option value="endurance">耐力</option>
                        <option value="mitochondria">线粒体密度</option>
                        <option value="metabolism">代谢类型</option>
                    </select>
                </div>
            </div>
            <div class="fiber-type-chart">
                <canvas id="fiber-chart" width="600" height="400"></canvas>
            </div>
            <div class="fiber-type-description">
                <div id="type-i-description" class="fiber-description">
                    <h4>I型肌纤维（慢缩型）</h4>
                    <p>特点将显示在这里...</p>
                </div>
                <div id="type-iia-description" class="fiber-description">
                    <h4>IIa型肌纤维（快缩耐力型）</h4>
                    <p>特点将显示在这里...</p>
                </div>
                <div id="type-iix-description" class="fiber-description">
                    <h4>IIx型肌纤维（快缩力量型）</h4>
                    <p>特点将显示在这里...</p>
                </div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .fiber-type-controls {
                margin-bottom: 20px;
            }
            
            .fiber-type-selector {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .fiber-type-selector select {
                padding: 8px;
                border-radius: 5px;
                border: 1px solid #ddd;
            }
            
            .fiber-type-chart {
                margin-bottom: 20px;
            }
            
            .fiber-type-description {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }
            
            .fiber-description {
                background-color: #f5f5f5;
                padding: 15px;
                border-radius: 5px;
            }
            
            .fiber-description h4 {
                margin-top: 0;
                margin-bottom: 10px;
                color: #2c3e50;
            }
        `;
        document.head.appendChild(style);
        
        // 初始化图表
        this.canvas = document.getElementById('fiber-chart');
        this.ctx = this.canvas.getContext('2d');
        
        // 肌纤维类型数据
        this.fiberData = {
            contraction: {
                labels: ['I型', 'IIa型', 'IIx型'],
                values: [1, 3, 5],
                title: '收缩速度比较',
                descriptions: [
                    '收缩速度慢，肌凝蛋白ATPase活性低，适合长时间低强度活动',
                    '收缩速度中等，肌凝蛋白ATPase活性中等，兼具速度和耐力特性',
                    '收缩速度快，肌凝蛋白ATPase活性高，适合短时间高强度爆发力活动'
                ]
            },
            force: {
                labels: ['I型', 'IIa型', 'IIx型'],
                values: [2, 4, 5],
                title: '力量产生能力比较',
                descriptions: [
                    '单位横截面积产生的力量较小，但总体耐疲劳',
                    '单位横截面积产生的力量中等，综合性能较好',
                    '单位横截面积产生的力量大，适合需要大力量的活动'
                ]
            },
            endurance: {
                labels: ['I型', 'IIa型', 'IIx型'],
                values: [5, 3, 1],
                title: '耐力比较',
                descriptions: [
                    '耐疲劳性强，适合长时间持续活动，如马拉松',
                    '耐疲劳性中等，适合中等时间的活动，如5000米跑',
                    '易疲劳，不适合长时间活动，但爆发力强'
                ]
            },
            mitochondria: {
                labels: ['I型', 'IIa型', 'IIx型'],
                values: [5, 3, 1],
                title: '线粒体密度比较',
                descriptions: [
                    '线粒体密度高，有氧能力强，肌红蛋白含量高',
                    '线粒体密度中等，有氧和无氧能力均衡',
                    '线粒体密度低，主要依赖无氧代谢产能'
                ]
            },
            metabolism: {
                labels: ['I型', 'IIa型', 'IIx型'],
                values: [5, 3, 2],
                title: '代谢类型比较',
                descriptions: [
                    '主要依赖有氧代谢，脂肪氧化能力强',
                    '有氧和无氧代谢均衡，适应性强',
                    '主要依赖无氧糖酵解，产生乳酸较多'
                ]
            }
        };
        
        // 初始化事件监听
        document.getElementById('comparison-property').addEventListener('change', (e) => {
            this.updateChart(e.target.value);
        });
        
        // 初始显示
        this.updateChart('contraction');
    }
    
    updateChart(property) {
        const data = this.fiberData[property];
        
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 设置图表参数
        const chartWidth = this.canvas.width - 100;
        const chartHeight = this.canvas.height - 100;
        const barWidth = chartWidth / (data.values.length * 2);
        const maxValue = 5;
        
        // 绘制标题
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(data.title, this.canvas.width / 2, 30);
        
        // 绘制Y轴
        this.ctx.beginPath();
        this.ctx.moveTo(50, 50);
        this.ctx.lineTo(50, 50 + chartHeight);
        this.ctx.stroke();
        
        // 绘制X轴
        this.ctx.beginPath();
        this.ctx.moveTo(50, 50 + chartHeight);
        this.ctx.lineTo(50 + chartWidth, 50 + chartHeight);
        this.ctx.stroke();
        
        // 绘制Y轴刻度
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'right';
        for (let i = 0; i <= maxValue; i++) {
            const y = 50 + chartHeight - (i / maxValue) * chartHeight;
            this.ctx.fillText(i.toString(), 45, y + 5);
            
            // 绘制网格线
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#eee';
            this.ctx.moveTo(50, y);
            this.ctx.lineTo(50 + chartWidth, y);
            this.ctx.stroke();
            this.ctx.strokeStyle = '#000';
        }
        
        // 绘制柱状图
        const colors = ['#3498db', '#e67e22', '#e74c3c'];
        for (let i = 0; i < data.values.length; i++) {
            const x = 50 + (i * 2 + 1) * barWidth;
            const barHeight = (data.values[i] / maxValue) * chartHeight;
            
            // 绘制柱子
            this.ctx.fillStyle = colors[i];
            this.ctx.fillRect(x, 50 + chartHeight - barHeight, barWidth, barHeight);
            
            // 绘制标签
            this.ctx.fillStyle = '#2c3e50';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(data.labels[i], x + barWidth / 2, 50 + chartHeight + 20);
            
            // 绘制数值
            this.ctx.fillText(data.values[i].toString(), x + barWidth / 2, 50 + chartHeight - barHeight - 10);
        }
        
        // 更新描述
        document.getElementById('type-i-description').querySelector('p').textContent = data.descriptions[0];
        document.getElementById('type-iia-description').querySelector('p').textContent = data.descriptions[1];
        document.getElementById('type-iix-description').querySelector('p').textContent = data.descriptions[2];
    }
}

// 肌肉收缩力-速度关系交互工具
class ForceVelocityCurve {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.container.innerHTML = `
            <div class="force-velocity-controls">
                <div class="slider-container">
                    <label for="load-slider">负荷大小：<span id="load-value">50</span>%</label>
                    <input type="range" id="load-slider" min="0" max="100" value="50">
                </div>
            </div>
            <div class="force-velocity-chart">
                <canvas id="force-velocity-canvas" width="600" height="400"></canvas>
            </div>
            <div class="force-velocity-info">
                <div class="info-box">
                    <h4>当前状态</h4>
                    <p>负荷: <span id="current-load">50</span>% 最大力量</p>
                    <p>收缩速度: <span id="current-velocity">50</span>% 最大速度</p>
                    <p>功率: <span id="current-power">50</span>% 最大功率</p>
                </div>
                <div class="info-box">
                    <h4>力-速度关系</h4>
                    <p>肌肉收缩速度与负荷成反比：负荷越大，收缩速度越慢；负荷越小，收缩速度越快。</p>
                </div>
                <div class="info-box">
                    <h4>功率-速度关系</h4>
                    <p>肌肉产生的功率（力量×速度）在中等负荷时达到最大值。</p>
                </div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .force-velocity-controls {
                margin-bottom: 20px;
            }
            
            .slider-container {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .force-velocity-chart {
                margin-bottom: 20px;
            }
            
            .force-velocity-info {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }
            
            .info-box {
                background-color: #f5f5f5;
                padding: 15px;
                border-radius: 5px;
            }
            
            .info-box h4 {
                margin-top: 0;
                margin-bottom: 10px;
                color: #2c3e50;
            }
        `;
        document.head.appendChild(style);
        
        // 初始化画布
        this.canvas = document.getElementById('force-velocity-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 初始化事件监听
        const loadSlider = document.getElementById('load-slider');
        const loadValue = document.getElementById('load-value');
        
        loadSlider.addEventListener('input', (e) => {
            const load = parseInt(e.target.value);
            loadValue.textContent = load;
            this.updateChart(load);
        });
        
        // 初始显示
        this.updateChart(50);
    }
    
    updateChart(loadPercent) {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 设置图表参数
        const chartWidth = this.canvas.width - 100;
        const chartHeight = this.canvas.height - 100;
        const maxLoad = 100;
        const maxVelocity = 100;
        
        // 计算当前负荷下的速度（Hill方程简化版）
        const velocity = 100 - loadPercent;
        
        // 计算功率（力量×速度）
        const power = (loadPercent * velocity) / 100;
        
        // 更新信息显示
        document.getElementById('current-load').textContent = loadPercent;
        document.getElementById('current-velocity').textContent = velocity;
        document.getElementById('current-power').textContent = Math.round(power);
        
        // 绘制坐标轴
        this.ctx.beginPath();
        this.ctx.moveTo(50, 50);
        this.ctx.lineTo(50, 50 + chartHeight);
        this.ctx.lineTo(50 + chartWidth, 50 + chartHeight);
        this.ctx.stroke();
        
        // 绘制坐标轴标签
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('负荷 (% 最大力量)', 50 + chartWidth / 2, 50 + chartHeight + 30);
        
        this.ctx.save();
        this.ctx.translate(20, 50 + chartHeight / 2);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText('速度 (% 最大速度)', 0, 0);
        this.ctx.restore();
        
        // 绘制刻度
        this.ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const y = 50 + chartHeight - (i * 20 / 100) * chartHeight;
            this.ctx.fillText((i * 20).toString(), 45, y + 5);
        }
        
        this.ctx.textAlign = 'center';
        for (let i = 0; i <= 5; i++) {
            const x = 50 + (i * 20 / 100) * chartWidth;
            this.ctx.fillText((i * 20).toString(), x, 50 + chartHeight + 15);
        }
        
        // 绘制力-速度曲线
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#3498db';
        this.ctx.lineWidth = 2;
        
        for (let x = 0; x <= maxLoad; x++) {
            const y = 100 - x; // 简化的Hill方程
            const chartX = 50 + (x / maxLoad) * chartWidth;
            const chartY = 50 + chartHeight - (y / maxVelocity) * chartHeight;
            
            if (x === 0) {
                this.ctx.moveTo(chartX, chartY);
            } else {
                this.ctx.lineTo(chartX, chartY);
            }
        }
        
        this.ctx.stroke();
        
        // 绘制功率曲线
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#e74c3c';
        this.ctx.lineWidth = 2;
        
        for (let x = 0; x <= maxLoad; x++) {
            const y = 100 - x; // 速度
            const p = (x * y) / 100; // 功率
            const chartX = 50 + (x / maxLoad) * chartWidth;
            const chartY = 50 + chartHeight - (p / maxVelocity) * chartHeight;
            
            if (x === 0) {
                this.ctx.moveTo(chartX, chartY);
            } else {
                this.ctx.lineTo(chartX, chartY);
            }
        }
        
        this.ctx.stroke();
        
        // 绘制当前点
        const currentX = 50 + (loadPercent / maxLoad) * chartWidth;
        const currentY = 50 + chartHeight - (velocity / maxVelocity) * chartHeight;
        const powerY = 50 + chartHeight - (power / maxVelocity) * chartHeight;
        
        // 绘制力-速度点
        this.ctx.beginPath();
        this.ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
        this.ctx.fillStyle = '#3498db';
        this.ctx.fill();
        
        // 绘制功率点
        this.ctx.beginPath();
        this.ctx.arc(currentX, powerY, 6, 0, Math.PI * 2);
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fill();
        
        // 绘制图例
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'left';
        
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillRect(50, 30, 15, 10);
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillText('力-速度曲线', 70, 38);
        
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(180, 30, 15, 10);
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillText('功率曲线', 200, 38);
    }
}

// 肌节结构交互式探索工具
class SarcomereExplorer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.container.innerHTML = `
            <div class="sarcomere-explorer">
                <div class="sarcomere-image-container">
                    <img id="sarcomere-image" src="../images/pow37761_0804.jpg" alt="肌节结构">
                    <div id="sarcomere-hotspots"></div>
                </div>
                <div class="sarcomere-info">
                    <h3 id="structure-title">点击图中的结构了解详情</h3>
                    <div id="structure-description">
                        <p>肌节是肌肉收缩的基本功能单位，由多种蛋白质组成。点击图中的不同区域了解各部分的结构和功能。</p>
                    </div>
                </div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .sarcomere-explorer {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            
            .sarcomere-image-container {
                position: relative;
                border: 1px solid #ddd;
                border-radius: 5px;
                overflow: hidden;
            }
            
            #sarcomere-image {
                width: 100%;
                display: block;
            }
            
            #sarcomere-hotspots {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            
            .hotspot {
                position: absolute;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: rgba(52, 152, 219, 0.5);
                border: 2px solid rgba(52, 152, 219, 0.8);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .hotspot:hover {
                background-color: rgba(52, 152, 219, 0.8);
                transform: scale(1.1);
            }
            
            .sarcomere-info {
                background-color: #f5f5f5;
                padding: 20px;
                border-radius: 5px;
            }
            
            #structure-title {
                margin-top: 0;
                margin-bottom: 15px;
                color: #2c3e50;
                border-bottom: 2px solid #3498db;
                padding-bottom: 10px;
            }
            
            #structure-description {
                line-height: 1.6;
            }
        `;
        document.head.appendChild(style);
        
        // 定义热点区域
        this.hotspots = [
            {
                x: 20,
                y: 50,
                title: 'Z线',
                description: 'Z线（Z-disk）是肌节的边界，由α-肌动蛋白和其他蛋白质组成。Z线是细肌丝（肌动蛋白）的锚定点，也是相邻肌节的连接处。Z线的完整性对于肌肉的正常收缩至关重要。'
            },
            {
                x: 35,
                y: 50,
                title: 'I带',
                description: 'I带（I-band）是肌节中的浅色区域，位于Z线两侧。I带主要含有细肌丝（肌动蛋白），但不含粗肌丝。在肌肉收缩过程中，I带的宽度会减小，这是肌节缩短的直接表现。'
            },
            {
                x: 50,
                y: 50,
                title: 'A带',
                description: 'A带（A-band）是肌节中的深色区域，包含整个粗肌丝（肌凝蛋白）的长度以及与之重叠的部分细肌丝。A带的宽度在肌肉收缩过程中保持不变，这支持了滑动丝理论。'
            },
            {
                x: 65,
                y: 50,
                title: 'H带',
                description: 'H带（H-zone）是A带中央的较浅区域，只含有粗肌丝（肌凝蛋白），没有细肌丝。在肌肉收缩过程中，随着细肌丝向肌节中心滑动，H带的宽度会减小，甚至在完全收缩时消失。'
            },
            {
                x: 80,
                y: 50,
                title: 'M线',
                description: 'M线（M-line）位于H带中央，是粗肌丝（肌凝蛋白）的锚定点。M线由多种蛋白质组成，包括肌球蛋白结合蛋白C和肌节蛋白，它们将相邻的粗肌丝连接在一起，维持肌节的结构稳定性。'
            }
        ];
        
        // 创建热点
        const hotspotsContainer = document.getElementById('sarcomere-hotspots');
        this.hotspots.forEach((hotspot, index) => {
            const hotspotElement = document.createElement('div');
            hotspotElement.className = 'hotspot';
            hotspotElement.style.left = `${hotspot.x}%`;
            hotspotElement.style.top = `${hotspot.y}%`;
            hotspotElement.dataset.index = index;
            
            hotspotElement.addEventListener('click', () => {
                this.showHotspotInfo(index);
            });
            
            hotspotsContainer.appendChild(hotspotElement);
        });
    }
    
    showHotspotInfo(index) {
        const hotspot = this.hotspots[index];
        document.getElementById('structure-title').textContent = hotspot.title;
        document.getElementById('structure-description').innerHTML = `<p>${hotspot.description}</p>`;
        
        // 高亮当前热点
        const hotspotElements = document.querySelectorAll('.hotspot');
        hotspotElements.forEach((el, i) => {
            if (i === index) {
                el.style.backgroundColor = 'rgba(231, 76, 60, 0.7)';
                el.style.borderColor = 'rgba(231, 76, 60, 1)';
            } else {
                el.style.backgroundColor = 'rgba(52, 152, 219, 0.5)';
                el.style.borderColor = 'rgba(52, 152, 219, 0.8)';
            }
        });
    }
}

// 导出交互组件
window.SlidingFilamentAnimation = SlidingFilamentAnimation;
window.FiberTypeComparison = FiberTypeComparison;
window.ForceVelocityCurve = ForceVelocityCurve;
window.SarcomereExplorer = SarcomereExplorer;
