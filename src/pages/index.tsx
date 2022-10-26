import type { NextPage } from "next";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useDisclosure } from "../contexts/ModalDisclosureContext";

const Home: NextPage = () => {
  const { isOpen, onOpen } = useDisclosure();
  return (
    <>
      {isOpen && <Modal />}
      <div className="content">
        <header>
          <h1>Dashboard</h1>
          <Button action={onOpen}>Adicionar link</Button>
        </header>
        <main>
          <div>
            <h2>Links recentes</h2>
            {/* <ListLinks /> */}
          </div>
          <div>
            <h2>Todos os links</h2>
            {/* <ListLinks /> */}
            {/* <Pagination /> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
