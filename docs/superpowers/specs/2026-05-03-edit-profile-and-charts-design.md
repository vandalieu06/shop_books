# Edit Profile & Charts Design

## Overview

Implement edit profile functionality for regular users and keep recharts for admin dashboard charts.

Based on: `docs/tasks/raw/act18.md`

---

## 1. Edit Profile (Inline Editing)

### Fields to Edit
- `first_name`
- `last_name`
- `email`
- `phone`
- `address` (street, city, postal_code)
- `birth_date`

### Behavior
- `Profile.jsx` gets an `isEditing` state toggle via "Edit" button
- When editing, form fields replace `InfoItem` components
- Form state managed with `useState` initialized from `user` data
- "Save" calls `usersApi.updateMe(formData)`:
  - Updates backend via `PUT /users/me`
  - Refreshes AuthContext user state on success
- "Cancel" reverts form state and exits edit mode
- Loading and error states handled during save

### API Changes
Add to `frontend/src/api/users.js`:
```js
updateMe: (userData) => api.put('/users/me', userData),
```

### Files Modified
- `frontend/src/pages/Profile.jsx` - add inline edit mode
- `frontend/src/api/users.js` - add `updateMe` endpoint

---

## 2. Charts (Keep Recharts)

### Decision
Keep `recharts` 3.8.0. Do not add `chart.js`.

### Reason
- Recharts already installed and working
- No significant improvement justifies adding another dependency (~70KB gzipped for chart.js)
- Current `OrdersChart.jsx` and `OrdersByStatusChart.jsx` work correctly

### Files Modified
None.

---

## Out of Scope
- Password change (separate feature)
- Username editing (not requested)
- Backend `/users/me` endpoint (backend task, frontend assumes it exists)
