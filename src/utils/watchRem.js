/*
* @author 友人a丶
* @date 2022-07-11
* 自动调整rem的大小
* */


export default function () {

    let l = () => {

        let r = document.documentElement, o = r.offsetWidth / 100;
        o < 16 && (o = 16), r.style.fontSize = o + "px", window.rem = o
    };

    l();
    window.addEventListener("resize",()=>l());

}
