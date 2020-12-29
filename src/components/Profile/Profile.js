import React from 'react';
import ProfileImage from './ProfileImage';
import './Profile.css'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      hobby: this.props.user.hobby,
    }
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleProfileUpdate = (data) => {
    const { user, toggleModal, loadUser } = this.props
    fetch(`${process.env.REACT_APP_SERVER}/profile/${user.id}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ formInput: data })
    })
    .then(res => {
      toggleModal();
      loadUser({ ...user, ...data });
    })
    .catch(err => console.log(err));
  }

  render() {
    const { toggleModal, user } = this.props
    const { name, age, hobby } = this.state
    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-90 mw6 shadow-5 center bg-white relative">
          <main className="pa4 black-80">
            <div className="modal-image mb3">
              <ProfileImage />
              <h1 className="ma0 ph3">{(name) ? name : '???'}</h1>
            </div>
            <h4>{`Images submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${(user.joined) ? new Date(user.joined).toLocaleDateString() : 'some time ago'}`}</p>
            <hr />
            <label className="mt2 fw6" htmlFor="name">Name:</label>
            <input
              className="pa2 ba w-100"
              placeholder="Add name…"
              defaultValue={user.name}
              type="text"
              name="name"
              id="name"
              onChange={this.handleInputChange}
            />
            <label className="mt2 fw6" htmlFor="age">Age:</label>
            <input
              className="pa2 ba w-100"
              placeholder="Add age…"
              defaultValue={user.age}
              type="number"
              name="age"
              id="age"
              onChange={this.handleInputChange}
            />
            <label className="mt2 fw6" htmlFor="hobby">Hobby:</label>
            <input
              className="pa2 ba w-100"
              placeholder="Add hobby…"
              defaultValue={user.hobby}
              type="text"
              name="hobby"
              id="hobby"
              onChange={this.handleInputChange}
            />
            <div className="mt4 modal-buttons">
              <button 
                className="b pa2 grow pointer hower-white w-40 bg-light-blue b--black-20"
                onClick={() => this.handleProfileUpdate({ name, age, hobby })}>
                Save
              </button>
              <button 
                className="b pa2 grow pointer hower-white w-40 bg-light-gray b--black-20"
                onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={toggleModal}>&times;</div>
        </article>
      </div>
    )
  }
}  



export default Profile;