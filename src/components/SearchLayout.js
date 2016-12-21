import React from 'react';
import 'whatwg-fetch';
import Form from './Form';
import List from './List';
import ListItem from './ListItem';
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
    this.getNext = this.getNext.bind(this);
    this.getPrev = this.getPrev.bind(this);
    // this.state = {q: this.props.store.q || ''}
    this.state = {q: '', vids: [], nextPage: '', prevPage: ''}
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

  fetchVids(token='') {
    let url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCawc-PplCQMWvBPM8S9lF5ZmE3QsdAnxA&part=snippet&type=video&maxResults=25&pageToken=${encodeURIComponent(token)}&q=${encodeURIComponent(this.props.location.query.q)}`
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        // this.props.store.vids = json.items;
        // this.props.store.q = this.state.q;
        this.setState({vids: json.items, nextPage: json.nextPageToken, prevPage: json.prevPageToken});
      }).catch((ex) => {
        console.log('something went wrong', ex);
      })
  }

  getNext() {
    this.fetchVids(this.state.nextPage);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  getPrev() {
    if(!this.state.prevPage) {
      return
    }
    this.fetchVids(this.state.prevPage);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
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
        <List>
          {results}
        </List>
        <div className="pag-cont" style={{display: this.state.vids.length ? "block" : "none"}}>
          <div className="vid-pag">
            <span className={`btn btn-default btn-xs${this.state.prevPage ? '' : ' disabled'}`} onClick={this.getPrev}>Prev</span><span className="btn btn-default btn-xs" onClick={this.getNext}>Next</span>
          </div>
        </div>
      </div>
    )
  }
}
