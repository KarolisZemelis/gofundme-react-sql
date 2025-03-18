import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Nav from "./Components/Navigation/Nav";
import Page404 from "./Pages/Page404";
import Body from "./Components/Body";
import { DataProvider } from "./Contexts/Data";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <DataProvider>
        <Body>
          <Nav />
          <Routes>
            <Route index element={<Home />} />
            <Route path="aboutUs" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Body>
      </DataProvider>
    </>
  );
}

export default App;
