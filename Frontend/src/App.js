import {Route, Routes } from 'react-router-dom';
import Homepage from './Pages/homepage/Homepage'
import Contactpage from './Pages/contactpage/contactpage';
import Rreviewpage from './Pages/review/realreviewpage';


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={ <Homepage />} />
          <Route path='/contacts/:id' element={ <Contactpage /> } />
          <Route path='/contacts/:id/reviews' element={ <Rreviewpage />} />
      </Routes>
    </div>
  );
}

export default App;
