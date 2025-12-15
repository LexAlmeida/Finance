import {Routes, Route, Navigate} from 'react-router-dom'
import {Finance} from '../pages/Finance/Finance'
import {Login} from '../pages/Login/Login'
import {DefaultLayout} from "../shared/layouts/DefaultLayout";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path="/" element={<DefaultLayout />}>
                <Route path='/pagina-inicial' element={<Finance/>}/>
            </Route>
            <Route path='*' element={<Navigate to='/login'/>}/>
        </Routes>
    )
}