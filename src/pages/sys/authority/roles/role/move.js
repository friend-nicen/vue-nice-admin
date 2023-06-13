/**
 * 移动
 */
import {onUnmounted, ref} from "vue";
import {useStorage} from "@vueuse/core";

export default function () {

    const role_dom = ref(null); //dom
    const width = useStorage("role_width", 270); //宽度

    let start_point = {
        pointX: null,
        startX: null
    }; //起始点
    let movable = false; //跟随移动


    /**
     * $e
     * 鼠标移动
     * */
    const move = (e) => {

        if (movable) {
            width.value = start_point.startX + (e.pageX - start_point.pointX);
            e.preventDefault();
            e.stopPropagation();
        }

    }

    /**
     * 开始
     * @param e
     */
    const start = (e) => {

        movable = true;
        start_point.pointX = e.pageX;
        start_point.startX = width.value;

    }

    /*
    * 停止移动
    * */
    const end = () => {
        movable = false;
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);

    /*
    * 解除事件
    * */
    onUnmounted(() => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", end);
    })

    return {
        role_dom,
        start,
        width
    }

}