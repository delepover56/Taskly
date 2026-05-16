import { useLocation } from "react-router";

const Header = () => {
  const pageTitle = {
    "/": "Dashboard",
    "/upcoming": "Upcoming Tasks",
    "/important": "Important Tasks",
    "/completed": "Completed Tasks",
    "/trash": "Trash",
    "/settings": "Settings",
  };

  const location = useLocation();
  const title = pageTitle[location.pathname] ?? "Dashboard";

  return (
    <header className="flex items-center justify-between p-4 taskly-bg-aside taskly-border-bottom">
      <div>
        <h1 className="text-white text-2xl font-bold">{title}</h1>
      </div>
      <div>
        <input
          type="search"
          results="2"
          name="search-task"
          id="search-task"
          placeholder="Search tasks..."
          className="[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none w-2xs h-11 rounded-2xl border-white/15 border bg-white/5 px-4 text-white outline-none"
        />
      </div>
    </header>
  );
};

export default Header;
