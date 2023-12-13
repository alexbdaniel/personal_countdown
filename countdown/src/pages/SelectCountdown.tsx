import './SelectCountdown.css'
import { countdownData, ICountdown } from '../assets/countdownData.tsx'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'

interface IActiveItem {
  activeItem: ICountdown,
  setActiveItem: (activeItem: ICountdown) => void
}

export const SelectCountdown = ({activeItem, setActiveItem}: IActiveItem) => {
  // const [activeItemId, setActiveItemId] = useState('')

  useEffect(() => {

  }, [activeItem])

  const handleSelected = (i: ICountdown) => {
      setActiveItem(i)
  }


  const items = countdownData.map(i =>
    <NavLink key={i.id} to={i.urlName}>
      <li 
        id={i.id === activeItem.id ? 'active-item' : ''} className='countdown-list-item navlink-item' 
        key={i.id} 
        onClick={() => handleSelected(i)}
        >
        {i.displayNameShort}
      </li>

    </NavLink>
    )



  return (
    <div className='select-countdown-wrapper'>
      <ul>
        {items}
      </ul>
    </div>
  )
}