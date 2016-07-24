import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import PageLayout from '../containers/PageLayout.js'

const App = (props) => {    
    return (
      <Grid>
          <PageLayout {...props}/>
      </Grid>
    );
};

export default App;
