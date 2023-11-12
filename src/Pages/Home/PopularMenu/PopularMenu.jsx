
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";


const PopularMenu = () => {

    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')

    return (
        <div className="mb-12">
            <SectionTitle subHeading={'Popular Items'} heading={'FROM OUR MENU'}></SectionTitle>
            <div className="flex flex-col justify-center items-center">
                <div className=" grid md:grid-cols-2 gap-10">
                    {
                        popular.map(item => <MenuItem item={item} key={item._id}></MenuItem>)
                    }
                </div>
                <button className="btn btn-outline border-0 border-b-2 mt-5">View Full Menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;