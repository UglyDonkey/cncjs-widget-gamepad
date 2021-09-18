import params from "../params/params";

const ResizeObserver = require("./ResizeObserver").default;

const setupResizer = () => {
    new ResizeObserver(() => {
        // Use the postMessage API for inter-frame communication
        window.parent.postMessage({
            token: params.token,
            action: {
                type: 'resize',
                payload: {
                    clientHeight: document.body.clientHeight,
                    clientWidth: document.body.clientWidth,
                    offsetHeight: document.body.offsetHeight,
                    offsetWidth: document.body.offsetWidth,
                    scrollHeight: document.body.scrollHeight,
                    scrollWidth: document.body.scrollWidth
                }
            }
        }, '*');
    }).observe(document.body);
}

export default setupResizer;
