// 创建骨骼肌结构图像
function createMuscleStructureImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // 绘制背景
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制肌肉整体轮廓
    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.bezierCurveTo(150, 100, 650, 100, 700, 150);
    ctx.bezierCurveTo(750, 200, 750, 400, 700, 450);
    ctx.bezierCurveTo(650, 500, 150, 500, 100, 450);
    ctx.bezierCurveTo(50, 400, 50, 200, 100, 150);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制肌束
    for (let i = 0; i < 5; i++) {
        const y = 200 + i * 50;
        ctx.beginPath();
        ctx.moveTo(100, y);
        ctx.bezierCurveTo(150, y - 20, 650, y - 20, 700, y);
        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // 绘制放大区域框
    ctx.beginPath();
    ctx.arc(250, 300, 80, 0, Math.PI * 2);
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 绘制放大线
    ctx.beginPath();
    ctx.moveTo(320, 250);
    ctx.lineTo(400, 150);
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制放大的肌纤维
    ctx.beginPath();
    ctx.arc(500, 150, 100, 0, Math.PI * 2);
    ctx.fillStyle = '#f9f9f9';
    ctx.fill();
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 绘制肌纤维内部结构
    for (let i = 0; i < 8; i++) {
        const x = 430 + i * 20;
        ctx.beginPath();
        ctx.moveTo(x, 80);
        ctx.lineTo(x, 220);
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 10;
        ctx.stroke();
    }
    
    // 绘制横纹
    for (let i = 0; i < 7; i++) {
        const y = 90 + i * 20;
        ctx.beginPath();
        ctx.moveTo(430, y);
        ctx.lineTo(570, y);
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // 添加标签
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('骨骼肌整体结构', 400, 50);
    
    ctx.font = '16px Arial';
    ctx.fillText('肌束', 200, 150);
    ctx.fillText('肌纤维', 500, 70);
    ctx.fillText('肌原纤维', 500, 240);
    
    // 转换为图像URL
    return canvas.toDataURL('image/png');
}

// 创建肌节结构图像
function createSarcomereImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // 绘制背景
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制肌节
    // Z线
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(100, 100, 5, 200);
    ctx.fillRect(695, 100, 5, 200);
    
    // I带
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(105, 100, 100, 200);
    ctx.fillRect(595, 100, 100, 200);
    
    // A带
    ctx.fillStyle = '#bdc3c7';
    ctx.fillRect(205, 100, 390, 200);
    
    // H带
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(300, 100, 200, 200);
    
    // M线
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(398, 100, 4, 200);
    
    // 绘制细肌丝（肌动蛋白）
    ctx.fillStyle = '#e74c3c';
    // 左侧
    for (let i = 0; i < 10; i++) {
        const y = 110 + i * 20;
        ctx.fillRect(105, y, 195, 5);
    }
    // 右侧
    for (let i = 0; i < 10; i++) {
        const y = 110 + i * 20;
        ctx.fillRect(500, y, 195, 5);
    }
    
    // 绘制粗肌丝（肌凝蛋白）
    ctx.fillStyle = '#3498db';
    for (let i = 0; i < 9; i++) {
        const y = 120 + i * 20;
        ctx.fillRect(205, y, 390, 10);
    }
    
    // 绘制交叉桥
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
        const x1 = 220 + i * 30;
        const x2 = 550 - i * 30;
        if (x1 < 300 || x1 > 500) {
            // 左上方交叉桥
            ctx.beginPath();
            ctx.moveTo(x1, 130);
            ctx.lineTo(x1 - 10, 110);
            ctx.stroke();
            
            // 左下方交叉桥
            ctx.beginPath();
            ctx.moveTo(x1, 270);
            ctx.lineTo(x1 - 10, 290);
            ctx.stroke();
        }
        
        if (x2 > 500 || x2 < 300) {
            // 右上方交叉桥
            ctx.beginPath();
            ctx.moveTo(x2, 130);
            ctx.lineTo(x2 + 10, 110);
            ctx.stroke();
            
            // 右下方交叉桥
            ctx.beginPath();
            ctx.moveTo(x2, 270);
            ctx.lineTo(x2 + 10, 290);
            ctx.stroke();
        }
    }
    
    // 添加标签
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('肌节结构', 400, 50);
    
    ctx.font = '16px Arial';
    ctx.fillText('Z线', 100, 330);
    ctx.fillText('Z线', 700, 330);
    ctx.fillText('I带', 150, 330);
    ctx.fillText('I带', 650, 330);
    ctx.fillText('A带', 400, 330);
    ctx.fillText('H带', 400, 350);
    ctx.fillText('M线', 400, 370);
    
    ctx.fillStyle = '#e74c3c';
    ctx.fillText('细肌丝（肌动蛋白）', 150, 80);
    
    ctx.fillStyle = '#3498db';
    ctx.fillText('粗肌丝（肌凝蛋白）', 400, 80);
    
    // 转换为图像URL
    return canvas.toDataURL('image/png');
}

