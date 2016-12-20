import React from 'react';
import YouTube from 'react-youtube';
import '../css/PlayerLayout.css';

class PlayerLayout extends React.Component{
  constructor(props) {
    super(props)
    this.state = {description: ''}
  }

  componentDidMount() {
    let url = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCawc-PplCQMWvBPM8S9lF5ZmE3QsdAnxA&part=snippet&id=${this.props.params.id}`

    fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        this.setState({description: json.items[0].snippet.description})
      }).catch((ex) => {
        console.log('something went wrong', ex);
      })
  }

  opts = {
    playerVars: {
      autoplay: 1
    }
  };

  render() {
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
              <strong>Description:</strong> {this.state.description || 'none'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerLayout;
