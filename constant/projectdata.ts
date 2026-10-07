import type { StaticImageData } from "next/image"

import erusea from "@/public/erusea.png"
import chimatcha from "@/public/chimatcha.png"
import guardify from "@/public/guardify.png"
import spojedy from "@/public/SpoJeDy.png"

import masgatot from "@/public/masgatot.jpg"
import pakbudi from "@/public/Pak budi.jpg"
import masslamet from "@/public/Mas slamet.jpg"
import wardi from "@/public/wardi.jpg"

import hero from "@/public/hero.png"
import gameplay from "@/public/gameplay.png"
import characters from "@/public/characters.png"
import faq from "@/public/faq.png"

/**
 * A design-only case study. Rendered by the "uiux" variant of ProjectOverlay,
 * which is the only variant that shows the User Persona cards.
 *
 * Target users come in two shapes because some projects were researched with a
 * single user group and others with two: use `targetUserLabel`/`targetUserDesc`
 * for one group, or the numbered pairs for several.
 */
export type UiuxProject = {
    image: StaticImageData
    name: string
    /** Card subtitle. Also the fallback when `projectOverview` is missing. */
    label: string
    projectOverview?: string
    problemStatement: string
    goal: string
    targetUserLabel?: string
    targetUserDesc?: string
    targetUserLabel1?: string
    targetUserDesc1?: string
    targetUserLabel2?: string
    targetUserDesc2?: string
    myRole: string
    /** Overlay footer links. Leave empty and the button renders disabled. */
    figmaUrl?: string
    prototypeUrl?: string
}

/** One persona card. `project` must match the part of the project name before the colon. */
export type UserPersona = {
    photo: StaticImageData
    project: string
    name: string
    personDesc: string
    goal: string
    painPoint: string
    motivation: string
}

/**
 * A built project (frontend or fullstack). Rendered by the "code" variant of
 * ProjectOverlay: technology pills instead of persona cards.
 *
 * `image` accepts a gallery array or a single screenshot; the first one is used
 * as the cover. An empty string means the artwork isn't ready, and the project
 * is skipped in the grid.
 */
export type CodeProject = {
    image: StaticImageData | StaticImageData[] | ""
    name: string
    label: string
    projectOverview: string
    problem: string
    goal: string
    role: string
    technologies: string[]
    /** Overlay footer links. Leave empty and the button renders disabled. */
    sourceUrl?: string
    demoUrl?: string
}

export const uiuxprojects: UiuxProject[] = [
    {
        image: erusea, 
        name: "Erusea: Multi-User Store Management Website", 
        label: "Erusea is a responsive web application for micro and small stores with two main roles, Admin and Employee.", 
        projectOverview: "Erusea is a responsive web application for micro and small stores with two main roles: Admin and Employee. Coverage includes authentication, POS transactions, categories, inventory, employees, access permissions, history, financial reports, sensitive action approvals, and audits.",
        problemStatement: "How to design a web-based transaction and inventory experience that is fast, easy to learn, and reduces recording errors.",
        goal: "To design a transaction flow and inventory management that is streamlined, synchronous, and easy to use for both store owners and employees.",
        targetUserLabel: "The store managers that still manage their store manually.",
        targetUserDesc: "Every day i message my employee asking about the inventory status and sales before making the report manually myself.",
        myRole: "As the sole designer, i responsible to turning the solution found from the problem into a fully interactive prototype.",
        figmaUrl: "",
        prototypeUrl: ""
    },
    {   
        image: chimatcha,
        name: "Chi Matcha: Online Matcha Ordering App", 
        label: "Chi Matcha is a simple mobile app that lets users browse and order their favorite matcha drinks and desserts.",
        projectOverview: "Chi Matcha is a simple mobile app that lets users browse and order their favorite matcha drinks and desserts. The app allows customers to explore different menu categories, customize their drinks, and place orders directly for pickup or delivery. Customers could also check the list of store that Chi Matcha have.",
        problemStatement: "How to design an easy to use online ordering application that allows users to order matcha remotely from their phone?",
        goal: "To design a platform that enable user to see, order, and make a purchase of their favorite matcha just by looking and clicking at their phone without waiting for minutes in line at a cafe or navigating trough conventional food ordering app.",
        targetUserLabel1: "Those who loves matcha",
        targetUserLabel2: "Those who didn't want to get in queue",
        targetUserDesc1: "I drink it every morning instead of coffee, it keeps me focused all day.",
        targetUserDesc2: "Ugh, i want to have some matcha but buying it in this rush hour will make me stuck in line for minutes",
        myRole: "As one of the two designers in this project, i handled the layouting, wireframing, and building the High Fidelity Prototype.",
        figmaUrl: "",
        prototypeUrl: ""
    },
    {
        image: guardify,
        name: "Guardify: Secure Online Browsing",
        label: "A mobile app that designed to help users protect their devices from viruses, malware, or being hijacked by unauthorized users. ",
        problemStatement: "How to design an online security app that can ensure protection to user.",
        goal: "To Provide a comprehensive, intuitive, and easy to use cybersecurity solutions",
        targetUserLabel: "People that spend most of their time with their phone or computer",
        targetUserDesc: "I loveeeee surfing on the internet...",
        myRole: "As one of the designer of this project, I handled the design of safe browsing pages and the security notification pages.",
        figmaUrl: "",
        prototypeUrl: ""
    },
    {
        image: hero,
        name: "Honkai: Star Rail website redesign",
        label: "I redesign the official website of the video game Honkai: Star rail as part of the web development competition that i follow.",
        problemStatement: "How to redesign the official Honkai Star Rail website and improve overall User Experience.",
        goal: "To improve user experience by making the website not too cluttered",
        targetUserLabel: "New player that are interested to play HSR",
        targetUserDesc: "I intested to play this game, probably want to try visiting their official website to get more info, wait, why is their website so slow and had too many content being viewed at one time?",
        myRole: "As the sole participant of the competition, i was tasked to identify the problem with the official website and from the conclusions that i found, i then redesign the new website by focusing on fixing the weakness of the official website.",
        figmaUrl: "",
        prototypeUrl: ""
    }
]

