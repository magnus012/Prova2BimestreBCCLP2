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
          <Route path="/Prova2BimestreBCCLP2/" element={<TelaHome />} />
          <Route path="/Prova2BimestreBCCLP2/usuario" element={<TelaUsuario />} />
          <Route path="/Prova2BimestreBCCLP2/mensagem" element={<TelaMensagem />} />
          <Route path="*" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
