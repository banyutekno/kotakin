import { createContext, useContext, useEffect, useState, type FunctionComponent, type PropsWithChildren } from 'react';
import { getBoxes } from '../services/box';

export interface Container {
  id: string;
  name: string;
}

export interface Box {
  name: string;
  kind: string;
  containers: Container[];
}

export interface BoxContextType {
  boxes?: Box[];
  setBoxes: (boxes: Box[]) => unknown;
}

export const BoxContext = createContext<BoxContextType>({
  boxes: [],
  setBoxes: () => {},
});

export const BoxProvider: FunctionComponent<PropsWithChildren<unknown>> = (props) => {
  const [boxes, setBoxes] = useState<Box[]>();

  useEffect(() => {
    (async () => {
      const boxes = await getBoxes();
      setBoxes(boxes);
    })();
  }, []);

  return <BoxContext.Provider value={{ boxes, setBoxes }}>{props.children}</BoxContext.Provider>;
};

export const useBox = () => {
  return useContext(BoxContext);
};
