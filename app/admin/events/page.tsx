import React from 'react'
import Image from "next/image";
import {IEvent} from "@/database";
import {cacheLife} from "next/cache";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const EventsManagement = async () => {
    'use cache'
    cacheLife("minutes");
    const response = await fetch(`${baseUrl}/api/events`);
    const { events } = await response.json();
    return (
        <section id="events-management">
            <div className="flex justify-between items-center">
                <h1 className="text-5xl leading-normal">
                    Events Management
                </h1>
                <button className="button-add">
                    Add new event
                </button>
            </div>
            <div className="table-wrap overflow-auto ">
                <table>
                    <thead className="h-12">
                    <tr>
                        <td>
                            Events
                        </td>
                        <td>
                            Locations
                        </td>
                        <td>
                            Date
                        </td>
                        <td>
                            Time
                        </td>
                        <td>
                            Booked spot
                        </td>
                        <td>

                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {events.map((event: IEvent) => (
                        <tr key={event.title}>
                            <td>
                                <a href={`/events/`+ event.slug} className="table-event flex gap-3 items-center hover:opacity-80">
                                    <Image src={event.image} alt={event.title} width="40" height="40" className="object-cover rounded-sm size-10" />
                                    <p className="text-lg font-semibold">
                                        {event.title}
                                    </p>
                                </a>
                            </td>
                            <td>
                                {event.location}
                            </td>
                            <td>
                                {event.date}
                            </td>
                            <td>
                                {event.time}
                            </td>
                            <td>

                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <button className="button-edit">
                                        Edit
                                    </button>
                                    <button className="button-delete">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
export default EventsManagement
