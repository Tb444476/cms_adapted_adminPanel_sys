// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';

// // function RenderedFile() {
// //   const [htmlContent, setHtmlContent] = useState('');
// //   const { title } = useParams();

// //   useEffect(() => {
// //     if (title) {
// //       axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
// //         .then(response => {
// //           setHtmlContent(response.data.content);
// //         })
// //         .catch(error => console.error('Error loading content:', error));
// //     }
// //   }, [title]);

// //   if (!title) {
// //     return <div>No file selected.</div>;
// //   }

// //   return (
// //     <div className="RenderedFile">
// //       <h2>{title}</h2>
// //       <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
// //     </div>
// //   );
// // }

// // export default RenderedFile;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function RenderedFile() {
//   const [htmlContent, setHtmlContent] = useState('');
//   const { title } = useParams();

//   useEffect(() => {
//     if (title) {
//       axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
//         .then(response => {
//           setHtmlContent(response.data.content);
//         })
//         .catch(error => console.error('Error loading content:', error));
//     }
//   }, [title]);

//   if (!title) {
//     return <div>No file selected.</div>;
//   }

//   return (
//     <div className="RenderedFile">
//       <h2>{title}</h2>
//       <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//     </div>
//   );
// }

// export default RenderedFile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useParams } from 'react-router-dom';

const RenderedFile = () => {
  const { title } = useParams();
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Fetch the HTML content from the backend
    axios.get(`http://localhost:5000/files/${title}`)
      .then(response => {
        setHtmlContent(response.data.htmlContent);
      })
      .catch(error => {
        console.error('There was an error fetching the file content:', error);
      });
  }, [title]);

  const handleSave = () => {
    axios.put(`http://localhost:5000/files/${title}`, { htmlContent })
      .then(response => {
        alert('Content saved successfully');
      })
      .catch(error => {
        console.error('There was an error saving the file content:', error);
      });
  };

  return (
    <div>
      <SunEditor 
        setContents={htmlContent} 
        onChange={setHtmlContent}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default RenderedFile;
