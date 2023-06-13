/*
* @author 友人a丶
* @date 
* 
* */


/*数据接口*/
import echarts from '@/common/init-echarts';
import {getDays} from "@/common";
import {inject, onMounted, watch, ref} from "vue";
import load from "@/common/load";
import axios from "axios";


export default function (props) {


    let dom = ref(null); //真实DOM
    let myChart;
    let range = inject('range');

    /*图表的数据*/
    function setOption(days, data) {

        let option = {
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: [props.title]
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        title: "保存为图片"
                    }
                }
            },
            grid: {
                left: '1%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: days
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: props.title,
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    zlevel: 2,
                    z: 2,
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#707eff'
                            },
                            {
                                offset: 1,
                                color: 'rgb(1, 191, 236)'
                            }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: data
                }
            ]
        };

        myChart.setOption(option)
    }

    /*
    * 数据处理
    * */
    let process = (days, res) => {
        /*数据*/
        let data = [];
        /*
        * 遍历每一天
        * */
        for (let i of days) {
            /*
            * 遍历所有数据
            * */
            let temp = 0;
            for (let k of res) {
                if (i == k.datetime) {
                    temp = k.count;
                }
            }
            data.push(temp); //存入数据
        }

        return data;
    }


    /*
    * 请求网络数据
    * */
    let requests = () => {

        /*获取时间范围*/

        let days = getDays(range.value[0], range.value[1]);

        /*判断选择的时间*/
        if (days.length == 0) {
            return;
        }

        load.loading("初始化图表数据...");

        axios.get(`${props.api}?start=${range.value[0].format("YYYY-MM-DD")}&end=${range.value[1].format("YYYY-MM-DD")}`)
            .then((res) => {

                /*判断请求结果*/
                if (res.data.code == 1) {

                    let result = process(days, res.data.data);
                    setOption(days, result); //渲染表格

                } else {
                    load.error(res.data.errMsg);
                }

            }).catch((e) => {
            load.error(e.message);
        }).finally(() => {
            load.loaded();
        })
    }


    /*
    * 时间范围发生变化时，重新请求数据
    * */
    watch(() => range, requests, {
        deep: true
    });

    /*
    * 初始化图表
    * */
    onMounted(() => {
        myChart = echarts.init(dom.value)
        requests(); //初始化数据
    })

    return dom;


}