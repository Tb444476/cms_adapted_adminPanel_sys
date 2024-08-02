// // import React, { useState, useEffect } from 'react';
// // import SunEditor from 'suneditor-react';
// // import 'suneditor/dist/css/suneditor.min.css';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';

// // function Editor() {
// //   const [htmlContent, setHtmlContent] = useState('');
// //   const [fileName, setFileName] = useState('');
// //   const [files, setFiles] = useState([]);

// //   useEffect(() => {
// //     axios.get('http://localhost:5000/files')
// //       .then(response => {
// //         setFiles(response.data);
// //       })
// //       .catch(error => console.error('Error loading files:', error));
// //   }, []);

// //   const handleChange = (content) => {
// //     setHtmlContent(content);
// //   };

// //   const saveContent = () => {
// //     if (!fileName.trim()) {
// //       alert('Please enter a file name.');
// //       return;
// //     }
// //     axios.post('http://localhost:5000/save', { title: fileName, content: htmlContent })
// //       .then(response => {
// //         console.log('Content saved successfully', response.data);
// //         setFileName(''); // Clear the file name input after saving
// //         // Reload files list
// //         axios.get('http://localhost:5000/files')
// //           .then(response => setFiles(response.data))
// //           .catch(error => console.error('Error loading files:', error));
// //       })
// //       .catch(error => console.error('Error saving content:', error));
// //   };

// //   const deleteContent = (title) => {
// //     axios.delete(`http://localhost:5000/delete/${encodeURIComponent(title)}`)
// //       .then(response => {
// //         console.log('Content deleted successfully', response.data);
// //         // Remove the deleted file from the files state
// //         setFiles(prevFiles => prevFiles.filter(file => file.title !== title));
// //       })
// //       .catch(error => console.error('Error deleting content:', error));
// //   };

// //   const editorOptions = {
// //     buttonList: [
// //       ['font', 'fontSize', 'bold', 'italic', 'underline', 'strike', 'subscript', 'superscript'],
// //       ['removeFormat', 'fontColor', 'hiliteColor', 'align', 'list', 'link', 'image', 'video'],
// //       ['fullScreen', 'codeView', 'preview', 'template', 'indent', 'outdent', 'undo', 'redo'],
// //     ]
// //   };

// //   return (
// //     <div className="Editor">
// //       <SunEditor 
// //         onChange={handleChange}
// //         setOptions={editorOptions}
// //         setContents={htmlContent}
// //       />
// //       <input
// //         type="text"
// //         value={fileName}
// //         onChange={(e) => setFileName(e.target.value)}
// //         placeholder="Enter file name"
// //       />
// //       <button onClick={saveContent}>Save</button>
      
// //       <h2>Saved Files</h2>
// //       <ul>
// //         {files.map(file => (
// //           <li key={file.title}>
// //             <Link to={`/file/${encodeURIComponent(file.title)}`}>{file.title}</Link>
// //             <button onClick={() => deleteContent(file.title)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default Editor;

// import React, { useState, useEffect } from 'react';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Editor() {
//   const [htmlContent, setHtmlContent] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [files, setFiles] = useState([]);
//   const [editingFile, setEditingFile] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => {
//         setFiles(response.data);
//       })
//       .catch(error => console.error('Error loading files:', error));
//   }, []);

//   const handleChange = (content) => {
//     setHtmlContent(content);
//   };

//   const saveContent = () => {
//     if (!fileName.trim()) {
//       alert('Please enter a file name.');
//       return;
//     }

//     const endpoint = editingFile ? `http://localhost:5000/update/${encodeURIComponent(fileName)}` : 'http://localhost:5000/save';
//     const method = editingFile ? 'put' : 'post';

//     axios[method](endpoint, { title: fileName, content: htmlContent })
//       .then(response => {
//         console.log('Content saved successfully', response.data);
//         setFileName('');
//         setHtmlContent('');
//         setEditingFile(null); // Clear edit mode

