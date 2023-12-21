const createMainSection = (isRight, img, titleIntro, title, body) => {
    return `
    <div class="md:grid grid-cols-2">
        <div class="flex justify-center md:justify-start ${isRight ? "" : "md:order-last"}">
            <img src="${img}" class="w-[95%] object-contain">
        </div>
        <div class="flex flex-col flex-start h-full">
            <div id="vis-hook" class="group vis-hook-perm">
                <div class="flex ${isRight ? "justify-end" : "justify-start"}">
                    <div class="font-mono tracking-widest text-2xl lg:text-4xl 2xl:text-6xl ${isRight ? "mr-2 lg:mr-5 2xl:mr-10" : "ml-2 lg:ml-5 2xl:ml-10"}">${titleIntro}</div>
                </div>
                <!-- annoyingly, there is no negative padding - and % unit does not account for margin size. so have to calc -->
                <div class="section-header w-full -mb-2 2xl:-mb-6" header-text="${title}" header-color="text-black" header-half></div>
                <div class="group-[.is-inview]:translate-y-0 -translate-y-[calc(100%-0.5rem)] 2xl:-translate-y-[calc(100%-1.5rem)] transition-transform duration-[900ms] ease-out delay-200">
                    <div class="section-header w-full -mb-2 2xl:-mb-6" header-text="${title}" header-color="text-main-light/40" header-half></div>
                </div>
                <div class="group-[.is-inview]:translate-y-0 -translate-y-[calc(200%-1rem)] 2xl:-translate-y-[calc(200%-3rem)] transition-transform duration-1000 ease-out delay-300">
                    <div class="section-header w-full -mb-2 2xl:-mb-6" header-text="${title}" header-color="text-main-light/10" header-half></div>
                </div>
            </div>

            <div class="h-4"></div>

            <div id="vis-hook" class="flex justify-center items-center flex-grow group vis-hook-perm">
                <div class="w-[90%] md:w-4/5 tracking-wide text-slate-800 text-base lg:text-xl 2xl:text-2xl font-light md:text-left text-justify transition-all ease-out delay-[800ms] duration-1000 -translate-y-[50%] opacity-0 group-[.is-inview]:translate-y-0 group-[.is-inview]:opacity-100">
                    ${body}
                </div>
            </div>
        </div>
    </div>
    `
}

const mainInit = () => {
    const ms = document.querySelectorAll("#main-section");

    ms.forEach((ele) => {
        const r = ele.hasAttribute('main-section-right');
        const i = ele.getAttribute('main-section-img');
        const ti = ele.getAttribute('main-section-intro');
        const t = ele.getAttribute('main-section-title');
        const b = ele.getAttribute('main-section-body');

        ele.innerHTML += createMainSection(r, i, ti, t, b);
    });
}