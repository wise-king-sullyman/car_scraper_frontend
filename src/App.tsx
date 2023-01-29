import React from 'react';
import fetchData from '../scripts/fetchData'

const url = 'https://www.cars.com/shopping/results/?dealer_id=&keyword=&list_price_max=&list_price_min=&makes[]=volvo&maximum_distance=all&mileage_max=&models[]=volvo-s60&models[]=volvo-s60_hybrid&models[]=volvo-s60_inscription&models[]=volvo-s60_recharge_plug_in_hybrid&page_size=20&sort=list_price&stock_type=all&trims[]=volvo-s60-t8_inscription&trims[]=volvo-s60_recharge_plug_in_hybrid-t8_black_edition_r_design_extended_range&trims[]=volvo-s60_recharge_plug_in_hybrid-t8_inscription_extended_range&trims[]=volvo-s60_recharge_plug_in_hybrid-t8_plus_black_edition&trims[]=volvo-s60_recharge_plug_in_hybrid-t8_plus_dark_theme&trims[]=volvo-s60_recharge_plug_in_hybrid-t8_r_design_extended_range&trims[]=volvo-s60_recharge_plug_in_hybrid-t8_ultimate_black_edition&trims[]=volvo-s60_recharge_plug_in_hybrid-t8_ultimate_bright_theme&year_max=&year_min=2022&zip=27599'

function App() {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    fetchData(url).then(res => console.log(res))
  }, [])

  return (
    <div className="App">
      {data}
    </div>
  );
}

export default App;
