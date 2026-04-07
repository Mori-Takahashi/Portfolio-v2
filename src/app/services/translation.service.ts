import { Injectable, signal, computed } from '@angular/core';

type Lang = 'en' | 'de';

const T: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_reviews: 'Reviews',
    nav_contact: 'Contact',
    nav_hire: 'Hire Me',

    // Hero
    hero_hi: "Hi, I'm",
    hero_based_in: 'Based in',
    hero_tagline: 'Crafting visually captivating & intuitive web experiences.',
    hero_view_projects: 'View Projects',
    hero_contact_me: 'Contact Me',
    hero_scroll: 'Scroll',
    card_dev: 'Frontend Dev',
    card_remote: 'Remote',

    // About
    about_title: 'About',
    about_title_accent: 'Me',
    bio: "Hi, I'm a German speaking Frontend Developer based in Thuringia, motivated by the limitless opportunities within IT.",
    bio2: "I am excited about crafting visually captivating and intuitive websites and applications. Programming isn't just about writing code — it's a creative form of problem-solving. I distill complex technical challenges into simple, user-friendly solutions.",

    // Skills
    skills_title: 'Skill',
    skills_title_accent: 'Set',
    skill_cat_languages: 'Languages',
    skill_cat_frameworks: 'Frameworks',
    skill_cat_tools: 'Tools & Backend',

    // Projects
    projects_title: 'Featured',
    projects_title_accent: 'Projects',
    projects_live: 'Live Demo',
    projects_github: 'GitHub',

    // Testimonials
    testimonials_title: 'What People',
    testimonials_title_accent: 'Say',

    // Contact
    contact_title: "Let's Work",
    contact_title_accent: 'Together',
    contact_lead: "Have a project in mind? I'd love to hear about it. Send me a message and let's create something great together.",
    contact_label_email: 'Email',
    contact_label_location: 'Location',
    contact_name_field: 'Your Name',
    contact_email_field: 'Your Email',
    contact_message_field: 'Your Message',
    contact_privacy: 'I agree to the privacy policy and terms of use.',
    contact_send: 'Send Message',
    contact_sending: 'Sending...',

    // Footer
    footer_copy: '© 2025 Lyonel Berzen. Built with Angular & GSAP.',
    footer_contact: 'Contact',
    footer_top: 'Back to top ↑',

    // Form validation
    form_fill_all: 'Please fill in all fields.',
    form_valid_email: 'Please enter a valid email address.',
    form_agree_privacy: 'Please agree to the privacy policy.',
    form_captcha: 'Please complete the captcha.',
    form_sent: "Message sent! I'll get back to you soon. 🎉",
  },
  de: {
    // Navbar
    nav_about: 'Über mich',
    nav_skills: 'Skills',
    nav_projects: 'Projekte',
    nav_reviews: 'Bewertungen',
    nav_contact: 'Kontakt',
    nav_hire: 'Jetzt anfragen',

    // Hero
    hero_hi: 'Hallo, ich bin',
    hero_based_in: 'Ansässig in',
    hero_tagline: 'Ich entwickle visuell ansprechende & intuitive Web-Erlebnisse.',
    hero_view_projects: 'Projekte ansehen',
    hero_contact_me: 'Kontakt aufnehmen',
    hero_scroll: 'Scrollen',
    card_dev: 'Frontend Dev',
    card_remote: 'Remote',

    // About
    about_title: 'Über',
    about_title_accent: 'mich',
    bio: 'Hallo, ich bin ein deutschsprachiger Frontend-Entwickler aus Thüringen, motiviert durch die grenzenlosen Möglichkeiten der IT.',
    bio2: 'Ich begeistere mich für die Entwicklung visuell ansprechender und intuitiver Websites und Anwendungen. Programmieren bedeutet mehr als nur Code schreiben – es ist eine kreative Form des Problemlösens. Ich verwandle komplexe technische Herausforderungen in einfache, benutzerfreundliche Lösungen.',

    // Skills
    skills_title: 'Skill',
    skills_title_accent: 'Set',
    skill_cat_languages: 'Sprachen',
    skill_cat_frameworks: 'Frameworks',
    skill_cat_tools: 'Tools & Backend',

    // Projects
    projects_title: 'Ausgewählte',
    projects_title_accent: 'Projekte',
    projects_live: 'Live Demo',
    projects_github: 'GitHub',

    // Testimonials
    testimonials_title: 'Was andere',
    testimonials_title_accent: 'sagen',

    // Contact
    contact_title: 'Lass uns',
    contact_title_accent: 'zusammenarbeiten',
    contact_lead: 'Hast du ein Projekt im Kopf? Ich höre gerne davon. Schreib mir eine Nachricht und lass uns gemeinsam etwas Tolles erschaffen.',
    contact_label_email: 'E-Mail',
    contact_label_location: 'Standort',
    contact_name_field: 'Dein Name',
    contact_email_field: 'Deine E-Mail',
    contact_message_field: 'Deine Nachricht',
    contact_privacy: 'Ich stimme der Datenschutzerklärung und den Nutzungsbedingungen zu.',
    contact_send: 'Nachricht senden',
    contact_sending: 'Senden...',

    // Footer
    footer_copy: '© 2025 Lyonel Berzen. Entwickelt mit Angular & GSAP.',
    footer_contact: 'Kontakt',
    footer_top: 'Nach oben ↑',

    // Form validation
    form_fill_all: 'Bitte fülle alle Felder aus.',
    form_valid_email: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    form_agree_privacy: 'Bitte stimme der Datenschutzerklärung zu.',
    form_captcha: 'Bitte das Captcha ausfüllen.',
    form_sent: 'Nachricht gesendet! Ich melde mich bald bei dir. 🎉',
  },
};

const ARRAYS: Record<Lang, { roles: string[]; tags: string[]; statsLabels: string[] }> = {
  en: {
    roles: ['Frontend Developer', 'Angular Developer', 'NodeJS'],
    tags: ['Remote Ready', 'Problem Solver', 'Team Player', 'Growth Mindset', 'Creative'],
    statsLabels: ['Projects', 'Technologies', 'Remote', 'Languages'],
  },
  de: {
    roles: ['Frontend-Entwickler', 'Angular-Entwickler', 'NodeJS'],
    tags: ['Remote bereit', 'Problemlöser', 'Teamplayer', 'Wachstumsmentalität', 'Kreativ'],
    statsLabels: ['Projekte', 'Technologien', 'Remote', 'Sprachen'],
  },
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly _lang = signal<Lang>('de');
  readonly lang = this._lang.asReadonly();

  readonly roles      = computed(() => ARRAYS[this._lang()].roles);
  readonly tags       = computed(() => ARRAYS[this._lang()].tags);
  readonly statsLabels = computed(() => ARRAYS[this._lang()].statsLabels);

  t(key: string): string {
    return T[this._lang()][key] ?? key;
  }

  skillCategoryName(cat: string): string {
    const map: Record<string, string> = {
      'Languages':     this.t('skill_cat_languages'),
      'Frameworks':    this.t('skill_cat_frameworks'),
      'Tools & Backend': this.t('skill_cat_tools'),
    };
    return map[cat] ?? cat;
  }

  toggle(): void {
    this._lang.update(l => (l === 'en' ? 'de' : 'en'));
  }
}
