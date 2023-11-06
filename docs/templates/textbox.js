const createTextboxR = (header, text) => {
    return `
        <div class="group" data-scroll>
            <div class="flex justify-end items-start z-10">
                <p class="z-10 absolute tracking-widest text-7xl font-mono text-slate-50 opacity-0 translate-x-40 group-[.is-inview]:opacity-100 group-[.is-inview]:translate-x-0 transition-all duration-700 delay-100 ease-in-out">${header}</p>
                <div class="relative z-0 w-full h-[45px] translate-y-[30.6px] bg-gradient-to-r from-purple-600/70 via-fuchsia-500/70 inset-x-20 scale-x-0 group-[.is-inview]:scale-x-100 transition-transform duration-1000 origin-right delay-100 ease-in-out"></div>
            </div>
            <div class="h-[30.6px]"></div>
            <div class="h-4"></div>
            <div class="flex justify-end items-end relative">
                <div class="z-10 absolute h-full w-1 bg-purple-600 scale-y-0 group-[.is-inview]:scale-y-100 delay-1000 transition-transform origin-top duration-500"></div>
                <p class="tracking-wide font-mono text-stone-200 text-2xl text-right w-1/3 opacity-0 translate-x-16 delay-[1600ms] group-[.is-inview]:opacity-100 group-[.is-inview]:translate-x-0 transition-all ease-in-out duration-700">${text}</p>
                <div class="w-8"></div>
            </div>
        </div>
    `;
};

const createTextboxL = (header, text) => {
    return `
        <div class="z-10">
            <p class="z-10 absolute tracking-widest text-7xl text-center font-mono text-slate-50">${header}</p>
            <div class="relative z-0 w-full h-[45px] translate-y-[30.6px] bg-gradient-to-l from-purple-600/70 via-fuchsia-500/70 -inset-x-20"></div>
        </div>
        <div class="h-[30.6px]"></div> <!-- account for highlight translation :skull: (68% * 45px, which is height of highlight) -->
        <div class="h-4"></div>
        <div class="grid grid-cols-20 w-5/6"> <!-- only slightly scuffed -->
            <div class="col-span-1 z-10 h-full w-1 bg-purple-600"></div>
            <p class="col-span-19 tracking-wide font-mono text-stone-200 text-2xl text-left">${text}</p>
        </div>
    `;
};

const textboxInit = () => {
    const tb = document.querySelectorAll(".textbox");
    tb.forEach((ele) => {
        const h = ele.getAttribute('textbox-header');
        const t = ele.getAttribute('textbox-text');

        let dir = 'l';
        if (ele.hasAttribute('textbox-r')) dir = 'r';

        if (dir == 'l') ele.innerHTML += createTextboxL(h, t);
        else ele.innerHTML += createTextboxR(h, t);
    });
};