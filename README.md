# 🏥 HealthStack System

> **A Django-based multi-hospital health management platform that centralizes patient records, appointment scheduling, pharmacy, laboratory, and real-time doctor-patient communication.**

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-4.1.13-092E20?logo=django&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite&logoColor=white)
![DRF](https://img.shields.io/badge/Django%20REST%20Framework-3.14-ff1709?logo=django&logoColor=white)
![Channels](https://img.shields.io/badge/Django%20Channels-Chat-purple?logo=django&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22c55e?logo=opensourceinitiative&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Objectives](#-objectives)
- [Core Features](#-core-features)
- [System Architecture](#-system-architecture)
- [User Roles](#-user-roles)
- [Tech Stack](#-tech-stack)
- [Setup & Installation](#-setup--installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [UI Snapshots](#️-ui-snapshots)
- [Configuration & Security](#️-configuration--security)
- [Repository Layout](#-repository-layout)
- [About](#-about)
- [License](#-license)

---

## 🔍 Overview

Managing patient records and healthcare workflows across multiple hospitals is complex, fragmented, and error-prone when handled manually. **HealthStack System** is a full-stack Django web application that digitizes and unifies healthcare operations across multiple hospitals on a single platform.

From the moment a patient registers, the system connects them with hospitals, doctors, laboratories, and pharmacies through a seamless, role-aware workflow:

1. **Discover** — Patients search hospitals, browse departments, and find doctors
2. **Book** — Patients book appointments; doctors accept or reject with automatic email notifications
3. **Treat** — Doctors create prescriptions; lab workers generate reports — all downloadable as PDFs
4. **Pharmacy** — Patients browse and cart medicines; pharmacists manage stock and billing
5. **Communicate** — Doctors and patients chat in real time after appointment linkage
6. **Audit** — Hospital admins oversee all transactions, billing records, and bed availability

The result: a transparent, efficient, and connected healthcare ecosystem for patients and providers alike.

---

## 🎯 Objectives

| Goal | Description |
|---|---|
| 🏥 **Centralize Records** | Unify patient health records across multiple hospitals on one platform |
| 📅 **Streamline Appointments** | Automate the booking and acceptance workflow with email notifications |
| 💊 **Digitize Pharmacy** | Enable patients to browse, cart, and track medicine orders online |
| 🧪 **Integrate Laboratory** | Allow lab workers to create tests and reports accessible by patients |
| 💬 **Enable Communication** | Provide real-time doctor-patient chat via Django Channels |
| 🔐 **Ensure Security** | Enforce role-based access control with OTP-protected password changes |
| 🧾 **Simplify Billing** | Give patients a unified view of all payment types and statuses |

---

## ✨ Core Features

### 🧑‍⚕️ For Patients
- **Hospital Discovery** — Search hospitals, browse departments, find and profile doctors
- **Appointment Booking** — Book appointments online; receive email confirmation on accept/reject
- **Prescription Access** — View and download doctor prescriptions as PDF
- **Lab Results** — View and download laboratory test reports as PDF
- **Pharmacy Cart** — Browse medicines, add to cart, and track payment status
- **Lab Test Cart** — Add/remove lab tests with live pricing
- **Unified Billing** — View all payments (appointments, pharmacy, lab) in one place
- **Real-time Chat** — Chat directly with your appointed doctor
- **Doctor Reviews** — Rate and review doctors after appointments
- **Profile Management** — Update blood group, NID, address, and date of birth
- **OTP Password Change** — Secure 6-digit OTP verification via email

### 🩺 For Doctors
- **Profile Builder** — Add education, experience, and certifications
- **Multi-Hospital Registration** — Register at multiple hospitals with certificate upload
- **Appointment Management** — Accept or reject patient appointments with email notifications
- **Prescription Management** — Create and manage patient prescriptions
- **Patient Profiles** — Search and view patient profiles and reports
- **Schedule Management** — Set and update availability timings
- **Real-time Chat** — Communicate with appointed patients
- **OTP Password Change** — Secure account management

### 🏛️ For Hospital Admins
- **Admin Dashboard** — Statistics overview of hospitals, staff, and transactions
- **Hospital & Department CRUD** — Manage multiple hospitals and their departments
- **Staff Management** — Create and manage Lab Worker and Pharmacist accounts
- **Doctor Registry** — View all registered doctors and their profiles
- **Manual Billing** — Create invoices and track all transaction records
- **Bed Tracking** — Manage General, ICU, Regular Cabin, Emergency Cabin, and VIP Cabin availability
- **OTP Password Change** — Secure account management

### 🔬 For Lab Workers
- **Lab Dashboard** — Overview of pending test orders
- **Test Management** — Create and manage hospital-specific tests with pricing
- **Report Generation** — Create patient lab reports
- **Payment Tracking** — Record test payment status
- **Order Queue** — View and manage incoming test orders

### 💊 For Pharmacists
- **Pharmacy Dashboard** — Overview of medicine orders
- **Medicine CRUD** — Manage medicine inventory: name, weight, type, category, price, and stock
- **Medicine Search** — Quickly find medicines in the catalog
- **Order Management** — View patient orders and record payment status

---

## 🏗️ System Architecture

### Overall Flow

```
Patient
    │
    ├─ Search Hospitals / Departments / Doctors
    ├─ Book Appointment
    ├─ Cart: Medicines & Lab Tests
    └─ Chat with Doctor
             │
             ▼
     ┌──────────────────────┐
     │   HealthStack DB     │
     │   (SQLite)           │
     └────────┬─────────────┘
              │
    ┌─────────┴──────────┐
    │                    │
    ▼                    ▼
┌─────────────┐   ┌─────────────────────┐
│   Doctor    │   │   Hospital Admin    │
│  Dashboard  │   │   Dashboard         │
│  (Accept /  │   │  (Billing / Beds /  │
│   Prescribe │   │   Staff / Reports)  │
│   / Chat)   │   └─────────────────────┘
└──────┬──────┘
       │
  ┌────┴────┐
  │         │
  ▼         ▼
┌──────┐ ┌──────────┐
│ Lab  │ │Pharmacist│
│Worker│ │Dashboard │
└──────┘ └──────────┘
```

### Appointment Lifecycle

```
  Patient Books ──► Pending ──► Doctor Reviews
                                      │
                        ┌─────────────┴────────────┐
                        ▼                          ▼
                   Accepted                    Rejected
               (Email Sent)               (Email Sent)
                    │
                    ▼
            Consultation ──► Prescription Created
                                    │
                                    ▼
                            Patient Downloads PDF
```

### Billing Flow

```
  Appointment  ─┐
  Pharmacy Cart ─┼──► Unified Billing View ──► Pay at Cashier / Counter
  Lab Test Cart ─┘         (Patient)
```

---

## 👥 User Roles

| Role | Access Level |
|---|---|
| **Patient** | Search hospitals/doctors, book appointments, manage cart, view records, chat |
| **Doctor** | Manage profile/schedule, handle appointments, create prescriptions, chat |
| **Hospital Admin** | Full hospital management, billing, staff CRUD, bed tracking |
| **Lab Worker** | Create tests/reports, manage order queue, record payments |
| **Pharmacist** | Manage medicine inventory, view orders, record payments |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Web Framework** | Django 4.1.13 |
| **Language** | Python 3.10+ |
| **Database** | SQLite 3 |
| **REST API** | Django REST Framework 3.14 |
| **Real-time Chat** | Django Channels |
| **PDF Generation** | xhtml2pdf + ReportLab |
| **Image Handling** | Pillow 10.3 |
| **Static Files** | WhiteNoise 6.2 |
| **Email Testing** | Mailtrap SMTP |
| **Form Rendering** | django-widget-tweaks |
| **Debugging** | Django Debug Toolbar |
| **Environment** | django-environ / python-decouple |
| **API Tunneling** | ngrok HTTP |

---

## 🚀 Setup & Installation

### Prerequisites

- Python **3.10+**
- pip
- Git
- Mailtrap account *(for email notifications)*

### Quick Start

**1. Clone the repository**
```bash
git clone <repository-url>
cd HealthStack-System
```

**2. Create and activate a virtual environment**
```powershell
# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\Activate
```
```bash
# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

**3. Install dependencies**
```bash
pip install -r requirements.txt
```

**4. Configure environment variables**

Copy the example environment file and fill in your credentials:
```bash
cp .env.example .env
```

Open `.env` and set the required values — see [`.env.example`](.env.example) for the full list. The key credentials to configure:
- **`SECRET_KEY`** — Django secret key
- **`EMAIL_HOST_USER`** / **`EMAIL_HOST_PASSWORD`** — Mailtrap SMTP credentials for email notifications

**5. Upgrade JWT (optional but recommended)**
```bash
pip install --upgrade djangorestframework-simplejwt
```

**6. Run database migrations**
```bash
python manage.py migrate
```

**7. Start the development server**
```bash
python manage.py runserver
```

The application will be available at **http://127.0.0.1:8000/**

---

## 📖 Usage

### Patient Workflow
1. Register or log in at the home page
2. Search for a hospital → browse departments → find a doctor
3. View the doctor's profile and book an appointment
4. Receive an email when the doctor accepts or rejects the booking
5. After acceptance: view prescriptions, lab reports, and chat with your doctor
6. Browse the pharmacy, add medicines to cart, and track payment status
7. Add lab tests to your test cart and track results

### Doctor Workflow
1. Register and build your profile (education, experience, certifications)
2. Register at a hospital and upload your certificate
3. Review incoming appointment requests — accept or reject with automatic patient notification
4. Create and manage prescriptions for accepted patients
5. Chat with appointed patients directly from your dashboard

### Hospital Admin Workflow
1. Log in to the admin dashboard
2. Manage hospitals, departments, lab workers, and pharmacists
3. Track bed availability across all cabin types
4. Create patient invoices and view all transaction records

### Lab Worker Workflow
1. Log in to the lab dashboard
2. Create tests for the hospital with pricing
3. Generate patient lab reports
4. Record payment status and manage the order queue

### Pharmacist Workflow
1. Log in to the pharmacy dashboard
2. Manage medicine inventory (add, update, delete)
3. View patient orders and record payment status

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/token/` | `POST` | Obtain JWT authentication token |
| `/api/token/refresh/` | `POST` | Refresh an expired JWT token |
| `/api/hospitals/` | `GET` | List all registered hospitals |
| `/api/hospitals/<id>/` | `GET` | Retrieve a specific hospital's profile |

> **Note:** The REST API uses JWT authentication via `djangorestframework-simplejwt`. Include the `Authorization: Bearer <token>` header for protected routes.

---

## 🖼️ UI Snapshots

> A visual tour of each role's dashboard and key pages.

---

### 🏠 Home Page

| Landing Page | Hospital Search |
|:---:|:---:|
| <img width="600" alt="Home Landing" src="https://github.com/user-attachments/assets/placeholder-home-1" /> | <img width="600" alt="Hospital Search" src="https://github.com/user-attachments/assets/placeholder-home-2" /> |

---

### 🧑‍⚕️ Patient

| Login Page | Dashboard |
|:---:|:---:|
| <img width="600" alt="Patient Login" src="https://github.com/user-attachments/assets/placeholder-patient-login" /> | <img width="600" alt="Patient Dashboard" src="https://github.com/user-attachments/assets/placeholder-patient-dash" /> |

| Book Appointment | Unified Billing |
|:---:|:---:|
| <img width="600" alt="Book Appointment" src="https://github.com/user-attachments/assets/placeholder-patient-book" /> | <img width="600" alt="Patient Billing" src="https://github.com/user-attachments/assets/placeholder-patient-bill" /> |

---

### 🩺 Doctor

| Login Page | Dashboard |
|:---:|:---:|
| <img width="600" alt="Doctor Login" src="https://github.com/user-attachments/assets/placeholder-doctor-login" /> | <img width="600" alt="Doctor Dashboard" src="https://github.com/user-attachments/assets/placeholder-doctor-dash" /> |

| Appointment Management | Prescription View |
|:---:|:---:|
| <img width="600" alt="Doctor Appointments" src="https://github.com/user-attachments/assets/placeholder-doctor-appt" /> | <img width="600" alt="Prescription" src="https://github.com/user-attachments/assets/placeholder-doctor-rx" /> |

---

### 🏛️ Hospital Admin

| Login Page | Dashboard |
|:---:|:---:|
| <img width="600" alt="Admin Login" src="https://github.com/user-attachments/assets/placeholder-admin-login" /> | <img width="600" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/placeholder-admin-dash" /> |

| Bed Tracking | Billing Records |
|:---:|:---:|
| <img width="600" alt="Bed Tracking" src="https://github.com/user-attachments/assets/placeholder-admin-beds" /> | <img width="600" alt="Billing Records" src="https://github.com/user-attachments/assets/placeholder-admin-bill" /> |

---

### 💊 Pharmacist & Pharmacy

| Login Page | Dashboard |
|:---:|:---:|
| <img width="600" alt="Pharmacist Login" src="https://github.com/user-attachments/assets/placeholder-pharma-login" /> | <img width="600" alt="Pharmacist Dashboard" src="https://github.com/user-attachments/assets/placeholder-pharma-dash" /> |

| Medicine Inventory | Order Management |
|:---:|:---:|
| <img width="600" alt="Medicine Inventory" src="https://github.com/user-attachments/assets/placeholder-pharma-inv" /> | <img width="600" alt="Order Management" src="https://github.com/user-attachments/assets/placeholder-pharma-ord" /> |

---

### 🔬 Lab Worker

| Login Page | Dashboard |
|:---:|:---:|
| <img width="600" alt="Lab Worker Login" src="https://github.com/user-attachments/assets/placeholder-lab-login" /> | <img width="600" alt="Lab Worker Dashboard" src="https://github.com/user-attachments/assets/placeholder-lab-dash" /> |

| Test Management | Report Generation |
|:---:|:---:|
| <img width="600" alt="Test Management" src="https://github.com/user-attachments/assets/placeholder-lab-tests" /> | <img width="600" alt="Report Generation" src="https://github.com/user-attachments/assets/placeholder-lab-rep" /> |

---

## 🛡️ Configuration & Security

> ⚠️ **Before deploying to production, review all of the following:**

| Setting | Default | Recommendation |
|---|---|---|
| `DEBUG` | `True` | Set to `False` and configure `ALLOWED_HOSTS` |
| `SECRET_KEY` | `.env` file | Rotate and load from a secrets manager |
| `DATABASE` | SQLite | Migrate to PostgreSQL for production workloads |
| Static/Media files | Local `media/` | Move to S3/CDN and configure WhiteNoise |
| Email | Mailtrap (testing) | Switch to a production SMTP provider (SendGrid, SES) |
| WebSockets | Django Channels | Configure a production-grade channel layer (Redis) |

### Security Features Built-In

- **OTP Password Verification** — Password changes require a 6-digit OTP sent via email (10-minute expiry)
- **Role-based Access Control** — Separate dashboards and permissions for each user type
- **Session Management** — Login status tracking and secure logout
- **Environment Isolation** — All secrets managed via `.env` using `django-environ` / `python-decouple`

---

## 📁 Repository Layout

```
HealthStack-System/
├── healthstack/             # Django project: settings, urls, wsgi, asgi
├── hospital/                # Hospital models, views, search
├── hospital_admin/          # Admin dashboard, billing, bed tracking
├── doctor/                  # Doctor profiles, appointments, prescriptions
├── pharmacy/                # Medicine inventory, cart, orders
├── ChatApp/                 # Django Channels real-time chat
├── api/                     # REST API endpoints (JWT, hospitals)
├── heath_doc/               # Core health records and patient views
├── sslcommerz/              # Payment gateway integration
├── sslcommerz_lib/          # SSLCommerz library
├── templates/               # Shared HTML templates
├── static/                  # Project-level CSS, JS, images
├── media/                   # Uploaded files (prescriptions, reports, profiles)
├── build/                   # Build artifacts
├── setup.py                 # Setup configuration
├── manage.py
├── requirements.txt
├── .env.example             # Environment variable template
└── db.sqlite3               # SQLite database (development)
```

---

## 🧑‍💻 About

### The Project

**HealthStack System** was developed as a **Software Engineering capstone project** for the B.Sc. in Information Systems program. It was built to address the challenges of fragmented healthcare record-keeping and the lack of a unified platform for multi-hospital patient management.

The system brings together the full healthcare journey — from hospital discovery and appointment booking, through prescription management and lab testing, to pharmacy fulfillment and real-time communication — into a single, role-aware digital platform.

### Context & Motivation

| | |
|---|---|
| 🎓 **Program** | B.Sc. in Information Systems |
| 🎯 **Problem Solved** | Fragmented, paper-based patient records and disconnected hospital workflows |
| 👥 **Users Served** | Patients, Doctors, Hospital Admins, Lab Workers, Pharmacists |
| 🗓️ **Project Duration** | April 2026 – May 2026 |

### Key Design Decisions

- **Multi-Hospital Architecture** — A single platform serves multiple hospitals, departments, and their respective staff, eliminating the need for separate systems per institution.
- **Role-Based Dashboards** — Each user type sees a purpose-built interface showing only the actions and data relevant to their role, reducing confusion and preventing unauthorized access.
- **Real-time Communication** — Django Channels powers a WebSocket-based chat feature, enabling direct doctor-patient communication after appointment linkage without third-party messaging tools.
- **PDF-First Documents** — Prescriptions and lab reports are generated as downloadable PDFs via `xhtml2pdf`, providing a portable, printable record for patients.
- **OTP Security Layer** — All password changes are gated behind a time-limited 6-digit OTP sent to the user's registered email, preventing unauthorized account takeovers.
- **Unified Billing View** — Rather than separate billing pages per service, patients see all charges (appointments, pharmacy, lab) in a single consolidated view.

### Built With ❤️ For

This system was designed with patients and healthcare providers in mind — making healthcare coordination faster, clearer, and more accessible for everyone involved.

---

## 👨‍💻 Contributor

**John Tyrone P. Coronel** — [TheUnshackled1](https://github.com/TheUnshackled1)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

```
MIT License

Copyright (c) 2026 John Tyrone P. Coronel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```
