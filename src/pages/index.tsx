import type { GetServerSideProps, NextPage } from "next";
import { Button } from "../components/Button";
import { LinkList } from "../components/LinkList";
import { Pagination } from "../components/Pagination";
import { Modal } from "../components/Modal";
import { useDisclosure } from "../contexts/ModalDisclosureContext";
import { api } from "../services/api";
import { useEffect, useState } from "react";

import styles from "../styles/home.module.scss";

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

type PickUpTidyDataParams = {
  data: Array<Link>;
  orderBy?: "increase" | "decrease";
  sliceItems?: {
    start: number;
    end: number;
  };
};

const Home = ({ links }: HomeProps) => {
  const [isStaleData, setIsStaleData] = useState(false);
  const [recentLinks, setRecentLinks] = useState(() =>
    pickUpTidyData({
      data: links,
      orderBy: "decrease",
      sliceItems: { start: 0, end: 4 },
    })
  );
  const [allLinks, setAllLinks] = useState(() =>
    pickUpTidyData({
      data: links,
      orderBy: "increase",
    })
  );

  const [currentPage, setCurrentPage] = useState(1);

  const { isOpen, onOpen } = useDisclosure();

  const linksPerPage = slicerLinksPerPage(allLinks, 5, currentPage);

  function handlePagination(page: number) {
    setCurrentPage(page);
  }

  function pickUpTidyData({
    data,
    orderBy = "increase",
    sliceItems,
  }: PickUpTidyDataParams): Array<{ title: string; url: string }> {
    let linksOrderned: Array<Link>;
    let linksSliced: Array<Link>;

    linksOrderned = data.sort((a, b) => {
      return orderBy === "increase"
        ? new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    if (sliceItems === undefined) {
      return linksOrderned.map((link) => ({
        title: link.title,
        url:
          process.env.NODE_ENV === "development"
            ? `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/links/${link.id}`
            : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/links/${link.id}`,
      }));
    }

    linksSliced = linksOrderned.slice(sliceItems.start, sliceItems.end);

    return linksSliced.map((link) => ({
      title: link.title,
      url:
        process.env.NODE_ENV === "development"
          ? `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/links/${link.id}`
          : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/links/${link.id}`,
    }));
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

      return allLinks.slice(startSlice, endSlice);
    }

    startSlice = (currentPage - 1) * amountLinksPerPage;
    endSlice =
      (currentPage - 1) * amountLinksPerPage +
      (allLinks.length % amountLinksPerPage);

    return allLinks.slice(startSlice, endSlice);
  }

  useEffect(() => {
    if (isStaleData) {
      api.get("/links").then((response) => {
        const { data }: ResponseData = response;

        setRecentLinks(() =>
          pickUpTidyData({
            data: data,
            orderBy: "decrease",
            sliceItems: { start: 0, end: 4 },
          })
        );

        setAllLinks(() =>
          pickUpTidyData({
            data: data,
            orderBy: "increase",
          })
        );
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
      <div className={styles.content}>
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
              <div className={styles.pagination}>
                <Pagination
                  totalCountOfRegisters={links.length}
                  registerPerPage={5}
                  onPageChange={handlePagination}
                  currentPage={currentPage}
                />
              </div>
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
