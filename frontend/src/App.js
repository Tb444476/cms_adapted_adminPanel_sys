// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
// import About from './components/About';
// import Services from './components/Services';
// import Contact from './components/Contact';
// import AdminPanel from './components/AdminPanel';
// import NavBar from './components/NavBar'; // Import the NavBar component
// import './index.css';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <NavBar /> {/* Include the NavBar component */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/admin/*" element={<AdminPanel />} /> {/* Note the '/*' to capture nested routes */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import NavBar from './components/NavBar';
import DynamicPage from './components/DynamicPage';
import './index.css';
import axios from 'axios';


const App = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/files')
      .then(response => setPages(response.data))
      .catch(error => console.error('Error fetching pages:', error));
  }, []);

  return (
    <Router>
      <div>
        <NavBar pages={pages} />
        <Routes>
          <Route path="/Home" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<AdminPanel setPages={setPages} />} />
          <Route path="/:title" element={<DynamicPage />} /> 
          {pages.map((page, index) => (
            <Route
              key={index}
              path={`/${page.title.toLowerCase()}`}
              element={<DynamicPage />}
            />
          ))}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

