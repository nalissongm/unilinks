import styles from "./linkList.module.scss";

interface LinkListProps {}

type Link = {
  title: string;
  url: string;
  updated_at: Date;
};

export function LinkList({}: LinkListProps): JSX.Element {
  const links: Link[] = [
    {
      title: "Link 01",
      url: "http://localhost:3000/:id",
      updated_at: new Date("10-05-2022"),
    },
    {
      title: "Link 02",
      url: "http://localhost:3000/:id",
      updated_at: new Date("10-04-2022"),
    },
    {
      title: "Link 03",
      url: "http://localhost:3000/:id",
      updated_at: new Date("10-03-2022"),
    },
    {
      title: "Link 04",
      url: "http://localhost:3000/:id",
      updated_at: new Date("10-02-2022"),
    },
    {
      title: "Link 05",
      url: "http://localhost:3000/:id",
      updated_at: new Date("10-02-2022"),
    },
    {
      title: "Link 06",
      url: "http://localhost:3000/:id",
      updated_at: new Date("10-02-2022"),
    },
  ];

  function renderLinks() {
    let totalItems = links.length;

    if (totalItems === 1) {
      return (
        <li className={styles.singleLink} key={links[0].title}>
          <a href={links[0].url}>{links[0].title}</a>
        </li>
      );
    }

    return links.map((link, index) => (
      <li
        className={
          index === 0
            ? styles.firstLink
            : index < totalItems - 1
            ? styles.middleLink
            : styles.lastLink
        }
        key={link.title}
      >
        <a href={link.url}>
          {link.title} | {index}
        </a>
      </li>
    ));
  }

  return <ul className={styles.contentList}>{renderLinks()}</ul>;
}
