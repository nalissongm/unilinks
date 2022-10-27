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
  const [isStaleData, setIsStaleData] = useState(false);
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

  const [currentPage, setCurrentPage] = useState(1);

  const { isOpen, onOpen } = useDisclosure();

  const linksPerPage = slicerLinksPerPage(allLinks, 5, currentPage);

  console.log(linksPerPage);
  function handlePagination(page: number) {
    setCurrentPage(page);
  }

  function slicerLinksPerPage(
    allLinks: { title: string; url: string }[],
    amountLinksPerPage: number,
    currentPage: number
  ) {
    let startSlice: number;
    let endSlice: number;

    if (currentPage <= allLinks.length / amountLinksPerPage) {
      startSlice = currentPage * amountLinksPerPage - amountLinksPerPage;
      endSlice = currentPage * amountLinksPerPage;

      console.log(startSlice, endSlice);

      return allLinks.slice(startSlice, endSlice);
    }

    // if (allLinks.length % currentPage === 0) {
    //   startSlice = currentPage * amountLinksPerPage - amountLinksPerPage
    //   endSlice = currentPage * amountLinksPerPage - 1

    //   return allLinks.slice(startSlice, endSlice);
    // }

    startSlice = (currentPage - 1) * amountLinksPerPage;
    endSlice =
      (currentPage - 1) * amountLinksPerPage +
      (allLinks.length % amountLinksPerPage);

    console.log(startSlice, endSlice, currentPage, amountLinksPerPage);

    return allLinks.slice(startSlice, endSlice);
  }

  useEffect(() => {
    if (isStaleData) {
      api.get("/links").then((response) => {
        const { data }: ResponseData = response;

        setRecentLinks(() => {
          return data
            .sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
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

        setAllLinks(() => {
          return data.map((link) => ({
            title: link.title,
            url:
              process.env.NODE_ENV === "development"
                ? `http://localhost:3000/links/${link.id}`
                : "",
          }));
        });
      });
    }
  }, [isStaleData]);

  return (
    <>
      {isOpen && (
        <Modal
          onStaleData={(isStaleData: boolean) => setIsStaleData(isStaleData)}
        />
      )}
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
            <LinkList links={linksPerPage} />
            {links.length > 5 && (
              <Pagination
                totalCountOfRegisters={links.length}
                registerPerPage={5}
                onPageChange={handlePagination}
                currentPage={currentPage}
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
