import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideBar";
import MobileFilter from "./components/UI/MobileFilter";

function App() {
  return (
    <div className="taskly-shell mx-auto min-h-[calc(100vh-1.75rem)] max-w-[1500px] p-2 sm:p-3">
      <Header />
      <MobileFilter />

      <main
        role="main"
        className="mt-4 grid min-h-[calc(100vh-8.5rem)] grid-cols-1 gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]"
      >
        <SideBar />
      </main>
    </div>
  );
}

export default App;
