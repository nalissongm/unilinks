import { FormEvent, useRef, useState } from "react";
import { useDisclosure } from "../../contexts/ModalDisclosureContext";
import { api } from "../../services/api";
import { Button } from "../Button";
import { Input } from "../Input";
import styles from "./modal.module.scss";

interface ModalProps {
  onStaleData: (isStaleData: boolean) => void;
}

type SubmitState = "In Progress" | "Success" | "Fails" | "Not Submited";

export function Modal({ onStaleData }: ModalProps) {
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
      onStaleData(true);
      onClose();
    } catch (err) {
      setSubmitState("Fails");
      setSubmitState("Not Submited");
    }
  }

  return (
    <>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} method="POST" action="">
          <Input
            label="Title"
            id="title"
            placeholder="Digite um título para o link"
            type="text"
            ref={titleField}
            isRequired
          />
          <Input
            label="URL"
            id="url"
            placeholder="Digite a URL de redirecionamento"
            type="url"
            ref={urlField}
            isRequired
          />
          <div className={styles.wrapperButton}>
            <Button variant="secondary" action={handleCancel} type="button">
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