//         // Reload files list
//         axios.get('http://localhost:5000/files')
//           .then(response => setFiles(response.data))
//           .catch(error => console.error('Error loading files:', error));
//       })
//       .catch(error => console.error('Error saving content:', error));
//   };

//   const deleteContent = (title) => {
//     axios.delete(`http://localhost:5000/delete/${encodeURIComponent(title)}`)
//       .then(response => {
//         console.log('Content deleted successfully', response.data);
//         setFiles(prevFiles => prevFiles.filter(file => file.title !== title));
//       })
//       .catch(error => console.error('Error deleting content:', error));
//   };

//   const editContent = (title) => {
//     axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
//       .then(response => {
//         setHtmlContent(response.data.content);
//         setFileName(title);
//         setEditingFile(title); // Set edit mode
//       })
//       .catch(error => console.error('Error loading content for editing:', error));
//   };

//   const editorOptions = {
//     buttonList: [
//       ['font', 'fontSize', 'bold', 'italic', 'underline', 'strike', 'subscript', 'superscript'],
//       ['removeFormat', 'fontColor', 'hiliteColor', 'align', 'list', 'link', 'image', 'video'],
//       ['fullScreen', 'codeView', 'preview', 'template', 'indent', 'outdent', 'undo', 'redo'],
//     ]
//   };

//   return (
//     <div className="Editor">
//       <SunEditor 
//         onChange={handleChange}
//         setOptions={editorOptions}
//         setContents={htmlContent}
//       />
//       <input
//         type="text"
//         value={fileName}
//         onChange={(e) => setFileName(e.target.value)}
//         placeholder="Enter file name"
//         readOnly={!!editingFile} // Make the file name read-only during editing
//       />
//       <button onClick={saveContent}>{editingFile ? 'Update' : 'Save'}</button>
      
//       <h2>Saved Files</h2>
//       <ul>
//         {files.map(file => (
//           <li key={file.title}>
//             <Link to={`/file/${encodeURIComponent(file.title)}`}>{file.title}</Link>
//             <button onClick={() => editContent(file.title)}>Edit</button>
//             <button onClick={() => deleteContent(file.title)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Editor;
// Editor component (AdminPanel)
//latest editor
// import React, { useState, useEffect } from 'react';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Editor() {
//   const [htmlContent, setHtmlContent] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [files, setFiles] = useState([]);
//   const [editingFile, setEditingFile] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => setFiles(response.data))
//       .catch(error => console.error('Error loading files:', error));
//   }, []);

//   const handleChange = (content) => {
//     setHtmlContent(content);
//   };

//   const saveContent = () => {
//     if (!fileName.trim()) {
//       alert('Please enter a file name.');
//       return;
//     }

//     const endpoint = editingFile ? `http://localhost:5000/update/${encodeURIComponent(fileName)}` : 'http://localhost:5000/save';
//     const method = editingFile ? 'put' : 'post';

//     axios[method](endpoint, { title: fileName, content: htmlContent })
//       .then(response => {
//         console.log('Content saved successfully', response.data);
//         setFileName('');
//         setHtmlContent('');
//         setEditingFile(null);

//         axios.get('http://localhost:5000/files')
//           .then(response => setFiles(response.data))
//           .catch(error => console.error('Error loading files:', error));
//       })
//       .catch(error => console.error('Error saving content:', error));
//   };

//   const deleteContent = (title) => {
//     axios.delete(`http://localhost:5000/delete/${encodeURIComponent(title)}`)
//       .then(response => {
//         console.log('Content deleted successfully', response.data);
//         setFiles(prevFiles => prevFiles.filter(file => file.title !== title));
//       })
//       .catch(error => console.error('Error deleting content:', error));
//   };

//   const editContent = (title) => {
//     axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
//       .then(response => {
//         setHtmlContent(response.data.content);
//         setFileName(title);
//         setEditingFile(title);
//       })
//       .catch(error => console.error('Error loading content for editing:', error));
//   };

//   const editorOptions = {
//     buttonList: [
//       ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
//     ]
//   };

