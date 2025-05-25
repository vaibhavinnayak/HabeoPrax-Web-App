import React from 'react';
import { useEffect, useState } from 'react';
import { FaChrome, FaCheckCircle, FaBell } from 'react-icons/fa';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
 const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        let token = localStorage.getItem('token');
        if (!token.startsWith('Bearer ')) {
          token = `Bearer ${token}`;
        }

        const res = await fetch('http://localhost:5000/notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error('Failed to fetch notifications:', err.message);
      }
    };

    fetchNotifications();
  }, []);
   


  const markAsRead = async (notificationId) => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing from localStorage');
      }
      if (!token.startsWith('Bearer ')) {
        token = `Bearer ${token}`;
      }

      const res = await fetch(`http://localhost:5000/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      setNotifications(data.notifications); // Update state with the returned notifications
    } catch (err) {
      console.error('Failed to mark notification as read:', err.message);
    }
  };

  // Group notifications by date
  const groupNotificationsByDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const grouped = {
      Today: [],
      Yesterday: [],
      Older: []
    };

    notifications.forEach(notification => {
      const notifDate = new Date(notification.timestamp);
      const isToday = notifDate.toDateString() === today.toDateString();
      const isYesterday = notifDate.toDateString() === yesterday.toDateString();

      if (isToday) {
        grouped.Today.push(notification);
      } else if (isYesterday) {
        grouped.Yesterday.push(notification);
      } else {
        grouped.Older.push(notification);
      }
    });

    return grouped;
  };

  const filteredNotifications = activeTab === 'all'
    ? notifications
    : notifications.filter(n => !n.read);

  const groupedNotifications = groupNotificationsByDate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-50 flex p-6">
      {/* Notifications Section - 2/3 width */}
      <div className="w-3/4 pr-6">
        <div className="text-3xl font-bold text-purple-700 mb-6">Notifications</div>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'all' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'unread' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'}`}
            onClick={() => setActiveTab('unread')}
          >
            Unread
          </button>
        </div>

        {/* Notifications */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-600 text-lg">
            🎉 You're all caught up! No new notifications for now.
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedNotifications).map(([date, notifs]) => (
              notifs.length > 0 && (
                <div key={date}>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">{date}</h3>
                  <div className="space-y-4">
                    {notifs.map((n) => (
                      (activeTab === 'all' || !n.read) && (
                        <div
                          key={n._id}
                          className={`bg-white p-4 rounded-xl shadow transition-opacity ${
                            n.read ? 'opacity-60' : 'opacity-100'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-gray-800">{n.message}</p>
                              <small className="text-gray-500">
                                {new Date(n.timestamp).toLocaleString()}
                              </small>
                            </div>
                            {!n.read && (
                              <button
                                className="text-purple-600 hover:text-purple-800 text-sm"
                                onClick={() => markAsRead(n._id)}
                              >
                                Mark as Read
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Chrome Extension Section - 1/3 width */}
      <div className="w-1/4 mt-16">
        <div className="backdrop-blur-lg bg-white/80 border border-blue-100 shadow-xl rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-full text-purple-600 text-xl">
              <FaChrome />
            </div>
            <div className="text-sm font-bold uppercase text-purple-500 tracking-wide">
              New Extension
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 leading-snug">
            Chrome Extension Now Available!
          </h2>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Instantly access focus tools from your browser. Stay on track, get reminders, and celebrate your daily wins—all without switching tabs.
          </p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition">
            Add to Chrome
          </button>
          <button className="w-full mt-2 border border-blue-300 text-purple-600 font-medium py-2.5 rounded-lg hover:bg-blue-50 transition">
            Maybe Later
          </button>
          <div className="flex items-center mt-4 text-sm text-gray-500">
            <FaCheckCircle className="mr-2 text-green-500" />
            1,213+ users already installed
          </div>
        </div>
      </div>

      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-full px-6 py-3 flex items-center gap-8">
        <button
          title="Home"
          className="text-2xl hover:text-purple-600 transition"
          onClick={() => window.location.href = "/home"}
        >
          🏠
        </button>
        <button
          title="Weekly Report"
          className="text-2xl hover:text-purple-600 transition"
          onClick={() => window.location.href = `/reports/${userId}`}
        >
          📈
        </button>
        <button
          title="Reminders"
          className="text-2xl text-purple-600"
          onClick={() => window.location.href = "/notifications"}
        >
          🔔
        </button>
  
      </nav>
    </div>
  );
};

export default NotificationPage;