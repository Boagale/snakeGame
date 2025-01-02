import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div
      className=""
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />
      <canvas className="" id="snakeGameCanvas"></canvas>
    </div>
  );
}

export default App;
