import './App.css';
import AddProduct from './components/AddProduct';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ViewProducts from './components/ViewProducts';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  
  return (
    <main className='container mx-auto' >
      
      <Router>
        {/* <Header/> */}
        <div>
          <Routes>
            <Route path="/" element={<ViewProducts/>} />
            {/* <Route path="/delete-product" element={DeleteProduct} /> */}
            <Route path="/add-product" element={<AddProduct />} />
            {/* <Route path="/edit-product/:id" element={EditProduct} /> */}
            
          </Routes>
        </div>


      </Router>

    </main>
  );
}

export default App;
