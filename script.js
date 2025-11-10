// ===========================
// Navigation Menu Toggle
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ===========================
    // Smooth Scrolling
    // ===========================

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.nav-bar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // Tabs Functionality
    // ===========================

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ===========================
    // Literature Filters
    // ===========================

    const filterButtons = document.querySelectorAll('.filter-btn');
    const literatureItems = document.querySelectorAll('.literature-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterCategory = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter literature items
            literatureItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterCategory === 'all' || itemCategory === filterCategory) {
                    item.style.display = 'block';
                    item.setAttribute('data-category-visible', 'true');
                } else {
                    item.style.display = 'none';
                    item.setAttribute('data-category-visible', 'false');
                }
            });
        });
    });

    // ===========================
    // Initialize Charts
    // ===========================

    initializeCharts();
});

// ===========================
// ECharts Initialization
// ===========================

function initializeCharts() {
    // Chart 1: Gait Cycle Angles
    initGaitCycleChart();

    // Chart 2: Ground Reaction Force
    initGRFChart();

    // Chart 3: EMG Heatmap
    initEMGHeatmap();

    // Chart 4: COP Trajectory
    initCOPTrajectory();

    // Chart 5: Comparison Chart
    initComparisonChart();
}

// ===========================
// Chart 1: Gait Cycle Joint Angles
// ===========================

function initGaitCycleChart() {
    const chartDom = document.getElementById('gait-cycle-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    // Simulate gait cycle data (0-100% of gait cycle)
    const gaitCycle = Array.from({ length: 101 }, (_, i) => i);

    // Normal ankle dorsiflexion/plantarflexion pattern
    const normalAnkle = gaitCycle.map(x => {
        // Simplified gait pattern: dorsiflexion in stance, plantarflexion in swing
        if (x < 10) return -5 + x * 0.5;
        if (x < 50) return 0 + (50 - x) * 0.3;
        if (x < 60) return -15 + (x - 50) * 2;
        if (x < 100) return 5 - (x - 60) * 0.125;
        return 0;
    });

    // CAI ankle pattern (reduced ROM, altered pattern)
    const caiAnkle = gaitCycle.map(x => {
        if (x < 10) return -3 + x * 0.3;
        if (x < 50) return 0 + (50 - x) * 0.2;
        if (x < 60) return -10 + (x - 50) * 1.5;
        if (x < 100) return 5 - (x - 60) * 0.125;
        return 0;
    });

    const option = {
        title: {
            text: '踝关节背/跖屈角度-步态周期曲线',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 600,
                color: '#1d1d1f'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            formatter: function (params) {
                let result = `步态周期: ${params[0].axisValue}%<br/>`;
                params.forEach(param => {
                    result += `${param.seriesName}: ${param.value.toFixed(1)}°<br/>`;
                });
                return result;
            }
        },
        legend: {
            data: ['正常对照', 'CAI患者'],
            top: 30,
            textStyle: {
                fontSize: 14
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
            top: '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: gaitCycle,
            name: '步态周期 (%)',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                fontSize: 14,
                fontWeight: 500
            },
            axisLabel: {
                interval: 19
            }
        },
        yAxis: {
            type: 'value',
            name: '角度 (°)',
            nameTextStyle: {
                fontSize: 14,
                fontWeight: 500
            },
            axisLabel: {
                formatter: '{value}°'
            }
        },
        series: [
            {
                name: '正常对照',
                type: 'line',
                data: normalAnkle,
                smooth: true,
                lineStyle: {
                    color: '#30d158',
                    width: 3
                },
                itemStyle: {
                    color: '#30d158'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(48, 209, 88, 0.3)' },
                        { offset: 1, color: 'rgba(48, 209, 88, 0.05)' }
                    ])
                }
            },
            {
                name: 'CAI患者',
                type: 'line',
                data: caiAnkle,
                smooth: true,
                lineStyle: {
                    color: '#ff3b30',
                    width: 3
                },
                itemStyle: {
                    color: '#ff3b30'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(255, 59, 48, 0.3)' },
                        { offset: 1, color: 'rgba(255, 59, 48, 0.05)' }
                    ])
                }
            }
        ]
    };

    myChart.setOption(option);

    // Responsive resize
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// ===========================
// Chart 2: Ground Reaction Force
// ===========================

