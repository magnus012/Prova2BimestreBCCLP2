import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props) {
    return (
        <Container className="w-100">
            <Cabecalho titulo="Prova Segundo Bimestre LP2 BCC" />
            <Menu />
            {props.children}
        </Container>
    );
}