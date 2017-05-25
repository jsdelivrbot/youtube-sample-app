import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = ''; // get a youtube api key from Google (https://console.developers.google.com)


class App extends Component{

	constructor(props){
		super(props);
		this.state = { videos: [], selectedVideo: null };

		this.videoSearch('messi');
	}

	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ videos: videos, selectedVideo: videos[0] })
		});
	}

	render() {

		const videoSearch = _.debounce(term => {this.videoSearch(term)}, 500);
		return (
			<div>
				<SearchBar onSearch={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					videos={this.state.videos} 
					onSelectVideo = {selectedVideo => this.setState({selectedVideo})}
				/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'))