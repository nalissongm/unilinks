import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ModalDisclosureProviderProps {
  children: ReactNode;
}

type ModalDisclosureContextData = {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
};

const ModalDisclosureContext = createContext({} as ModalDisclosureContextData);

export function ModalDisclosureProvider({
  children,
}: ModalDisclosureProviderProps) {
  const [disclosure, setDisclosure] = useState(false);
  const [isOpen, setIsOpen] = useState(disclosure);

  function onClose() {
    if (disclosure) {
      setDisclosure(false);
    }
  }

  function onOpen() {
    if (!disclosure) {
      setDisclosure(true);
    }
  }

  useEffect(() => {
    setIsOpen(disclosure);
  }, [disclosure]);

  return (
    <ModalDisclosureContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
    </ModalDisclosureContext.Provider>
  );
}

export const useDisclosure = () => useContext(ModalDisclosureContext);
