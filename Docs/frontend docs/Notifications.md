## Notifications
In the Virtuoso Web App, notifications are currently rendered upon login failures. This is to promote transparency with our users who have a account. The notifications inform users about what caused their failed login attempt. Below is a breakdown about how this fuctionality was achieved with the interaction between three Notification-specific react components.

## NotificationBar Component

### Description
The `NotificationBar` component is responsible for displaying a notification message with a progress bar. It receives notification data from the `NotificationContext` automatically closing after the specified duration.

### How the Notification Bar Interacts with Other Components
The `NotificationBar` component interacts with the `NotificationContext` as it awaits for changes in the notification state. This interaction defines what `NotificationBar` will display. This functionality is also optimized as `NotificationBar` automatically updates its display based on the notification data received from the context.

## NotificationContext

### Description
The `NotificationContext` provides a context for managing notification states across the application. This component stores the current notification type and text and defines notification states as success or error.

### Interaction with Other Components
The `NotificationContext` interacts with the `NotificationBar` component by providing notification data via its context value. It also interacts with the `NotificationProvider` component to update notification states.

## NotificationProvider

### Description
The `NotificationProvider` component contains the state management logic for notifications. `NotificationProvider` achieves this by wrapping the application with the `NotificationContext`, providing notification state management functionality to its children. It includes functions to set success or error notifications.

### Interaction with Other Components
The `NotificationProvider` component interacts with the `NotificationContext` by providing its value with notification data and functions to update notification states. 
