import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout.jsx"
import ErrorPage from "./pages/error/ErrorPage.jsx";
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Forgotpass from './pages/forgotpassword/Forgotpass.jsx';
import Resetpass from './pages/resetpass/Resetpass.jsx';
import Product from "./pages/product/Product.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import Protectedrouter from "./components/protectedrouter/Protectedrouter.jsx";
import DashboardLayout from './layout/DashboardLayout.jsx'
import AdminHome from './pages/admin/home/Home.jsx'
import Index from "./pages/admin/category/Index.jsx";
import DashboardProtectedRouter from "./components/protectedrouter/DashboardProtectedRouter.jsx";
import Profile from "./pages/profile/Profile.jsx"
import ChangePassword from "./components/changePassword/ChangePassword.jsx"
import Orders from "./components/order/Orders.jsx"
import UserInfo from "./components/userInfo/UserInfo.jsx"
const routes = createBrowserRouter([
    {
       path: '/',
       element: <MainLayout/>  ,
       errorElement :<ErrorPage /> ,
       children:[
        {
            path:'/',
            element:<Home />,
        },
          {
            path:'/shop',
            element:<Shop />,
        }, 

          {
            path:'/cart',
            element:
            <Protectedrouter>
            <Cart />
            </Protectedrouter>
            ,
        },

       {path:'/checkout',
          element:
           <Protectedrouter>
            <Checkout/>
           </Protectedrouter>
        },

             {
            path:'/login',
            element:<Login />,
        },
          {
            path:'/register',
            element:<Register />,
        },
        {
         path:'/forgotpassword',
            element:<Forgotpass />,
        },
         {
         path:'/resetpass',
            element:<Resetpass />,
        },

        
       {
          path: '/product/:id',
          element: (
          <Protectedrouter>
          <Product />
          </Protectedrouter>
             ),
           viewTransition: true,
       },


       {
        path: '/profile',
        element: (
          <Protectedrouter>
            <Profile />
          </Protectedrouter>
        ),
        children: [
          {
            index: true,
            element: <UserInfo />
          },
          {path: 'info',
            element: <UserInfo />
          },
          {
            path: 'change-password',
            element: <ChangePassword />
          },
          {
            path: 'orders',
            element: <Orders />
          }
        ]
      }



       ] ,
},

{
  path:'/admin',
  element:
   <DashboardProtectedRouter>
    <DashboardLayout/>,
   </DashboardProtectedRouter>,
  children:[
    {
    index:true ,
    element:<AdminHome/>
  },
  {
    path:'category/index',
    element:<Index/>,
  }
  
  ],
}



]);

export default routes;