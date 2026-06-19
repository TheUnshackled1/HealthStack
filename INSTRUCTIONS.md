# 🏥 HealthStack System — Installation Guide

> **A step-by-step guide to setting up HealthStack System on your local machine (Windows, macOS, and Linux).**

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [1 — Clone the Repository](#1--clone-the-repository)
- [2 — Create a Virtual Environment](#2--create-a-virtual-environment)
- [3 — Install Dependencies](#3--install-dependencies)
- [4 — Configure Environment Variables](#4--configure-environment-variables)
- [5 — Run Database Migrations](#5--run-database-migrations)
- [6 — Create a Superuser (Optional)](#6--create-a-superuser-optional)
- [7 — Start the Development Server](#7--start-the-development-server)
- [Mailtrap Setup](#-mailtrap-setup)
- [Troubleshooting](#-troubleshooting)

---

## 📦 Prerequisites

Ensure the following are installed on your system before proceeding:

| Tool | Minimum Version | Download |
|---|---|---|
| **Python** | 3.10+ | https://www.python.org/downloads/ |
| **pip** | Latest | Bundled with Python |
| **Git** | Latest | https://git-scm.com/ |

> 💡 To verify your Python version, run:
> ```bash
> python --version
> ```

---

## 1 — Clone the Repository

Open a terminal (PowerShell on Windows, bash on macOS/Linux) and clone the project:

```bash
git clone https://github.com/TheUnshackled1/HealthStack-System.git
cd HealthStack-System
```

---

## 2 — Create a Virtual Environment

A virtual environment isolates the project's Python packages from your global installation.

**Windows (PowerShell)**
```powershell
python -m venv venv
.\venv\Scripts\Activate
```

**macOS / Linux**
```bash
python3 -m venv venv
source venv/bin/activate
```

> ✅ You should see `(venv)` prefixed in your terminal prompt when the environment is active.

---

## 3 — Install Dependencies

With the virtual environment active, install all required packages:

```bash
pip install -r requirements.txt
```

> 💡 If you encounter issues with `xhtml2pdf` or `reportlab`, ensure your pip is up to date:
> ```bash
> pip install --upgrade pip
> ```

**Upgrade JWT (recommended):**
```bash
pip install --upgrade djangorestframework-simplejwt
```

---

## 4 — Configure Environment Variables

The project uses a `.env` file to manage sensitive credentials. **Never commit your `.env` file to version control.**

**Step 1 — Copy the example file:**

```bash
# macOS / Linux
cp .env.example .env
```

```powershell
# Windows (PowerShell)
Copy-Item .env.example .env
```

**Step 2 — Open `.env` and fill in your credentials:**

```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

# Mailtrap SMTP (for email notifications)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_HOST_USER=your_mailtrap_username
EMAIL_HOST_PASSWORD=your_mailtrap_password
EMAIL_USE_TLS=True
```

> ⚠️ See [Mailtrap Setup](#-mailtrap-setup) below to get your SMTP credentials.

---

## 5 — Run Database Migrations

Apply all database schema migrations to initialize the SQLite database:

```bash
python manage.py migrate
```

Expected output:
```
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions, ...
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  ...
```

---

## 6 — Create a Superuser (Optional)

To access the Django admin panel and manage users directly:

```bash
python manage.py createsuperuser
```

Follow the prompts to set a username, email, and password.

Access the admin panel at: **http://127.0.0.1:8000/admin/**

---

## 7 — Start the Development Server

```bash
python manage.py runserver
```

The application will be available at:

| URL | Description |
|---|---|
| **http://127.0.0.1:8000/** | Main application home page |
| **http://127.0.0.1:8000/admin/** | Django admin panel |

> 💡 To stop the server, press `Ctrl + C` in the terminal.

---

## 📧 Mailtrap Setup

HealthStack uses **Mailtrap** as a safe SMTP testing server for email notifications (appointment confirmations, OTP codes, etc.). Emails are captured in a virtual inbox — nothing is sent to real addresses during development.

1. Go to **https://mailtrap.io/** and create a free account
2. Navigate to **Email Testing → Inboxes**
3. Click on your inbox → select **SMTP Settings**
4. Choose **Django** from the integration dropdown
5. Copy the credentials into your `.env` file:

```env
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_HOST_USER=<your_username>
EMAIL_HOST_PASSWORD=<your_password>
EMAIL_USE_TLS=True
```

---

## 🛠️ Troubleshooting

### `ModuleNotFoundError` after installing requirements
Make sure your virtual environment is **activated** before running any commands:
```powershell
# Windows
.\venv\Scripts\Activate
```
```bash
# macOS / Linux
source venv/bin/activate
```

---

### `django.db.utils.OperationalError: no such table`
Run migrations:
```bash
python manage.py migrate
```

---

### Static files not loading (CSS/JS broken)
Run the `collectstatic` command:
```bash
python manage.py collectstatic --noinput
```

---

### Port 8000 already in use
Run on a different port:
```bash
python manage.py runserver 8080
```

---

### `ImproperlyConfigured: The SECRET_KEY setting must not be empty`
Your `.env` file is missing or the `SECRET_KEY` is not set. Ensure `.env` exists and contains a valid key.

Generate a new key with:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

### Chat (WebSocket) not connecting
Django Channels requires ASGI mode. Ensure you are running with `python manage.py runserver` (which uses ASGI in development) and that the `CHANNEL_LAYERS` setting in `settings.py` is configured with the in-memory backend:

```python
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}
```

---

*For further help, open an issue on the [GitHub repository](https://github.com/TheUnshackled1/HealthStack-System/issues).*
