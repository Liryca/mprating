import  Auth  from '../pages/Auth/Auth';
import  Main  from '../pages/Main/Main';
import  Settings  from '../pages/Settings/Settings';
import Instruction from '../pages/Instruction/Instruction';
import History from '../pages/History/History';

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

    },

        {
            path: '/history',
            component: History,
 
    },

           {
               path: '/instruction',
               component: Instruction,
     

    }


]