import welpart from "@/public/welpart.jpeg"
import ldka from "@/public/LDKA.jpeg"
import digifest from "@/public/digifest.jpeg"
import comvis from "@/public/comvis.jpeg"
import techno from "@/public/techno.jpeg"


export const organizationalActivities = [
    {
        picture: welpart, 
        name: "Welcoming Party MT 2025 - Provision Staff", 
        date: "Oct. 2025", 
        desc: "As a staff member of the Provision Division, i was tasked with finding and collecting the necessary items and provisions for the event. During the event itself, i also helped delivering the presentational material about the organization"
    },
    {
        picture: ldka, 
        name: "LDKA MT 2025 - Logistics Staff", 
        date: "Dec. 2025",
        desc: "I take a part as a staff member of the Logistics Division, tasked primarily to take care the needs of the event such as room booking and collecting the provisions needed for the event"
    },
    {
        picture: digifest,
        name: "DIGIFEST 2025 - Event Staff",
        date: "Sep. 2025",
        desc: "As an event staff i was able to assisted in planning and executing the event and also facilitating the event flow by bringing opening and closing prayer."
    },
    {
        picture: comvis,
        name: "COMVIS 2025 - Provision Staff",
        date: "Jun 2025",
        desc: "As a provision staff for HIMTI Company Visit 2025 at PT SPILL, Surabaya, i was able to help with the collection of needed items and provisions for the event and making sure the event ran smoothly."
    },
    {
        picture: techno,
        name: "TECHNO 2025 - Event Staff",
        date: "August 2025",
        desc: "As a part of the event staff, i contributed by finding and contacting sources who were willing to be presenters for the event. "
    }
]

export const organizationalExperiences = [
    {
        title: "Treasurer",
        orgName: "MT Al Khawarizhmi Student Organization",
        desc: "As the Treasurer, I play a key role in controlling budget allocations, monitoring fund movements, and preparing detailed and transparent monthly financial reports to maintain the organization's financial accountability.",
        year: "2026 - 2027"
    },
    {
        title: "Media Division Activist ",
        orgName: "MT Al Khawarizhmi Student Organization",
        desc: "As a member of the media team, i was responsible for drafting several social media content brief for the organization instagram account. I was also the one handling the organization's instagram account.",
        year: "2024 - 2026"
    },
    {
        title: "Academic Events Activist ",
        orgName: "HIMTI Student Association",
        desc: "As an activist in the Academic Events division, i have experience of managing several events that being held by HIMTI during my time as an activist",
        year: "2024 - 2026"
    }
]

export const education = [
    {
        school: "SMK Muhammadiyah 2 Andong",
        major: "Computer and Network Engineering",
        year: "2021 - 2024",
        desc: "Learn about how to assemble computers and laptops, learn about operating systems, introduction and basic network practices, learn about network operating systems and administer server computers."
    },
    {
        school: "BINUS University",
        major: "Computer Science - Interactive Multimedia",
        year: "2024 - 2028",
        desc: "Learned the core principles of programming starting from the basics of programming using C, fundamentals like Data Structures and Algorithms, until real life implementation like Web Development and Multimedia Programming."
    }
]

/**
 * Shared by the navbar and the footer. Only the URLs live here: each component
 * pairs them with its own icon asset, because the navbar needs the black marks
 * and the footer the white ones, and the two show them in a different order.
 */
export const socialProfiles = {
    GitHub: "https://github.com/TrollfaceGaming69",
    LinkedIn: "https://www.linkedin.com/in/al-fatih-miftahul-bilad-895323326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    Dribbble: "https://dribbble.com/TrollfaceGaming"
} as const

export type SocialLabel = keyof typeof socialProfiles
