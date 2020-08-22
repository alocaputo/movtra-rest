import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { debounce } from "lodash";
import { Search, Grid, Label } from "semantic-ui-react";
import { Link, Redirect } from 'react-router-dom';


const MovieSearch = ({ handleResultSelecto}) => {
    
  const defaultState = {
    results: [],
    isLoading: false,
    value: ""
  };

  const [{ results, isLoading, value }, setState] = useState(defaultState);
  //handleResultSelect = result => <Redirect to={`/movie/${result.id}`}/>
  const handleResultSelect = (e, { result }) => { setState({ value: result.title }); return handleResultSelecto(result)}

  const resultRenderer = ({ title, release_date }) => <><Label as='a'> {title}<Label.Detail>{release_date}</Label.Detail></Label></>

  const search = debounce(title => {
    axios
      .get(`http://127.0.0.1:8000/api/movies/search/${title}`)
      .then(response => { 
        const results = response.data.results.slice(0,9).map(result => ({
          id: result.id,
          title: result.title,
          release_date: result.release_date.slice(0,4)
        }));
        setState(prevState => ({
          ...prevState,
          results: results,
          isLoading: false
        }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }, 350);
  const onChange = value => {
    if (value.length < 1) {
      setState(defaultState);
    } else {
      setState(prevState => ({ ...prevState, isLoading: true, value: value }));
      search(value);
    }
  };

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={isLoading}
          onResultSelect={handleResultSelect}
          resultRenderer={resultRenderer}
          onSearchChange={e => onChange(e.target.value)}
          results={results}
          value={value}
          noResultsMessage={"No movie found"}
        />
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(MovieSearch);
