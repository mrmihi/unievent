import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Count = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/count')
      .then((response) => {
        setCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Total Users:</h1>
      <h2>{count}</h2>
    </div>
  );
};

export default Count;