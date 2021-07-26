const fetchData = (url='') => {
  return fetch(url)
    .then(res => {
      if(!res.ok){
        throw new Error('There was a problem with fetching data');
      }
      return res.json();
    })
}

export default fetchData;