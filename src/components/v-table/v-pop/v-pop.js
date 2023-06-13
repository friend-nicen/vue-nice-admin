import load from "@/common/load";
import {computed, inject} from "vue";
import {cloneDeep} from "lodash";


export default function () {

    let usedColumns = inject("usedColumns");
    let defaultColumns = inject("defaultColumns");
    let sort = inject('sort'); //排序

    /*
    * 如果有一个不显示
    * 代表没有全选
    * */
    let Allchecked = computed({
        get() {
            for (let i of usedColumns.value) {
                if (!i.display) {
                    return false;
                }
            }
            return true;
        },
        set(newValue) {
            if (newValue) {
                for (let i of usedColumns.value) {
                    i.display = true;
                }
            } else {
                for (let i of usedColumns.value) {
                    if (!i.default) {
                        i.display = false;
                    }
                }
            }
        }
    })


    /*
    * 重置列
    * */
    let reset = () => {
        usedColumns.value = cloneDeep(defaultColumns.value);
        load.success("重置成功！")
    }


    return {
        Allchecked,
        usedColumns,
        reset,
        sort
    }

}