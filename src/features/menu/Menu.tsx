import { NavLink } from 'react-router-dom'

import homeIcon from '@assets/icon/menu/home.svg'

// change icon when available
import tvIcon from '@assets/icon/menu/movie.svg'

import movieIcon from '@assets/icon/menu/movie.svg'

//change icon when available
import peopleIcon from '@assets/icon/menu/movie.svg'
import marmotMenu from '@assets/marmot/marmot.svg'
import marmotProfile from '@assets/marmot/marmot profile.svg'

import styles from './Menu.module.less'

function Menu() {
  const menuItemData = [
    {
      name: 'home',
      link: "/home",
      icon: homeIcon,
    },
    {
      name: 'tv',
      link: "/category/tv",
      icon: tvIcon,
    },
    {
      name: 'movie',
      link: "/category/movie",
      icon: movieIcon,
    },
    {
      name: 'people',
      link: "/category/people",
      icon: peopleIcon,
    },
  ]
  // TODO add profile Link when login and profil feature available
  return (
    <div className={styles.menu}>
      <NavLink className={() => styles.profil} to={"/home"}>     
        <img src={marmotProfile} />
      </NavLink>
      {
        menuItemData.map((item: any, index) => (
          <NavLink className={(props) => `${props.isActive ? styles.active : ''} ${styles.link}`} to={item.link} key={index} >
            <img draggable={false} src={item.icon} />
          </NavLink>
        ))
      }
      <img className={styles.marmot} src={marmotMenu} />
    </div>
  )
}

export default Menu
