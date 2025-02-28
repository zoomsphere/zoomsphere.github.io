const CAT_NECESSARY = "necessary";
const CAT_ANALYTICS = "analytics";
const CAT_ADVERTISEMENT = "advertisement";
const CAT_FUNCTIONALITY = "functionality";
const CAT_SECURITY = "security";

const SERVICE_AD_STORAGE = 'ad_storage'
const SERVICE_AD_USER_DATA = 'ad_user_data'
const SERVICE_AD_PERSONALIZATION = 'ad_personalization'
const SERVICE_ANALYTICS_STORAGE = 'analytics_storage'
const SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage'
const SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage'
const SERVICE_SECURITY_STORAGE = 'security_storage'

// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Set default consent to 'denied' (this should happen before changing any other dataLayer)
gtag('consent', 'default', {
    [SERVICE_AD_STORAGE]: 'denied',
    [SERVICE_AD_USER_DATA]: 'denied',
    [SERVICE_AD_PERSONALIZATION]: 'denied',
    [SERVICE_ANALYTICS_STORAGE]: 'denied',
    [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
    [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
    [SERVICE_SECURITY_STORAGE]: 'granted',
});

/** 
 * Update gtag consent according to the users choices made in CookieConsent UI
 */
function updateGtagConsent() {
    const d = gtag('consent', 'update', {
        [SERVICE_ANALYTICS_STORAGE]: CookieConsent.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS) ? 'granted' : 'denied',
        [SERVICE_AD_STORAGE]: CookieConsent.acceptedService(SERVICE_AD_STORAGE, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_AD_USER_DATA]: CookieConsent.acceptedService(SERVICE_AD_USER_DATA, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_AD_PERSONALIZATION]: CookieConsent.acceptedService(SERVICE_AD_PERSONALIZATION, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_FUNCTIONALITY_STORAGE]: CookieConsent.acceptedService(SERVICE_FUNCTIONALITY_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        [SERVICE_PERSONALIZATION_STORAGE]: CookieConsent.acceptedService(SERVICE_PERSONALIZATION_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        // [SERVICE_SECURITY_STORAGE]: CookieConsent.acceptedService(SERVICE_SECURITY_STORAGE, CAT_SECURITY) ? 'granted' : 'denied',
    });
}

document.addEventListener('DOMContentLoaded', function () {
    /**
    * All config. options available here:
    * https://cookieconsent.orestbida.com/reference/configuration-reference.html
    */
    CookieConsent.run({
        // Trigger consent update when user choices change
        onFirstConsent: () => {
            updateGtagConsent();
        },
        onConsent: () => {
            updateGtagConsent();
        },
        onChange: () => {
            updateGtagConsent();
        },

        // Configure categories and services
        categories: {
            [CAT_NECESSARY]: {
                enabled: true,  // this category is enabled by default
                readOnly: true,  // this category cannot be disabled
                services: {
                    'cc_cookie': {
                        label: 'Saves your cookie consent settings.',
                    }
                }
            },
            [CAT_SECURITY]: {
                enabled: true,  // this category is enabled by default
                readOnly: true,  // this category cannot be disabled
                services: {
                    [SERVICE_SECURITY_STORAGE]: {
                        label: 'Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.',
                    },
                }
            },
            [CAT_ANALYTICS]: {
                autoClear: {
                    cookies: [
                        {
                            name: /^_ga/,
                        },
                        {
                            name: '_gid',
                        },
                        {
                            name: '_clck',
                        },
                        {
                            name: '_clsk',
                        },
                        {
                            name: /^_gcl_au/,
                        },
                        {
                            name: 'fs_uid',
                        },
                        {
                            name: 'fs_lua',
                        }
                    ]
                },
                services: {
                    [SERVICE_ANALYTICS_STORAGE]: {
                        label: 'Enables storage (such as cookies) related to analytics e.g. visit duration.',
                    }
                }
            },
            [CAT_ADVERTISEMENT]: {
                autoClear: {
                    cookies: [
                        {
                            name: '_fbp',
                        }
                    ]
                },
                services: {
                    [SERVICE_AD_STORAGE]: {
                        label: 'Enables storage (such as cookies) related to advertising.',
                    },
                    [SERVICE_AD_USER_DATA]: {
                        label: 'Sets consent for sending user data related to advertising to Google.',
                    },
                    [SERVICE_AD_PERSONALIZATION]: {
                        label: 'Sets consent for personalized advertising.',
                    },
                }
            },
            [CAT_FUNCTIONALITY]: {
                autoClear: {
                    cookies: [
                        {
                            name: '__hssc',
                        },
                        {
                            name: '__hssrc',
                        },
                        {
                            name: '__hstc',
                        },
                        {
                            name: 'hubspotutk',
                        },
                        {
                            name: 'intercom-device-id-xn43bho3',
                        },
                        {
                            name: 'intercom-id-xn43bho3',
                        },
                        {
                            name: 'intercom-session-xn43bho3',
                        }
                    ]
                },
                services: {
                    [SERVICE_FUNCTIONALITY_STORAGE]: {
                        label: 'Enables storage that supports the functionality of the website or app e.g. language settings.',
                    },
                    [SERVICE_PERSONALIZATION_STORAGE]: {
                        label: 'Enables storage related to personalization such as appearance settings, preferences, etc.',
                    },
                }
            },
        },

        guiOptions: {
            consentModal: {
                layout: 'box wide',
                position: 'bottom left',
                equalWeightButtons: false,
                flipButtons: true
            },
            preferencesModal: {
                layout: 'box',
                equalWeightButtons: false,
                flipButtons: true
            }
        },

        language: {
            default: 'en',
            translations: {
                en: {
                    consentModal: {
                        title: 'Cookie consent',
                        description: 'This website uses cookies that help the website to function and also to track how you interact with our website. But for us to provide the best user experience, enable the specific cookies from Settings, and click on Accept.',
                        acceptAllBtn: 'Accept All',
                        acceptNecessaryBtn: 'Reject All',
                        showPreferencesBtn: 'Preferences'
                    },
                    preferencesModal: {
                        title: 'Manage cookie preferences',
                        acceptAllBtn: 'Accept All',
                        acceptNecessaryBtn: 'Reject All',
                        savePreferencesBtn: 'Save my preferences',
                        closeIconLabel: 'Close modal',
                        sections: [
                            {
                                title: 'Cookie usage',
                                description: `This website uses cookies to improve your experience while you navigate through the website. Out of these cookies, the cookies that are categorized as necessary are stored on your browser as they as essential for the working of basic functionalities of the website.

                                            We also use third-party cookies that help us analyze and understand how you use this website, to store user preferences and provide them with content and advertisements that are relevant to you. These cookies will only be stored on your browser with your consent to do so. You also have the option to opt-out of these cookies.But opting out of some of these cookies may have an effect on your browsing experience.`,
                            },
                            {
                                title: 'Strictly Necessary cookies',
                                description: `These cookies are crucial for the basic functions of the website and the website will not work in its intended way without them.
                                            These cookies do not store any personally identifiable data.`,

                                //this field will generate a toggle linked to the 'necessary' category
                                linkedCategory: 'necessary',
                                cookieTable: {
                                    headers: {
                                        name: "Name",
                                        domain: "Service",
                                        description: "Description",
                                        expiration: "Expiration"
                                    },
                                    body: [
                                        {
                                            name: "cc_cookie",
                                            domain: "This website",
                                            description: "Stores your cookie consent preferences",
                                            expiration: "1 year"
                                        },
                                        {
                                            name: "userId",
                                            domain: "Service",
                                            description: "Stores your user ID",
                                            expiration: "14 months"
                                        },
                                        {
                                            name: "apikey",
                                            domain: "Service",
                                            description: "Stores your user session",
                                            expiration: "14 months"
                                        }
                                    ]
                                }
                            },
                            {
                                title: "Analytics",
                                description: 'Cookies used for analytics help collect data that allows services to understand how users interact with a particular service. These insights allow services both to improve content and to build better features that improve the user\'s experience.',
                                linkedCategory: CAT_ANALYTICS,
                                cookieTable: {
                                    headers: {
                                        name: "Name",
                                        domain: "Service",
                                        description: "Description",
                                        expiration: "Expiration"
                                    },
                                    body: [
                                        {
                                            name: "_ga*",
                                            domain: "Google Analytics",
                                            description: "Used to distinguish users in Google Analytics",
                                            expiration: "1 year"
                                        },
                                        {
                                            name: "_gcl_au",
                                            domain: "Google AdSense",
                                            description: "Used by Google AdSense for experimenting with advertisement efficiency",
                                            expiration: "2 years"
                                        },
                                        {
                                            name: "fs_uid",
                                            domain: "FullStory",
                                            description: "Used to uniquely identify users for session tracking and analytics purposes",
                                            expiration: "1 year"
                                        },
                                        {
                                            name: "fs_lua",
                                            domain: "FullStory",
                                            description: "Records the time of the user's last interaction to manage session activity and duration",
                                            expiration: "1 hour"
                                        }
                                    ]
                                }
                            },
                            {
                                title: 'Advertising',
                                description: 'Google uses cookies for advertising, including serving and rendering ads, personalizing ads (depending on your ad settings at <a href=\"https://g.co/adsettings\">g.co/adsettings</a>), limiting the number of times an ad is shown to a user, muting ads you have chosen to stop seeing, and measuring the effectiveness of ads.',
                                linkedCategory: CAT_ADVERTISEMENT,
                                cookieTable: {
                                    headers: {
                                        name: "Name",
                                        domain: "Service",
                                        description: "Description",
                                        expiration: "Expiration"
                                    },
                                    body: [
                                        {
                                            name: "_fbp",
                                            domain: "Facebook",
                                            description: "Used by Facebook to deliver a series of advertisement products such as real-time bidding from third party advertisers",
                                            expiration: "3 months"
                                        }
                                    ]
                                }
                            },
                            {
                                title: 'Functionality',
                                description: 'Cookies used for functionality allow users to interact with a service or site to access features that are fundamental to that service. Things considered fundamental to the service include preferences like the user\'s choice of language, product optimizations that help maintain and improve a service, and maintaining information relating to a user\'s session, such as the content of a shopping cart.',
                                linkedCategory: CAT_FUNCTIONALITY,
                                cookieTable: {
                                    headers: {
                                        name: "Name",
                                        domain: "Service",
                                        description: "Description",
                                        expiration: "Expiration"
                                    },
                                    body: [
                                        {
                                            name: "__hssc",
                                            domain: "HubSpot",
                                            description: "Used to track sessions on HubSpot",
                                            expiration: "30 minutes"
                                        },
                                        {
                                            name: "__hssrc",
                                            domain: "HubSpot",
                                            description: "Used to determine if the user has restarted their browser",
                                            expiration: "Session"
                                        },
                                        {
                                            name: "__hstc",
                                            domain: "HubSpot",
                                            description: "Contains domain, utk, initial timestamp, last timestamp, current timestamp, and session count",
                                            expiration: "6 months"
                                        },
                                        {
                                            name: "hubspotutk",
                                            domain: "HubSpot",
                                            description: "Used to keep track of a visitor's identity. Passed to HubSpot on form submission to associate with a contact",
                                            expiration: "6 months"
                                        },
                                        {
                                            name: "intercom-device-id-xn43bho3",
                                            domain: "Intercom",
                                            description: "Uniquely identifies a device across visits to your website",
                                            expiration: "9 months"
                                        },
                                        {
                                            name: "intercom-id-xn43bho3",
                                            domain: "Intercom",
                                            description: "Anonymous visitor identifier cookie",
                                            expiration: "9 months"
                                        },
                                        {
                                            name: "intercom-session-xn43bho3",
                                            domain: "Intercom",
                                            description: "Identifies a session of your website",
                                            expiration: "7 days"
                                        }
                                    ]
                                }
                            },
                            {
                                title: 'Security',
                                description: 'Cookies used for security authenticate users, prevent fraud, and protect users as they interact with a service.',
                                linkedCategory: CAT_SECURITY,
                            },
                            {
                                title: 'More information',
                                description: 'For any queries in relation to the policy on cookies and your choices, please <a href="https://www.zoomsphere.com/contacts">contact us</a>.'
                            }
                        ]
                    }
                }
            }
        }
    });
});
