import axios from "axios";
import React, { Component } from "react";
import "./fix.css";

const apiKey = "91F9ysjCWVEvk8SIboYa2KrfEkDA0T6nEW8viSZu";
const urlPath = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity";
const roverDetails = () => {
  return axios.get(`${urlPath}`, {
    params: {
      api_key: apiKey,
    },
  });
};

const photoDetails = (date) => {
  return axios.get(`${urlPath}/photos`, {
    params: {
      api_key: apiKey,
      earth_date: date,
    },
  });
};
class Fix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      loading: true,
    };
  }
  componentDidMount() {
    roverDetails().then((res) => {
      photoDetails(res.data.rover.max_date).then((res) => {
        this.setState({
          photos: res.data.photos,
          loading: false,
        });
        console.log(this.state.photos);
      });
    });
  }

  render() {
    const { photos, loading } = this.state;
    return (
      <div className='card'>
        {loading && <h2 className='loading'>Loading…</h2>}
        {!loading &&
          photos.map((photo) => (
            <div class='card-item' key={photo.id}>
              <div>
                <img src={photo.img_src} />
                <div class='details'>
                  <p className='title'>{photo.camera.full_name}</p>
                  <p className='date'>{photo.earth_date}</p>
                </div>
                <button>Like</button>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default Fix;
