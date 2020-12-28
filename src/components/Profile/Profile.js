import React from 'react';
import './Profile.css'

const Profile = ({ toggleModal }) => {
  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv4 w-90 mw6 shadow-5 center bg-white relative">
        <main className="pa4 black-80">
          <div className="modal-image mb3">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib ma0" alt="avatar" />
            <h1 className="ma0 ph3">Karin</h1>
          </div>
          <h4>Images submitted: 44</h4>
          <p>Member since: March 2020</p>
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">Name:</label>
          <input
            className="pa2 ba w-100"
            placeholder="Karin"
            type="text"
            name="user-name"
            id="user-name"
          />
          <label className="mt2 fw6" htmlFor="user-age">Age:</label>
          <input
            className="pa2 ba w-100"
            placeholder="33"
            type="text"
            name="user-age"
            id="user-age"
          />
          <label className="mt2 fw6" htmlFor="user-from">From:</label>
          <input
            className="pa2 ba w-100"
            placeholder="Helsinki"
            type="text"
            name="user-from"
            id="user-from"
          />
          <div className="mt4 modal-buttons">
            <button className="b pa2 grow pointer hower-white w-40 bg-light-blue b--black-20">Save</button>
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

export default Profile;