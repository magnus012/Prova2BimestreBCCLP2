import React, { useEffect, useState } from 'react';
import { Form, Button, ListGroup, Image } from 'react-bootstrap';
import Pagina from "../layouts/Pagina"
import { useDispatch, useSelector } from 'react-redux';
import ESTADO from '../../redux/reduxEstado';
import { consultarUsuarios } from '../../redux/reduxUsuario';
import { consultarMensagens, deletarMensagem, gravarMensagem, zerarMensagem } from '../../redux/reduxMensagem';
import { parse, differenceInHours } from 'date-fns';

export default function TelaMensagem() {
    let { listaUsuarios } = useSelector((state) => state.usuarios);
    let { estado, mensagem, listaMensagens } = useSelector((state) => state.mensagens);
    const despachante = useDispatch();
    const [formValidado, setFormValidado] = useState(false);

    const [recadoReseta] = useState({
        usuario: {},
        mensagem: ""
    });
    const [recado, setRecado] = useState(recadoReseta);

    useEffect(() => {
        despachante(consultarUsuarios());
        despachante(consultarMensagens());
    }, [despachante])

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            window.alert(mensagem);
            despachante(consultarMensagens());
            despachante(zerarMensagem());
            setRecado(recadoReseta);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            window.alert(mensagem);
            despachante(zerarMensagem());
        }
    }, [estado, mensagem, recadoReseta, despachante]);

    function deletar(chat) {
        despachante(deletarMensagem(chat));
    }

    function calcularTempo(dataHora) {
        if (dataHora) {
            const dataInformada = parse(dataHora, 'dd/MM/yyyy, HH:mm:ss', new Date());
            const dataAtual = new Date();
            const diferenca = differenceInHours(dataAtual, dataInformada);
            return diferenca ;
        }
        return false;
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            despachante(gravarMensagem(recado));
        }
        else
            setFormValidado(true);
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        if (elemento === "usuario" && valor !== "") {
            const novo = JSON.parse(valor);
            setRecado({ ...recado, [elemento]: novo });
        }
        else {
            setRecado({ ...recado, [elemento]: valor });
        }
    }

    return (
        <Pagina>
            <Form className="mt-4" noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Select
                        required
                        id="usuario"
                        name="usuario"
                        value={JSON.stringify(recado.usuario)}
                        onChange={manipularMudanca}
                    >
                        <option value="">Escolha o Usuario</option>
                        {listaUsuarios?.map((usuario) => (
                            <option key={usuario.id} value={JSON.stringify(usuario)}>
                                {usuario.nickname}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o usuario!
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mt-3">
                    <Form.Label>Mensagem:</Form.Label>
                    <Form.Control
                        required
                        id="mensagem"
                        name="mensagem"
                        as="textarea"
                        rows={3}
                        value={recado.mensagem}
                        onChange={manipularMudanca}
                        placeholder="Digite sua Mensagem"
                    />
                </Form.Group>

                <Button variant="success" onClick={manipularSubmissao} className="mt-2">
                    Enviar
                </Button>
            </Form>


            <div className="mt-5">
                <ListGroup>
                    {listaMensagens?.map((item) => (
                        <ListGroup.Item key={item.id} className="d-flex align-items-center">
                            <div className="flex-grow-1">
                                <Image
                                    style={{ width: "100px" }}
                                    src={item.usuario.urlAvatar}
                                    thumbnail
                                    alt="avatar"
                                    className="me-3"
                                />
                                <strong>{item.usuario.nickname}</strong>: {item.mensagem} <br />
                                <small>postado em: {item.dataHora}</small>
                            </div>
                            {
                                calcularTempo(item?.dataHora) && (
                                    <Button onClick={() => { deletar(item) }} variant="danger" type="button" className="ms-auto">
                                        Excluir
                                    </Button>
                                )
                            }
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </Pagina>
    );
}
