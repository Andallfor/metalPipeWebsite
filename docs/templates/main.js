const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
    const togglePrevNextBtnsState = () => {
        if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled');
        else prevBtn.setAttribute('disabled', 'disabled');

        if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled');
        else nextBtn.setAttribute('disabled', 'disabled');
    };

    emblaApi
        .on('select', togglePrevNextBtnsState)
        .on('init', togglePrevNextBtnsState)
        .on('reInit', togglePrevNextBtnsState);

    return () => {
        prevBtn.removeAttribute('disabled');
        nextBtn.removeAttribute('disabled');
    };
};

const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
    const scrollPrev = () => emblaApi.scrollPrev();
    const scrollNext = () => emblaApi.scrollNext();

    prevBtn.addEventListener('click', scrollPrev, false);
    nextBtn.addEventListener('click', scrollNext, false);

    const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(emblaApi, prevBtn, nextBtn);

    return () => {
        removeTogglePrevNextBtnsActive();
        prevBtn.removeEventListener('click', scrollPrev, false);
        nextBtn.removeEventListener('click', scrollNext, false);
    };
};

const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
    let dotNodes = [];

    const addDotBtnsWithClickHandlers = () => {
        dotsNode.innerHTML = emblaApi
        .scrollSnapList()
        .map(() => '<button class="embla__dot" type="button"></button>')
        .join('');

        const scrollTo = (index) => emblaApi.scrollTo(index);

        dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'));
        dotNodes.forEach((dotNode, index) => dotNode.addEventListener('click', () => scrollTo(index), false));
    };

    const toggleDotBtnsActive = () => {
        const previous = emblaApi.previousScrollSnap();
        const selected = emblaApi.selectedScrollSnap();
        dotNodes[previous].classList.remove('embla__dot--selected');
        dotNodes[selected].classList.add('embla__dot--selected');
    };

    emblaApi
        .on('init', addDotBtnsWithClickHandlers)
        .on('reInit', addDotBtnsWithClickHandlers)
        .on('init', toggleDotBtnsActive)
        .on('reInit', toggleDotBtnsActive)
        .on('select', toggleDotBtnsActive);

    return () => dotsNode.innerHTML = '';
};

