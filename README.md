# Junwoo Lee — Portfolio

Live at: **https://ericlee913.github.io**

---

## How to Edit Content

All content lives in a single `index.html` file. Search for the placeholder
comments or text below to fill in your real information:

| What to update | Search for |
|---|---|
| Hero subtitle | `I build clean, scalable software…` |
| About bio | `I'm a software engineer with a passion…` |
| Skills list | `<ul class="skills-list">` |
| Work experience | `<!-- Job 1 -->`, `<!-- Job 2 -->`, … |
| Projects | `<!-- Project 1 -->`, … |
| Contact email | `junwoo@example.com` |
| LinkedIn URL | `linkedin.com/in/junwoolee` |
| Location | `[Your City, State]` |
| Profile photo | Replace the `<div class="avatar-placeholder">` with an `<img>` tag |
| Resume link | `<a href="#" class="btn btn-primary btn-sm">Download Resume</a>` |

---

## Deployment — GitHub Pages (automatic)

Because this repository is named `ericlee913.github.io`, GitHub Pages
automatically serves the `main` branch at **https://ericlee913.github.io**.

**Steps to deploy changes:**
```bash
git add .
git commit -m "Update portfolio"
git push
```
That's it. GitHub will rebuild and publish within ~60 seconds.

---

## Deployment — Jenkins (CI/CD)

To automate deploys via Jenkins, create a `Jenkinsfile` in the project root:

```groovy
pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                // Ensure the SSH key for the GitHub deploy key is configured
                // in Jenkins credentials as "github-deploy-key"
                sshagent(credentials: ['github-deploy-key']) {
                    sh '''
                        git config user.email "ci@jenkins"
                        git config user.name "Jenkins"
                        git add .
                        git commit -m "CI deploy [skip ci]" || echo "Nothing to commit"
                        git push origin main
                    '''
                }
            }
        }
    }
}
```

**Jenkins setup checklist:**
1. Install the **Git** and **SSH Agent** plugins in Jenkins.
2. In your repo on GitHub → **Settings → Deploy keys**, add your Jenkins
   server's public SSH key with **write** access.
3. Add the private key to Jenkins → **Manage Jenkins → Credentials** with
   ID `github-deploy-key`.
4. Create a **Pipeline** job pointing to this repository and using the
   `Jenkinsfile` above.
5. Trigger builds on push via a GitHub webhook:
   `http://<your-jenkins-url>/github-webhook/`

---

## Tech Stack

- Plain **HTML5 / CSS3 / Vanilla JS** — zero build tools required
- Deployed via **GitHub Pages**
- Icons from [Font Awesome 6](https://fontawesome.com/) (CDN)

---

## Contact Form (optional back-end)

The form currently shows a static success message. To make it actually send
emails, sign up at **https://formspree.io**, create a form, and in `script.js`
uncomment the `fetch` block, replacing `YOUR_ID` with your Formspree form ID.
