import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null); //
  const [load, setLoad] = useState(true); //
  const getData = async () => { // NO useCallback becouse i use the setLoad
    try {
      const response = await api.loadData();
      setData(response);
      setLast(response.events.sort((evtA, evtB) => new Date(evtA.date) > new Date(evtB.date) ? -1 : 1)[0])

    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    setLoad(true)
    if (load) {
      getData();
    }
    return setLoad(false);
  }, [data])

  return data ? (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last, // i add last to use it the context of home
      }}
    >
      {children}
    </DataContext.Provider>
  ) : (error);
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
