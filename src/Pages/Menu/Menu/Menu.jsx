import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuBg from '../../../assets/menu/banner3.jpg'
import dessertBg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaBg from '../../../assets/menu/pizza-bg.jpg'
import saladBg from '../../../assets/menu/salad-bg.jpg'
import soupBg from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {

    const [menu] = useMenu()

    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            {/* main cover */}
            <Cover img={menuBg} title={'Our Menu'}></Cover>

            {/* today's offer */}
            <SectionTitle subHeading="Don't Miss" heading={"Today's Offer"}></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert menu items */}
            <MenuCategory items={desserts} title={'dessert'} coverImg={dessertBg}></MenuCategory>

            {/* pizza menu item */}
            <MenuCategory items={pizza} title={'pizza'} coverImg={pizzaBg}></MenuCategory>

            {/* salad menu item */}
            <MenuCategory items={salad} title={'salad'} coverImg={saladBg}></MenuCategory>

            {/* soup menu item */}
            <MenuCategory items={soup} title={'soup'} coverImg={soupBg}></MenuCategory>
        </div>
    );
};

export default Menu;