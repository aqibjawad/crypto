import Dashboard from "../Views/Dashboard"

import Signin from "../Views/Auth/SignIn"
import Signup from "../Views/Auth/SignUp"

import Users from "../Views/Users/Users"

const routes =[ 
    {path:'/dashboard', element:<Dashboard />, exact:'true', type:'private' },

    {path:'/users', element:<Users />, exact:'true', type:'private' },

    {path:'/sign-up', element:<Signup />, exact:'true', type:'public' },
    {path:'/', element:<Signin />, exact:'true', type:'public' },


]

export default routes 