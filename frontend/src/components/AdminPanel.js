// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import { onImageUploadBefore } from './imageUploadHandler';

// const AdminPanel = ({ setPages }) => {
//   const [content, setContent] = useState('');
//   const [title, setTitle] = useState('');
//   const [newPageTitle, setNewPageTitle] = useState('');
//   const [pages, setPagesState] = useState([]);
//   const [selectedPage, setSelectedPage] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => {
//         setPagesState(response.data);
//         setPages(response.data);
//       })
//       .catch(error => console.error('Error loading files:', error));
//   }, [setPages]);

//   const saveContent = (pageTitle) => {
//     axios.post('http://localhost:5000/save', { title: pageTitle, content })
//       .then(response => {
//         alert('Content saved successfully');
//         if (!pages.some(page => page.title === pageTitle)) {
//           const newPages = [...pages, { title: pageTitle }];
//           setPagesState(newPages);
//           setPages(newPages);
//         }
//       })
//       .catch(error => console.error('Error saving content:', error));
//   };

//   const deletePage = (pageTitle) => {
//     axios.delete(`http://localhost:5000/delete/${encodeURIComponent(pageTitle)}`)
//       .then(response => {
//         alert('Content deleted successfully');
//         const updatedPages = pages.filter(page => page.title !== pageTitle);
//         setPagesState(updatedPages);
//         setPages(updatedPages);
//         if (selectedPage === pageTitle) {
//           setContent('');
//           setSelectedPage('');
//         }
//       })
//       .catch(error => console.error('Error deleting content:', error));
//   };

//   const loadContent = (pageTitle) => {
//     axios.get(`http://localhost:5000/load/${encodeURIComponent(pageTitle)}`)
//       .then(response => {
//         setContent(response.data.content);
//         setSelectedPage(pageTitle);
//       })
//       .catch(error => console.error('Error loading content:', error));
//   };

//   const handleSave = () => {
//     if (selectedPage) {
//       saveContent(selectedPage);
//     } else {
//       alert('Please select a page or create a new one.');
//     }
//   };

//   const handleCreatePage = () => {
//     const normalizedTitle = newPageTitle.trim().toLowerCase();
//     axios.post('http://localhost:5000/save', { title: normalizedTitle, content })
//       .then(response => {
//         console.log('Page created successfully');
//         setNewPageTitle('');
//         setContent('');
//         axios.get('http://localhost:5000/files')
//           .then(response => setPages(response.data))
//           .catch(error => console.error('Error refreshing page list:', error));
//       })
//       .catch(error => console.error('Error creating page:', error));
//   };

//   return (
//     <div>
//       <h2>Admin Panel</h2>
//       <div>
//         <input
//           type="text"
//           value={newPageTitle}
//           onChange={(e) => setNewPageTitle(e.target.value)}
//           placeholder="New Page Title"
//         />
//         <button onClick={handleCreatePage}>Create New Page</button>
//       </div>
//       <div>
//         <h3>Existing Pages</h3>
//         <ul>
//           {pages.map((page, index) => (
//             <li key={index}>
//               <button onClick={() => loadContent(page.title)}>{page.title}</button>
//               <button onClick={() => deletePage(page.title)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//       <SunEditor
//         setContents={htmlContent}
//         onChange={handleChange}
//         setOptions={{
//           buttonList: [
//             ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
//           ]
//         }}
//         onImageUploadBefore={onImageUploadBefore} // Pass the handler correctly
//       />
//         <button onClick={handleSave}>Save</button>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { onImageUploadBefore } from './imageUploadHandler';

const AdminPanel = ({ setPages }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [newPageTitle, setNewPageTitle] = useState('');
  const [pages, setPagesState] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/files')
      .then(response => {
        setPagesState(response.data);
        setPages(response.data);
      })
      .catch(error => console.error('Error loading files:', error));
  }, [setPages]);

  const handleChange = (content) => {
    setContent(content);
  };

  const saveContent = (pageTitle) => {
    axios.post('http://localhost:5000/save', { title: pageTitle, content })
      .then(response => {
        alert('Content saved successfully');
        if (!pages.some(page => page.title === pageTitle)) {
          const newPages = [...pages, { title: pageTitle }];
          setPagesState(newPages);
          setPages(newPages);
        }
      })
      .catch(error => console.error('Error saving content:', error));
  };

  const deletePage = (pageTitle) => {
    axios.delete(`http://localhost:5000/delete/${encodeURIComponent(pageTitle)}`)
      .then(response => {
        alert('Content deleted successfully');
        const updatedPages = pages.filter(page => page.title !== pageTitle);
        setPagesState(updatedPages);
        setPages(updatedPages);
        if (selectedPage === pageTitle) {
          setContent('');
          setSelectedPage('');
        }
      })
      .catch(error => console.error('Error deleting content:', error));
  };

  const loadContent = (pageTitle) => {
    axios.get(`http://localhost:5000/load/${encodeURIComponent(pageTitle)}`)
      .then(response => {
        setContent(response.data.content);
        setSelectedPage(pageTitle);
      })
      .catch(error => console.error('Error loading content:', error));
  };

  const handleSave = () => {
    if (selectedPage) {
      saveContent(selectedPage);
    } else {
      alert('Please select a page or create a new one.');
    }
  };

  const handleCreatePage = () => {
    const normalizedTitle = newPageTitle.trim().toLowerCase();
    axios.post('http://localhost:5000/save', { title: normalizedTitle, content })
      .then(response => {
        console.log('Page created successfully');
        setNewPageTitle('');
        setContent('');
        axios.get('http://localhost:5000/files')
          .then(response => setPages(response.data))
          .catch(error => console.error('Error refreshing page list:', error));
      })
      .catch(error => console.error('Error creating page:', error));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <input
          type="text"
          value={newPageTitle}
          onChange={(e) => setNewPageTitle(e.target.value)}
          placeholder="New Page Title"
        />
        <button onClick={handleCreatePage}>Create New Page</button>
      </div>
      <div>
        <h3>Existing Pages</h3>
        <ul>
          {pages.map((page, index) => (
            <li key={index}>
              <button onClick={() => loadContent(page.title)}>{page.title}</button>
              <button onClick={() => deletePage(page.title)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SunEditor
          setContents={content}
          onChange={handleChange}
          setOptions={{
            buttonList: [
              ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
            ]
          }}
          onImageUploadBefore={onImageUploadBefore} // Ensure this handler is correct
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AdminPanel;
