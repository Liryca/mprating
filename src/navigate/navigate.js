import  Auth  from '../pages/Auth/Auth';
import  Main  from '../pages/Main/Main';
import  Settings  from '../pages/Settings/Settings';

export const links = [
   

    // {
    //     path: '/',
    //     component: Auth,
    // },

    {
        path: '/main',
        component: Main,
        class:'wrapper-main'
        
    },

    {
        path: '/settings',
        component: Settings,
        class:'wrapper-setting'

    }


]