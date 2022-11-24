// Write your code here
import './index.css'
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {
    AppointmentList: [],
    titleInput: '',
    dateInput: '',
    isStarredActive: false,
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: dateInput,
      isLiked: false,
    }

    this.setState(prevState => ({
      AppointmentList: [...prevState.AppointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  changeFavourite = id => {
    this.setState(prevState => ({
      AppointmentList: prevState.AppointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isLiked: !eachAppointment.isLiked}
        }
        return eachAppointment
      }),
    }))
  }

  onChangeAddAppointment = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAddDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  showStarredAppointment = () => {
    this.setState(prevState => ({
      isStarredActive: !prevState.isStarredActive,
    }))
  }

  render() {
    const {AppointmentList, titleInput, isStarredActive, dateInput} = this.state

    const filteredLists = AppointmentList.filter(
      eachAppointment => eachAppointment.isLiked === true,
    )

    const resultList = isStarredActive ? filteredLists : AppointmentList

    return (
      <div className="bg-container">
        <div className="container">
          <div className="top-appointment-container">
            <form className="form-container">
              <h1 className="form-heading">Add Appointment</h1>
              <div className="form-title-container">
                <label htmlFor="title" className="form-title-label">
                  TITLE
                </label>
                <input
                  id="title"
                  className="title-input"
                  type="text"
                  placeholder="Title"
                  onChange={this.onChangeAddAppointment}
                  value={titleInput}
                />
              </div>
              <div className="form-date-container">
                <label htmlFor="date" className="form-date-label">
                  DATE
                </label>
                <input
                  id="date"
                  className="date-input"
                  type="date"
                  onChange={this.onChangeAddDate}
                  value={dateInput}
                />
              </div>
              <div>
                <button
                  className="add-button"
                  type="submit"
                  onClick={this.addAppointment}
                >
                  Add
                </button>
              </div>
            </form>
            <div className="appointments-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>
          </div>
          <hr className="line-break" />
          <div className="bottom-container">
            <h1 className="bottom-container-heading">Appointments</h1>
            <button
              type="button"
              className="starred-btn"
              onClick={this.showStarredAppointment}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-item-container">
            {resultList.map(eachAppointment => (
              <AppointmentItem
                AppointmentDetails={eachAppointment}
                key={eachAppointment.id}
                changeFavourite={this.changeFavourite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
