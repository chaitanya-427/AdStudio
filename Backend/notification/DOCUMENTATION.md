# AdStudio — Notification Service

**Module:** Notifications (in-app)
**Built by:** Dev 3 (Prabhat A) — on behalf of Dev 1 (Identity service owner)
**Service name (placeholder):** `notification-service`
**Part of:** AdStudio — Digital Advertising & Campaign Management Platform

---

## 1. Overview

This service provides **in-app notifications** for AdStudio users. When something
important happens elsewhere in the system — a pacing alert fires, an insertion order
is confirmed, a creative is approved — a notification is created for the relevant user.
Users can list their notifications, filter by read/unread, mark them read, and see an
unread count.

> **Placement note:** Per the team architecture (5 microservices), notifications belong
> inside the **Identity service** (Dev 1), because `Notification.user_id` references the
> `User` table. This was built standalone with placeholder names and is intended to be
> merged into the Identity service. Rename the package/database to Dev 1's values at handoff.

---

## 2. Scope (from the requirement documents)

| Requirement | Source |
|---|---|
| In-app notifications only (no email/Slack) | PRD — Assumptions & Constraints |
| Fields: UserID, Message, Category, Status, CreatedDate | PRD + Backend Plan schema |
| Status is Unread / Read (default Unread) | Backend Plan schema |
| Cross-portal status-change alerts | Backend Plan, Section 3 |
| Fired by pacing alerts, IO status changes, approval decisions | Backend Plan, Section 7 |
| Endpoint: GET /api/notifications?userId=&status=Unread | Backend Plan, Section 7 |

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 4.0.6 |
| Data Access | Spring Data JPA (Hibernate) |
| Database | MySQL 8 — `adstudio_notification` (placeholder) |
| Migrations | Flyway (V1) |
| Validation | Jakarta Bean Validation |
| API Docs | springdoc-openapi (Swagger UI) |
| Build | Maven |
| Port | `8086` (placeholder) |

---

## 4. Database Schema

Database: **`adstudio_notification`** (placeholder — merge into Identity DB at handoff).

### Table: `notification`

| Column | Type | Notes |
|---|---|---|
| `notification_id` | INT, PK, AUTO_INCREMENT | Primary key |
| `user_id` | INT, NOT NULL | Recipient (ref → User in Identity service) |
| `message` | TEXT, NOT NULL | Notification text |
| `category` | VARCHAR(50) | Grouping, e.g. PacingAlert / IOStatus / Approval |
| `status` | VARCHAR(20) | Unread / Read (default Unread) |
| `created_date` | DATETIME | Auto-set on creation |

---

## 5. Architecture

Standard layered architecture:

```
HTTP Request
   |
   v
CONTROLLER  -> REST endpoints, returns ApiResponse
   |
   v
SERVICE     -> business logic
   |
   v
REPOSITORY  -> database access (Spring Data JPA)
   |
   v
ENTITY <--> notification table
```

### Package structure
```
com.cts.adstudio.notificationservice
|-- controller   NotificationController
|-- service      NotificationService
|   '-- impl     NotificationServiceImpl
|-- repository   NotificationRepository
|-- entity       Notification
|-- dto
|   |-- request  NotificationRequest
|   '-- response NotificationResponse
|-- exception    ResourceNotFoundException, GlobalExceptionHandler
|-- config       SecurityConfig (dev bypass)
'-- shared       ApiResponse
```

---

## 6. Features

| # | Feature | Description |
|---|---|---|
| 1 | Create notification | Other services post a message to a user |
| 2 | List by user | A user's inbox, filterable by status |
| 3 | Mark as read | Change a notification's status to Read |
| 4 | Unread count | Count of unread notifications (for a UI badge) |
| 5 | Input validation | userId and message are required |
| 6 | Global exception handling | Consistent 400/404/500 error responses |
| 7 | Swagger / OpenAPI | Auto-generated interactive docs |

---

## 7. API Reference

Base URL: `http://localhost:8086`
All responses use the standard envelope: `{ success, message, data, timestamp }`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/notifications` | Create a notification |
| GET | `/api/notifications?userId={id}&status={Unread\|Read}` | List a user's notifications (status optional) |
| PUT | `/api/notifications/{id}/read` | Mark a notification as read |
| GET | `/api/notifications/unread-count?userId={id}` | Get unread count for a user |

---

## 8. Request Examples

### Create a notification
```
POST /api/notifications
{
  "userId": 1,
  "message": "Your insertion order #5 was confirmed by the publisher.",
  "category": "IOStatus"
}
```

### List a user's unread notifications
```
GET /api/notifications?userId=1&status=Unread
```

### Mark one as read
```
PUT /api/notifications/1/read
```

### Unread count
```
GET /api/notifications/unread-count?userId=1
```

---

## 9. How Other Services Use It (integration)

Notifications are triggered by events elsewhere. At integration, other services call
`POST /api/notifications` (via FeignClient / API Gateway) when events occur:

| Event | Source service | Example message |
|---|---|---|
| Pacing alert raised | Media plan service | "Line item 12 is under-delivering (36%)." |
| IO confirmed/rejected | Media plan service | "Insertion order 5 was confirmed." |
| Creative approved | Creative service | "Your banner creative was approved." |
| Invoice issued/overdue | Finance service | "Invoice INV-204 is overdue." |

For standalone development/testing, the create endpoint is called directly (e.g. via Postman).

---

## 10. Configuration (`application.properties`)

| Property | Value |
|---|---|
| `server.port` | `8086` |
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/adstudio_notification` |
| `spring.jpa.hibernate.ddl-auto` | `validate` (Flyway owns the schema) |
| `spring.flyway.locations` | `classpath:db/migration` |
| Swagger UI | `http://localhost:8086/swagger-ui/index.html` |

---

## 11. How to Run

1. Create the database: `CREATE DATABASE IF NOT EXISTS adstudio_notification;`
2. Set DB username/password in `application.properties`.
3. Run the app (VS Code Run, or `mvnw spring-boot:run`).
4. Flyway creates the `notification` table on first start.
5. Open Swagger UI at `http://localhost:8086/swagger-ui/index.html`.

---

## 12. Handoff Notes (for Dev 1 / Identity service)

This service was built standalone with **placeholder names**. To merge into the Identity service:

| Placeholder | Replace with Dev 1's value |
|---|---|
| Package `com.cts.adstudio.notificationservice` | Dev 1's Identity package (e.g. `com.cts.adstudio.identityservice.notification`) |
| Database `adstudio_notification` | Identity database (e.g. `adstudio_identity`) |
| Port `8086` | Identity service port |

Once merged into the Identity database (which holds the `User` table), `user_id` can become
a real foreign key to `User.user_id`. The dev `SecurityConfig` (permit-all) should be removed —
the Identity service's own JWT security will apply.

---

## 13. Summary

A small, complete in-app notification module: one table, four endpoints (create, list,
mark-read, unread-count), input validation, consistent error handling, and Swagger docs.
Built and tested standalone; ready to be merged into the Identity service at integration.
