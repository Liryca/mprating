import React from 'react';
import { Link, useLocation, NavLink } from "react-router-dom";
import logo from './images/logo.png';
import './Header.scss';
import Icon from '../Icon/Icon';
import IconsSvg from "./images/icons.svg";
import tg from './images/telegram.svg';
import youtub from './images/youtube.svg';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { showNotificationsAction } from '../../store/notifications/action';
import NotificationsPopup from '../Notifications/Notifications';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';


const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};


const PopupBody = styled('div')(
    ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
        };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`,
);


const Header = () => {

    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications);
    const { showNotifications, notificationsList } = notifications

    console.log(showNotifications)

    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined



    return (
        <header className='header'>
            <nav className='header__nav-bar'>
                <div className='header__list'>
                    <div className='header__first-column'>
                        <div className='header__item'>
                            <Link className='header__logo' to={"/main"}>
                                <img src={logo} alt='MPrating'></img>
                            </Link>

                        </div>

                        {/* <div className='header__item'><NavLink  className='header__menu-item main-font disabled-link' to="/history">История</NavLink> </div> */}

                    </div>
                    <div className='header__second-column'>
                        <div className='header__item'>
                            <NavLink target='_blank' className='header__menu-item main-font' to="/instruction">Инструкция по работе</NavLink></div>
                        <div className='header__social-icons'>
                            <Badge badgeContent={4} color="primary">
                                <NotificationsNoneIcon
                                    onClick={handleClick}
                                    cursor='pointer'
                                    fontSize='large'
                                    color="action" />
                                <BasePopup id={id} open={open} anchor={anchor}>
                                    <PopupBody>
                                        <ul>{notificationsList.map(notification => {
                                            return <li>{notification.text}</li>
                                        })}</ul>
                                    </PopupBody>
                                </BasePopup>
                            </Badge>

                            <a target="_blank" href='https://www.youtube.com/@mprating'>
                                <img className='youtube-icon' src={youtub} alt='youtub'></img>
                                {/* <Icon classN={'youtube-icon'} id={'#State=Hover'} size={25} iconsSvg={IconsSvg} /> */}

                            </a>
                            <a target="_blank" href='https://t.me/+cuZi8Td6KmFhYTA6'>
                                <img className='tg-' src={tg} alt='tg'></img>
                                {/* <Icon classN={'tg-'} id={'#State=Hover (1)'} size={25} iconsSvg={IconsSvg} /> */}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

        </header>
    );
};

export default Header;