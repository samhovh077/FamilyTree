import { createBrowserRouter } from "react-router-dom";
import FamilyTree from "../FamilyTree";
import Pdf from "../PDF";

export const routers = createBrowserRouter([
    {
        path:'/',
        element:<FamilyTree />
    },
    {
        path:'/Pdf',
        element:<Pdf />

    }
])