//   return (
//     <div>
//       <h2>Editor</h2>
//       <div>
//         <input
//           type="text"
//           value={fileName}
//           onChange={(e) => setFileName(e.target.value)}
//           placeholder="Enter file name"
//         />
//         <button onClick={saveContent}>Save Content</button>
//         <button onClick={() => deleteContent(fileName)}>Delete Content</button>
//       </div>
//       <div>
//         <SunEditor
//           setContents={htmlContent}
//           onChange={handleChange}
//           setOptions={editorOptions}
//         />
//       </div>
//       <div>
//         <h3>Existing Files</h3>
//         <ul>
//           {files.map((file, index) => (
//             <li key={index}>
//               <Link to={`/${file.title.toLowerCase()}`}>{file.title}</Link>
//               <button onClick={() => editContent(file.title)}>Edit</button>
//               <button onClick={() => deleteContent(file.title)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Editor;

// import React, { useState, useEffect } from 'react';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Editor() {
//   const [htmlContent, setHtmlContent] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [files, setFiles] = useState([]);
//   const [editingFile, setEditingFile] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => setFiles(response.data))
//       .catch(error => console.error('Error loading files:', error));
//   }, []);

//   const handleChange = (content) => {
//     // Preserve class names and attributes
//     setHtmlContent(content);
//   };

//   const saveContent = () => {
//     if (!fileName.trim()) {
//       alert('Please enter a file name.');
//       return;
//     }

//     const formattedContent = htmlContent; // No need to replace class names, directly use

//     const endpoint = editingFile ? `http://localhost:5000/update/${encodeURIComponent(fileName)}` : 'http://localhost:5000/save';
//     const method = editingFile ? 'put' : 'post';

//     axios[method](endpoint, { title: fileName, content: formattedContent })
//       .then(response => {
//         console.log('Content saved successfully', response.data);
//         setFileName('');
//         setHtmlContent('');
//         setEditingFile(null);

//         axios.get('http://localhost:5000/files')
//           .then(response => setFiles(response.data))
//           .catch(error => console.error('Error loading files:', error));
//       })
//       .catch(error => console.error('Error saving content:', error));
//   };

//   const deleteContent = (title) => {
//     axios.delete(`http://localhost:5000/delete/${encodeURIComponent(title)}`)
//       .then(response => {
//         console.log('Content deleted successfully', response.data);
//         setFiles(prevFiles => prevFiles.filter(file => file.title !== title));
//       })
//       .catch(error => console.error('Error deleting content:', error));
//   };

//   const editContent = (title) => {
//     axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
//       .then(response => {
//         // Load content directly with class names preserved
//         setHtmlContent(response.data.content);
//         setFileName(title);
//         setEditingFile(title);
//       })
//       .catch(error => console.error('Error loading content for editing:', error));
//   };

//   const editorOptions = {
//     buttonList: [
//       ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
//     ]
//   };

//   return (
//     <div>
//       <h2>Editor</h2>
//       <div>
//         <input
//           type="text"
//           value={fileName}
//           onChange={(e) => setFileName(e.target.value)}
//           placeholder="Enter file name"
//         />
//         <button onClick={saveContent}>{editingFile ? 'Update' : 'Save'}</button>
//         {editingFile && <button onClick={() => deleteContent(fileName)}>Delete</button>}
//       </div>
//       <div>
//         <SunEditor
//           setContents={htmlContent}
//           onChange={handleChange}
//           setOptions={editorOptions}
//         />
//       </div>
//       <div>
//         <h3>Existing Files</h3>
//         <ul>
//           {files.map((file, index) => (
//             <li key={index}>
//               <Link to={`/${file.title.toLowerCase()}`}>{file.title}</Link>
//               <button onClick={() => editContent(file.title)}>Edit</button>
//               <button onClick={() => deleteContent(file.title)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Editor;

// import React, { useState, useEffect } from 'react';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Editor() {
//   const [htmlContent, setHtmlContent] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [files, setFiles] = useState([]);
//   const [editingFile, setEditingFile] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => setFiles(response.data))
//       .catch(error => console.error('Error loading files:', error));
//   }, []);

