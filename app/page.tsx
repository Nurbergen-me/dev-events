import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/app/components/EventCard";
import { events } from "@/lib/constants";

const Home = () => {
    return (
        <section className="text-center">
            <h1>
                The hub for Every Dev <br/>
                Event You Can't Miss
            </h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

            <ExploreBtn/>

            <div className="mt-20 space-y-7">
                 <h3>Featured Events</h3>
                <ul className="events list-none">
                    {events.map(event => (
                        <li key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Home
