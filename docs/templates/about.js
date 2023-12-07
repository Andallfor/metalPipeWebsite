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

const memberDir = (name, desc, src, color, dir, id) => {
    // name must be first last
    const first = name.split(' ')[0];
    const last = name.split(' ')[1];

    const resize = new ResizeObserver(e => {
        const ele = document.getElementById('about-id-' + id);
        if (ele.offsetWidth < ele.scrollWidth) ele.textContent = first + ' ' + last[0] + '.';
        else ele.textContent = first + ' ' + last;
    });

    resize.observe(document.body);

    return `
        <div class="flex w-full justify-around items-center ${dir['sortMain']}">
            <div class="w-full md:w-1/2 relative flex">
                <div class="absolute flex justify-center items-center w-full h-full">
                    <div data-scroll data-scroll-repeat class="scale-x-0 is-inview:scale-x-100 transition-all duration-700 absolute ${dir['origin']} ${dir['margin']} ${dir['gradient']} ${color['from']} ${color['via']} lg:h-16 h-10 w-[calc(100%-4rem)] md:w-[calc(100%-7rem)]"></div> <!-- margin 28 bc img w is 48 (/2 = 24) and img mr is 4 -->
                </div>
                <div class="flex justify-start items-center w-full ${dir['sortSub']}">
                    <img src="${src}" class="z-20 lg:h-48 lg:w-48 h-24 w-24 rounded-full lg:m-4 m-2 inline relative ring-2 ${color['ring']} ring-offset-2 ring-offset-black/0"/>
                    <p id="about-id-${id}" class="tracking-widest font-mono text-stone-200 lg:text-5xl sm:text-3xl text-xl inline align-middle z-20 relative truncate">${name}</p>
                </div>
            </div>
            <p class="md:w-1/3 tracking-wide font-mono text-stone-200 lg:text-2xl sm:text-sm text-xs text-center mb-4 md:mb-0">${desc}</p>
        </div>
    `;
};

const headerDir = (title, color, dir) => {
    return `        
        <div class="flex justify-start w-screen -mb-8">
            <span class="relative font-mono text-slate-50 w-full flex ${dir['justify']}">
                <span class="absolute -inset-2 ${color['main']} w-full translate-y-[20%] scale-y-50 scale-x-105"></span>
                <span class="z-10 text-3xl md:text-6xl xl:text-8xl text-slate-50 font-mono font-black md:tracking-widest relative">&nbsp;${title}&nbsp;</span>
            </span>
        </div>
        <div class="h-nav"></div>
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
        'pink': {
            'main': 'bg-pink-500',
            'from': 'from-pink-500/70',
            'via': 'via-pink-500/70',
            'ring': 'ring-pink-500',
        }
    };

    const direction = {
        'left': {
            'margin': 'lg:ml-28 ml-14',
            'gradient': 'bg-gradient-to-r',
            'sortMain': 'flex-col md:flex-row',
            'sortSub': 'flex-row',
            'justify': 'justify-start',
            'origin': 'origin-left',
        },
        'right': {
            'margin': 'lg:mr-28 mr-14',
            'gradient': 'bg-gradient-to-l',
            'sortMain': 'flex-col md:flex-row-reverse',
            'sortSub': 'flex-row-reverse',
            'justify': 'justify-end',
            'origin': 'origin-right',
        },
        'middle': {
            'justify': 'justify-center',
        },
    };

    let memberId = 0;

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
            ele.innerHTML += memberDir(n, d, s, colorPreset[c], direction[dir], memberId);
            memberId++;
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