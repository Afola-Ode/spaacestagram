import axios from "axios";
import React, { Component } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "./fix.css";

// API path
const apiKey = "91F9ysjCWVEvk8SIboYa2KrfEkDA0T6nEW8viSZu";
const urlPath = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity";
const roverDetails = () => {
  return axios.get(`${urlPath}`, {
    params: {
      api_key: apiKey,
    },
  });
};

// Get photo details
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
                  <div className='col'>
                    <p className='date'>{photo.earth_date}</p>

                    <Checkbox
                      icon={<FavoriteBorderIcon style={{ fill: "white" }} />}
                      checkedIcon={<FavoriteIcon style={{ fill: "white" }} />}
                      name='checkedH'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default Fix;
