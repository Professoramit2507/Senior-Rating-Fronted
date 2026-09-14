
import Navber from '../Shared/Navber';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer';

const Home = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Home;