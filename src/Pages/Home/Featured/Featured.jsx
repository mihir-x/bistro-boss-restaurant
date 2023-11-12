import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featured from '../../../assets/home/featured.jpg'

const Featured = () => {
    return (
        <div className=" bg-[url('featured.jpg')] bg-fixed bg-cover my-20">
            <div className=" bg-black bg-opacity-40 pt-4">
                <SectionTitle subHeading={'Check It Out'} heading={'From our menu'}></SectionTitle>
                <div className=" md:flex justify-center items-center pb-20 pt-12 px-32 md:gap-10 text-white" >
                    <img src={featured} alt="" className=" w-96" />
                    <div className="">
                        <p>NOV 10, 2023</p>
                        <p className="uppercase">Where can i get some?</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti repellat incidunt praesentium, deleniti itaque neque fuga aliquid magni placeat sequi in quibusdam eum obcaecati. Cumque tenetur quia at, necessitatibus sapiente quo harum, a nisi aut voluptatum veniam natus dolore consequuntur impedit tempora vel totam voluptate corporis. Ut dignissimos veritatis suscipit.</p>
                        <button className="btn btn-outline border-0 border-b-2 mt-5 text-white">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;