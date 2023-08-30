const createNavBar = () => {
    return `
        <div class="z-50 fixed w-screen h-nav bg-stone-950/90">
            <div class="flex justify-center items-center w-full h-full">
                <div class="relative" style="width: calc(100vw - 2.5rem)">
                    <!-- team logo and name -->
                    <div class="absolute flex justify-start items-center w-full h-full">
                        <a id="nav-bar-main" href="index.html#splash-screen" class="flex flex-row justify-start items-center">
                            <img src="../src/icons/png/bird256.png" class="w-12 h-nav"/>
                            <div class="w-2 md:scale-100 scale-0"></div>
                            <p class="text-fuchsia-100 font-mono font-semibold text-2xl md:scale-100 scale-0">Metal Pipe</p>
                        </a>
                    </div>

                    <!-- nav buttons -->
                    <div class="absolute flex justify-center items-center w-full h-full">
                        <div id="nav-bar-main" href="index.html#splash-screen" class="flex flex-row justify-between items-center md:w-80 w-64">
                            <a id="nav-bar-about" href="../src/about.html" class="relative group">
                                <div class="absolute bg-gradient-to-b from-main-dark via-main-light -inset-1 -top-5 bottom-12 group-hover:-bottom-12 transition-all ease-in-out duration-200" aria-hidden="true"></div>
                                <p class="text-fuchsia-100 font-semibold text-base relative">About</p>
                            </a>
                            <a id="nav-bar-sponsors" href="../src/error.html" class="relative group">
                                <div class="absolute bg-gradient-to-b from-main-dark via-main-light -inset-1 -top-5 bottom-12 group-hover:-bottom-12 transition-all ease-in-out duration-200" aria-hidden="true"></div>
                                <p class="text-fuchsia-100 font-semibold text-base relative">Sponsors</p>
                            </a>
                            <a id="nav-bar-blog" href="../src/error.html" class="relative group">
                                <div class="absolute bg-gradient-to-b from-main-dark via-main-light -inset-1 -top-5 bottom-12 group-hover:-bottom-12 transition-all ease-in-out duration-200" aria-hidden="true"></div>
                                <p class="text-fuchsia-100 font-semibold text-base relative">Blog</p>
                            </a>
                            <a id="nav-bar-donations" href="../src/donations.html" class="relative group">
                                <div class="absolute bg-gradient-to-b from-main-dark via-main-light -inset-1 -top-5 bottom-12 group-hover:-bottom-12 transition-all ease-in-out duration-200" aria-hidden="true"></div>
                                <p class="text-fuchsia-100 font-semibold text-base relative">Donations</p>
                            </a>
                        </div>
                    </div>

                    <!-- socials -->
                    <div class="absolute flex justify-end items-center w-full h-full">
                        <a href="../src/error.html" class="absolute">
                            <svg alt="Access our socials" class="fill-slate-50 w-8 h-8 md:scale-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                        </a>
                        <div class="scale-0 md:scale-100 flex flex-row justify-center">
                            <a href="https://www.instagram.com/teammetalpipe/"><img class="w-8 h-8" src="../src/icons/png/instagram.png" alt="Our Instagram Account"></a>
                            <div class="w-2"></div>
                            <a href="https://www.tiktok.com/t/ZT884QV5g/"><img class="w-8 h-8" src="../src/icons/png/tiktok.png" alt="Our Tik-Tok Account"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const navBarInit = () => {
    let ele = document.getElementById('nav-bar');
    ele.innerHTML += createNavBar();
};