const SideBar = () => {
    return (

        <aside className="taskly-glass w-full lg:w-72 xl:w-80 p-5 lg:p-6 flex flex-col gap-6 border border-white/10 shadow-[0_0_35px_rgba(148,97,180,0.25)]">
            <div className="flex flex-col justify-center items-center gap-3 text-center rounded-2xl bg-white/5 py-6 border border-white/10">
                <div className="flex w-20 h-20 items-center justify-center rounded-full bg-glowblue/90 text-white taskly-heading ring-1 ring-white/15 shadow-[0_0_25px_rgba(64,94,185,0.45)]">
                    <p className="text-3xl">JD</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="taskly-heading text-sm text-white">Jumbo Dumbo</p>
                    <p className="taskly-para text-xs text-white/60">@dumb-dude</p>
                </div>
            </div>

            <div className="taskly-glass py-5 border border-white/10">
                <h6 className="taskly-heading text-white/70 uppercase tracking-[0.2em] px-5 border-b border-white/10 pb-3">
                    Filters
                </h6>
                <ul className="flex flex-col gap-3 mt-4 w-full px-5">
                    <li className="taskly-para text-white/90 bg-white/5 border border-white/10 rounded-xl px-4 py-2 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                        All Tasks
                    </li>
                    <li className="taskly-para text-white/75 border border-transparent rounded-xl px-4 py-2 hover:bg-white/5 hover:border-white/10 hover:text-white transition-colors cursor-pointer">
                        Completed
                    </li>
                    <li className="taskly-para text-white/75 border border-transparent rounded-xl px-4 py-2 hover:bg-white/5 hover:border-white/10 hover:text-white transition-colors cursor-pointer">
                        Pending
                    </li>
                    <li className="taskly-para text-white/75 border border-transparent rounded-xl px-4 py-2 hover:bg-white/5 hover:border-white/10 hover:text-white transition-colors cursor-pointer">
                        Favorites
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SideBar;
