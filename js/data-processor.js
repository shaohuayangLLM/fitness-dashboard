// 数据处理类 - 处理运动数据聚合
class FitnessDataProcessor {
    constructor(records) {
        this.records = records.sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );
    }

    // 按月聚合
    aggregateMonthly() {
        const monthMap = {};

        this.records.forEach(r => {
            const monthKey = r.date.substring(0, 7); // "2025-12"

            if (!monthMap[monthKey]) {
                monthMap[monthKey] = {
                    month: monthKey,
                    totalDistance: 0,
                    totalCalories: 0,
                    totalSteps: 0,
                    avgHeartRates: [],
                    maxHeartRates: [],
                    count: 0
                };
            }

            monthMap[monthKey].totalDistance += r.distance;
            monthMap[monthKey].totalCalories += r.calories;
            monthMap[monthKey].totalSteps += r.steps;
            monthMap[monthKey].avgHeartRates.push(r.avg_heart_rate);
            monthMap[monthKey].maxHeartRates.push(r.max_heart_rate);
            monthMap[monthKey].count++;
        });

        return Object.values(monthMap).map(m => ({
            month: m.month,
            avgDistance: parseFloat((m.totalDistance / m.count).toFixed(2)),
            totalCalories: m.totalCalories,
            avgSteps: Math.round(m.totalSteps / m.count),
            avgHeartRate: Math.round(m.avgHeartRates.reduce((a, b) => a + b, 0) / m.avgHeartRates.length),
            maxHeartRate: Math.max(...m.maxHeartRates),
            count: m.count
        }));
    }

    // 按年聚合
    aggregateYearly() {
        const yearMap = {};

        this.records.forEach(r => {
            const year = r.date.substring(0, 4); // "2025"

            if (!yearMap[year]) {
                yearMap[year] = {
                    year: year,
                    totalDistance: 0,
                    totalCalories: 0,
                    totalSteps: 0,
                    avgHeartRates: [],
                    maxHeartRates: [],
                    count: 0
                };
            }

            yearMap[year].totalDistance += r.distance;
            yearMap[year].totalCalories += r.calories;
            yearMap[year].totalSteps += r.steps;
            yearMap[year].avgHeartRates.push(r.avg_heart_rate);
            yearMap[year].maxHeartRates.push(r.max_heart_rate);
            yearMap[year].count++;
        });

        return Object.values(yearMap).map(y => ({
            year: y.year,
            avgDistance: parseFloat((y.totalDistance / y.count).toFixed(2)),
            totalCalories: y.totalCalories,
            avgSteps: Math.round(y.totalSteps / y.count),
            avgHeartRate: Math.round(y.avgHeartRates.reduce((a, b) => a + b, 0) / y.avgHeartRates.length),
            maxHeartRate: Math.max(...y.maxHeartRates),
            count: y.count
        }));
    }

    // 按周聚合
    aggregateWeekly() {
        const weekMap = {};

        this.records.forEach(r => {
            const date = new Date(r.date);
            const weekKey = this.getWeekKey(date);

            if (!weekMap[weekKey]) {
                weekMap[weekKey] = {
                    week: weekKey,
                    totalDistance: 0,
                    totalCalories: 0,
                    totalSteps: 0,
                    avgHeartRates: [],
                    maxHeartRates: [],
                    count: 0
                };
            }

            weekMap[weekKey].totalDistance += r.distance;
            weekMap[weekKey].totalCalories += r.calories;
            weekMap[weekKey].totalSteps += r.steps;
            weekMap[weekKey].avgHeartRates.push(r.avg_heart_rate);
            weekMap[weekKey].maxHeartRates.push(r.max_heart_rate);
            weekMap[weekKey].count++;
        });

        return Object.values(weekMap).map(w => ({
            week: w.week,
            avgDistance: parseFloat((w.totalDistance / w.count).toFixed(2)),
            totalCalories: w.totalCalories,
            avgSteps: Math.round(w.totalSteps / w.count),
            avgHeartRate: Math.round(w.avgHeartRates.reduce((a, b) => a + b, 0) / w.avgHeartRates.length),
            maxHeartRate: Math.max(...w.maxHeartRates),
            count: w.count
        }));
    }

    // 辅助函数：获取周key
    getWeekKey(date) {
        const year = date.getFullYear();
        const oneJan = new Date(year, 0, 1);
        const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
        const weekNumber = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
        return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
    }
}

// 添加聚合方法到原型
FitnessDataProcessor.prototype.aggregateBy = function(dimension) {
    switch(dimension) {
        case 'monthly': return this.aggregateMonthly();
        case 'yearly': return this.aggregateYearly();
        case 'weekly': return this.aggregateWeekly();
        default: return this.aggregateMonthly();
    }
};
