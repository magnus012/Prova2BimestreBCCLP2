import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tela404 from "./component/tela/Tela404";
import TelaHome from "./component/tela/TelaHome"
import TelaMensagem from "./component/tela/TelaMensagem"
import TelaUsuario from "./component/tela/TelaUsuario";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TelaHome />} />
          <Route path="/usuario" element={<TelaUsuario />} />
          <Route path="/mensagem" element={<TelaMensagem />} />
          <Route path="*" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
