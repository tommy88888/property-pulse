'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type GlobalContextProps = {
  children: React.ReactNode;
};

interface GlobalContextValue {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<GlobalContextValue>({
  unreadCount: 0,
  setUnreadCount: () => {},
});

export function GlobalProvider({ children }: GlobalContextProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
