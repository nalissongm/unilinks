import type { NextPage } from "next";
import { Button } from "../components/Button";

const Home: NextPage = () => {
  return (
    <div className="content">
      <header>
        <h1>Dashboard</h1>
        <Button label="Adicionar link" action={() => console.log("Clicado")} />
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
  );
};

export default Home;
