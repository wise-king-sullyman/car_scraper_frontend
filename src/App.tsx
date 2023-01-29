import React from 'react';


function App() {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    fetch('./data/cars.html').then(res => res.text()).then(text => setData(text))
  }, [])

  return (
    <div className="App">
      {data}
    </div>
  );
}

export default App;
