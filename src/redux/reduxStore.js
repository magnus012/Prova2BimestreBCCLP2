import { configureStore } from "@reduxjs/toolkit";
import reduxUsuarios from "./reduxUsuario";
import reduxMensagens from './reduxMensagem';

const store = configureStore({
    reducer: {
        usuarios: reduxUsuarios,
        mensagens: reduxMensagens
    }
});

export default store;
