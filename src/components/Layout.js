import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom';

const Layout = () =>{
    return(
        <div>
            <Header/>
            <div className='container'>
                <main>
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </div>
    );


}
export default Layout;