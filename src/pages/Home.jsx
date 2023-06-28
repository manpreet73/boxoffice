import { useState } from "react";
import { useQuery } from "react-query";
import { searchForShows, searchForPeople } from "../api/tvmaze";
import SearchForm from "../components/SearchForm";
import ShowGrid from "../components/shows/ShowGrid";
import ActorsGrid from "../components/actors/ActorsGrid";
import { TextCenter } from "../components/common/TextCenter";

const Home = () => {

  // const [apiData, setApiData] = useState(null);
  // const [apiDataError, setApiDataError] = useState(null);

  const [filter,setFilter]= useState(null);

  const {data:apiData,error:apiDataError}=useQuery({
    queryKey:['search',filter],
    queryFn:()=> filter.searchOption==='shows'? searchForShows(filter.query):searchForPeople(filter.query),
    enabled: !!filter,
    refetchOnWindowFocus:false,
  })

  const onSearch = async ({ query, searchOption }) => {

    setFilter({query,searchOption});

    // try {
    //   setApiDataError(null);

    //   let result;
    //   if (searchOption === 'shows') {
    //     result = await searchForShows(query);
    //   }
    //   else {
    //     result = await searchForPeople(query);
    //   }
    //   setApiData(result);
    // } catch (error) {
    //   setApiData(error);
    // }

    // const response= await fetch(`https://api.tvmaze.com/search/shows?q=${searchStr}`);
    // const body= await response.json();
  }

  const renderApiData = () => {
    if (apiDataError) {
      return <TextCenter>Error occured: {apiDataError.message}</TextCenter>
    }

    if(apiData?.length===0){
      return <TextCenter>No Results</TextCenter>
    }

    if (apiData) {
      return apiData[0].show ? <ShowGrid shows={apiData}/> : <ActorsGrid actors={apiData}/>
    }
    return null;
  }

  return (
    <div>
      <SearchForm onSearch={onSearch} />
      <div>{renderApiData()}</div>
    </div>
  )
}

export default Home
