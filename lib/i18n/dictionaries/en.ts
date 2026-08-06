import type { Dictionary } from "../dictionaries";

const dict: Dictionary = {
  meta: {
    title: "Yayasan Putra Prabu Indonesia Raya",
    description: "Official website of Yayasan Putra Prabu Indonesia Raya",
  },
  common: {
    nav: {
      home: "Home",
      about: "About Us",
      news: "News",
      contact: "Contact Us",
    },
    openMenu: "Open menu",
    closeMenu: "Close menu",
    readMore: "Read More",
    viewAll: "View All",
  },
  footer: {
    tagline:
      "Building civilization through education, technology, and Islamic integrity. Shaping a generation that is intelligent and of noble character.",
    linksHeading: "Links",
    links: {
      home: "Home",
      about: "About Us",
      news: "News & Articles",
      contact: "Contact Us",
    },
    addressHeading: "Address & Legal",
    privacyPolicy: "Privacy Policy",
    terms: "Terms & Conditions",
    copyright: "© 2024 Yayasan Putra Prabu Indonesia Raya. All rights reserved.",
  },
  home: {
    hero: {
      title: "Building an Outstanding Generation Rooted in Islamic Values",
      description:
        "Yayasan Putra Prabu Indonesia Raya is committed to providing quality education, technological innovation, and community services of high integrity.",
      ctaPrimary: "Explore Programs",
      ctaSecondary: "About Us",
    },
    services: {
      heading: "Our Fields of Activity",
      intro:
        "Yayasan Putra Prabu Indonesia Raya strives across several crucial fields for the empowerment of the community and the progress of the nation.",
      cards: {
        education: {
          tag: "Integrated Education",
          title: "Playgroup, Elementary, Junior & Senior High",
          description:
            "A comprehensive education system combining academic excellence with the formation of strong Islamic character.",
        },
        research: {
          title: "Research & Technology",
          description: "Electrical innovation and engineering for the future.",
        },
        catering: {
          title: "Catering & Community Care",
          description:
            "Providing quality halal food as a form of care for the community.",
        },
      },
    },
    latestNews: {
      heading: "Latest News",
      viewAll: "View All",
    },
  },
  about: {
    hero: {
      title: "Building the Future of the Ummah",
      description:
        "Dedicated to education, research, and community service grounded in strong Islamic values and high integrity.",
    },
    services: {
      heading: "Fields of Activity of the Foundation",
      intro:
        "Striving to provide quality education and community empowerment through various fields of activity.",
    },
    leadership: {
      heading: "Foundation Leader",
      intro:
        "The figure who leads and directs Yayasan Putra Prabu Indonesia Raya with trustworthiness and professionalism.",
      boardPrefix: "Board of",
      welcomeLabel: "Welcome Message",
      welcomeMessage:
        "Assalamu'alaikum warahmatullahi wabarakatuh. All praise be to Allah SWT for His countless blessings, allowing Yayasan Putra Prabu Indonesia Raya to continue striving to provide quality education and trustworthy service to the community. On behalf of the entire foundation family, we extend our gratitude for the trust and support given to us. Let us work together to build a generation excellent in both knowledge and noble character. May Allah SWT continue to guide our every step. Aamiin.",
    },
    pimpinanPonpes: {
      heading: "Affiliated Islamic Boarding School",
      intro:
        "Dayah Darul Munawwarah Kuta Krueng, an Islamic boarding school affiliated with Yayasan Putra Prabu Indonesia Raya that has guided students and upheld Islamic outreach since 1966.",
      ponpes: {
        name: "Dayah Darul Munawwarah",
        location: "Kuta Krueng, Pidie Jaya",
        history:
          "Founded in 1966 by the late Tgk. H. Usman Ali, better known as Abu Kuta Krueng, Dayah Darul Munawwarah has become a center of Islamic education and outreach for the people of Pidie Jaya and its surroundings for more than half a century.",
        addressLabel: "Address",
        address:
          "Jln. Abu Kuta Krueng, Kuta Krueng Village, Banda Dua District, Pidie Jaya",
        facilitiesLabel: "Facilities",
        facilities: [
          "Mosque/Prayer Hall",
          "Dormitory",
          "Classrooms",
          "Office",
          "Library",
          "Canteen/Dining Hall",
          "Health Unit (UKS)",
          "Multipurpose Hall",
          "Sports Facilities",
          "Cooperative",
          "Laboratory",
          "Internet Access",
        ],
        locationButton: "View Location",
      },
      peopleHeading: "Islamic Boarding School Leaders",
      people: [
        { name: "Abu Kuta Krueng", role: "Islamic Boarding School Leader (Late)" },
        { name: "Teuku Anwar Kuta Krueng", role: "Islamic Boarding School Leader" },
      ],
    },
    visiMisi: {
      heading: "Vision & Mission",
      intro:
        "The foundation of Yayasan Putra Prabu Indonesia Raya's aspirations and concrete steps in building the ummah.",
      visiLabel: "Vision",
      visiText:
        "To become a leading foundation that raises an intelligent, noble-charactered generation, beneficial to the ummah and the nation through education, research, and community service grounded in Islamic values.",
      misiLabel: "Mission",
      misiPoints: [
        "Providing quality education grounded in Islamic values",
        "Shaping the character and noble conduct of students from an early age",
        "Developing research and technological innovation that benefits the ummah",
        "Delivering trustworthy and sustainable social service and community care",
      ],
    },
  },
  contact: {
    hero: {
      title: "Contact Us",
      description:
        "We are ready to listen and build good relations. Please contact us through the form below or visit our office.",
    },
    mapTitle: "Location of Yayasan Putra Prabu Indonesia Raya",
    form: {
      heading: "Send a Message",
      labels: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
      },
      placeholders: {
        name: "Enter your name",
        email: "email@example.com",
        subject: "The purpose of your message",
        message: "Write your message here...",
      },
      submit: "Send Message Now",
      submitting: "Sending...",
      success: "Your message has been sent successfully. We will contact you shortly.",
      errorGeneric: "Something went wrong. Please try again later.",
      errorRateLimited: "Too many requests. Please try again later.",
      errorMissingFields: "Name, Email, and Message are required.",
    },
    info: {
      heading: "Contact Information",
      missionHeading: "Our Mission",
      missionText:
        "Building an intelligent generation of noble character through education grounded in the values of integrity and a noble heritage.",
      missionPoints: [
        "Quality education grounded in Islamic values",
        "Shaping character and noble morals from an early age",
        "Contributing to a dignified future for Indonesia",
      ],
    },
  },
  news: {
    heading: "News & Articles",
    intro:
      "Presenting the latest information on the foundation's activities, developments in Islamic education, community welfare, and technological innovation aligned with noble values.",
    readMore: "Read More",
    empty: "No news has been published yet.",
    related: "Related News",
    share: "Share This Article:",
    pagination: {
      prev: "Previous page",
      next: "Next page",
    },
  },
  leadershipGroups: {
    pembina: "Board of Trustees",
    pengawas: "Board of Supervisors",
    pengurus_harian: "Executive Board",
  },
  languageSwitcher: {
    label: "Language",
  },
  admin: {
    login: {
      title: "Admin Login",
      subtitle: "Yayasan Putra Prabu Indonesia Raya",
      email: "Email",
      password: "Password",
      submit: "Sign In",
      submitting: "Processing...",
      errorRequired: "Email and password are required.",
      errorInvalid: "Incorrect email or password.",
    },
    sidebar: {
      panelTitle: "Admin Panel",
      dashboard: "Dashboard",
      news: "News",
      services: "Services",
      leadership: "Leadership",
      contact: "Contact Info",
      logout: "Log Out",
      language: "Admin Language",
    },
    dashboard: {
      title: "Dashboard",
    },
    common: {
      save: "Save",
      saving: "Saving...",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      deleting: "Deleting...",
      actions: "Actions",
      order: "Order",
      image: "Image",
      currentImage: "Current image",
      keepImageHint: "Leave empty if you don't want to change the image.",
      confirmDelete: "Are you sure you want to delete this data?",
      tabId: "Indonesian",
      tabEn: "English",
      tabAr: "Arabic",
    },
    news: {
      title: "News",
      add: "+ Add News",
      addTitle: "Add News",
      editTitle: "Edit News",
      empty: "No news yet.",
      columns: { image: "Image", title: "Title", category: "Category", date: "Date" },
      fields: {
        title: "Title",
        category: "Category",
        date: "Date",
        image: "Image",
        summary: "Summary",
        content: "Full Content (optional)",
      },
      errorRequired: "Title, summary, and category (Indonesian) as well as date are required.",
      errorImage: "An image is required.",
    },
    services: {
      title: "Services",
      add: "+ Add Service",
      addTitle: "Add Service",
      editTitle: "Edit Service",
      empty: "No services yet.",
      columns: { image: "Image", title: "Title", order: "Order" },
      fields: {
        title: "Title",
        image: "Image",
        description: "Description",
        icon: "Icon (material symbol, optional)",
        order: "Order",
      },
      errorRequired: "Title and description (Indonesian) are required.",
      errorImage: "An image is required.",
    },
    leadership: {
      title: "Leadership",
      add: "+ Add Member",
      addTitle: "Add Member",
      editTitle: "Edit Member",
      empty: "No leadership data yet.",
      columns: { name: "Name", role: "Role", group: "Group", order: "Order" },
      fields: { name: "Name", role: "Role", group: "Group", image: "Photo", order: "Order" },
      errorRequired: "Name and role (Indonesian) are required.",
      errorGroup: "Invalid group.",
      errorImage: "An image is required.",
    },
    contact: {
      title: "Contact Info",
      add: "+ Add Info",
      addTitle: "Add Contact Info",
      editTitle: "Edit Contact Info",
      empty: "No contact info yet.",
      columns: { icon: "Icon", label: "Label", value: "Value", order: "Order" },
      fields: {
        icon: "Icon (material symbol)",
        label: "Label",
        value: "Value",
        order: "Order",
      },
      errorRequired: "Icon, label (Indonesian), and value are required.",
    },
  },
};

export default dict;