export const userPersonaData: UserPersona[] = [
    {
        photo: pakbudi,
        project: "Erusea",
        name: "Pak Budi",
        personDesc: "The owner of a grocery store that sells various necessities, has 2 employees who act as cashiers.",
        goal: "Can see his store's inventory status clearly and also connect in real time with employees so he don't need to report to his employees when there is a stock of goods running low or running out.",
        painPoint: "Because inventory data is stored in physical form (report paper) and digital spreadsheets, it will be difficult for Mr. Budi to track each item that has run out or will soon run out and to report it to his employees.",
        motivation: "Thinking to have a website that can update stock automatically and provide easy-to-follow reports."

    },
    {   
        photo: masslamet,
        project: "Erusea",
        name: "Mas Slamet",
        personDesc: "A fresh graduate that have spend 2 months working at Pak Budi's grocery store.",
        goal: "Want the purchasing process to be easier because purchasing and tracking of purchased items can be done automatically.",
        painPoint: "Serving purchases from customers while also recording purchases manually using receipts and tracking items that have been sold is very difficult to do at the same time, especially when the store is busy.",
        motivation: "Thinking to have a website that can speed up transaction services and update stock automatically"
    },
    {   
        photo: masgatot,
        project: "Chi Matcha",
        name: "Mas Gatot",
        personDesc: "Introverted matcha lovers that's dislikes waiting in line when ordering something",
        goal: "Buy his favourite matcha in ease",
        painPoint: "Waiting in line to order and need to order it traditionally by saying what he want and pays in manually",
        motivation: "Want to have simple ordering online and when he came to the store, his matcha is ready to grab."
    },
    {   
        photo: wardi,
        project: "Guardify",
        name: "Wardi",
        personDesc: "A creative worker who relies heavily on his smartphone and laptop for both work and entertainment.",
        goal: "Can surf the internet with peace of mind without worrying about getting phished or malware.",
        painPoint: "Worried that there are hidden applications that collect data without permission in the background.",
        motivation: "The desire to have one practical application that can handle all of his digital security needs."
    },
]

export const frontendprojects: CodeProject[] = [
    {
        image: [hero, characters, gameplay, faq],
        name: "Honkai: Star Rail website redesign",
        label: "I redesign the official website of the video game Honkai: Star rail as part of the web development competition that i follow.",
        projectOverview: "A fan-made recreation of the Honkai: Star Rail promotional site, built as a project for web development competition, It is a single-page application with five routes: a landing page that walks through the game, plus dedicated Gameplay, Characters, News and FAQ pages. Everything is static — no backend, no API calls, no database. All copy, images and clips are bundled with the app.",
        problem: "The official Honkai Star Rail website is too cluttered and very heavy.",
        goal: "To redesign the official HSR website and improve overall User Experience.",
        role: "As the sole participant of the competition, i was tasked with both design and developing the website.",
        technologies: ["React", "Tailwind CSS", "GSAP"],
        sourceUrl: "",
        demoUrl: ""
    },
    {
        image: "",
        name: "Raisanova Gallery: An UMKM Profile Website",
        label: "A website created as my project in DIGITERA Binus University volunteering activities to help UMKM in Malang",
        projectOverview: "",
        problem: "An UMKM want more people to know about their business.",
        goal: "Creating a website that can promote the UMKM to wider audience.",
        role: "I was responsible with developing the website",
        technologies: ["HTML", "CSS", "JavaScript"],
        sourceUrl: "",
        demoUrl: ""
    }
]

export const fullstackprojects: CodeProject[] = [
    {
        image: spojedy,
        name: "Spojedy: Online Music and Music Video Player",
        label: "A web based music and music video streaming services that enable user to stream musics from their browser",
        projectOverview: "Spojedy is a website that allow user to listen to music through the website without having to install an app, making it easier for users to listen to music when needed without downloading an app on their devices that they don't will always use.",
        problem: "How to design and build a fullstack website that display multimedia content.",
        goal: "To design and build a fullstack music streaming services that are interactive and easy to use.",
        role: "Being one of two developer of this project, i tasked with designing the overall structure of the website before my partner would finish with the details and components, i also tasked with developing the backend such as media fetch and authentication.",
        technologies: ["Vue", "Express", "MongoDB", "ImageKit"],
        sourceUrl: "",
        demoUrl: ""
    },
   /* {
        image: "",
        name: "Erusea: Multi-User Store Management Website",
        label: "Erusea is a responsive web application for micro and small stores with two main roles, Admin and Employee.",
        projectOverview: "Erusea is a responsive web application for micro and small stores with two main roles: Admin and Employee. Coverage includes authentication, POS transactions, categories, inventory, employees, access permissions, history, financial reports, sensitive action approvals, and audits.",
        problem: "How do you design and build a web-based transaction and inventory experience that's fast, easy to learn, and reduces recording errors and how do you ensure that data accessible to both Admins and Employees is synchronized with each other",
        goal: "To develop a transaction flow and inventory management that is streamlined, synchronous, and easy to use for both store owners and employees.",
        role: "As the sole developer, i was tasked with both the frontend and backend development",
        technologies: []
    } */
]
