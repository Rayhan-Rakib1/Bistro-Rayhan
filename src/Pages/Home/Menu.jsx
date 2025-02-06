
import SectionTitle from '../../components/SectionTitle';
import MenuItem from '../../Shared/MenuItem';
import useMenu from '../../hooks/useMenu';

const Menu = () => {
    const [menu, loading] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');


    // const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popularItems = data.filter(item => item.category === 'popular')
    //         setMenu(popularItems)
    //     })
    // }, [])



    return (
        <div className='mb-12'>
            <SectionTitle heading='From our menu' subHeading='Popular Items'></SectionTitle>
            <div className='grid md:grid-cols-2 gap-5'>
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className='flex flex-col items-center mt-8'>
                <button className='btn btn-outline border-0 text-black  border-b-4'>View full menu</button>
            </div>
        </div>
    );
};

export default Menu;