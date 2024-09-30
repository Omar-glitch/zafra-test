import { useEffect } from "react";

type UseAutosaveFormProps = {
  key: string;
  values: object;
  dirty: boolean;
};

export default function useAutosaveForm({
  key,
  values,
  dirty,
}: UseAutosaveFormProps) {
  useEffect(() => {
    const beforeEventHandler = () => {
      if (dirty) {
        localStorage.setItem(key, JSON.stringify(values));
      }
    };

    window.addEventListener("beforeunload", beforeEventHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeEventHandler);
    };
  }, [dirty, values]);
}
