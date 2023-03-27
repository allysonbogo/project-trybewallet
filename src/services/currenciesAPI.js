const getCurrencies = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await request.json();
  return Object.keys(response).filter((currency) => currency !== 'USDT');
};

export default getCurrencies;
