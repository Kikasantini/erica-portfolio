import { siteContent } from "../data/siteContent";

export default function Home(){
    return(
        <main>
            <h1>{siteContent.home.title}</h1>
            <p>{siteContent.home.introduction}</p>
        </main>
    );
}