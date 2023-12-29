const createNavBar = () => {
    return `
        <div class="z-50 fixed w-full h-nav bg-stone-950/90">
            <div class="flex justify-center items-center w-full h-full">
                <div class="relative w-[calc(100%-2.5rem)]">
                    <!-- team logo and name -->
                    <div class="absolute flex justify-start items-center w-full h-full">
                        <a id="nav-bar-main" href="index.html#splash-screen" class="flex flex-row justify-start items-center">
                            <img src="./icons/png/bird48.png" class="w-10 h-10 xs:w-12 xs:h-12"/>
                            <div class="w-2 md:scale-100 scale-0"></div>
                            <p class="text-fuchsia-100 font-mono font-semibold text-2xl md:scale-100 scale-0">Metal Pipe</p>
                        </a>
                    </div>

                    <!-- nav buttons -->
                    <div class="absolute flex justify-end 2xs:justify-center items-center w-full h-full">
                        <div id="nav-bar-main" href="index.html#splash-screen" class="flex flex-row justify-between items-center md:w-80 xs:w-64 w-48">
                            <a id="nav-bar-about" href="./about.html" class="relative group">
                                <div class="absolute bg-gradient-to-b from-main-dark via-main-light -inset-1 -top-5 bottom-12 group-hover:-bottom-12 transition-all ease-in-out duration-200" aria-hidden="true"></div>
                                <p class="text-fuchsia-100 font-semibold text-sm xs:text-base relative">About</p>
                            </a>
                            <a id="nav-bar-blog" href="./blogHome.html" class="relative group">
                                <div class="absolute bg-gradient-to-b from-main-dark via-main-light -inset-1 -top-5 bottom-12 group-hover:-bottom-12 transition-all ease-in-out duration-200" aria-hidden="true"></div>
                                <p class="text-fuchsia-100 font-semibold text-sm xs:text-base relative">Blog Posts</p>
                            </a>
                            <a id="nav-bar-donations" href="./donations.html" class="relative group">
                                <div class="absolute bg-gradient-to-b from-main-dark via-main-light -inset-1 -top-5 bottom-12 group-hover:-bottom-12 transition-all ease-in-out duration-200" aria-hidden="true"></div>
                                <p class="text-fuchsia-100 font-semibold text-sm xs:text-base relative">Donations</p>
                            </a>
                        </div>
                    </div>

                    <!-- socials -->
                    <div class="absolute flex justify-end items-center w-full h-full">
                        <div class="scale-0 2xs:scale-100 flex flex-row justify-center">
                            <a href="https://www.instagram.com/teammetalpipe/"><img class="w-6 h-6 xs:w-8 xs:h-8" src="./icons/png/instagram.png" alt="Our Instagram Account"></a>
                            <div class="w-2"></div>
                            <a href="https://www.tiktok.com/t/ZT884QV5g/"><img class="w-6 h-6 xs:w-8 xs:h-8" src="./icons/png/tiktok.png" alt="Our Tik-Tok Account"></a>
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