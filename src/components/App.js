import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setInit(true);
  })

  return (
    <>
      {init ? <AppRouter/> : "Initializing..."} 
    </>
  );
}

export default App;
