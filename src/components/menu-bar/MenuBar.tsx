import React, { useEffect, useState } from 'react';
import './MenuBar.scss';
import Avatar from '../avatar/Avatar';
import { IoIosPeople } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';
import { AiOutlineLink } from 'react-icons/ai';

const MenuBar = ({ handleRoute }: { handleRoute: Function }) => {
    const [route, setRoute]: any = useState();
    const location = useLocation() as unknown;

    useEffect(() => {
        const path = (location as Location).pathname;
        setRoute(path);
        handleRoute(path.replace('/', ''));
    }, [handleRoute, location]);

    const isAdminRoute = (route as string)?.match(/admin/i);

    return (
        <div className="menu-bar" style={{ display: isAdminRoute ? 'flex' : 'none' }}>
            <div className="menu-bar__wrapper">
                <nav className="menu-bar__btn-container">
                    <ul className="menu-bar__list">
                        <li>
                            <NavLink
                                className="nav__link"
                                activeClassName="nav__link--active"
                                to={`/admin`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" style={{ width: '25px', height: 'auto' }}>
                                    <path style={{ fill: '#00aeac', fillOpacity: 1, strokeWidth: 1.0192 }} d="m 111.188,175.33512 c -15.924629,-6.35345 -26.003913,-24.3221 -23.951178,-42.69856 0.873959,-7.82391 5.944232,-19.03927 9.447756,-20.89827 3.401262,-1.80473 7.359192,0.0868 9.207652,4.40069 1.14319,2.66789 1.00314,3.61224 -1.35746,9.15236 -3.06301,7.18855 -3.53691,17.12753 -1.06824,22.40385 1.86713,3.99064 6.96981,9.40876 10.99852,11.67845 5.12444,2.88698 13.39798,2.27752 19.08085,-1.40558 6.43081,-4.16782 47.13588,-50.04884 49.12367,-55.37011 1.15587,-3.094229 2.04194,-7.72594 1.10693,-12.215147 -0.79298,-3.807319 -3.58693,-11.789988 -6.27103,-13.639298 -4.25381,-0.529808 -11.64533,10.996714 -11.64533,10.996714 -0.53818,0.734613 -1.1307,1.780788 -2.04593,1.555925 -0.87523,-0.272234 -1.05863,-1.023885 -1.00674,-2.27323 V 71.94069 55.621765 c 0.0178,-0.716702 0.084,-1.451092 0.64472,-2.119247 0.58828,-0.458058 1.23866,-0.513141 2.08872,-0.528087 l 15.33548,0.07242 17.85529,0.07559 c 1.04125,0.01592 1.80378,0.08091 1.8641,0.555655 0.0669,0.60063 -0.59328,1.075165 -1.21074,1.509096 0,0 -13.09737,9.967928 -10.53513,13.393922 5.18275,6.929983 10.00903,17.845334 9.54344,26.841259 -0.76482,14.777737 -2.69449,17.868557 -30.38583,48.670037 -27.812,30.93572 -29.59629,32.28109 -43.61673,32.88769 -6.16404,0.26671 -9.43172,-0.14039 -13.20279,-1.64498 z" />
                                    <path style={{ display: 'inline', fill: '#ffa300', fillOpacity: 1, strokeWidth: 1.08095 }} d="M 37.470442,212.49307 C 26.843675,208.13155 18.787957,200.0499 14.166597,189.11417 11.838124,183.60423 11.462989,181.21227 11.4667,171.89829 11.4731,154.47322 12.336668,153.0329 43.668253,118.15798 75.093568,83.178727 76.000932,82.516898 92.53169,82.516898 c 9.16864,0 10.887,0.340591 16.12927,3.196892 15.51803,8.455159 24.40264,27.01749 21.4479,44.81041 -1.43015,8.61195 -5.35666,17.97435 -8.26182,19.69948 -3.04672,1.80919 -7.78684,1.40361 -9.50266,-0.81309 -2.98994,-3.86271 -3.01386,-6.1555 -0.12651,-12.1265 4.14317,-8.56785 4.06037,-18.68696 -0.21567,-26.36097 -4.54489,-8.15652 -11.09796,-12.323274 -19.380954,-12.323274 -5.093546,0 -7.379406,0.618925 -10.959222,2.967214 -2.487782,1.63199 -15.197807,14.92177 -28.244475,29.53287 -25.6035,28.67365 -26.519359,30.1186 -26.316414,41.52021 0.339445,19.07004 19.469982,30.37166 34.561648,20.41773 2.303322,-1.51916 8.797071,-7.92185 14.430549,-14.22809 10.77408,-12.06081 13.06635,-13.33286 17.632008,-9.7846 2.953517,2.29535 3.790733,6.75418 1.992629,10.61227 -0.811301,1.74077 -6.525444,8.57884 -12.698103,15.19573 -14.481916,15.52415 -19.621552,18.50927 -32.562121,18.91213 -5.845994,0.18196 -10.612684,-0.27763 -12.987325,-1.25224 z" />
                                </svg>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="nav__link"
                                activeClassName="nav__link--active"
                                to={`/admin/links`}>
                                <AiOutlineLink />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="nav__link"
                                activeClassName="nav__link--active"
                                to={`/admin/social`}>
                                <IoIosPeople />
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="menu-bar__btn-container" style={{ color: 'blue' }}>

                </div>
                <nav className="menu-bar__btn-container">
                    <ul className="menu-bar__list">
                        <li>
                            <NavLink
                                className="nav__link"
                                activeClassName="nav__link--active"
                                to={`/admin/profile`}>
                                <Avatar imageUrl="https://d1fdloi71mui9q.cloudfront.net/7OMTzNoWRUyemfCm2cp0_22bfaaf9ec190f011141289a3cb182ed4" size="small" />
                            </NavLink>
                        </li>
                    </ul>
                </nav>


            </div>
        </div>
    );
}

export default MenuBar;