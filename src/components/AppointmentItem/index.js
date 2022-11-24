// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {AppointmentDetails, changeFavourite} = props
  const {id, title, date, isLiked} = AppointmentDetails

  const dt = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const isFavourite = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickChangeFavourite = () => {
    changeFavourite(id)
  }

  return (
    <div className="appointment-item-container">
      <li className="appointment-item">
        <div className="title-container">
          <p className="title">{title}</p>
          <button
            className="like-btn"
            type="button"
            onClick={onClickChangeFavourite}
          >
            <img src={isFavourite} alt="star" className="star-icon" />
          </button>
        </div>
        <p className="date">Date : {dt}</p>
      </li>
    </div>
  )
}

export default AppointmentItem
