import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover';
import menuImg from '../../assets/menu/banner3.jpg'
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/SectionTitle';
import MenuCategory from '../../Shared/MenuCategory';

// img
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
// import offeredImg from '../../assets/menu/menu-bg.png'

const Menus = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg}></Cover>
            <SectionTitle heading={"today's offer"} subHeading={"---Don't miss---"}></SectionTitle>

            {/* ---offered */}
            <MenuCategory items={offered} title={'offered'}></MenuCategory>

            {/* ---dessert */}
            
            <MenuCategory coverImg={dessertImg} title={'dessert'} items={dessert}></MenuCategory>

            {/* ---soup */}
            <MenuCategory coverImg={soupImg} items={soup} title={'soup'}></MenuCategory>


            {/* ---salad */}
            <MenuCategory coverImg={saladImg} items={salad} title={'salad'}></MenuCategory>

            {/* ---pizza */}
            <MenuCategory coverImg={pizzaImg} items={pizza} title={'pizza'}></MenuCategory>




        </div>
    );
};

export default Menus;