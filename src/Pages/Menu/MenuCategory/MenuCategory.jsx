import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <div className="mt-12 ">
            {title && <Cover img={coverImg} title={title}></Cover>}
            <div className=" grid md:grid-cols-2 gap-10 mt-16">
                {
                    items.map(item => <MenuItem item={item} key={item._id}></MenuItem>)
                }
            </div>
            <div className="flex justify-center items-center">
                <Link to={`/order/${title}`}><button className="btn btn-outline border-0 border-b-2 mt-5">Order Now</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;