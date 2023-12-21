const visHookElements = [];

const updateVisHook = () => {
    visHookElements.forEach((e) => {
        // https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
        let rect = e.getBoundingClientRect();
        let inView = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)

        e.classList.toggle('is-inview', inView);
    });
}

const addVisHooks = () => {
    const hb = document.querySelectorAll("#visHook");

    hb.forEach((ele) => {
        visHookElements.push(ele);
    });

    updateVisHook();

    addEventListener('scroll', (event) => {updateVisHook();});
}