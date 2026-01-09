import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
    minimum: 0.1,
    easing: "ease",
    speed: 500,
    showSpinner: false,
    trickle: true,
    trickleSpeed: 200,
    parent: "#app",
})
export default {
    start: () => {
        NProgress.start();
    },
    done: () => {
        NProgress.done();
    },
    next: () => {
        NProgress.inc(0.1);
    },
    set: (num) => {
        NProgress.set(num);
    }
}