# Anil Kumar — Portfolio

A static, single-page portfolio built with HTML, Tailwind CSS (CDN), jQuery and vanilla JavaScript. It has no build step, so it can be deployed straight to GitHub Pages.

## Structure

```
index.html              page layout
assets/js/data.js       ALL your content (edit this file)
assets/js/main.js       rendering, filters, animations, contact form
assets/css/style.css    custom styles and animations
assets/Anil_Kumar_Resume.pdf   file behind the "Download CV" button
assets/img/             optional profile photo and company logos
.nojekyll               tells GitHub Pages to serve files as-is
```

## Editing content

Everything lives in `assets/js/data.js`:

| What | Where |
|---|---|
| Name, headline, typing roles, summary, highlights | `profile` |
| Open-to-work banner (roles, regions, work modes) | `openToWork` |
| Skills and categories | `skills` |
| Icons for each technology | `techIcons` ([devicon.dev](https://devicon.dev), [Font Awesome](https://fontawesome.com/search?o=r&m=free)) |
| Jobs, tech stack, linked projects | `experience` |
| Projects (category + tech filters) | `projects` |
| Education | `education` |
| Certifications, awards, recommendations | `certifications`, `achievements`, `testimonials` (empty means the section is hidden) |

- **Profile photo:** put `profile.jpg` in `assets/img/` and set `avatar: "assets/img/profile.jpg"`.
- **Company logos:** set `logo: "assets/img/allgovision.png"`. If you leave it empty, the site uses the company website's icon, and if that fails it shows a coloured initials badge.
- **Skill durations** ("3 yrs 2 mos hands-on") are calculated from the tech stacks in `experience`, so they stay accurate as you update roles.
- **Resume:** `assets/Anil_Kumar_Resume.pdf` is the global, generic resume. To update it, replace the file and keep the same name.

## Contact form (sends email to you)

The form posts to [FormSubmit](https://formsubmit.co), a free service that needs no backend or signup:

1. Deploy the site, open it, and submit the form once yourself.
2. FormSubmit emails **anilkaushik1211@gmail.com** an activation link. Click it.
3. From then on, every recruiter submission arrives in your inbox as a formatted table with their name, company, email, job title, location, work mode, salary, JD link and the full job description. Hitting Reply goes straight back to the recruiter.

Optional: after activation, FormSubmit gives you a random alias string. Replace your email in `contact.formEndpoint` with that alias so your address isn't visible in the page source.

If sending ever fails, the form offers a "send via your email app" link with all the details pre-filled.

## Deploy to GitHub Pages

```bash
cd portfolio
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

Then on GitHub go to **Settings → Pages → Build and deployment**, set **Source: Deploy from a branch** and **Branch: `main` / root**, and save.

- If the repo is named `<username>.github.io`, the site goes live at `https://<username>.github.io/`.
- Any other repo name (for example `portfolio`) goes live at `https://<username>.github.io/portfolio/`.

## Features

- An "Open to work across the globe" banner (dismissible) and a status badge in the hero
- A typing animation for titles, animated gradient background, and tech icons orbiting the avatar
- A professional summary, quick-facts card (role, relocation, education, languages) and animated counters
- Skills grouped into category tabs, with brand icons, hover animations, auto-calculated experience bars and a scrolling icon marquee
- An animated experience timeline with company logos, dates and durations, expandable achievements, tech-stack chips, a multi-select tech filter and links to projects
- Project cards with search, category filter, tech-stack filter, a details modal, and links back to the related role
- Education, plus optional certifications, awards and recommendations sections that appear once you add entries
- A recruiter contact form with validation, a spam honeypot, a character counter and a mailto fallback
- Dark and light theme (remembered per visitor), a scroll progress bar, active-section nav highlighting, a mobile menu and a back-to-top button
- SEO meta tags, Open Graph tags and schema.org `Person` structured data
- A print stylesheet, so Ctrl+P produces a clean resume-style printout
- Respects the "reduced motion" accessibility setting
