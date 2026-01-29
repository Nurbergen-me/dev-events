import {notFound} from "next/navigation";
import {IEvent} from "@/database";
import Image from "next/image";
import {BookEvent} from "@/app/components/BookEvent";
import {getSimilarEventsBySlug} from "@/lib/actions/event.actions";
import EventCard from "@/app/components/EventCard";
import {cacheLife} from "next/cache";

interface EventResponse {
    event: IEvent;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string}) => (
    <div className="flex-row-gap-2 items-center mt-2">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[]}) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap ">
        {tags.map((item) => (
            <div className="pill" key={item}>{item}</div>
        ))}
    </div>
)

const EventDetailsPage = async ({ params }: { params: Promise<({ slug: string})>}) => {
    'use cache'
    cacheLife('hours')
    const { slug } = await params;

    const response = await fetch(`${baseUrl}/api/events/${slug}`);
    const { event: { _id, title, description, image, overview, date, time, location, mode, agenda, audience, organizer, tags }} = await response.json() as EventResponse;

    if (!title) return notFound();

    const bookings = 10

    const similarEvents = await getSimilarEventsBySlug(slug);
    console.log(similarEvents);

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>
            <div className="details">
                <div className="content">
                    <Image src={image} alt="Event" width={800} height={800} className="banner" />
                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>
                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <ul>
                            <EventDetailItem icon="/icons/calendar.svg" alt="Calendar" label={date} />
                            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
                            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
                            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                            <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
                        </ul>
                    </section>
                    
                    <EventAgenda agendaItems={agenda} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags} />
                </div>
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book your spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked their spot!
                            </p>
                        ): (
                            <p className="text-sm">Be the first to book your spot!</p>
                        )}
                        <BookEvent eventId={_id.toString()} slug={slug} />
                    </div>
                </aside>
            </div>
            <div className="flex flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard key={similarEvent.title} {...similarEvent} />
                    )) }
                </div>
            </div>
        </section>
    )
}
export default EventDetailsPage
