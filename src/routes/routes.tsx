import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { Visuazer } from "../pages/Visualizer/Visualizer";
import { Result } from "../pages/Result/Result";
import { EditCategory } from "../pages/EditCategory/EditCategory";
import { EditEpisodes } from "../pages/EditEpisodes/EditEpisodes";
import { EditFinalist } from "../pages/EditFinalist/EditFinalist";
import { EditService } from "../pages/EditService/EditService";
import { EditUser } from "../pages/EditUser/EditUser";
import { EditEvent } from "../pages/EditEvent/EditEvent";
import { EditSupporters } from "../pages/EditSupporters/EditSupporters";
import { Login } from "../pages/Login/Login";

import { PrivateRoute } from '../routes/privateRouter'

export function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/register" element={<PrivateRoute><Register/></PrivateRoute>}/>
        <Route path="/visualizer" element={<PrivateRoute><Visuazer/></PrivateRoute>}/>
        <Route path="/result" element={<PrivateRoute><Result/></PrivateRoute>}/>
        <Route path="/editcategory/:id" element={<PrivateRoute><EditCategory/></PrivateRoute>}/>
        <Route path="/editepisode/:id" element={<PrivateRoute><EditEpisodes/></PrivateRoute>}/>
        <Route path="/editfinalist/:id" element={<PrivateRoute><EditFinalist/></PrivateRoute>}/>
        <Route path="/editservice/:id" element={<PrivateRoute><EditService/></PrivateRoute>}/>
        <Route path="/edituser/:id" element={<PrivateRoute><EditUser/></PrivateRoute>}/>
        <Route path="/editevent/:id" element={<PrivateRoute><EditEvent/></PrivateRoute>}/>
        <Route path="/editsupporters/:id" element={<PrivateRoute><EditSupporters/></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}
