const createMainSection = (isRight, media, isImage, titleIntro, title, body, mobile) => {
    if (mobile != null) media = mobile;

    const m = isImage ? 
        `<img src="${media}" class="w-[95%] object-contain">` : 
        `<video id="main-section-vid-id" muted class="w-[95%] object-contain"><source src="${media}" type="video/mp4"/></video>`;

    return `
    <div class="md:grid grid-cols-2">
        <div class="flex justify-center md:justify-start ${isRight ? "" : "md:order-last"}">
            <div class="flex justify-start flex-col">
                ${m}
                <div id="main-section-vid-hook"></div>
            </div>
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
        let isImage = false;
        let media = "";
        if (ele.hasAttribute('main-section-img')) {
            isImage = true;
            media = ele.getAttribute('main-section-img');
        } else media = ele.getAttribute('main-section-vid');

        let mobile = null;
        if (ele.hasAttribute('main-section-mobile') && window.screen.width <= 768) { // 768 is the md breakpoint
            mobile = ele.getAttribute('main-section-mobile');
        }

        const ti = ele.getAttribute('main-section-intro');
        const t = ele.getAttribute('main-section-title');
        const b = ele.getAttribute('main-section-body');

        ele.innerHTML += createMainSection(r, media, isImage, ti, t, b, mobile);

        if (ele.hasAttribute('main-section-vid-slider')) { // shush i dont want to hear it
            const vid = ele.querySelector('#main-section-vid-id');
            const hook = ele.querySelector('#main-section-vid-hook');

            const thresholds = [17, 10, 35, 18, 20];

            hook.innerHTML += `
            <div class="w-full flex items-center relative flex-col">
                <div id="main-section-vid-slider" class="relative w-[90%]"></div>

                <div class="w-[87%] font-mono text-main-dark text-sm text-center flex gap-2 flex-row">
                    <div class="w-[17%] h-2 border-b-2 border-l-2 border-r-2 border-main-dark flex justify-center relative">
                        <span class="mt-4 absolute w-full">Active Intake</span>
                    </div>
                    <div class="w-[10%] h-2 border-b-2 border-l-2 border-r-2 border-main-dark flex justify-center relative">
                        <span class="mt-4 absolute w-full">Extract Pixel</span>
                    </div>
                    <div class="w-[35%] h-2 border-b-2 border-l-2 border-r-2 border-main-dark flex justify-center relative">
                        <span class="mt-4 absolute w-full">Extend Lift</span>
                    </div>
                    <div class="w-[18%] h-2 border-b-2 border-l-2 border-r-2 border-main-dark flex justify-center relative">
                        <span class="mt-4 absolute w-full">Prepare Arm</span>
                    </div>
                    <div class="w-[20%] h-2 border-b-2 border-l-2 border-r-2 border-main-dark flex justify-center relative">
                        <span class="mt-4 absolute w-full">Finish Extension</span>
                    </div>
                </div>
            </div>
            `;

            const initValue = 75;
            const vidTime = 5; // TODO: dont do this - but .seekable seems to only return 0 length?

            const slider = new RangeSliderPips({
                target: hook.querySelector('#main-section-vid-slider'),
                props: {
                    min: 0,
                    max: 100,
                    pips: true,
                    pipstep: 1,
                    springValues: {
                        stiffness: 1,
                        damping: 1,
                    },
                    values: [initValue],
                    hoverable: false,
                }
            });

            const pipHook = hook.querySelector('.rangePips');

            const fillHook = hook.querySelector('.rangeSlider').appendChild(document.createElement('div'));
            fillHook.classList.add('h-[8px]', 'bg-gradient-to-l', 'rounded-sm', 'from-main-light', 'to-main-dark');
            fillHook.style.width = initValue + '%';

            hook.querySelector('.rangeHandle').appendChild(document.createElement('div')).classList.add('rotate-45', 'translate-y-[3px]', 'bg-white', 'relative', '-z-10', 'h-[16px]', 'w-[16px]');

            slider.$on('change', (e) => {
                vid.currentTime = (e.detail.value / 100.0) * vidTime;
                const v = e.detail.previousValue == e.detail.startValue ? 0 : e.detail.previousValue;

                // new pips in range, toggle them
                if (v == 0) {
                    // v is 0 if we click to a new position - so we have to just check over everything (shush i cant be bothered)
                    for (let i = 0; i < 100; i++) {
                        if (i < e.detail.value) pipHook.children[i].classList.add('in-range-custom');
                        else pipHook.children[i].classList.remove('in-range-custom');
                    }
                } else {
                    if (v < e.detail.value) {
                        for (let i = v; i < e.detail.value; i++) {
                            pipHook.children[i].classList.add('in-range-custom');
                        }
                    } else {
                        for (let i = v; i > e.detail.value; i--) {
                            pipHook.children[i].classList.remove('in-range-custom');
                        }
                    }
                }

                fillHook.style.width = e.detail.value + '%';
            });
            

            vid.currentTime = (initValue / 100.0) * vidTime;

            for (let i = 0; i < 100; i++) {
                if (i < initValue) pipHook.children[i].classList.add('in-range-custom');
                else pipHook.children[i].classList.remove('in-range-custom');
            }
        }
    });
}