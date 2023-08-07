/*document.addEventListener('DOMContentLoaded', async () => {
    const accessToken = localStorage.getItem('accessToken');
  
    // Check if access token is present in local storage, if not redirect the user to the login page
    if (!accessToken) {
      window.location.href = '/index.html';
      return;
    }
  
    try {
      // Make a GET request to the API to fetch the books
      const response = await fetch('/api/books', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const books = await response.json();
        const bookTable = document.getElementById('bookTable');
  
        books.forEach((book) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.price}</td>
            <td>${book.stock}</td>
          `;
          bookTable.appendChild(row);
        });
      } else {
        alert('Failed to fetch books. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  */
  document.addEventListener('DOMContentLoaded', async () => {
    const accessToken = localStorage.getItem('accessToken');
  
    if (!accessToken) {
      window.location.href = '.. public/index.html';
      return;
    }
  
    try {
      const response = await fetch('https://localhost:3000/Books', { 
        method: 'GET', 
        headers: { 
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const books = await response.json();
        const bookTable = document.getElementById('bookTable');
  
        books.forEach((book) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.price}</td>
            <td>${book.stock}</td>
          `;
          bookTable.appendChild(row);
        });
      } else {
        alert('Failed to fetch books. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  