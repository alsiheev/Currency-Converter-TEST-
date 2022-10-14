import Header from "./components/Header/Header";
import HomePage from "./screens/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import RatesContextProvider from "./context/RatesContextProvider";
import ErrorModal from "./components/ErrorModal/ErrorModal";

const App = () => {
  return (
    <RatesContextProvider>
      <ErrorModal />
      <Header />
      <HomePage />
      <Footer />
    </RatesContextProvider>
  );
};

export default App;
