/*
* @author 友人a丶
* @date 
* 窗口弹出后，设置overflow:hidden屏蔽下层页面的滚动
* 窗口关闭后，恢复overflow:auto
* */
import {watch} from "vue";

export default function (props) {

    let not_to = false; //需要防止滚动

    watch(() => props.visible, () => {

        if (not_to) return;

        if (props.visible) {


            if (document.body.classList.contains('with_overflow')) {
                not_to = true;
                return;
            }

            document.body.classList.add("with_overflow");
        } else {
            document.body.classList.remove("with_overflow");
        }
    })
}