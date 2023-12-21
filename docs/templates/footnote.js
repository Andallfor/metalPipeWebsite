const createFootnote = (header, text, ref) => {
    return `
        <span class="peer" tabindex="1">${ref}</span><!--
     --><div id="footnote-note" class="group xl:-z-10 z-50 xl:absolute fixed max-xl:bottom-0 max-xl:transition-opacity max-xl:duration-300 xl:opacity-100 max-xl:peer-focus:opacity-100 max-xl:peer-hover:opacity-100 opacity-0">
            <!-- left end of text to right end of screen -->
            <div class="absolute xl:relative w-[calc(min(48rem,calc(100vw-64px)))] xl:w-[calc(min(48rem,calc(100vw-64px))/2+50vw-32px)] flex justify-start flex-row -z-10 -translate-y-6">
                <!-- right end of text to right end of screen -->    
                <div class="xl:min-w-[calc(min(48rem,calc(100vw-64px))+1rem)]"></div>
                <div class="-translate-y-full xl:translate-y-0">
                    <span class="relative">
                        <span class="block absolute -inset-1 -inset-x-2 -skew-y-1 bg-gradient-to-r transition-all duration-200 from-main-dark to-main-light xl:peer-hover:group-[]:-ml-3 xl:peer-hover:group-[]:-mr-3"></span>
                        <span class="relative font-black text-stone-50 text-base">${header}</span><!--
                --></span>
                    <div class="relative ml-2 -z-30 xl:z-20">
                        <span class="block absolute -inset-y-3 -inset-x-2 max-xl:bg-stone-50 max-xl:border-2 border-main-light -z-10"></span>
                        <span class="xl:font-extralight text-stone-800 text-xs sm:text-sm md:text-base font-light">${text}</span>
                    </div>
            </div>
            </div>
        </div><!--
-->`;
};

const footnoteElements = [];

const updateFootnotePositions = () => {
    let currentBottom = 0;
    footnoteElements.forEach((e) => {
        const element = e.querySelector("#footnote-note");
        element.style.marginTop = "0px";

        if (window.innerWidth >= 1280) {
            let rect = element.getBoundingClientRect();
            let t = rect.top + window.scrollY;
            let b = rect.bottom + window.scrollY;
            
            let offset = t > currentBottom ? 0 : currentBottom - t + 25;
            element.style.marginTop = offset + "px";

            currentBottom = b + offset;
        }
    });
};

const footnoteInit = () => {
    const fb = document.querySelectorAll("#footnote");

    fb.forEach((ele) => {
        const h = ele.getAttribute('footnote-header');
        const t = ele.getAttribute('footnote-text');
        const r = ele.getAttribute('footnote-highlight');

        ele.classList.add('highlight', 'text-stone-950');

        ele.innerHTML += createFootnote(h, t, r);

        footnoteElements.push(ele);
    });

    updateFootnotePositions();

    addEventListener('resize', (event) => {updateFootnotePositions();});
    addEventListener('fullscreenchange', (event) => {updateFootnotePositions();});
};