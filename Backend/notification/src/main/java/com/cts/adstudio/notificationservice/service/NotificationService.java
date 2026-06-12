package com.cts.adstudio.notificationservice.service;

import com.cts.adstudio.notificationservice.dto.request.NotificationRequest;
import com.cts.adstudio.notificationservice.dto.response.NotificationResponse;
import java.util.List;

public interface NotificationService {
    NotificationResponse createNotification(NotificationRequest request);
    List<NotificationResponse> getNotifications(Integer userId, String status);
    NotificationResponse markAsRead(Integer notificationId);
    long getUnreadCount(Integer userId);
}