// 创建肌纤维类型比较图像
function createFiberTypeComparisonImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // 绘制背景
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 定义三种肌纤维类型的颜色
    const typeIColor = '#e74c3c';    // 红色 - I型（慢缩）
    const typeIIaColor = '#f39c12';  // 橙色 - IIa型（快缩耐力型）
    const typeIIxColor = '#3498db';  // 蓝色 - IIx型（快缩力量型）
    
    // 绘制标题
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('骨骼肌纤维类型比较', 400, 40);
    
    // 绘制肌纤维横截面
    const centerY = 200;
    const radius = 80;
    
    // I型肌纤维
    ctx.beginPath();
    ctx.arc(200, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = typeIColor;
    ctx.fill();
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制I型肌纤维内部结构
    ctx.fillStyle = '#c0392b';
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius * 0.8;
        const x = 200 + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const dotRadius = 3 + Math.random() * 4;
        
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // IIa型肌纤维
    ctx.beginPath();
    ctx.arc(400, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = typeIIaColor;
    ctx.fill();
    ctx.strokeStyle = '#d35400';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制IIa型肌纤维内部结构
    ctx.fillStyle = '#d35400';
    for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius * 0.8;
        const x = 400 + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const dotRadius = 2 + Math.random() * 3;
        
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // IIx型肌纤维
    ctx.beginPath();
    ctx.arc(600, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = typeIIxColor;
    ctx.fill();
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制IIx型肌纤维内部结构
    ctx.fillStyle = '#2980b9';
    for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius * 0.8;
        const x = 600 + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const dotRadius = 1 + Math.random() * 2;
        
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 添加肌纤维类型标签
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('I型（慢缩型）', 200, centerY - radius - 20);
    ctx.fillText('IIa型（快缩耐力型）', 400, centerY - radius - 20);
    ctx.fillText('IIx型（快缩力量型）', 600, centerY - radius - 20);
    
    // 绘制特性比较表格
    const tableTop = 350;
    const rowHeight = 40;
    const colWidth = 200;
    
    // 表格标题
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('肌纤维类型特性比较', 400, tableTop - 20);
    
    // 表格头部
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(100, tableTop, colWidth, rowHeight);
    ctx.fillRect(100 + colWidth, tableTop, colWidth, rowHeight);
    ctx.fillRect(100 + colWidth * 2, tableTop, colWidth, rowHeight);
    ctx.fillRect(100 + colWidth * 3, tableTop, colWidth, rowHeight);
    
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('特性', 100 + colWidth / 2, tableTop + rowHeight / 2 + 5);
    ctx.fillText('I型（慢缩型）', 100 + colWidth + colWidth / 2, tableTop + rowHeight / 2 + 5);
    ctx.fillText('IIa型（快缩耐力型）', 100 + colWidth * 2 + colWidth / 2, tableTop + rowHeight / 2 + 5);
    ctx.fillText('IIx型（快缩力量型）', 100 + colWidth * 3 + colWidth / 2, tableTop + rowHeight / 2 + 5);
    
    // 表格内容
    const properties = [
        '收缩速度',
        '力量产生',
        '耐疲劳性',
        '线粒体密度',
        '毛细血管密度'
    ];
    
    const typeIValues = [
        '慢',
        '低',
        '高',
        '高',
        '高'
    ];
    
    const typeIIaValues = [
        '中等',
        '中等',
        '中等',
        '中等',
        '中等'
    ];
    
    const typeIIxValues = [
        '快',
        '高',
        '低',
        '低',
        '低'
    ];
    
    for (let i = 0; i < properties.length; i++) {
        const y = tableTop + rowHeight * (i + 1);
        
        // 交替行背景色
        if (i % 2 === 0) {
            ctx.fillStyle = '#f9f9f9';
        } else {
            ctx.fillStyle = '#ecf0f1';
        }
        
        ctx.fillRect(100, y, colWidth, rowHeight);
        ctx.fillRect(100 + colWidth, y, colWidth, rowHeight);
        ctx.fillRect(100 + colWidth * 2, y, colWidth, rowHeight);
        ctx.fillRect(100 + colWidth * 3, y, colWidth, rowHeight);
        
        // 填充文本
        ctx.font = '16px Arial';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'left';
        ctx.fillText(properties[i], 110, y + rowHeight / 2 + 5);
        
        ctx.textAlign = 'center';
        ctx.fillText(typeIValues[i], 100 + colWidth + colWidth / 2, y + rowHeight / 2 + 5);
        ctx.fillText(typeIIaValues[i], 100 + colWidth * 2 + colWidth / 2, y + rowHeight / 2 + 5);
        ctx.fillText(typeIIxValues[i], 100 + colWidth * 3 + colWidth / 2, y + rowHeight / 2 + 5);
    }
    
    // 转换为图像URL
    return canvas.toDataURL('image/png');
}

// 创建神经肌肉接头图像
function createNeuromuscularJunctionImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    
    // 绘制背景
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制标题
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('神经肌肉接头结构', 400, 40);
    
    // 绘制肌纤维
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(100, 200, 600, 150);
    
    // 绘制肌膜
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(700, 200);
    ctx.stroke();
    
    // 绘制肌膜后褶皱
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
        const x = 300 + i * 20;
        ctx.beginPath();
        ctx.moveTo(x, 200);
        ctx.lineTo(x, 230);
        ctx.stroke();
    }
    
    // 绘制神经末梢
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.moveTo(300, 150);
    ctx.bezierCurveTo(350, 130, 450, 130, 500, 150);
    ctx.bezierCurveTo(550, 170, 450, 200, 400, 200);
    ctx.bezierCurveTo(350, 200, 250, 170, 300, 150);
    ctx.fill();
    
    // 绘制神经轴突
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.moveTo(300, 150);
    ctx.lineTo(280, 130);
    ctx.lineTo(260, 100);
    ctx.lineTo(240, 60);
    ctx.lineTo(320, 150);
    ctx.fill();
    
    // 绘制突触小泡
    ctx.fillStyle = '#2980b9';
    for (let i = 0; i < 30; i++) {
        const x = 320 + Math.random() * 160;
        const y = 150 + Math.random() * 40;
        const radius = 2 + Math.random() * 3;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 绘制突触间隙
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(300, 190, 200, 10);
    
    // 绘制乙酰胆碱受体
    ctx.fillStyle = '#9b59b6';
    for (let i = 0; i < 20; i++) {
        const x = 310 + i * 10;
        ctx.beginPath();
        ctx.arc(x, 200, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 添加标签
    ctx.font = '16px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    
    // 神经元标签
    ctx.fillText('运动神经末梢', 400, 120);
    ctx.fillText('突触小泡', 450, 170);
    
    // 突触间隙标签
    ctx.fillText('突触间隙', 400, 210);
    
    // 肌纤维标签
    ctx.fillText('肌纤维', 150, 275);
    ctx.fillText('肌膜后褶皱', 400, 240);
    ctx.fillText('乙酰胆碱受体', 400, 260);
    
    // 绘制神经传递过程说明
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('1. 动作电位到达运动神经末梢', 500, 300);
    ctx.fillText('2. 钙离子内流触发突触小泡释放乙酰胆碱', 500, 320);
    ctx.fillText('3. 乙酰胆碱与肌膜上的受体结合', 500, 340);
    ctx.fillText('4. 产生终板电位', 500, 360);
    ctx.fillText('5. 引发肌膜动作电位', 500, 380);
    ctx.fillText('6. 乙酰胆碱酯酶降解乙酰胆碱', 500, 400);
    
    // 转换为图像URL
    return canvas.toDataURL('image/png');
}

// 创建肌肉收缩力-速度关系图像
function createForceVelocityCurveImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // 绘制背景
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制标题
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('肌肉收缩力-速度关系', 400, 40);
    
    // 设置坐标系
    const originX = 100;
    const originY = 500;
    const axisLength = 600;
    const axisHeight = 400;
    
    // 绘制坐标轴
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    
    // X轴
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + axisLength, originY);
    ctx.stroke();
    
    // Y轴
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - axisHeight);
    ctx.stroke();
    
    // 绘制箭头
    // X轴箭头
    ctx.beginPath();
    ctx.moveTo(originX + axisLength, originY);
    ctx.lineTo(originX + axisLength - 10, originY - 5);
    ctx.lineTo(originX + axisLength - 10, originY + 5);
    ctx.closePath();
    ctx.fillStyle = '#2c3e50';
    ctx.fill();
    
    // Y轴箭头
    ctx.beginPath();
    ctx.moveTo(originX, originY - axisHeight);
    ctx.lineTo(originX - 5, originY - axisHeight + 10);
    ctx.lineTo(originX + 5, originY - axisHeight + 10);
    ctx.closePath();
    ctx.fill();
    
    // 添加坐标轴标签
    ctx.font = '16px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('负荷 (% 最大力量)', originX + axisLength / 2, originY + 30);
    
    ctx.save();
    ctx.translate(originX - 30, originY - axisHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('速度 (% 最大速度)', 0, 0);
    ctx.restore();
    
    // 绘制刻度
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const y = originY - (i * 20 / 100) * axisHeight;
        ctx.fillText((i * 20).toString(), originX - 10, y + 5);
        
        // 绘制网格线
        ctx.beginPath();
        ctx.strokeStyle = '#ecf0f1';
        ctx.moveTo(originX, y);
        ctx.lineTo(originX + axisLength, y);
        ctx.stroke();
    }
    
    ctx.textAlign = 'center';
    for (let i = 0; i <= 5; i++) {
        const x = originX + (i * 20 / 100) * axisLength;
        ctx.fillText((i * 20).toString(), x, originY + 15);
        
        // 绘制网格线
        ctx.beginPath();
        ctx.strokeStyle = '#ecf0f1';
        ctx.moveTo(x, originY);
        ctx.lineTo(x, originY - axisHeight);
        ctx.stroke();
    }
    
    // 绘制力-速度曲线
    ctx.beginPath();
    ctx.moveTo(originX, originY - axisHeight);
    
    for (let x = 0; x <= axisLength; x++) {
        const xPercent = x / axisLength;
        const yPercent = 1 - xPercent; // 简化的Hill方程
        const curveX = originX + x;
        const curveY = originY - yPercent * axisHeight;
        
        ctx.lineTo(curveX, curveY);
    }
    
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 绘制功率曲线
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    
    for (let x = 0; x <= axisLength; x++) {
        const xPercent = x / axisLength;
        const yPercent = 1 - xPercent; // 速度
        const power = xPercent * yPercent; // 功率 = 力量 × 速度
        const curveX = originX + x;
        const curveY = originY - power * axisHeight;
        
        ctx.lineTo(curveX, curveY);
    }
    
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 标记最大功率点
    const maxPowerX = originX + axisLength * 0.3; // 理论上在30%最大力量处
    const maxPowerY = originY - 0.3 * 0.7 * axisHeight; // 功率 = 0.3 * 0.7
    
    ctx.beginPath();
    ctx.arc(maxPowerX, maxPowerY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    
    ctx.font = '14px Arial';
    ctx.fillStyle = '#e74c3c';
    ctx.textAlign = 'left';
    ctx.fillText('最大功率点', maxPowerX + 10, maxPowerY);
    
    // 添加图例
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    
    // 力-速度曲线图例
    ctx.fillStyle = '#3498db';
    ctx.fillRect(originX + 50, originY - axisHeight + 30, 20, 10);
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('力-速度曲线', originX + 80, originY - axisHeight + 38);
    
    // 功率曲线图例
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(originX + 50, originY - axisHeight + 60, 20, 10);
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('功率曲线', originX + 80, originY - axisHeight + 68);
    
    // 添加说明文本
    ctx.font = '14px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'left';
    ctx.fillText('• 肌肉收缩速度与负荷成反比', originX + 300, originY - axisHeight + 30);
    ctx.fillText('• 无负荷时速度最大，最大负荷时速度为零', originX + 300, originY - axisHeight + 50);
    ctx.fillText('• 功率在中等负荷（约30%最大力量）时达到最大值', originX + 300, originY - axisHeight + 70);
    
    // 转换为图像URL
    return canvas.toDataURL('image/png');
}

// 导出图像生成函数
window.generateMuscleImages = {
    createMuscleStructureImage,
    createSarcomereImage,
    createFiberTypeComparisonImage,
    createNeuromuscularJunctionImage,
    createForceVelocityCurveImage
};