//   const handleChange = (content) => {
//     setHtmlContent(content);
//   };

//   const saveContent = () => {
//     if (!fileName.trim()) {
//       alert('Please enter a file name.');
//       return;
//     }

//     const formattedContent = htmlContent; // No need to replace class names, directly use

//     const endpoint = editingFile ? `http://localhost:5000/update/${encodeURIComponent(fileName)}` : 'http://localhost:5000/save';
//     const method = editingFile ? 'put' : 'post';

//     axios[method](endpoint, { title: fileName, content: formattedContent })
//       .then(response => {
//         console.log('Content saved successfully', response.data);
//         setFileName('');
//         setHtmlContent('');
//         setEditingFile(null);

//         axios.get('http://localhost:5000/files')
//           .then(response => setFiles(response.data))
//           .catch(error => console.error('Error loading files:', error));
//       })
//       .catch(error => console.error('Error saving content:', error));
//   };

//   const deleteContent = (title) => {
//     axios.delete(`http://localhost:5000/delete/${encodeURIComponent(title)}`)
//       .then(response => {
//         console.log('Content deleted successfully', response.data);
//         setFiles(prevFiles => prevFiles.filter(file => file.title !== title));
//       })
//       .catch(error => console.error('Error deleting content:', error));
//   };

//   const editContent = (title) => {
//     axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
//       .then(response => {
//         setHtmlContent(response.data.content);
//         setFileName(title);
//         setEditingFile(title);
//       })
//       .catch(error => console.error('Error loading content for editing:', error));
//   };

//   const editorOptions = {
//     strictMode: false,
//     allowedClassNames: '.*', // Allow all class names
//     attributesWhitelist: {
//       '*': '*' // Allow all attributes for all tags
//     },
//     attributesBlacklist: {
//       '*': 'id' // Remove id attribute from all tags
//     }
//   };
//   return (
//     <div>
//       <h2>Editor</h2>
//       <div>
//         <input
//           type="text"
//           value={fileName}
//           onChange={(e) => setFileName(e.target.value)}
//           placeholder="Enter file name"
//         />
//         <button onClick={saveContent}>{editingFile ? 'Update' : 'Save'}</button>
//         {editingFile && <button onClick={() => deleteContent(fileName)}>Delete</button>}
//       </div>
//       <div>
//         <SunEditor
//           setContents={htmlContent}
//           onChange={handleChange}
//           setOptions={editorOptions}
//         />
//       </div>
//       <div>
//         <h3>Existing Files</h3>
//         <ul>
//           {files.map((file, index) => (
//             <li key={index}>
//               <Link to={`/${file.title.toLowerCase()}`}>{file.title}</Link>
//               <button onClick={() => editContent(file.title)}>Edit</button>
//               <button onClick={() => deleteContent(file.title)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Editor;

// import React, { useState, useEffect } from 'react';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { onImageUploadBefore } from './imageUploadHandler'; // Import the handler

// function Editor() {
//   const [htmlContent, setHtmlContent] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [files, setFiles] = useState([]);
//   const [editingFile, setEditingFile] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => setFiles(response.data))
//       .catch(error => console.error('Error loading files:', error));
//   }, []);

//   const handleChange = (content) => {
//     setHtmlContent(content);
//   };

//   const saveContent = () => {
//     if (!fileName.trim()) {
//       alert('Please enter a file name.');
//       return;
//     }

//     const formattedContent = htmlContent; // No need to replace class names, directly use

//     const endpoint = editingFile ? `http://localhost:5000/update/${encodeURIComponent(fileName)}` : 'http://localhost:5000/save';
//     const method = editingFile ? 'put' : 'post';

//     axios[method](endpoint, { title: fileName, content: formattedContent })
//       .then(response => {
//         console.log('Content saved successfully', response.data);
//         setFileName('');
//         setHtmlContent('');
//         setEditingFile(null);

