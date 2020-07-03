import React from 'react';


// this pattern was taken from: https://kentcdodds.com/blog/application-state-management-with-react
const Context = React.createContext();

const useCurrentTabConfig = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error('useCurrentTabConfig must be used within a CurrentTabProvider');
  }

  return context;
};

const CurrentTabProvider = (props) => {
  const [currentTabConfig, setCurrentTabConfig] = React.useState(null);
  const value = React.useMemo(() => [currentTabConfig, setCurrentTabConfig], [currentTabConfig]);

  return <Context.Provider value={value} {...props} />;
}

export { CurrentTabProvider, useCurrentTabConfig };
