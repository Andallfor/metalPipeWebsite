const createFooter = () => {
    return `
    <div class="w-screen h-48 sm:h-36 bg-stone-900">
        <div class="flex justify-center items-center h-full">
            <div class="sm:w-1/2 sm:min-w-[630px] w-full sm:mr-0 sm:ml-0 mr-4 ml-4 h-full relative flex justify-between sm:flex-row flex-col">
                <div class="flex justify-start items-center h-full flex-row sm:mt-0 mt-2">
                    <img src="./icons/png/logoNoBg96.png" class="sm:h-24 sm:w-24 h-16 w-16">
                    <div class="flex justify-center flex-col ml-4 font-mono">
                        <div class="font-extrabold text-main-light text-2xl">Team Metal Pipe #23741</div>
                        <div class="font-thin text-stone-400 italic text-sm">Taking the Pipe out of Pipe Dream</div>
                    </div>
                </div>
                <div class="sm:h-0 h-10"></div>
                <div class="flex justify-start sm:justify-end items-start h-full flex-col sm:flex-row text-stone-500 font-sans text-sm sm:ml-0 ml-4">
                    <div class="flex justify-start items-end flex-row sm:flex-col text-sm">
                        <div class="h-6"></div>
                        <div class="font-bold text-stone-300 text-base tracking-wide min-w-[85px] sm:min-w-0">CONTACT</div>
                        <div class="h-2"></div>
                        <a class="sm:ml-0 ml-6 z-40" href="mailto:teammetalpipe@gmail.com">Email</a>
                        <div class="h-1"></div>
                        <a class="sm:ml-0 ml-6 z-40" href="https://www.tiktok.com/t/ZT884QV5g/">TikTok</a>
                        <div class="h-1"></div>
                        <a class="sm:ml-0 ml-6 z-40" href="https://www.instagram.com/teammetalpipe/">Instagram</a>
                    </div>
                    <div class="w-8 md:w-16 h-2"></div> <!-- buffer -->
                    <div class="flex justify-start items-end flex-row sm:flex-col text-sm">
                        <div class="h-6"></div>
                        <div class="font-bold text-stone-300 text-base tracking-wide min-w-[85px] sm:min-w-0">DONATE</div>
                        <div class="h-2"></div>
                        <a class="sm:ml-0 ml-6 z-40" href="https://hcb.hackclub.com/donations/start/teammetalpipe">Hack Club</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};

const footerInit = () => {
    let ele = document.getElementById('footer');
    ele.innerHTML += createFooter();
};