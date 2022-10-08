import { FormEvent, useEffect, useState } from "react";
import { TbCopy } from "react-icons/tb";
import { FiCheck } from "react-icons/fi";

import styles from "../links/link.module.scss";
import { api } from "../../services/api";
import { GetServerSideProps, GetStaticProps } from "next";

interface LinkEditProps {
  link: {
    id: string;
    title: string;
    url: string;
  };
}

export default function LinkEdit({ link }: LinkEditProps) {
  const [dataLink, setDataLink] = useState(link);
  const [titleField, setTitleField] = useState(link.title);
  const [urlField, setUrlField] = useState(link.url);
  const [isSave, setIsSave] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { data } = await api.patch(`links/${link.id}`, {
      title: titleField,
      url: urlField,
    });

    setDataLink({
      id: link.id,
      title: data.title,
      url: data.url,
    });
    setIsSave(true);
  }

  function handleCopy() {
    navigator.clipboard.writeText(`${process.env.PRODUCTION_URL}/${link.id}`);

    setIsCopy(true);
  }

  useEffect(() => {
    if (titleField === dataLink.title && urlField === dataLink.url) {
      setIsSave(true);
      setIsCopy(false);
    } else {
      setIsSave(false);
    }
  }, [dataLink.title, dataLink.url, titleField, urlField]);

  return (
    <div className={styles.container}>
      <form method="POST" onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.field}>
          <input
            type="text"
            name="title"
            id="titleField"
            value={titleField}
            onChange={(e) => setTitleField(e.target.value)}
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className={styles.field}>
          <input
            type="url"
            name="url"
            id="urlField"
            value={urlField}
            onChange={(e) => setUrlField(e.target.value)}
          />
          <label htmlFor="url">URL</label>
        </div>
        <div className={styles.wrapperButtons}>
          {isSave ? (
            <button
              id="copy"
              className={`${isCopy ? styles.copied : ""} ${styles.copyBtt}`}
              onClick={handleCopy}
              type="button"
              disabled={isCopy}
            >
              {!isCopy ? (
                <>
                  <TbCopy /> Copiar link
                </>
              ) : (
                <>
                  <FiCheck />
                  Link copiado
                </>
              )}
            </button>
          ) : (
            ""
          )}
          <button
            id="save"
            type="submit"
            disabled={isSave}
            className={styles.saveBtt}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get("/links/229e55ac-f0f9-4520-a63a-9991830c64fd");

  const link = {
    id: data.id,
    title: data.title,
    url: data.url,
  };

  return {
    props: {
      link: { ...link },
    },
  };
};
