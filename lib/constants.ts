export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    title: "React Summit 2024",
    image: "/images/event1.png",
    slug: "react-summit-2024",
    location: "Amsterdam, Netherlands",
    date: "June 14-15, 2024",
    time: "9:00 AM - 6:00 PM",
  },
  {
    title: "Google I/O 2024",
    image: "/images/event2.png",
    slug: "google-io-2024",
    location: "Mountain View, USA",
    date: "May 14-16, 2024",
    time: "10:00 AM - 5:00 PM",
  },
  {
    title: "AWS re:Invent 2024",
    image: "/images/event3.png",
    slug: "aws-reinvent-2024",
    location: "Las Vegas, USA",
    date: "December 2-6, 2024",
    time: "9:30 AM - 6:30 PM",
  },
  {
    title: "GitHub Universe 2024",
    image: "/images/event4.png",
    slug: "github-universe-2024",
    location: "San Francisco, USA",
    date: "November 7-8, 2024",
    time: "9:00 AM - 5:00 PM",
  },
  {
    title: "ETHGlobal Hackathon",
    image: "/images/event5.png",
    slug: "ethglobal-hackathon-2024",
    location: "Toronto, Canada",
    date: "July 20-22, 2024",
    time: "10:00 AM - 10:00 PM",
  },
  {
    title: "DevOps Enterprise Summit",
    image: "/images/event6.png",
    slug: "devops-enterprise-summit-2024",
    location: "Singapore",
    date: "October 15-17, 2024",
    time: "9:00 AM - 6:00 PM",
  }
];
