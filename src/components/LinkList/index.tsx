import styles from "./linkList.module.scss";

interface LinkListProps {
  links: {
    title: string;
    url: string;
  }[];
}

export function LinkList({ links }: LinkListProps): JSX.Element {
  function renderLinks() {
    let totalItems = links?.length;

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
        <a href={link.url}>{link.title}</a>
      </li>
    ));
  }

  return <ul className={styles.contentList}>{renderLinks()}</ul>;
}
