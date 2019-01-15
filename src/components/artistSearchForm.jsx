import React from 'react';
import {Grid, Segment, Search,Header, Icon } from 'semantic-ui-react';

const SearchArtist=(props)=>{
    const {search, searchArtist,onEnterKey} = props;
  return(
     <div>
        <Segment placeholder>
          <Grid stackable textAlign='center'>
              <Grid.Row verticalAlign='middle'>
                  <Grid.Column>
                  <Header icon color="teal">
                      <Icon name='search' />
                      Find an Artist
                  </Header>
                  <Search       
                        // icon='users'                  
                        size="big"
                        onKeyDown= {onEnterKey} 
                        onSearchChange={searchArtist} 
                        value={search}  
                        placeholder='Search ...'                         
                        />
                   {/* <Input color='red' size="big" icon='search' placeholder='Search...' /> */}
                  </Grid.Column>                           
              </Grid.Row>
          </Grid>
      </Segment>
    </div>
  );
}

export default SearchArtist;