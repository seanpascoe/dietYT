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
    this.fetchVideos = this.fetchVideos.bind(this);
    this.state = {q: this.props.location.query.q || '', vids: []}
  }

  componentDidMount() {
    if (this.props.location.query.q)
    this.fetchVideos(this.props.location.query.q);
  }

  qUpdate(e) {
    this.setState({q: e.target.value})
  }

  search(e) {
    e.preventDefault();
    this.fetchVideos(this.state.q);
    this.props.router.push({
      ...this.props.location,
      query: {q: this.state.q}
    });
  }

  fetchVideos(q) {

    let url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCawc-PplCQMWvBPM8S9lF5ZmE3QsdAnxA&part=snippet&type=video&maxResults=25&q=${encodeURIComponent(q)}`
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
