
//This is a dummy data for notifications
const notifications = [
  {
    id: 1,
    title: "Funds Transfer",
    date: "12-04-2024, 7:10 AM",
    message: "#2,000,000.00 has been added to your wallet.",
    icon: "notification.png",
    type: "activities",
    read: false
  },
  {
    id: 2,
    title: "App Upgrade",
    date: "24-05-2024, 18:05 PM",
    message: "Your account has been upgraded to tier 2.",
    icon: "notification.png",
    type: "services",
    read: true
  },
  {
    id: 3,
    title: "Money Deposit",
    date: "05-12-2024, 10:40 AM",
    message: "#4,700,000.00 has been added to your wallet.",
    icon: "notification.png",
    type: "activities",
    read: false
  },
  {
    id: 4,
    title: "Reminder: Card Expiring Soon",
    date: "01-07-2025, 9:00 AM",
    message: "Your card will expire next month.",
    icon: "notification.png",
    type: "reminders",
    read: false
  },
  {
    id: 1,
    title: "Funds Transfer",
    date: "12-04-2024, 7:10 AM",
    message: "#2,000,000.00 has been added to your wallet.",
    icon: "notification.png",
    type: "activities",
    read: true
  },
  {
    id: 2,
    title: "App Upgrade",
    date: "24-05-2024, 18:05 PM",
    message: "Your account has been upgraded to tier 2.",
    icon: "notification.png",
    type: "services",
    read: false
  },
  {
    id: 3,
    title: "Money Deposit",
    date: "05-12-2024, 10:40 AM",
    message: "#4,700,000.00 has been added to your wallet.",
    icon: "notification.png",
    type: "activities",
    read: true
  },
  {
    id: 4,
    title: "Reminder: Card Expiring Soon",
    date: "01-07-2025, 9:00 AM",
    message: "Your card will expire next month.",
    icon: "notification.png",
    type: "reminders",
    read: false
  }
];

// Function to render notifications
function renderNotifications(data) {
  const container = document.getElementById('notificationList');
  container.innerHTML = '';

  // 🔍 Show message if list is empty
if (data.length === 0) {
  container.innerHTML = `
    <div class="text-center text-gray-500 py-10 w-full">
      No notifications available.
    </div>
  `;
  return;
}


  data.forEach(item => {
    const card = document.createElement('div');
    card.className = `border border-gray-300 p-4 rounded-md cursor-pointer transition ${!item.read ? 'bg-blue-50' : ''}`;
    card.setAttribute('data-id', item.id);

    card.innerHTML = `
      <div class="flex gap-4 items-start">
        <div>
          <img src="../src/images/${item.icon}" alt="bell-alert" width="30" height="30" />
        </div>
        <div class="flex-1 font-['Poppins']">
          <p class="font-semibold">${item.title} ${!item.read ? '<span class="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2"></span>' : ''}</p>
          <p class="text-sm text-gray-500">${item.date}</p>
          <p class="text-sm">${item.message}</p>
        </div>
      </div>
    `;

    // 🟢 Click to mark as read
    card.addEventListener('click', () => {
      item.read = true;
      renderNotifications(data); // re-render to update view
    });

    container.appendChild(card);
  });
}


// Filter logic
function filterNotifications(type) {
  if (type === 'all') {
    renderNotifications(notifications);
  } else {
    const filtered = notifications.filter(n => n.type === type);
    renderNotifications(filtered);
  }
}

// Load all by default
document.addEventListener("DOMContentLoaded", () => {
  renderNotifications(notifications);

  // Tab button filters
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-type');
      filterNotifications(type);
    });
  });

  // Optional: Refresh button
  const refreshBtn = document.getElementById("refreshBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      renderNotifications(notifications);
    });
  }
});
