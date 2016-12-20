import React from 'react';
import YouTube from 'react-youtube';
import List from './List';
import ListItem from './ListItem';
import '../css/PlayerLayout.css';

class PlayerLayout extends React.Component{
  constructor(props) {
    super(props)
    this.fetchData = this.fetchData.bind(this);
    this.description = this.description.bind(this);
    this.toggleShowMore = this.toggleShowMore.bind(this);
    this.state = {description: '', showMore: true, relatedVids: []}
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

  fetchData() {
    let descriptionUrl = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCawc-PplCQMWvBPM8S9lF5ZmE3QsdAnxA&part=snippet&id=${this.props.params.id}`

    fetch(descriptionUrl)
      .then((response) => {
        return response.json();
      }).then((json) => {
        this.setState({description: json.items[0].snippet.description})
      }).catch((ex) => {
        console.log('something went wrong', ex);
      })

    let relatedUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCawc-PplCQMWvBPM8S9lF5ZmE3QsdAnxA&part=snippet&type=video&maxResults=25&relatedToVideoId=${encodeURIComponent(this.props.params.id)}`

    fetch(relatedUrl)
      .then((response) => {
        return response.json();
      }).then((json) => {
        this.setState({relatedVids: json.items})
      }).catch((ex) => {
        console.log('something went wrong', ex);
      })
  }

  opts = {
    playerVars: {
      autoplay: 1
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
        <div className="yt-video-wrapper">
          <YouTube
            videoId={this.props.params.id}
            opts={this.opts}
            className="yt-video"
            // onReady={this._onReady}
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
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 yt-related">
              {related}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerLayout;
