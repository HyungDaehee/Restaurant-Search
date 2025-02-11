import React from 'react'
import Logo from '../../assets/Logo/오늘 한끼.png'
import { useNavigate } from 'react-router-dom'
import './LogoImage.scss'

const LogoImage = () => {
    const navigate = useNavigate();

    const LogoClick = ()=> {
        navigate('/')
    }

  return (
    <img src={Logo} onClick={LogoClick} className='Logo-Image'/>
  )
}

export default LogoImage