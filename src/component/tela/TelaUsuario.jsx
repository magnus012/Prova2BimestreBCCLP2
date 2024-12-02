import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../layouts/Pagina";
import FormUsuario from "../form/FormUsuario";
import TabelaUsuarios from "../tabela/TabelaUsuarios"

export default function TelaUsuario() {
    const [exibirUsuarios, setExibirUsuarios] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        id: "",
        nickname: "",
        urlAvatar: "",
        dataIngresso: "",
        senha: ""
    });

    return (
        <Pagina>
            <Alert className="mt-4 mb-02 success text-center" variant="secondary">
                <h2>
                    Cadastro de Usuário
                </h2>
            </Alert>
            {
                exibirUsuarios ?
                    <TabelaUsuarios
                        usuarioSelecionado={usuarioSelecionado}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                        setExibirUsuarios={setExibirUsuarios}
                        setModoEdicao={setModoEdicao}
                    />
                    :
                    <FormUsuario
                        usuarioSelecionado={usuarioSelecionado}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                        setExibirUsuarios={setExibirUsuarios}
                        setModoEdicao={setModoEdicao}
                        modoEdicao={modoEdicao}
                    />
            }
        </Pagina>
    );
}