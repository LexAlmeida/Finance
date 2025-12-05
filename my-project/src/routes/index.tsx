import {Routes, Route, Navigate} from 'react-router-dom'
import {Finance} from '../pages/Finance/Finance'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Finance/>}/>

            <Route path='*' element={<Navigate to='/pagina-inicial'/>}/>
        </Routes>
    )
}