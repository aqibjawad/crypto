import SignUp from "../Views/Auth/SignUp.Auth"
import Signin from "../Views/Auth/SignIn.Auth"

import Home from "../Views/Home/Home"

import Recharge from "../Views/Recharge/Recharge"

import Network from "../Views/Network/Network"

import AddWallet from "../Views/Witdarwal/AddWallet"
import Witdarwal from "../Views/Witdarwal/Witdarwal"

import Aboutus from "../Views/Aboutus"

import Help from "../Views/Help"

import Account from "../Views/Profile"

const routes =[
    
    {path:'/signup', element:<SignUp />, exact:'true', type:'public' },
    {path:'/', element:<Signin />, exact:'true', type:'public' },

    {path:'/Home', element:<Home />, exact:'true', type:'private' },

    {path:'/recharge', element:<Recharge />, exact:'true', type:'private' },

    {path:'/network', element:<Network />, exact:'true', type:'private' },

    {path:'/addwallet', element:<AddWallet />, exact:'true', type:'private' },
    {path:'/witdarwal', element:<Witdarwal />, exact:'true', type:'private' },

    {path:'/aboutus', element:<Aboutus />, exact:'true', type:'private' },

    {path:'/help', element:<Help />, exact:'true', type:'private' },

    {path:'/profile', element:<Account />, exact:'true', type:'private' },


]
export default routes