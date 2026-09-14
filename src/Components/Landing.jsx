import AnonymousPrivacy from "./AnonymousPrivacy";
import RatingCategories from "./Cata";
import Cta from "./Cta";
import Faq from "./Faq";
import Hero from "./Hero";
import TopRatedSeniors from "./TopRatedSeniors";
import WhyCampusRate from "./WhyCampusRate";
import HowItWorks from "./Works";


const Landing = () => {
    return (
        <div>
            <Hero></Hero>
            <HowItWorks></HowItWorks>
            <RatingCategories></RatingCategories>
            <AnonymousPrivacy></AnonymousPrivacy>
            <TopRatedSeniors></TopRatedSeniors>
            <WhyCampusRate></WhyCampusRate>
            <Faq></Faq>
            <Cta></Cta>
        </div>
    );
};

export default Landing;