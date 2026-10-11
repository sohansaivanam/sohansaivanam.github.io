# Sohan’s portfolio — beginner editing and launch guide

This guide assumes you have never used GitHub or edited a website before.

Your portfolio has five tabs: **Home, Projects, Resume, About Me, Contact**, plus a light/dark theme toggle. It is a custom website made from ordinary files. Most everyday updates happen in one file, `assets/content.js`.

## 1. What is already done, and how are we launching?

**Current stage:** a private review draft is available at:

https://sohan-sai-vanam-portfolio.sohansaivanam.chatgpt.site

This is where you review the design with your portrait, resume, five certificates, awards, and contact details added. Project photos and technical reports can be added next. It has not been launched through your GitHub account.

**Public launch plan:** use GitHub Pages with a public repository named `YOURUSERNAME.github.io`. Your public address will be `https://YOURUSERNAME.github.io`. Visitors will be able to open that link without a GitHub account. Your computer can be turned off; GitHub hosts the website.

GitHub Pages is available for public repositories on GitHub Free. The free address is sufficient for your resume and LinkedIn. A purchased domain is optional and can be connected later.

The sequence is: finish your content, review the site, create your GitHub repository, upload the files, enable Pages, check the public link, then share it.

## 2. A few words you will see

| Word | Plain explanation |
|---|---|
| Website files | The text, styling, scripts, photos, and PDFs that make your site. |
| Hosting | The service that keeps the website available online. We plan to use GitHub Pages. |
| URL | A link or address people open in their browser. |
| Domain | A website address you can own, such as `yourname.com`. You do not need to buy one to launch. |
| Repository, or repo | Your website’s folder on GitHub, with a record of changes. |
| Commit | A saved change in GitHub. You add a short note describing what changed. |
| Branch | A named version of the files. We will use the default branch, `main`. |
| Deploy or publish | Put the website files online so visitors can see them. |
| `null` | No value has been added yet. For example, `"resume": null` means there is no resume PDF attached. |

## 3. Get your website onto your computer

Use the newest dated **sohan-portfolio** ZIP supplied in the chat. This corrected export is named **sohan-portfolio-current-dark-2026-10-11.zip**. Extract it into a new folder so it cannot get mixed with an earlier download. It contains the website files and this guide, with no build step required.

1. Download the ZIP.
2. Double-click it to extract it. If Windows shows a compressed folder instead, choose Extract All.
3. Open the extracted folder. You should see `index.html`, `assets`, and `projects`, along with the other pages.
4. Double-click `index.html`. Your browser opens the homepage on your computer.
5. Click through the tabs to preview the site. This local preview is visible only on your computer; it does not change the online draft.

