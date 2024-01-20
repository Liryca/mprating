import React, { useState } from 'react';
import { Link, useLocation, NavLink } from "react-router-dom";
import logo from './images/logo.png';
import './Header.scss';
import Icon from '../Icon/Icon';
import IconsSvg from "./images/icons.svg";
import tg from './images/telegram.svg';
import youtub from './images/youtube.svg';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsAcyncAction, readNotificationAsyncAction, deleteNotificationAsyncAction } from '../../store/notifications/action';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { PopupBody, Badge } from './MuiComponents';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CustomWidthTooltip } from '../Menu/Menu';
import moment from 'moment'
import 'moment/locale/ru'  // without this line it didn't work
moment.locale('ru');




const arr = [
    {
        id: "b817f93b-392b-47c4-8373-34a32a30b708",
        text: "Проблема с Wildberries токеном",
        type: "ERROR",
        visible: true,
    },
    {
        id: "b817f93b-392b-47c4-8373-34a32a30b708",
        text: "Проблема с Wildberries токеном",
        type: "ERROR",
        visible: true,
    }, {
        id: "b817f93b-392b-47c4-8373-34a32a30b708",
        text: "Проблема с Wildberries токеном",
        type: "ERROR",
        visible: true,
    },
    {
        id: "b817f93b-392b-47c4-8373-34a32a30b708",
        text: "Проблема с Wildberries токеном",
        type: "ERROR",
        visible: true,
    },
    {
        id: "b817f93b-392b-47c4-8373-34a32a30b708",
        text: "Проблема с Wildberries токеном",
        type: "ERROR",
        visible: true,
    },
    {
        id: "b817f93b-392b-47c4-8373-34a32a30b708",
        text: "Проблема с Wildberries токеном",
        type: "ERROR",
        visible: true,
    },
    {
        id: "b817f93b-392b-47c4-8373-34a32a30b708",
        text: "Проблема с Wildberries токеном",
        type: "ERROR",
        visible: true,
    }, {
        id: "b817f93b-392b-47c4-8373-34a32a30b708",
        text: "Проблема с Wildberries токеном",
        type: "ERROR",
        visible: true,
    },
    {
        id: "b817f93b-392b-47c4-8373-34a32a30b708",
        text: "Проблема с Wildberries токеном",
        type: "ERROR",
        visible: true,
    },
    {
        id: "b817f93b-392b-47c4-8373-34a32a30b708",
        text: "Проблема с Wildberries токеном",
        type: "ERROR",
        visible: true,
    }
]


const Header = () => {

    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications);
    const { notificationsList, countNotification, isLoadingNotifications } = notifications
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    const deleteNotification = (id, notification) => {
        dispatch(deleteNotificationAsyncAction(id, notification))
    }

    const viewNotification = (id) => {
        dispatch(readNotificationAsyncAction(id))
    }

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
                        {/* <div className='header__item'>
                        <NavLink  className='header__menu-item main-font disabled-link' to="/history">История
                        </NavLink> </div> */}
                    </div>
                    <div className='header__second-column'>
                        <div className='header__item'>
                            <NavLink target='_blank' className='header__menu-item main-font' to="/instruction">Инструкция по работе</NavLink></div>
                        <div className='header__social-icons'>
                            <Badge badgeContent={countNotification} color="primary">
                                <div className='header__notificationsIcon'>
                                    <NotificationsNoneIcon
                                        onClick={handleClick}
                                        cursor='pointer'
                                        fontSize='large'
                                        color="action" />
                                </div>
                            </Badge>
                            <Popper style={{ zIndex: 600, left: 0 }} id={id} placement='bottom-end' open={open} anchorEl={anchorEl} transition>
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <PopupBody>
                                            {!isLoadingNotifications &&
                                                notificationsList?.length ?
                                                <ul className='notificationsList'>{notificationsList?.map(notification => {
                                                    return <li
                                                        className='notificationsList__item'>
                                                        <WarningAmberIcon color="error" />
                                                        <div>
                                                            <p style={!notification.viewed ? { fontWeight: 600 } : { fontWeight: 'normal' }} >{notification.text}</p>
                                                            <p className='notice'>{moment(notification.createdDate).fromNow()}</p>
                                                        </div>
                                                        <div className='notificationsList__actions'>
                                                        {!notification.viewed &&
                                                                <CustomWidthTooltip title="Отметить как прочитанное" placement="top" arrow>
                                                                    <VisibilityIcon onClick={() => viewNotification(notification.id)}
                                                                        className='notificationsList__visibilityIcon' />
                                                                </CustomWidthTooltip>
                                                            }
                                                            <CustomWidthTooltip title="Удалить" placement="top" arrow>
                                                                <div onClick={() => deleteNotification(notification.id, notification)} className='popup__icon-delete'></div>
                                                            </CustomWidthTooltip>
                                                    
                                                        </div>

                                                    </li>
                                                })}</ul>
                                                :
                                                <div className='emptyNotifications'>
                                                    <MailOutlineIcon color='#565555' />
                                                    <p className='main-font grey'>No new notifications</p>
                                                </div>
                                            }
                                        </PopupBody>
                                    </Fade>
                                )}
                            </Popper>
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