import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/config';

const ContentManagement = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await BASE_URL.get('/content');
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="content-management">
      <h2>Content Management</h2>
      <ul>
        {content.map(item => (
          <li key={item.id}>
            {item.title} - {item.type}
            {/* Add edit and delete options */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentManagement;
