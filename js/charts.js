// 图表管理类 - 使用 ECharts 初始化和管理所有图表
class FitnessCharts {
    constructor() {
        this.charts = {};
        this.processor = null;
        this.currentDimension = 'monthly'; // 默认按月
    }

    async init() {
        // 加载数据
        const records = await this.loadRecords();
        this.processor = new FitnessDataProcessor(records);

        // 初始化所有图表
        this.initHeartRateChart();
        this.initDistanceChart();
        this.initCaloriesChart();
        this.initStepsChart();

        // 绑定事件
        this.bindEvents();
    }

    // 心率趋势图
    initHeartRateChart() {
        const chartDom = document.getElementById('heartRateChart');
        const myChart = echarts.init(chartDom);
        const data = this.processor.aggregateBy(this.currentDimension);

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
            },
            legend: {
                data: ['平均心率', '最大心率']
            },
            xAxis: {
                type: 'category',
                data: data.map(d => d.month || d.year || d.week)
            },
            yAxis: [
                {
                    type: 'value',
                    name: '平均心率 (bpm)',
                    position: 'left'
                },
                {
                    type: 'value',
                    name: '最大心率 (bpm)',
                    position: 'right'
                }
            ],
            series: [
                {
                    name: '平均心率',
                    type: 'line',
                    data: data.map(d => d.avgHeartRate),
                    smooth: true,
                    itemStyle: { color: '#667eea' },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
                            { offset: 1, color: 'rgba(102, 126, 234, 0.05)' }
                        ])
                    }
                },
                {
                    name: '最大心率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.map(d => d.maxHeartRate),
                    smooth: true,
                    itemStyle: { color: '#764ba2' }
                }
            ]
        };

        myChart.setOption(option);
        this.charts.heartRate = myChart;
    }

    // 距离趋势图
    initDistanceChart() {
        const chartDom = document.getElementById('distanceChart');
        const myChart = echarts.init(chartDom);
        const data = this.processor.aggregateBy(this.currentDimension);

        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br/>{a}: {c} 公里'
            },
            xAxis: {
                type: 'category',
                data: data.map(d => d.month || d.year || d.week)
            },
            yAxis: {
                type: 'value',
                name: '距离 (公里)'
            },
            series: [{
                name: '平均距离',
                type: 'bar',
                data: data.map(d => d.avgDistance),
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#667eea' },
                        { offset: 1, color: '#764ba2' }
                    ])
                }
            }]
        };

        myChart.setOption(option);
        this.charts.distance = myChart;
    }

    // 卡路里趋势图
    initCaloriesChart() {
        const chartDom = document.getElementById('caloriesChart');
        const myChart = echarts.init(chartDom);
        const data = this.processor.aggregateBy(this.currentDimension);

        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br/>{a}: {c} 千卡'
            },
            xAxis: {
                type: 'category',
                data: data.map(d => d.month || d.year || d.week)
            },
            yAxis: {
                type: 'value',
                name: '卡路里 (千卡)'
            },
            series: [{
                name: '总卡路里',
                type: 'line',
                data: data.map(d => d.totalCalories),
                smooth: true,
                itemStyle: { color: '#f56565' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(245, 101, 101, 0.3)' },
                        { offset: 1, color: 'rgba(245, 101, 101, 0.05)' }
                    ])
                }
            }]
        };

        myChart.setOption(option);
        this.charts.calories = myChart;
    }

    // 步数趋势图
    initStepsChart() {
        const chartDom = document.getElementById('stepsChart');
        const myChart = echarts.init(chartDom);
        const data = this.processor.aggregateBy(this.currentDimension);

        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br/>{a}: {c} 步'
            },
            xAxis: {
                type: 'category',
                data: data.map(d => d.month || d.year || d.week)
            },
            yAxis: {
                type: 'value',
                name: '步数'
            },
            series: [{
                name: '平均步数',
                type: 'bar',
                data: data.map(d => d.avgSteps),
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#48bb78' },
                        { offset: 1, color: '#38a169' }
                    ])
                }
            }]
        };

        myChart.setOption(option);
        this.charts.steps = myChart;
    }

    // 更新所有图表
    updateCharts(dimension) {
        this.currentDimension = dimension;
        const data = this.processor.aggregateBy(dimension);

        // 更新心率图
        this.charts.heartRate.setOption({
            xAxis: { data: data.map(d => d.month || d.year || d.week) },
            series: [
                { data: data.map(d => d.avgHeartRate) },
                { data: data.map(d => d.maxHeartRate) }
            ]
        });

        // 更新距离图
        this.charts.distance.setOption({
            xAxis: { data: data.map(d => d.month || d.year || d.week) },
            series: [{ data: data.map(d => d.avgDistance) }]
        });

        // 更新卡路里图
        this.charts.calories.setOption({
            xAxis: { data: data.map(d => d.month || d.year || d.week) },
            series: [{ data: data.map(d => d.totalCalories) }]
        });

        // 更新步数图
        this.charts.steps.setOption({
            xAxis: { data: data.map(d => d.month || d.year || d.week) },
            series: [{ data: data.map(d => d.avgSteps) }]
        });
    }

    // 绑定事件
    bindEvents() {
        // 时间维度切换
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dimension = e.target.dataset.dimension;
                this.updateCharts(dimension);

                // 更新按钮状态
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // 响应式重绘
        window.addEventListener('resize', () => {
            Object.values(this.charts).forEach(chart => chart.resize());
        });
    }

    async loadRecords() {
        const response = await fetch('content/fitness/running-records.json');
        return await response.json();
    }
}
