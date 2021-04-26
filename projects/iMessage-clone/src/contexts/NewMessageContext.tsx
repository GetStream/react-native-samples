import React, {useContext} from 'react';

import {PaginatedUsers, usePaginatedUsers} from '../hooks';

export type NewMessageContextValue = PaginatedUsers;

export const NewMessageContext = React.createContext(
  {} as NewMessageContextValue,
);

export const NewMessageProvider: React.FC<{
  value?: NewMessageContextValue;
}> = ({children, value}) => {
  const paginatedUsers = usePaginatedUsers();

  const newMessageContext = {
    ...paginatedUsers,
    ...value,
  };
  return (
    <NewMessageContext.Provider
      value={newMessageContext as NewMessageContextValue}>
      {children}
    </NewMessageContext.Provider>
  );
};

export const useNewMessageContext = () =>
  (useContext(NewMessageContext) as unknown) as NewMessageContextValue;
