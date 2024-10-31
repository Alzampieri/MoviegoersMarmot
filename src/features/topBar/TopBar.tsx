import { useCallback } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { useLanguagesQuery } from '@api/configuration.api';

import { selectLanguage, setLanguage } from '@features/configs/configuration.slice';

import Form  from 'react-bootstrap/Form';

import arrow from '@assets/icon/topBar/arrow-left.svg'

import styles from './TopBar.module.less'

function TopBar() {
  const location = useLocation()
  const { data: languages } = useLanguagesQuery();
  const currentLanguage = useSelector(selectLanguage)

  const dispatch = useDispatch()

  const onChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>)=> {
    dispatch(setLanguage(event.target.value))
  }, [setLanguage])

  return (
    <div className={styles.topBar}>
      {
        location.pathname === "/home" ?
          <p className={styles.text}>Bonjour</p>
        :
          <Link className={styles.returnButton} to={"home"} >
            <img draggable={false} src={arrow} />
          </Link>
      }
      <Form.Select className={styles.languageSelect} value={currentLanguage} onChange={onChange}>
        {
          languages?.map((language) => (
            <option className={styles.option} value={language.iso_639_1} key={language.iso_639_1}>{language.iso_639_1.toUpperCase()}</option>
          ))
        }
      </Form.Select>
    </div>
  )
}

export default TopBar
