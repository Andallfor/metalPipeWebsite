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

const memberDir = (name, desc, src, color, dir) => {
    return `
        <div class="flex w-full justify-around items-center ${dir['sort']}">
            <div class="w-1/2 inline relative">
                <div class="absolute flex justify-center items-center w-full h-full">
                    <div data-scroll data-scroll-repeat class="scale-x-0 is-inview:scale-x-100 transition-all duration-700 absolute ${dir['origin']} ${dir['margin']} ${dir['gradient']} ${color['from']} ${color['via']} lg:h-16 h-10" style="width: calc(100% - 7rem)"></div> <!-- margin 28 bc img w is 48 (/2 = 24) and img mr is 4 -->
                </div>
                <div class="flex justify-start items-center w-full ${dir['sort']}">
                    <img src="${src}" class="z-20 lg:h-48 lg:w-48 h-24 w-24 rounded-full lg:m-4 m-2 inline relative ring-2 ${color['ring']} ring-offset-2 ring-offset-black/0"/>
                    <p class="tracking-widest font-mono text-stone-200 lg:text-5xl text-3xl inline align-middle z-20 relative truncate">${name}</p>
                </div>
            </div>
            <p class="w-1/4 tracking-wide font-mono text-stone-200 lg:text-2xl text-sm text-center">${desc}</p>
        </div>
    `;
};

const headerDir = (title, color, dir) => {
    return `
        <div class="lg:h-nav-2x h-nav"></div>
        <div class="w-full relative 2xl:h-[128px] xl:h-[96px] lg:h-[72px] md:h-[60px] sm:h-[48px] h-[40px]">
            <div class="${color['main']} 2xl:h-[4.6rem] xl:h-[3.45rem] lg:h-[2.5875rem] md:h-[2.15625rem] sm:h-[1.725rem] h-[1.4375rem] w-full absolute bottom-0 scale-x-[1000%]"></div> <!-- totally not a hack -->
            <div class="flex ${dir['justify']}">
                <p class="z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-slate-50 font-mono font-black tracking-widest relative">&nbsp;${title}&nbsp;</p>
            </div>
        </div>
        <div class="lg:h-nav-2x h-nav"></div>
    `;
};

const aboutInit = () => {
    const colorPreset = {
        'red': {
            'main': 'bg-red-main',
            'from': 'from-red-dark/70',
            'via': 'via-red-light/70',
            'ring': 'ring-red-main'
        },
        'sky': {
            'main': 'bg-sky-main',
            'from': 'from-sky-dark/70',
            'via': 'via-sky-light/70',
            'ring': 'ring-sky-main'
        },
        'fuchsia': {
            'main': 'bg-main-light',
            'from': 'from-main-dark/70',
            'via': 'via-main-light/70',
            'ring': 'ring-main-main'
        },
        'purple': {
            'main': 'bg-main-main',
            'from': 'from-main-dark/70',
            'via': 'via-main-light/70',
            'ring': 'ring-main-main'
        },
    };

    const direction = {
        'left': {
            'margin': 'lg:ml-28 ml-14',
            'gradient': 'bg-gradient-to-r',
            'sort': 'flex-row',
            'justify': 'justify-start',
            'origin': 'origin-left',
        },
        'right': {
            'margin': 'lg:mr-28 mr-14',
            'gradient': 'bg-gradient-to-l',
            'sort': 'flex-row-reverse',
            'justify': 'justify-end',
            'origin': 'origin-right',
        },
        'middle': {
            'justify': 'justify-center',
        },
    };

    const am = document.querySelectorAll(".about-member");
    am.forEach((ele) => {
        const n = ele.getAttribute('about-title');
        const d = ele.getAttribute('about-desc');
        const s = ele.getAttribute('about-src');
        const c = ele.getAttribute('about-color');

        let dir = 'left';
        if (ele.hasAttribute('about-right')) dir = 'right';
        else if (ele.hasAttribute('about-middle')) dir = 'middle';

        if (dir == 'middle') {
            dir = '10'; // placeholder
        } else {
            ele.innerHTML += memberDir(n, d, s, colorPreset[c], direction[dir]);
        }
    });

    const ah = document.querySelectorAll(".about-header");
    ah.forEach((ele) => {
        const t = ele.getAttribute('about-title');
        const c = ele.getAttribute('about-color');

        let dir = 'left';
        if (ele.hasAttribute('about-right')) dir = 'right';
        else if (ele.hasAttribute('about-middle')) dir = 'middle';

        ele.innerHTML += headerDir(t, colorPreset[c], direction[dir]);
    });
};