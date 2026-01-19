import {Routes, Route, Navigate} from 'react-router-dom'
import {Login} from '../pages/Login'
import {DefaultLayout} from "../shared/layouts/DefaultLayout";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path="/pagina-inicial" element={<DefaultLayout />}/>
            <Route path='*' element={<Navigate to='/login'/>}/>
        </Routes>
    )
}