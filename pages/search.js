import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {format} from "date-fns";
import InfoCard from "../components/InfoCard";


function Search({searchResults}) {
    const router = useRouter();
    //console.log(searchResults);
    var {location, startDate, endDate,noOfGuests} = router.query;
    if(!location)
    {
        location="";
    }
    if(!startDate)
    {
        startDate=new Date();
    }
    if(!endDate)
    {
        endDate=new Date();
    }
    const formattedStartDate= format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate= format(new Date(endDate), "dd MMMM yy");

    const range =`${formattedStartDate} - ${formattedEndDate}`;

    //console.log(router.query);
    return (
        <div className="">
            <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
            <main className="flex">
<section className="flex-grow pt-14 px-6 ">
    <p className="text-xs">300+ Stays  for {noOfGuests} guests</p>
    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
        <p className="button">Cancellation Flexibility</p>
        <p className="button">Type of Places </p>
        <p className="button">Prices </p>
        <p className="button">Rooms and Beds </p>
        <p className="button">More filters </p> 
    </div>
<div className="flex flex-col">
    {searchResults.map((item) => (
        <InfoCard
        key={item.img} 
        img={item.img}
        location={item.location} 
        title={item.title}
        description={item.description}
        star={item.star}
        price={item.price}
        total={item.total}
        />
    ))}
</div>
</section>
            </main>
            <Footer />
        </div>
    )
}

export default Search

export async function getServerSideProps(){
    const searchResults= await fetch("https://links.papareact.com/isz").then(
        (res) => res.json()
    );

    return {
        props:{
            searchResults,
        }
    }

}