const createMainSection = (isRight, media, isImage, titleIntro, title, body, mobile) => {
    if (mobile != null) media = mobile;

    const m = isImage ? 
        (media.split(' ').length > 1 ? 
            `<div class="embla w-[95%] h-full relative flex justify-center">
                <div class="embla__viewport overflow-hidden h-full">
                    <div class="embla__container h-full flex">
                    </div>
                </div>

                <div class="flex h-full w-6 left-0 absolute justify-center flex-col ml-2">
                    <button class="embla__button--prev w-full" type="button">
                        <svg class="fill-main-light transition-all duration-300 active:opacity-5" viewBox="0 0 532 532">
                        <path d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"></path>
                        </svg>
                    </button>
                </div>

                <div class="flex h-full w-6 right-0 absolute justify-center flex-col mr-2">
                    <button class="embla__button--next w-full" type="button">
                        <svg class="fill-main-light hover:fill-main-light transition-all duration-300 active:opacity-5" viewBox="0 0 532 532">
                        <path d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"></path>
                        </svg>
                    </button>
                </div>

                <div class="embla__dots flex place-content-center z-10 absolute w-full bottom-0"></div>
            </div>` :
            `<img src="${media}" class="w-[95%] object-contain">`
            ) :
        `<video id="main-section-vid-id" poster="./images/main/cad5s.jpg" preload="metadata" playsinline muted class="w-[95%]">
            <source src="${media}" type="video/mp4"/>
            Your browser does not support the video tag.
        </video>`;

    return `
    <div class="md:grid grid-cols-2 order-last">
        <div class="flex flex-col ${isRight ? "" : "order-1"}">
            <div class="flex justify-center ${isRight ? "md:justify-end" : "md:justify-start"}">
                ${m}
            </div>
            <div id="main-section-vid-hook"></div>
        </div>
        <div class="flex flex-col flex-start h-full ${isRight ? "" : "-order-1"}">
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

            let hasInit = false;

            vid.oncanplay = (e) => {
                if (hasInit) return;
                hasInit = true;

                hook.innerHTML += `
                <div class="w-full flex items-center relative flex-col">
                    <div id="main-section-vid-slider" class="relative w-[90%] flex items-center"></div>

                    <!-- 32 px is total slider margin -->
                    <div id="main-section-vid-sections" class="w-[calc(90%-32px)] font-mono text-main-dark text-[0.6rem] md:text-xs 2xl:text-sm text-center flex gap-2 flex-row">
                        <div class="w-[17%] flex flex-col items-center group transition-all duration-500 ease-in-out">
                            <div class="w-full h-2 border-b-2 border-l-2 border-r-2 border-main-dark group-[.main-section-vid-slider-selected]:border-main-light flex items-center relative"></div>
                            <span class="mt-2 h-16">Active Intake</span>
                        </div>
                        <div class="w-[10%] flex flex-col items-center group transition-all duration-500 ease-in-out">
                            <div class="w-full h-2 border-b-2 border-l-2 border-r-2 border-main-dark group-[.main-section-vid-slider-selected]:border-main-light flex items-center relative"></div>
                            <span class="mt-2 h-16">Extract Pixels</span>
                        </div>
                        <div class="w-[35%] flex flex-col items-center group transition-all duration-500 ease-in-out">
                            <div class="w-full h-2 border-b-2 border-l-2 border-r-2 border-main-dark group-[.main-section-vid-slider-selected]:border-main-light flex items-center relative"></div>
                            <span class="mt-2 h-16">Extend Lift</span>
                        </div>
                        <div class="w-[18%] flex flex-col items-center group transition-all duration-500 ease-in-out main-section-vid-slider-selected">
                            <div class="w-full h-2 border-b-2 border-l-2 border-r-2 border-main-dark group-[.main-section-vid-slider-selected]:border-main-light flex items-center relative"></div>
                            <span class="mt-2 h-16">Prepare Arm</span>
                        </div>
                        <div class="w-[20%] flex flex-col items-center group transition-all duration-500 ease-in-out">
                            <div class="w-full h-2 border-b-2 border-l-2 border-r-2 border-main-dark group-[.main-section-vid-slider-selected]:border-main-light flex items-center relative"></div>
                            <span class="mt-2 h-16">Finish Extension</span>
                        </div>
                    </div>
                </div>
                `;

                const initValue = 76;
                const vidTime = 5; // TODO: dont do this - but .seekable seems to only return 0 length?
                const stepSize = 2;

                const slider = new RangeSliderPips({
                    target: hook.querySelector('#main-section-vid-slider'),
                    props: {
                        min: 0,
                        max: 100,
                        pips: true,
                        pipstep: 1,
                        step: stepSize,
                        springValues: {
                            stiffness: 1,
                            damping: 1,
                        },
                        values: [initValue],
                        hoverable: false,
                        vertical: false,
                        reversed: false,
                        suffix: 'ms',
                        first: "label",
                        last: "label",
                        formatter: (v, i, p) => ((p / 100) * 800).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false}), // max value is 800 ms
                    }
                });

                const pipHook = hook.querySelector('.rangePips');

                const fillHook = hook.querySelector('.rangeSlider').appendChild(document.createElement('div'));
                fillHook.classList.add('h-[8px]', 'bg-gradient-to-l', 'rounded-sm', 'from-main-light', 'to-main-dark', 'relative');
                fillHook.style.width = initValue + '%';

                hook.querySelector('.rangeHandle').appendChild(document.createElement('div')).classList.add('rotate-45', 'translate-y-[3px]', 'bg-white', 'relative', '-z-10', 'h-[16px]', 'w-[16px]');

                // this is the length of each section added
                const thresholds = [17, 27, 62, 80, 100];
                const sectionChildren = hook.querySelector('#main-section-vid-sections').children;

                slider.$on('change', (e) => {
                    vid.currentTime = (e.detail.value / 100.0) * vidTime;

                    // yes this is unoptimized no im not fixing it rn
                    for (let i = 0; i < pipHook.children.length; i++) {
                        if (i < e.detail.value / stepSize) pipHook.children[i].classList.add('in-range-custom');
                        else pipHook.children[i].classList.remove('in-range-custom');
                    }

                    // update fill
                    fillHook.style.width = e.detail.value + '%';

                    // highlight the current 'section' slider is in
                    for (let i = 0; i < sectionChildren.length; i++) {
                        sectionChildren[i].classList.remove('main-section-vid-slider-selected');

                        if (e.detail.value <= thresholds[i] && (i == 0 || e.detail.value > thresholds[i - 1])) {
                            sectionChildren[i].classList.add('main-section-vid-slider-selected');
                        }
                    }
                });
                
                // init with correct parameters
                vid.currentTime = (initValue / 100.0) * vidTime;

                for (let i = 0; i < pipHook.children.length; i++) {
                    if (i < initValue / stepSize) pipHook.children[i].classList.add('in-range-custom');
                    else pipHook.children[i].classList.remove('in-range-custom');
                }
            };
        }

        if (isImage && media.split(' ').length > 1) {
            const carouselHook = ele.querySelector('.embla__container');
            media.split(' ').forEach((i) => {
                carouselHook.innerHTML += `
                    <div class="flex-100 min-w-0 relative">
                        <img class="block w-full h-full object-contain" src="${i}" loading="lazy"/>
                    </div>`;
            });

            const emblaNode = ele.querySelector('.embla')
            const viewportNode = emblaNode.querySelector('.embla__viewport')
            const dotsNode = document.querySelector('.embla__dots');
            const prevBtn = emblaNode.querySelector('.embla__button--prev')
            const nextBtn = emblaNode.querySelector('.embla__button--next')
            const options = { loop: true };

            const emblaApi = EmblaCarousel(viewportNode, options);

            const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode);
            const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(emblaApi, prevBtn, nextBtn);

            emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
            emblaApi.on('destroy', removePrevNextBtnsClickHandlers);
        }
    });
}