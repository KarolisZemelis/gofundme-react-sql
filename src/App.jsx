import { Route, Routes } from "react-router";
import { DataProvider } from "./Contexts/Data";
import { AuthProvider } from "./Contexts/Auth";
import { MessagesProvider } from "./Contexts/Messages";
import Nav from "./Components/Navigation/Nav";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Page404 from "./Pages/Page404";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Admin from "./Pages/Admin";
import NewStory from "./Pages/NewStory";

function App() {
  return (
    <MessagesProvider>
      <AuthProvider>
        <DataProvider>
          <Body>
            <Nav />
            <Routes>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="newStory" element={<NewStory />} />
              <Route path="admin" element={<Admin />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
          </Body>
        </DataProvider>
      </AuthProvider>
    </MessagesProvider>
  );
}

export default App;
