import React from 'react';
import 'whatwg-fetch';
import Form from './Form';
import List from './List';
import ListItem from './ListItem';
import '../css/SearchLayout.css';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';

@inject('store') @observer
export default class SearchLayout extends React.Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this);
    this.qUpdate = this.qUpdate.bind(this);
    // this.state = {q: this.props.store.q || ''}
    this.state = {q: '', vids: []}
  }

  componentDidMount() {
    if(this.props.location.query.q) {
      this.fetchVids();
      this.setState({q: this.props.location.query.q});
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.query.q !== this.props.location.query.q &&
      this.props.location.query.q) {
      this.fetchVids();
      this.setState({q: this.props.location.query.q});
    }
  }

  qUpdate(e) {
    this.setState({q: e.target.value})
  }

  search(e) {
    e.preventDefault();

    browserHistory.push({
      pathname: '/',
      query: { q: this.state.q }
    })
  }

  fetchVids() {
    let url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCawc-PplCQMWvBPM8S9lF5ZmE3QsdAnxA&part=snippet&type=video&maxResults=25&q=${encodeURIComponent(this.props.location.query.q)}`
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        // this.props.store.vids = json.items;
        // this.props.store.q = this.state.q;
        this.setState({vids: json.items});
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
