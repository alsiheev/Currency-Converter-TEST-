import { createContext, useEffect, useState } from "react";
import currenciesArr from "../utils/currencies";

interface IRatesContext {
  isLoading: boolean;
  handleChange: (main_currency: string, secondary_currency: string) => any;
  error: string;
}

interface IContextProviderProps {
  children: React.ReactNode;
}

type pairObj = {
  pair: string;
  rate: string;
};

export const RatesContext = createContext<IRatesContext>({
  isLoading: false,
  handleChange: () => {},
  error: "",
});

const RatesContextProvider = (props: IContextProviderProps) => {
  const { children } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [rates, setRates] = useState(new Map<string, number>());
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDefaultData = async () => {
      try {
        setIsLoading(true);
        const pairObjArr: pairObj[] = await Promise.all(
          currenciesArr.map(([cur1, cur2]) =>
            fetch(
              `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${cur1}/${cur2}.min.json`
            )
              .then((res) => res.json())
              .then((data) => JSON.parse(`{"${cur1}/${cur2}":"${data[cur2]}"}`))
          )
        );

        setRates((value) => {
          let pair: string, rate: string;
          pairObjArr.forEach((pairObj) => {
            pair = Object.keys(pairObj)[0];
            rate = Object.values(pairObj)[0];
            value.set(pair, +rate);
          });
          setError("");
          return value;
        });
      } catch (error) {
        console.error(error);
        setError("Oops! Something went wrong. Please, reload the page!");
      } finally {
        setIsLoading(false);
      }
    };
    loadDefaultData();
  }, []);

  const handleChange = async (cur1: string, cur2: string) => {
    if (rates.get(`${cur1}/${cur2}`)) return rates.get(`${cur1}/${cur2}`);

    let rate: string;
    try {
      setIsLoading(true);
      const pairObj: pairObj = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${cur1}/${cur2}.min.json`
      )
        .then((res) => res.json())
        .then((data) => JSON.parse(`{"${cur1}/${cur2}":"${data[cur2]}"}`));

      const pair = Object.keys(pairObj)[0];
      rate = Object.values(pairObj)[0];
      setRates((value) => value.set(pair, +!rate));
      setError("");
      return rate;
    } catch (error) {
      console.error(error);
      setError("Oops! Something went wrong. Please, reload the page!");
    } finally {
      setIsLoading(false);
    }
  };

  const state = {
    isLoading,
    handleChange,
    error,
  };

  return (
    <RatesContext.Provider value={state}>{children}</RatesContext.Provider>
  );
};

export default RatesContextProvider;
