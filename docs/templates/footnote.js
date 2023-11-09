const createFootnote = (header, text, ref) => {
    return `
        <span class="peer">${ref}</span><!--
     --><div id="footnote-note" class="absolute group">
            <div class="relative w-[65vw] flex justify-start flex-row -z-10 -translate-y-6">
                <div class="min-w-[calc(min(40vw,48rem)+2rem)]"></div>
                <div>
                    <span class="relative">
                    <span class="block absolute -inset-1 -inset-x-2 -skew-y-1 bg-gradient-to-r transition-all duration-200 from-main-dark to-main-light peer-hover:group-[]:-ml-5 peer-hover:group-[]:-mr-5"></span>
                        <span class="relative font-black text-stone-50">${header}</span><!--
                --></span>
                    <div class="font-extralight text-stone-800 text-base">${text}</div><!--
            --></div>
            </div>
        </div><!--
-->`;
};

const elements = [];

const updateFootnotePositions = () => {
    let currentBottom = 0;
    elements.forEach((e) => {
        const element = e.querySelector("#footnote-note");
        element.style.marginTop = "0px";
        let rect = element.getBoundingClientRect();
        let t = rect.top + window.scrollY;
        let b = rect.bottom + window.scrollY;
        
        let offset = t > currentBottom ? 0 : currentBottom - t + 25;
        element.style.marginTop = offset + "px";

        currentBottom = b + offset;
    });
};

const footnoteInit = () => {
    const fb = document.querySelectorAll("#footnote");

    fb.forEach((ele) => {
        const h = ele.getAttribute('footnote-header');
        const t = ele.getAttribute('footnote-text');
        const r = ele.getAttribute('footnote-highlight');

        ele.classList.add('underline', 'text-stone-950', 'decoration-main-light', 'font-semibold');

        ele.innerHTML += createFootnote(h, t, r);

        elements.push(ele);
    });

    updateFootnotePositions();

    addEventListener('resize', (event) => {updateFootnotePositions();});
    addEventListener('fullscreenchange', (event) => {updateFootnotePositions();});
};