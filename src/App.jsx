import React, {useState} from "react";


const App=()=>{
  const [query, setQuery] = useState(' ');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(' ');
  const [recipies, setRecipies] = useState([]);

  const searchRecipies = async() => {
    if(!query) return;
    setLoading(true);
    setError('');
    try{
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json90;
      if(data.meals){
        setRecipies(data.meals);
      }
      else{
        setRecipies([]);
        setError('No meals found');
      }
    }
    catch(err){
      setLoading('Failed to fetch recipies');
    }
    finally{
      setLoading(false);
    }
  }


  return (
    <div style={{padding:'2rem', fontFamily:'Arial'}}>
      <h1> Recipieee Finder</h1>
      <input
        type = "text"
        placeholder="Search for a meal..."
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
      />
      <button onClick={searchRecipies}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* <div style={{display:'flex', flexWrap:'wrap', gap:'1rem'}}>
        {recipies.map((meal)=>(
          <RecipieCard key = {meal.idMeal} meal={meal}/>
        ))}

      </div> */}
    </div>
  );
};
export default App;