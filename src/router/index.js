import Vue from 'vue'
import Router from 'vue-router'
import $ from 'jquery'
import 'bootstrap3/dist/css/bootstrap.css'
import 'bootstrap3/dist/js/bootstrap.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Home from '@/components/Home'
import Footer from '@/components/Footer'
import User from '@/components/User'
import Menu from '@/components/Menu'
import Preserve from '@/components/Preserve'
import Back from '@/components/Back'
import AddMenus from '@/components/AddMenus'
import AddQa from '@/components/AddQa'
import EditQa from '@/components/EditQa'
import EditMenus from '@/components/EditMenus'
import EditUser from '@/components/EditUser'
import login from '@/components/login'
import SearchQa from '@/components/SearchQa'


Vue.use(Router)
Vue.use(ViewUI);

export default new Router({
  routes: [
    {path: '/Footer',component: Footer},
    {path: '/User',component: User,
    children:[
      {
        path:'EditUser',components:{
          'Uedit':EditUser
        }
      },
    ]
  },
    {path: '/Menu',component: Menu,
    children:[
      {
        path:'AddMenus',components:{
          'Add':AddMenus
        }
      },{
        path:'EditMenus',components:{
          'Edit':EditMenus
        }
      }
    ]
  },
    {path: '/Preserve',component: Preserve,
    children:[
      {
        path:'AddQa',components:{
          'AQA':AddQa
        }
        
      },
      {        
          path:'EditQa',components:{
            'EQA':EditQa
          }
      },
      {        
        path:'SearchQa',components:{
          'SQA':SearchQa
        }
    }
    ],

  },
    {path: '/Back',component: Back,
  },
  {path: '/login',component: login,
  },
    
  ]
})
