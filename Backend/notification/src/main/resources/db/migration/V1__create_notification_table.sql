-- ============================================
-- V1: Notification table
-- ============================================
CREATE TABLE notification (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id         INT NOT NULL,
    message         TEXT NOT NULL,
    category        VARCHAR(50),
    status          VARCHAR(20) DEFAULT 'Unread',
    created_date    DATETIME DEFAULT CURRENT_TIMESTAMP
);