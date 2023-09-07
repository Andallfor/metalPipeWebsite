// note that this is different from how about.js works, we need to modify element after creating it so pass in the parent node here as well
const createHeader = (text, ele, color) => {
    let added = `
        <div class="flex justify-center items-center h-auto max-w-[1920px]">
            <span class="z-[1] grid w-full text-center text-7xl sm:text-8xl md:text-9xl font-[1000] font-mono ${color} section-header-grid"></span>
        </div>`
    
    ele.innerHTML += added;
    let grid = ele.querySelector('.section-header-grid');
    grid.setAttribute('style', `grid-template-columns: repeat(${text.length + 2}, minmax(0, 1fr));`)

    grid.innerHTML += '<p></p>';
    for (let i = 0; i < text.length; i++) {
        grid.innerHTML += `<p>${text[i]}</p>`;
    }
    grid.innerHTML += '<p></p>';
};

const headerInit = () => {
    const hr = document.querySelectorAll(".section-header");
    hr.forEach((ele) => {
        const t = ele.getAttribute('header-text');
        const c = ele.getAttribute('header-color');
        createHeader(t, ele, c);
    });
};