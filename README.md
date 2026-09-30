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
- **After any change:** bump the `?v=...` number on the three asset links at the top and bottom of `index.html` (for example `?v=20261001` to `?v=20261015`). GitHub Pages lets browsers cache files for 10 minutes, and a new number makes returning visitors download the updated CSS and JS instead of mixing old and new files.

## Contact form (Google Forms)

"Send Opportunity" submits straight to a Google Form. Every submission becomes a form response, which you can view in Google Sheets and get emailed about.

### 1. Create the form

Create a form at [forms.google.com](https://forms.google.com) with these questions, in this order. Make them all **Short answer** or **Paragraph**, not dropdowns or multiple choice, because Google rejects any value that doesn't exactly match one of the listed options.

| # | Question title | Type | Required | Key (used in step 3) |
|---|---|---|---|---|
| 1 | Recruiter Name | Short answer | Yes | `name` |
| 2 | Work Email | Short answer | Yes | `email` |
| 3 | Company | Short answer | Yes | `company` |
| 4 | Phone / WhatsApp | Short answer | No | `phone` |
| 5 | LinkedIn Profile | Short answer | No | `linkedin` |
| 6 | Job Title | Short answer | Yes | `job_title` |
| 7 | Job Location | Short answer | No | `job_location` |
| 8 | Work Mode | Short answer | No | `work_mode` |
| 9 | Employment Type | Short answer | No | `employment_type` |
| 10 | Salary / Budget Range | Short answer | No | `salary` |
| 11 | JD Link | Short answer | No | `jd_link` |
| 12 | Job Description | Paragraph | Yes | `job_description` |
| 13 | Additional Message | Paragraph | No | `message` |

Leave out Google's "response validation" rules (the website already validates the email and URLs), because a rule the site doesn't enforce would silently drop that submission.

### 2. Form settings

In **Settings → Responses**:
- **Collect email addresses:** *Do not collect*
- **Limit to 1 response:** off
- **Restrict to users in your organization** (Workspace accounts only): off

If the form requires sign-in, anonymous submissions from the website are rejected.

### 3. Connect it to the website

1. In the form editor, open the **⋮** menu and choose **Get pre-filled link**.
2. In each question, type its **key** from the table (`name`, `email`, `company`, and so on) as the answer.
3. Click **Get link**, then **Copy link**.
4. Paste it into `assets/js/data.js`:
   ```js
   contact: {
     googleFormPrefilledUrl: "https://docs.google.com/forms/d/e/…/viewform?usp=pp_url&entry.123=name&…",
   ```
   The site reads the `entry.<id>` for each field from that link. If a key is missing, the browser console warns you which one.

### 4. Get notified

- **Email:** in the form, go to **Responses → ⋮ → Get email notifications for new responses**.
- **Spreadsheet:** go to **Responses → Link to Sheets** to collect every opportunity in one sheet.

Test it by submitting the form on the live site and checking the Responses tab.

Note: Google Forms doesn't allow cross-site reads, so the website can only detect network failures, not rejected submissions (for example, a required question in the form that the site left empty). Keep the form's required questions matching the table. If sending fails, the site offers a pre-filled email as a fallback.

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
- A recruiter contact form that submits to Google Forms, with validation, a spam honeypot, a character counter and a mailto fallback
- Dark and light theme (remembered per visitor), a scroll progress bar, active-section nav highlighting, a mobile menu and a back-to-top button
- SEO meta tags, Open Graph tags and schema.org `Person` structured data
- A print stylesheet, so Ctrl+P produces a clean resume-style printout
- Respects the "reduced motion" accessibility setting
