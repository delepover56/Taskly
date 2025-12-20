const SideBar = () => {
    return (

        <aside className="hidden taskly-glass w-full sticky top-0 lg:w-72 xl:w-80 p-5 lg:p-6 sm:flex flex-col gap-6 border border-white/10 shadow-[0_0_35px_rgba(148,97,180,0.25)]">
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
            <div className="mt-auto flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_10px_28px_rgba(15,16,40,0.5)]">
                <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-white/20 to-white/5 text-white ring-1 ring-white/10 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-linear-to-br hover:from-white/30 hover:to-white/10 hover:ring-white/30 hover:shadow-[0_0_0_1px_rgba(148,97,180,0.35), 0_0_32px_rgba(148,97,180,0.5), 0_14px_28px_rgba(8,10,30,0.75)] active:translate-y-0 active:scale-[0.96] active:bg-white/10 active:shadow-[inset_0_0_12px_rgba(148,97,180,0.45)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 fill-white/90"
                    >
                        <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z"></path>
                    </svg>
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-white/20 to-white/5 text-white ring-1 ring-white/10 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-linear-to-br hover:from-white/30 hover:to-white/10 hover:ring-white/30 hover:shadow-[0_0_0_1px_rgba(148,97,180,0.35), 0_0_32px_rgba(148,97,180,0.5), 0_14px_28px_rgba(8,10,30,0.75)] active:translate-y-0 active:scale-[0.96] active:bg-white/10 active:shadow-[inset_0_0_12px_rgba(148,97,180,0.45)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 fill-white/90"
                    >
                        <path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"></path>
                        <path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"></path>
                    </svg>
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-white/20 to-white/5 text-white ring-1 ring-white/10 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-linear-to-br hover:from-white/30 hover:to-white/10 hover:ring-white/30 hover:shadow-[0_0_0_1px_rgba(148,97,180,0.35), 0_0_32px_rgba(148,97,180,0.5), 0_14px_28px_rgba(8,10,30,0.75)] active:translate-y-0 active:scale-[0.96] active:bg-white/10 active:shadow-[inset_0_0_12px_rgba(148,97,180,0.45)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 fill-white/90"
                    >
                        <path d="M19.002 3h-14c-1.103 0-2 .897-2 2v4h2V5h14v14h-14v-4h-2v4c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.898-2-2-2z"></path>
                        <path d="m11 16 5-4-5-4v3.001H3v2h8z"></path>
                    </svg>
                </button>
            </div>
        </aside>
    );
};

export default SideBar;
