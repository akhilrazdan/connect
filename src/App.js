import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route path='/auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;