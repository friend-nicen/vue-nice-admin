import {onMounted, onUnmounted, provide, ref} from "vue";
import load from "@/common/load";
import ClipboardJS from "clipboard"

export default function () {

    const text = ref(''); //复制的文本
    const copy_dom = ref(null); //复制dom


    let clip = null;

    onUnmounted(() => {
        clip.destroy();
    })


    provide("text", text); //提供到下级组件
    provide("copy_dom", copy_dom); //提供到下级组件

    onMounted(() => {
        clip = new ClipboardJS(copy_dom.value);
        clip.on("success", () => {
            load.success("复制成功！")
        })
        clip.on("error", () => {
            load.success("复制失败！")
        })
    })


    return {
        text,
        copy_dom,
    }


}