import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../service/serviceMensagem";
import ESTADO from "./reduxEstado";

export const consultarMensagens = createAsyncThunk('consultarMensagens', async () => {
    try {
        const resposta = await consultar();
        if (Array.isArray(resposta.listaMensagens)) {
            return {
                status: true,
                listaMensagens: resposta.listaMensagens
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem,
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem,
        };
    }
});
export const gravarMensagem = createAsyncThunk('gravarMensagem', async (msg) => {
    try {
        const resposta = await gravar(msg);
        if (resposta.status) {
            msg.id = resposta.id;
            return {
                status: true,
                mensagem: resposta.mensagem,
                msg
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});
export const deletarMensagem = createAsyncThunk('deletarMensagem', async (msg) => {
    try {
        const resposta = await deletar(msg);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                msg
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});
export const atualizarMensagem = createAsyncThunk('atualizarMensagem', async (msg) => {
    try {
        const resposta = await atualizar(msg);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                msg
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});

const msgReducer = createSlice({
    name: 'msg',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaMensagens: []
    },
    reducers: {
        zerarMensagem: (state) => {
            state.mensagem = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(consultarMensagens.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição...";
            })
            .addCase(consultarMensagens.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = "";
                state.listaMensagens = action.payload.listaMensagens;
            })
            .addCase(consultarMensagens.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(gravarMensagem.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "";
            })
            .addCase(gravarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaMensagens.push(action.payload.msg);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(gravarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(deletarMensagem.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição de exclusão...";
            })
            .addCase(deletarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaMensagens = state.listaMensagens.filter((msg) => msg.id !== action.payload.msg.id);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(atualizarMensagem.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição de atualização...";
            })
            .addCase(atualizarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.listaMensagens.findIndex((msg) => msg.id === action.payload.msg.id);
                    if (indice !== -1) {
                        state.listaMensagens[indice] = action.payload.msg;
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            });
    }
});

export const { zerarMensagem } = msgReducer.actions;
export default msgReducer.reducer;
