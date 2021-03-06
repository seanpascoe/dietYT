import React from 'react';
import 'whatwg-fetch';
import Form from './Form';
import List from './List';
import ListItem from './ListItem';
import Pagination from './Pagination';
import '../css/SearchLayout.css';
import { observer, inject } from 'mobx-react';
import { browserHistory, Link } from 'react-router';
import logo from '../images/logo.png';

@inject('store') @observer
export default class SearchLayout extends React.Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this);
    this.qUpdate = this.qUpdate.bind(this);
    this.fetchVids = this.fetchVids.bind(this);
    this.state = {q: '', vids: [], nextPage: '', prevPage: ''}
  }

  componentDidMount() {
    if(this.props.location.query.q) {
      this.fetchVids();
      this.setState({q: this.props.location.query.q});
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.query.q !== this.props.location.query.q) {
      this.fetchVids();
      this.setState({q: this.props.location.query.q});
    }
  }

  componentWillUnmount() {
    this.props.store.q = this.props.location.query.q //mobx
  }

  qUpdate(e) {
    this.setState({q: e.target.value});
  }

  search(e) {
    e.preventDefault();
    browserHistory.push({
      pathname: '/',
      query: { q: this.state.q }
    })
  }

  fetchVids(token='') {
    if(!this.props.location.query.q) {
      this.setState({vids: []});
      return;
    }
    let url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDzgiofdX4gUw0B-qZiP1lmKavScxZ1zCQ&part=snippet&type=video&maxResults=25&pageToken=${encodeURIComponent(token)}&q=${encodeURIComponent(this.props.location.query.q)}`
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        this.setState({vids: json.items, nextPage: json.nextPageToken, prevPage: json.prevPageToken});
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
        <div>
          <Link to='/'><img src={logo} className="App-logo" alt="logo" /></Link>
        </div>
        <Form formClass='yt-form' q={this.state.q} search={this.search} qUpdate={this.qUpdate}/>
        <div id="resultsTop"></div>
        <List>
          {results}
        </List>
        <Pagination nextPage={this.state.nextPage} prevPage={this.state.prevPage} vidsL={this.state.vids.length} fetchVids={this.fetchVids} scroll={200}/>
      </div>
    )
  }
}
