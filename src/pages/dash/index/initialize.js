import dayjs from "dayjs";
import {provide, ref} from "vue";

export default function () {

    /*禁止选择的时间范围*/
    let disabledDate =(datetime) => {
            let today = dayjs(); //当天的时间
            return !today.isAfter(dayjs(datetime));
        };

    /*绑定默认时间范围*/
    let range=ref([
        dayjs().subtract(7, 'day'),
        dayjs()
    ]);


    provide('range',range); //定义被选的时间范围,向子孙组件传递


    return {
        range,
        disabledDate
    }

}