const updateVisHook = (entires, observer) => {
    entires.forEach((e) => {
        e.target.classList.toggle("is-inview", e.isIntersecting || (e.target.classList.contains("visHook-perm") && e.target.classList.contains("is-inview")));
    });
}

const addVisHooks = () => {
    const hb = document.querySelectorAll("#visHook");

    let observer = new IntersectionObserver(updateVisHook, {});

    hb.forEach((ele) => {
        observer.observe(ele);
    });
}