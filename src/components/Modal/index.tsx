import { FormEvent, useRef, useState } from "react";
import { useDisclosure } from "../../contexts/ModalDisclosureContext";
import { api } from "../../services/api";
import { Button } from "../Button";
import styles from "./modal.module.scss";

interface ModalProps {}

type SubmitState = "In Progress" | "Success" | "Fails" | "Not Submited";

export function Modal({}: ModalProps) {
  const titleField = useRef<HTMLInputElement>(null);
  const urlField = useRef<HTMLInputElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("Not Submited");

  const { onClose } = useDisclosure();

  function handleCancel() {
    onClose();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      title: titleField.current?.value,
      url: urlField.current?.value,
    };

    setSubmitState("In Progress");

    try {
      await api.post(`/links`, data).then(() => setSubmitState("Success"));
    } catch (err) {
      setSubmitState("Fails");
      setSubmitState("Not Submited");
      onClose();
    }
  }

  return (
    <>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} method="POST" action="">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleField} required />
          <label htmlFor="url">Url</label>
          <input type="text" id="url" ref={urlField} required />
          <div>
            <Button variant="secondary" action={handleCancel} type="submit">
              Cancelar
            </Button>
            <Button variant="primary" action={() => true} type="submit">
              Adicionar
            </Button>
          </div>
        </form>
      </div>
      <div className={styles.backdrop}></div>
    </>
  );
}
