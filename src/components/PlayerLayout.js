import React from 'react';
import YouTube from 'react-youtube';
import { browserHistory, Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import ListItem from './ListItem';
import Pagination from './Pagination';
import Form from './Form';
import logo from '../images/logo.png';
import '../css/PlayerLayout.css';

@inject('store') @observer
class PlayerLayout extends React.Component{
  constructor(props) {
    super(props)
    this.fetchData = this.fetchData.bind(this);
    this.description = this.description.bind(this);
    this.toggleShowMore = this.toggleShowMore.bind(this);
    this.search = this.search.bind(this);
    this.qUpdate = this.qUpdate.bind(this);
    this.state = {
      description: '',
      showMore: true,
      relatedVids: [],
      q: this.props.store.q || '',
      nextPage: '',
      prevPage: ''
    }
  }

  componentDidMount() {
    this.fetchData();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.params.id !== this.props.params.id) {
      this.fetchData();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
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

  fetchData(token='') {
    let descriptionUrl = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDzgiofdX4gUw0B-qZiP1lmKavScxZ1zCQ&part=snippet&id=${this.props.params.id}`

    fetch(descriptionUrl)
      .then((response) => {
        return response.json();
      }).then((json) => {
        this.setState({description: json.items[0].snippet.description})
      }).catch((ex) => {
        console.log('something went wrong', ex);
      })

    let relatedUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDzgiofdX4gUw0B-qZiP1lmKavScxZ1zCQ&part=snippet&type=video&maxResults=25&pageToken=${encodeURIComponent(token)}&relatedToVideoId=${encodeURIComponent(this.props.params.id)}`

    fetch(relatedUrl)
      .then((response) => {
        return response.json();
      }).then((json) => {
        console.log(json);
        this.setState({relatedVids: json.items, nextPage: json.nextPageToken, prevPage: json.prevPageToken});
      }).catch((ex) => {
        console.log('something went wrong', ex);
      })
  }

  opts = {
    playerVars: {
      autoplay: 0
    }
  };

  description() {
    if (this.state.showMore && this.state.description.length > 300)
      return `${this.state.description.slice(0, 300)}...`;
    else
      return this.state.description;
  }

  toggleShowMore() {
    this.setState({showMore: !this.state.showMore})
  }

  render() {
    let related = this.state.relatedVids.map(vid => (
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
        <div className="player-header">
          <div>
            <Link to='/'><img src={logo} className="logo" alt="logo" /></Link>
          </div>
          <div>
            <Form formClass="search" q={this.state.q} search={this.search} qUpdate={this.qUpdate}/>
          </div>
        </div>
        <div className="yt-video-wrapper">
          <YouTube
            videoId={this.props.params.id}
            opts={this.opts}
            className="yt-video"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 yt-description">
              <div><strong>Description:</strong> {this.state.description ? this.description() : 'none'}</div>
              <div className="show" onClick={this.toggleShowMore}>{this.state.showMore ? 'Show More' : 'Show Less'}</div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div id="resultsTop" className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 related-label">
              Related Videos
            </div>
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 yt-related">
              {related}
            </div>
          </div>
        </div>
        <Pagination nextPage={this.state.nextPage} prevPage={this.state.prevPage} vidsL={this.state.relatedVids.length} fetchVids={this.fetchData} scroll={500}/>
      </div>
    );
  }
}

export default PlayerLayout;