For editing on your computer, install [Visual Studio Code](https://code.visualstudio.com/), usually called VS Code. Open VS Code, choose **File → Open Folder**, and select the extracted website folder. Your files appear on the left.

Keep a copy of the original ZIP as a backup before your first edits. In the current export, Home shows your real blue quarter-zip photo and About Me begins “Hey, I’m Sohan.” If you see a large SV placeholder or “Hi, I’m Sohan” with an italic heading, you are looking at an earlier design. Open the files from the newest extracted folder, or upload its contents to replace the older files on GitHub.

**Path note:** the working source used in this chat stores the website inside a folder called `dist`. The ZIP puts those same files at its top level for easier upload. So `dist/assets/content.js` in the working source is simply `assets/content.js` in your download. The actual website paths do not include `dist`.

## 4. Which file do I edit?

Paths in this table refer to your extracted ZIP or your future GitHub repository.

| What you want to change | File to open |
|---|---|
| Introduction, portrait, location, email, LinkedIn, resume link | `assets/content.js` |
| Project card title, summary, image, status, or technical report link | `assets/content.js` |
| Certificates and their supporting files | `assets/content.js` |
| About Me introduction and interests | `assets/content.js`, under `about` |
| Contact page interests | `contact.html`, below “Interested in” |
| Resume focus, linked capabilities, roles, education, and tools | `assets/content.js`, under the fields beginning with `resume` |
| A project’s actual story | Its file in `projects`, such as `projects/robotic-arm.html` |
| Accent color and appearance | `assets/styles.css` |
| Overall homepage layout | `index.html` |
| Interactive behavior | `assets/script.js` — leave this alone for ordinary content updates |

You can ask ChatGPT for help with larger layout changes. Include the current files or your current repository link so the changes use your latest version.

## 5. Your first edit: change a sentence

1. In VS Code, open `assets`, then `content.js`.
2. Find the line beginning with `"intro"`.
3. Change only the words inside the quotation marks.
4. Save using **Cmd + S** on Mac or **Ctrl + S** on Windows.
5. Return to the browser showing your local `index.html` and refresh it.

An example line looks like this:

```js
"intro": "I’m interested in mechanical design, robotics, and building working mechanisms.",
```

Keep the quotation marks, the colon, and the comma. These are part of the file’s structure. Text uses quotation marks; `true`, `false`, and `null` do not.

Change one thing at a time while learning. If an edit breaks the page, use Undo in VS Code, save again, and refresh. On Mac, Undo is Cmd + Z; on Windows, it is Ctrl + Z.

## 6. Add your photo

1. Choose your photo and give it a simple name such as `sohan.jpg`.
2. Copy it into the `assets` folder. Keep the actual extension: a PNG should be named `.png`, not renamed to `.jpg`.
3. In `content.js`, update these three lines:

```js
"portrait": "assets/sohan.jpg",
"portraitAlt": "Sohan Sai Vanam",
"portraitIsPlaceholder": false,
```

4. Save and refresh. The homepage and About Me portrait both update; the placeholder captions disappear.

`portraitAlt` describes the image for visitors using a screen reader. The path tells the website where the photo is. Names are case-sensitive online: `sohan.jpg` and `Sohan.JPG` are different paths.

A large original camera photo may slow the site down. Export a reasonably sized copy for the website and keep the original separately. The current frame is tuned to your blue quarter-zip portrait, focusing on your head and folded arms. The original JPEG is retained without extra compression. If you use a different photograph, its framing may need adjusting too.

## 7. Add email, LinkedIn, and resume

In `content.js`, edit the existing values to update your details. These are examples to replace, not your confirmed contact details:

```js
"email": "your-email@example.com",
"linkedin": "https://www.linkedin.com/in/your-profile/",
"resume": "assets/resume.pdf",
```

For the resume, first put your actual PDF in the `assets` folder and name it `resume.pdf`. Then set the path. The Resume tab presents linked project examples, engineering experience, leadership, education, and a highlighted credential. Adding the PDF enables Download resume (PDF) and View PDF links; View PDF opens the document viewer.

The email link opens the visitor’s email application. LinkedIn opens your profile. There is no contact form or message database to maintain.

For future resume updates, replace the existing `resume.pdf` with a newer file of the same name. The path stays the same.

## 8. Edit your project cards and project stories

**The project card** is the short entry on the Projects tab. Find the matching title in the `projects` list in `content.js`. Edit its `summary`, `status`, `skills`, and `evidence` as needed.

To replace a card illustration, copy a real photo into `assets`, then change that project’s `image` field:

```js
"image": "assets/robotic-arm-photo.jpg",
```

**The detailed project page** is a separate HTML file. Open `projects/robotic-arm.html`, for example. Search for the sentence you want to change. Text is usually inside a paragraph:

```html
<p>Your explanation goes here.</p>
```

Change the sentence while keeping `<p>` and `</p>`. Headings are inside tags such as `<h2>` and `</h2>`.

The large image on that detailed page has its own image tag:

```html
<img src="../assets/robotic-arm-photo.jpg" alt="The assembled robotic arm" ...>
```

Keep the other attributes that are already on the image. The `../` means “go up one folder,” because the page is inside `projects`. Update the image description and remove the concept-illustration caption once you use actual project imagery.

Changing a card image in content.js does **not** automatically replace the detailed page image. Review both places.

Use actual project evidence, clearly identify your individual role, and keep ongoing projects labeled as ongoing.

## 9. Attach a full technical report

The project webpage gives a readable overview. The optional technical PDF contains your detailed design reasoning and evidence.

1. Export your report as a PDF.
2. Copy it into `assets`, for example `robotic-arm-report.pdf`.
3. Find the robotic-arm entry in `content.js`.
4. Change the report fields:

```js
"report": "assets/robotic-arm-report.pdf",
"reportTitle": "Robotic arm — technical design report",
"reportUpdated": "October 2026"
```

The example above shows the last fields of an entry, so there is no comma after the date. Preserve the commas required by the surrounding entry.

5. Save and refresh the project page.
6. Click **Read technical report**. The document opens over the page with Close, Open in new tab, and Download options.

Some mobile browsers may handle PDFs differently. The new-tab and download options give visitors another way to read them. PDF viewing from a local file can also vary by browser; check it again on the hosted site.

Leave `report` as `null` until you have attached an actual report. To update a report later, replace the PDF with a new file of the same name and update the displayed date.

## 10. Add your certificates

Your certificates appear under **About Me**. First copy any certificate PDF into `assets`.

In `content.js`, the `certifications` list already contains your five uploaded credentials. Edit an existing entry or add another one using this structure:

```js
"certifications": [
  {
    "title": "Exact credential name",
    "issuer": "Issuing organization",
    "date": "Month Year earned",
    "credentialId": "Certificate number",
    "expires": null,
    "skills": "Relevant skills covered",
    "credentialUrl": null,
    "pdf": "assets/my-certificate.pdf"
  }
]
```

If the issuer gives you a public verification link, put that full URL in `credentialUrl`, inside quotes. If there is no PDF, use `"pdf": null`. Add an expiry date only if the credential has one.

To add a second credential, copy the object from `{` through `}`, paste it after the first one, and put a comma between the two objects. Keep both inside the square brackets. Ask for help with your first entry if you want the formatting checked.

The title, issuer, date, and certificate number display in a simple list. Verification links open in a new tab. PDF certificates use the document viewer.

### Update awards

The `awards` list in content.js contains your Maverick Academic Scholarship, followed by 3X President’s List. Each entry has a `title` and an `organization`. They appear below the certificates on About Me.

## 11. Light/dark mode and the quieter design

Use the bordered **Dark mode / Light mode** button at the upper-right corner of any page. Its label names the mode it will switch to. On phones it stays visible next to Menu, outside the collapsed navigation. The first visit starts in dark mode, matching the preferred design. A saved choice of light mode still takes priority. Clicking the button switches the theme and saves your choice in that browser, so it carries across pages and return visits. The ChatGPT draft, your local copy, and GitHub Pages have separate saved settings; a choice on one does not transfer to another. Browsers that block local storage can still switch themes for the current page. When you preview by double-clicking local HTML files, saved preferences may behave differently by browser; verify persistence on the hosted site.

The Projects page now lists your work as rows, with a small thumbnail, title, context, status, and short description. Edit these values in each project entry in content.js. On phones, each summary moves below its thumbnail and title to use the full available width. There is no grid/list switch to maintain. The page width adapts to larger monitors up to 1,480 pixels; long paragraphs keep a readable line length. Mobile text, controls, and spacing adapt without changing your content.

The About Me introduction is in `about.paragraphs` in content.js. Each quoted entry is one paragraph. The interests are in `about.interests`.

The Resume page overview is also editable in content.js:

| Editable field | What it controls |
|---|---|
| `resumeFocus` | The short introduction at the top of Resume |
| `resumeEvidence` | The three “Skills in practice” rows and their project links |
| `resumeExperience` | Your professional internship at Brahmastra |
| `resumeLeadership` | AIAA CubeSat, Formula SAE, and Entrepreneurship Club roles |
| `resumeCampus` | PLTL teaching and Office Assistant roles |
| `resumeEducation` | Your degree, university, dates, and academic summary |
| `resumeSkills` | The expandable “More tools & methods” list |
| `resumeCredentialId` | Which certificate to highlight; use its exact `credentialId` from `certifications` |
| `resume` | The original PDF path used for Download and View PDF |

A capability entry uses `title`, `tools`, `description`, `projectSlug`, and `linkLabel`. Its `projectSlug` must match an existing project, such as `robotic-arm` or `reverse-engineering`. This makes the capability link open the correct project page. To add a fourth capability, copy one whole entry, keep the comma between entries, and change its values.

An education or experience entry uses `title`, `organization`, `period`, and `description`. Set `description` to `""` to show only the role, organization, and dates. Set `period` to `""` to omit a date when one has not been confirmed. Optional `href` and `linkLabel` fields add a related project link. A skills entry uses `title` and an `items` list. Keep the existing punctuation when changing these values. The website overview is independent of the PDF; update both when your experience changes.

The page now starts with education and your CSWP credential, followed by skills in practice, professional internship experience, clubs and leadership, and teaching and campus roles. Click “More tools & methods” to expand the supporting tools. The four small links below Download jump to sections on this page. On a phone, education and credential columns stack into a single reading order.

The reverse engineering project is at `projects/reverse-engineering.html`. Its summary comes from your attached resume. Replace its workflow illustration with your actual scan and CAD images when you have them; the current illustration is clearly labeled.

### Edit fonts

Your headings use **Space Grotesk** and your body text uses **Inter**. Their files are included in `assets/fonts`, so the design works without loading a third-party font service. Keep that folder when uploading your site. The included license files must stay with the fonts when sharing this ZIP.

To change the font choices, open `assets/styles.css` and search for `--body` and `--heading`. Font sizes and the Resume layout are near the bottom of that file. Leave the two `@font-face` rules at the top alone unless you are replacing the font files too.

For accent colors, open assets/styles.css. At the top you will see two sets of variables: `:root` for light mode and `:root[data-theme="dark"]` for dark mode. The blue is named `--blue`. The primary orange text accent is `--accent`, and `--orange` is the bright decorative orange. These are inspired by UTA’s blue and orange; the orange text uses a darker shade in light mode for readability. Its current values are:

```css
/* Light mode */
--blue:#0064b1;
/* Dark mode */
--blue:#9ccaff;
```

Change the colors in both palettes if you want a different accent. Other variables control the page, text, dividers, and surfaces. Keep the colon and semicolon, and check readability in both themes. The project concept SVG illustrations have their own colors and are replaced with actual project images independently.

### Personal style and motion

Plain SSV initials in the header, orange portrait-frame corners, the blue/orange palette, and the CAD/cars introduction give the site a personal engineering identity. The homepage role line is orange; your full name uses the regular text color. Your uploaded blue quarter-zip portrait is used on Home and About Me.

The homepage reveals its introduction, name, links, and portrait in a short sequence. Project rows also appear in order. All projects appear in one list without category filters. Supported browsers add a subtle transition between pages while keeping the header steady. Browsers without cross-document transition support still open the pages normally with their entrance animations. There is no loading screen or extra build tool to maintain.

The site honors the device’s Reduce Motion preference. To change animation speed, edit `--reveal-duration` (currently `560ms`) and `--reveal-step` (`70ms`) at the top of assets/styles.css. The motion rules are near the bottom. Text and photo updates still happen in content.js.

## 12. Publish with GitHub Pages — no terminal required

Do this once your content and design are ready for public visitors.

### A. Create your account and repository

1. Go to [github.com](https://github.com/) and create an account if you do not already have one.
2. Verify your email. Choose a username you are happy to include in your website address.
3. Click the **+** menu near the upper-right corner and select **New repository**.
4. Name the repository `YOURUSERNAME.github.io`, replacing YOURUSERNAME with your exact GitHub username. For example, a username of `sohan-example` needs a repository named `sohan-example.github.io`.
5. Select **Public**.
6. Turn **Add README** on so the new repository starts with a file and a default branch.
7. Click **Create repository**.

### B. Upload the website

1. Open your repository’s **Code** tab.
2. Choose **Add file → Upload files**.
3. From your extracted ZIP folder, drag in the website files and folders. Include the HTML pages, `assets`, `projects`, and this README.
4. Upload the files themselves, not the ZIP and not an extra enclosing folder. `index.html` must appear at the repository’s top level.
5. Add a short commit message, such as `Add my portfolio website`.
6. For this personal repository, choose to save directly to `main` if that option is available. Click **Commit changes**. GitHub may label the final action differently if you select a new branch; avoid creating a separate branch during this first simple setup.

The browser uploader allows files up to 25 MiB each and up to 100 files at a time. This starter has fewer than 100 files. Compress an oversized PDF or photo if necessary.

The ZIP also contains `.nojekyll`, which tells GitHub to serve the static files directly. It may be hidden on your computer. If it is missing from GitHub, choose **Add file → Create new file**, name it `.nojekyll`, enter `# Static website`, and commit it to `main`.

### C. Turn on hosting

1. Open **Settings** in the repository.
2. In the sidebar, select **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to **main** and **Folder** to **/(root)**.
5. Click **Save**.
6. Wait for publication. GitHub says updates can take up to ten minutes.
7. Return to Settings → Pages and open the address GitHub shows.

This setup serves the files directly. You do not need a React build, Node installation, or a custom GitHub Actions workflow.

### D. Check the public site before sharing

Open the link on your phone and computer. Also open it in a private/incognito browser window to check that visitors can access it without your signed-in session.

Check all five tabs, your portrait, project links, email, LinkedIn, resume, certificates, and technical report viewer. Confirm that your final content is in place.

Then add the URL to your resume, LinkedIn, and applications. A bought domain can be added later; the free address is a complete public website.

## 13. The easiest way to update it after launch

For a quick text edit, you can use GitHub directly; VS Code is optional.

1. Open your repository on GitHub.
2. Open `assets/content.js` or the page you want to edit.
3. Click the **pencil** icon to edit the file.
4. Change the text while keeping its surrounding punctuation or HTML tags.
5. Click **Commit changes**, write a short message, and save to `main`.
6. Wait for GitHub Pages to republish, then refresh your website.

GitHub’s editor Preview tab is not a full live website preview. To review the layout before publishing, edit a downloaded copy locally and open its `index.html` in your browser first.

For a new PDF or image, open the `assets` folder in GitHub, choose Add file → Upload files, and upload it there. Then update its path in `content.js`. For a replacement with the same filename, inspect the changed file before committing. Your website URL stays the same.

If you edit locally, remember that saving on your computer does not update GitHub. Upload the changed files to the corresponding folders and commit them. If you edit on GitHub, your older local copy will not update automatically; download a fresh copy before starting your next local editing session.

GitHub keeps a history of commits. Use clear messages such as `Update resume` or `Add robotic arm report` so earlier changes are easy to identify. Save a backup before a large redesign.

## 14. Common problems and simple fixes

| What you see | What to check |
|---|---|
| Public homepage returns 404 | Is Pages enabled? Is `index.html` at the repository root? Did you select main and /(root)? Has publication finished? |
| An image is missing | Confirm the file exists in assets, its extension is correct, and capitalization matches the path. |
| Text or project cards stop updating | Check content.js for a missing comma, quotation mark, or bracket. Undo the last edit and try again. |
| A report button does not appear | Confirm that the matching project’s report field contains a path, rather than null. |
| A PDF does not load | Check its path and filename. Try Open in new tab. Confirm the file is actually a PDF. |
| Certificates do not appear | Confirm the list contains entries, the JavaScript punctuation is intact, and you are viewing About Me. |
| Local changes are missing online | Save the file, upload it to the correct GitHub folder, commit, wait for publication, and refresh. |
| Changes appear online but your local copy is old | Download the latest version from GitHub before editing locally again. |
| The online site still looks old | Wait for the deployment, then try a private/incognito window or a hard refresh. |

## 15. What to do next

Your portrait, contact links, resume PDF, five certificates, and two award entries are attached. Next, add real project photographs, CAD images, and optional technical reports.

For public launch: create your GitHub account and provide your username. We can then walk through your exact repository setup. No GitHub account has been created or changed as part of this README update.

## Official references

Instructions checked against GitHub’s documentation:

- [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
- [Configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Upload files](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Edit files in your repository](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)

## Files currently attached

- Portrait: assets/sohan-portrait.jpg
- Downloadable resume: assets/resume.pdf
- Certificates: assets/solidworks-cswp.pdf, assets/solidworks-cswa.pdf, assets/solidworks-additive-manufacturing.pdf, assets/solidworks-sustainability.pdf, assets/lean-six-sigma-white-belt.pdf

To replace one, use a new file with the same name, or update its path in content.js. PDFs are copies of your uploads; changing a summary on the website does not edit the PDF.

## Portrait framing

Your photograph is displayed inside a responsive `.portrait-frame` on Home and About Me. The CSS near the bottom of assets/styles.css controls the crop without modifying the original JPEG. Its image height is explicitly automatic, so it keeps its natural proportions. The current crop is tuned to this photograph. A higher-resolution original can improve detail, but resizing a compressed photograph cannot restore missing detail.
