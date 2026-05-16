import { NavLink } from "react-router";

const Sidebar = () => {
  const menu = [
    { id: 1, emoji: "📌", name: "Today", link: "/" },
    { id: 2, emoji: "📅", name: "Upcoming", link: "/upcoming" },
    { id: 3, emoji: "🌟", name: "Important", link: "/important" },
    { id: 4, emoji: "✔️", name: "Completed", link: "/completed" },
    { id: 5, emoji: "🗑️", name: "Trash", link: "/trash" },
    { id: 6, emoji: "⚙️", name: "Settings", link: "/settings" },
  ];

  return (
    <aside className="flex flex-col max-w-2xs w-full h-screen px-6 gap-6 taskly-bg-aside taskly-border-right ">
      <div className="logo flex items-center justify-start h-max pt-12 pb-4">
        <img className="w-3/4" src="/Taskly-Logo.svg" alt="Taskly Logo" />
      </div>
      <div className="menu-div">
        <ul className="flex flex-col gap-4">
          {menu.map((item) => {
            return (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `
                  relative h-15 flex items-center gap-3 px-4 rounded-2xl 
                  no-underline text-sm transition-all duration-300
                  ${
                    isActive
                      ? "taskly-li-bg text-white taskly-shadow-li border border-white/10"
                      : "text-[#b9bdc8] hover:bg-white/5 hover:text-white"
                  }
                  `
                  }
                >
                  <span>{item.emoji}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
