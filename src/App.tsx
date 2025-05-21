import CarbonCalculator from "./components/carbonCalculater/CarbonCalculater";
import useAntiInspect from "./helper/useAntiInspect"; 

const App = () => {
    useAntiInspect();

  return (
    <>
      <CarbonCalculator />
    </>
  );
};

export default App;
