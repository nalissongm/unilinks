import type { GetServerSideProps, NextPage } from "next";
import { Button } from "../components/Button";
import { LinkList } from "../components/LinkList";
import { Pagination } from "../components/Pagination";
import { Modal } from "../components/Modal";
import { useDisclosure } from "../contexts/ModalDisclosureContext";
import { api } from "../services/api";
import { useEffect, useState } from "react";

type Link = {
  id: string;
  title: string;
  updated_at: Date;
};

interface HomeProps {
  links: Link[];
}

type ResponseData = {
  data: Link[];
};

const Home = ({ links }: HomeProps) => {
  const [recentLinks, setRecentLinks] = useState(() => {
    return links
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 4)
      .map((link) => ({
        title: link.title,
        url:
          process.env.NODE_ENV === "development"
            ? `http://localhost:3000/links/${link.id}`
            : "",
      }));
  });
  const [allLinks, setAllLinks] = useState(() => {
    return links.map((link) => ({
      title: link.title,
      url:
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/links/${link.id}`
          : "",
    }));
  });

  const { isOpen, onOpen } = useDisclosure();

  console.log(recentLinks);

  function handlePagination() {}

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
            <LinkList links={recentLinks} />
          </div>
          <div>
            <h2>Todos os links</h2>
            <LinkList links={allLinks} />
            {links.length > 5 && (
              <Pagination
                totalCountOfRegisters={links.length}
                registerPerPage={5}
                onPageChange={handlePagination}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data }: ResponseData = await api.get("/links");

  const links = data;

  return {
    props: { links },
  };
};
