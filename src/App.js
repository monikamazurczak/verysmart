import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      opacity: 0.55
    }
  }
}

// default route signin, isSignedIn false, isModalOpen false
const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isModalOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: 0,
    hobby: ''
  },
  status: ''
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_SERVER}/signin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.userId) {
            this.getUserProfile(data.userId)
          }
        })
        .catch(err => console.log(err))
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      age: data.age,
      hobby: data.hobby
    }})
  }

  getUserProfile = (id) => {
    const token = window.sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_SERVER}/profile/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(user => {
      if (user && user.email) {
        this.loadUser(user);
        this.onRouteChange('home');
      }
    })
    .catch(err => console.log(err))
  }

  calculateFaceLocations = (data) => {
    if (data.outputs[0].data.regions !== undefined) {
      return data.outputs[0].data.regions.map(box => {
        const clarifaiFace = box.region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      })
    } else {
      return []
    }
  }

  displayFaceBoxes = (boxes) => {
    let status = (boxes.length === 0) ? 'no faces detected' : (boxes.length > 1) ? `we have detected ${boxes.length} faces` : 'we have detected one face'
    this.setState({boxes: boxes, status: status});
  }

  onInputChange = (event) => {
    if (event.target.value === '') {
      this.setState({boxes: [], status: '', imageUrl: ''})
    }
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    const token = window.sessionStorage.getItem('token');
    this.setState({
      imageUrl: this.state.input,
      boxes: [],
      status: 'loading...'
    });
    fetch(`${process.env.REACT_APP_SERVER}/imageurl`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.status !== undefined) {
        fetch(`${process.env.REACT_APP_SERVER}/image`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)
        this.displayFaceBoxes(this.calculateFaceLocations(response))
      } else {
        this.setState({status: `there's something wrong, try again`});
      }
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      window.sessionStorage.removeItem('token');
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }))
  }

  render() {
    const { input, isSignedIn, imageUrl, route, boxes, status, isModalOpen, user } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal} />
        { isModalOpen && 
          <Modal>
            <Profile toggleModal={this.toggleModal} loadUser={this.loadUser} user={user} />
          </Modal>
        }
        { route === 'home'
          ? <div>
              <div className="header mb4">
                <Logo />
                <Rank
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                />
              </div>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                disabled={!input}
              />
              <div className="pa2 status">{status}</div>
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin getUserProfile={this.getUserProfile} onRouteChange={this.onRouteChange} />
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
