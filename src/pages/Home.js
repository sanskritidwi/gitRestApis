import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RepoCard from '../components/RepoCard';
import Typography from "@mui/material/Typography";
import PaginationControlled from '../components/PaginationControlled';


function Home() {

    const [data, setData]= useState({})
    const [pageNumber, setPageNumber] = useState(1)


    useEffect(() => {
        axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${pageNumber}`).then((response) => {
          setData(response.data);
        });
      }, [pageNumber]);

    const handlePageChange=(page)=>{
      setPageNumber(page)
    }

      const renderHeader = ()=>{
        return (<div  className='centered'><Typography variant="h3">Most Starred Repos</Typography></div>)
      }

      const renderUsers = ()=>{
       return(<>{
        data?.items?.map((repo, index)=>{
            return(<RepoCard userData={repo} key={index}/>)
        })
       }</>)
         
      }

  return (
    <div>

        {renderHeader()}
        <PaginationControlled onPageChange={handlePageChange}/>
        {renderUsers()}
    </div>
  )
}

export default Home