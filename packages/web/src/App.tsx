import React from 'react';
import { Survey } from '@compass-surveys/common';

function App() {
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    fetch('http://localhost:4000/surveys')
      .then((res) => res.json())
      .then((data: Survey[]) => setName(data[0].name));
  }, []);

  return <div className="App">Blank page. Survey: {name}</div>;
}

export default App;
