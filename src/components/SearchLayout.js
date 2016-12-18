import React from 'react';
import 'whatwg-fetch';
import Form from './Form';
import List from './List';
import ListItem from './ListItem';

class SearchLayout extends React.Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this);
    this.qUpdate = this.qUpdate.bind(this);
    this.state = {q: '', vids: []}
  }

  qUpdate(e) {
    this.setState({q: e.target.value})
  }

  search(e) {
    e.preventDefault();

    let url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCawc-PplCQMWvBPM8S9lF5ZmE3QsdAnxA&part=snippet&type=video&maxResults=25&q=${encodeURIComponent(this.state.q)}`
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        this.setState({vids: json.items})
      }).catch((ex) => {
        console.log('something went wrong', ex);
      })
  }

  render() {

    let results = this.state.vids.map(vid => (
      <ListItem
        key={vid.id.videoId}
        id={vid.id.videoId}
        img={vid.snippet.thumbnails.medium.url}
        title={vid.snippet.title}
        description={vid.snippet.description}
      />)
    )

    return (
      <div>
        <Form q={this.state.q} search={this.search} qUpdate={this.qUpdate}/>
        <List>
          {results}
        </List>
      </div>
    )
  }
}

export default SearchLayout;