//         axios.get('http://localhost:5000/files')
//           .then(response => setFiles(response.data))
//           .catch(error => console.error('Error loading files:', error));
//       })
//       .catch(error => console.error('Error saving content:', error));
//   };

//   const deleteContent = (title) => {
//     axios.delete(`http://localhost:5000/delete/${encodeURIComponent(title)}`)
//       .then(response => {
//         console.log('Content deleted successfully', response.data);
//         setFiles(prevFiles => prevFiles.filter(file => file.title !== title));
//       })
//       .catch(error => console.error('Error deleting content:', error));
//   };

//   const editContent = (title) => {
//     axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
//       .then(response => {
//         setHtmlContent(response.data.content);
//         setFileName(title);
//         setEditingFile(title);
//       })
//       .catch(error => console.error('Error loading content for editing:', error));
//   };

//   const editorOptions = {
//     height: 200,
//     buttonList: [
//       ['undo', 'redo'],
//       ['bold', 'underline', 'italic', 'strike'],
//       ['list', 'indent', 'outdent'],
//       ['align', 'font', 'fontSize'],
//       ['image', 'link', 'video', 'audio'],
//       ['codeView'],
//     ],
//     allowedClassNames: '.*', // Allow all class names
//     attributesWhitelist: {
//       '*': '*' // Allow all attributes for all tags
//     },
//     attributesBlacklist: {
//       '*': 'id' // Remove id attribute from all tags
//     }
//   };

//   return (
//     <div>
//       <h2>Editor</h2>
//       <div>
//         <input
//           type="text"
//           value={fileName}
//           onChange={(e) => setFileName(e.target.value)}
//           placeholder="Enter file name"
//         />
//         <button onClick={saveContent}>{editingFile ? 'Update' : 'Save'}</button>
//         {editingFile && <button onClick={() => deleteContent(fileName)}>Delete</button>}
//       </div>
//       <div>
//         <SunEditor
//           setContents={htmlContent}
//           setOptions={editorOptions}
//           onChange={handleChange}
//           onImageUploadBefore={onImageUploadBefore} // Use the updated handler
//         />
//       </div>
//       <div>
//         <h3>Existing Files</h3>
//         <ul>
//           {files.map((file, index) => (
//             <li key={index}>
//               <Link to={`/${file.title.toLowerCase()}`}>{file.title}</Link>
//               <button onClick={() => editContent(file.title)}>Edit</button>
//               <button onClick={() => deleteContent(file.title)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Editor;


import React, { useState, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { onImageUploadBefore } from './imageUploadHandler'; // Import the handler

function Editor() {
  const [htmlContent, setHtmlContent] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/files')
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error loading files:', error));
  }, []);

  const handleChange = (content) => {
    setHtmlContent(content);
  };

  const editContent = (title) => {
    axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
      .then(response => {
        setHtmlContent(response.data.content);
        setSelectedFile(title);
      })
      .catch(error => console.error('Error loading content for editing:', error));
  };

  const editorOptions = {
    height: 200,
    buttonList: [
      ['undo', 'redo'],
      ['bold', 'underline', 'italic', 'strike'],
      ['list', 'indent', 'outdent'],
      ['align', 'font', 'fontSize'],
      ['image', 'link', 'video', 'audio'],
      ['codeView'],
    ],
    allowedClassNames: '.*', // Allow all class names
    attributesWhitelist: {
      '*': '*' // Allow all attributes for all tags
    },
    attributesBlacklist: {
      '*': 'id' // Remove id attribute from all tags
    }
  };

  return (
    <div>
      <h2>Editor</h2>
      <div>
        <input
          type="text"
          value={selectedFile || ''}
          readOnly
          placeholder="Selected file"
        />
      </div>
      <div>
        <SunEditor
          setContents={htmlContent}
          setOptions={editorOptions}
          onChange={handleChange}
          onImageUploadBefore={onImageUploadBefore} // Use the updated handler
        />
      </div>
      <div>
        <h3>Existing Files</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <Link to={`/${file.title.toLowerCase()}`}>{file.title}</Link>
              <button onClick={() => editContent(file.title)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Editor;
