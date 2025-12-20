import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideBar";

function App() {
  return (
    <div className="taskly-glass min-h-[95.5vh] ">
      <Header />

      <main role="main" className="flex flex-col sm:flex-row min-h-screen m-4">
        <SideBar />
      </main>
    </div>
  );
}

export default App;