function initGRFChart() {
    const chartDom = document.getElementById('grf-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const stancePhase = Array.from({ length: 61 }, (_, i) => i);

    // Normal vertical GRF pattern (two peaks)
    const normalGRF = stancePhase.map(x => {
        if (x < 15) return 0 + x * 7;
        if (x < 25) return 105 - (x - 15) * 1.5;
        if (x < 40) return 90 + (x - 25) * 1.3;
        if (x < 60) return 110 - (x - 40) * 5.5;
        return 0;
    });

    // CAI GRF pattern (reduced peaks, altered loading)
    const caiGRF = stancePhase.map(x => {
        if (x < 15) return 0 + x * 6;
        if (x < 25) return 90 - (x - 15) * 1;
        if (x < 40) return 80 + (x - 25) * 1.2;
        if (x < 60) return 98 - (x - 40) * 4.9;
        return 0;
    });

    const option = {
        title: {
            text: '垂直地面反作用力对比',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 600,
                color: '#1d1d1f'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                let result = `支撑期: ${params[0].axisValue}%<br/>`;
                params.forEach(param => {
                    result += `${param.seriesName}: ${param.value.toFixed(1)}% BW<br/>`;
                });
                return result;
            }
        },
        legend: {
            data: ['正常对照', 'CAI患者'],
            top: 30,
            textStyle: {
                fontSize: 14
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
            top: '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: stancePhase,
            name: '支撑期 (%)',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                fontSize: 14,
                fontWeight: 500
            },
            axisLabel: {
                interval: 9
            }
        },
        yAxis: {
            type: 'value',
            name: '垂直GRF (% BW)',
            nameTextStyle: {
                fontSize: 14,
                fontWeight: 500
            },
            max: 120
        },
        series: [
            {
                name: '正常对照',
                type: 'line',
                data: normalGRF,
                smooth: true,
                lineStyle: {
                    color: '#0071e3',
                    width: 3
                },
                itemStyle: {
                    color: '#0071e3'
                }
            },
            {
                name: 'CAI患者',
                type: 'line',
                data: caiGRF,
                smooth: true,
                lineStyle: {
                    color: '#ff9500',
                    width: 3,
                    type: 'dashed'
                },
                itemStyle: {
                    color: '#ff9500'
                }
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// ===========================
// Chart 3: EMG Heatmap
// ===========================

function initEMGHeatmap() {
    const chartDom = document.getElementById('emg-heatmap');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const muscles = ['腓骨长肌', '腓骨短肌', '胫前肌', '腓肠肌外侧头', '胫后肌', '比目鱼肌'];
    const gaitPhases = ['着地初期', '载荷响应', '站立中期', '站立末期', '摆动前期', '摆动中期', '摆动末期'];

    // Simulated EMG activation data (0-100% MVC)
    const emgData = [
        // Peroneus longus
        [45, 62, 38, 28, 15, 8, 22],
        // Peroneus brevis
        [38, 55, 32, 24, 12, 5, 18],
        // Tibialis anterior
        [55, 42, 25, 35, 28, 45, 62],
        // Gastrocnemius lateral
        [22, 38, 52, 68, 45, 12, 8],
        // Tibialis posterior
        [32, 48, 58, 52, 35, 15, 12],
        // Soleus
        [18, 35, 48, 72, 52, 8, 5]
    ];

    const data = [];
    muscles.forEach((muscle, i) => {
        gaitPhases.forEach((phase, j) => {
            data.push([j, i, emgData[i][j]]);
        });
    });

    const option = {
        title: {
            text: '肌电激活热图（正常步态周期）',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 600,
                color: '#1d1d1f'
            }
        },
        tooltip: {
            position: 'top',
            formatter: function (params) {
                return `${muscles[params.value[1]]}<br/>${gaitPhases[params.value[0]]}<br/>激活度: ${params.value[2]}% MVC`;
            }
        },
        grid: {
            left: '15%',
            right: '10%',
            bottom: '15%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: gaitPhases,
            splitArea: {
                show: true
            },
            axisLabel: {
                interval: 0,
                rotate: 30,
                fontSize: 12
            }
        },
        yAxis: {
            type: 'category',
            data: muscles,
            splitArea: {
                show: true
            },
            axisLabel: {
                fontSize: 12
            }
        },
        visualMap: {
            min: 0,
            max: 80,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
            inRange: {
                color: ['#e8f4fd', '#0071e3', '#0051a5', '#003d7a']
            },
            text: ['高', '低'],
            textStyle: {
                fontSize: 12
            }
        },
        series: [
            {
                name: 'EMG激活',
                type: 'heatmap',
                data: data,
                label: {
                    show: true,
                    formatter: '{c}%',
                    fontSize: 11
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// ===========================
// Chart 4: COP Trajectory
// ===========================

function initCOPTrajectory() {
    const chartDom = document.getElementById('cop-trajectory');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    // Simulate COP trajectory data (anterior-posterior vs medial-lateral)
    const normalCOP = [];
    const caiCOP = [];

    // Normal trajectory (relatively straight, centered)
    for (let i = 0; i <= 100; i++) {
        const ap = i * 2.5; // Anterior-posterior: 0 to 250mm
        const ml = 50 + Math.sin(i * 0.1) * 8; // Medial-lateral: centered around 50mm
        normalCOP.push([ap, ml]);
    }

    // CAI trajectory (more lateral deviation)
    for (let i = 0; i <= 100; i++) {
        const ap = i * 2.5;
        const ml = 55 + Math.sin(i * 0.1) * 12; // More lateral shift and variability
        caiCOP.push([ap, ml]);
    }

    const option = {
        title: {
            text: '压力中心（COP）轨迹对比',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 600,
                color: '#1d1d1f'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return `${params.seriesName}<br/>前后: ${params.value[0].toFixed(1)} mm<br/>内外侧: ${params.value[1].toFixed(1)} mm`;
            }
        },
        legend: {
            data: ['正常对照', 'CAI患者'],
            top: 30,
            textStyle: {
                fontSize: 14
            }
        },
        grid: {
            left: '12%',
            right: '10%',
            bottom: '15%',
            top: '20%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            name: '前后方向 (mm)',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                fontSize: 14,
                fontWeight: 500
            },
            min: 0,
            max: 260
        },
        yAxis: {
            type: 'value',
            name: '内外侧方向 (mm)',
            nameTextStyle: {
                fontSize: 14,
                fontWeight: 500
            },
            min: 20,
            max: 80
        },
        series: [
            {
                name: '正常对照',
                type: 'line',
                data: normalCOP,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    color: '#30d158',
                    width: 3
                },
                itemStyle: {
                    color: '#30d158'
                },
                markPoint: {
                    data: [
                        { name: '起点', coord: normalCOP[0], symbol: 'circle', symbolSize: 10, itemStyle: { color: '#30d158' } },
                        { name: '终点', coord: normalCOP[100], symbol: 'circle', symbolSize: 10, itemStyle: { color: '#30d158' } }
                    ]
                }
            },
            {
                name: 'CAI患者',
                type: 'line',
                data: caiCOP,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    color: '#ff3b30',
                    width: 3
                },
                itemStyle: {
                    color: '#ff3b30'
                },
                markPoint: {
                    data: [
                        { name: '起点', coord: caiCOP[0], symbol: 'circle', symbolSize: 10, itemStyle: { color: '#ff3b30' } },
                        { name: '终点', coord: caiCOP[100], symbol: 'circle', symbolSize: 10, itemStyle: { color: '#ff3b30' } }
                    ]
                }
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// ===========================
// Chart 5: Comparison Chart
// ===========================

function initComparisonChart() {
    const chartDom = document.getElementById('comparison-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const parameters = [
        '踝关节背屈ROM',
        '踝关节外翻力矩',
        '步速',
        '垂直GRF峰值',
        '腓骨肌激活',
        '单腿站立时间'
    ];

    // Data normalized to percentage of healthy side
    const healthySide = [100, 100, 100, 100, 100, 100];
    const affectedSide = [72, 72, 83, 92, 65, 75]; // CAI affected side as % of healthy

    const option = {
        title: {
            text: '患侧 vs 健侧生物力学参数对比',
            subtext: '（健侧标准化为100%）',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 600,
                color: '#1d1d1f'
            },
            subtextStyle: {
                fontSize: 12,
                color: '#6e6e73'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                let result = `${params[0].axisValue}<br/>`;
                params.forEach(param => {
                    result += `${param.seriesName}: ${param.value}%<br/>`;
                });
                return result;
            }
        },
        legend: {
            data: ['健侧', '患侧'],
            top: 50,
            textStyle: {
                fontSize: 14
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '25%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: parameters,
            axisLabel: {
                interval: 0,
                rotate: 20,
                fontSize: 12
            }
        },
        yAxis: {
            type: 'value',
            name: '相对值 (%)',
            nameTextStyle: {
                fontSize: 14,
                fontWeight: 500
            },
            max: 110,
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [
            {
                name: '健侧',
                type: 'bar',
                data: healthySide,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#30d158' },
                        { offset: 1, color: '#30d158' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                barWidth: '35%'
            },
            {
                name: '患侧',
                type: 'bar',
                data: affectedSide,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ff9500' },
                        { offset: 1, color: '#ffb340' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                barWidth: '35%',
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    fontSize: 11,
                    fontWeight: 600
                }
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
