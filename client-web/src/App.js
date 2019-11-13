import React from 'react';
import logo from './logo.svg';
import './App.css';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const QUERY_MOVIES = gql`
 query {
  tvSeries {
    title,
    overview
  }
}
`

function App() {
  const { loading , error, data} = useQuery(QUERY_MOVIES)
  if(loading){
    return <p>loading..</p>
  } else if(error){
    return <p>{JSON.stringify(error)}</p>
  } else {
    return <p>{JSON.stringify(data)}</p>
  }
}

export default App;
