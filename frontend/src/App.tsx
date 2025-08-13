import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/navbar";
import Versus from "./components/versus";
import { Footer } from "./components/footer";

function App() {
  const [showApi, setShowApi] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-content-center items-center">
      <Navbar showApi={showApi} setShowApi={setShowApi} />
      <Versus />
      <Footer />
    </div>
  );
}

export default App;
