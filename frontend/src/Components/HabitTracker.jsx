import React, { useState, useEffect } from 'react';
import quotes from './quotes';
import { FaChrome, FaCheckCircle } from 'react-icons/fa';

export default function HabitTracker() {
   
    const [habits, setHabits] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
     const [userName, setUserName] = useState('');
      const [showDropdown, setShowDropdown] = useState(false); 
 const userId = localStorage.getItem('userId');
   const handleSignOut = () => {        
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  window.location.replace("/");
};
    const addHabit = (habit) => {
  setHabits((prev) => [...prev, habit]);
};
useEffect(() => {
  let token = localStorage.getItem('token');
  if (!token) return;
    if (!token.startsWith('Bearer ')) {
  token = `Bearer ${token}`;
}
  const fetchHabits = async () => {
    try {
      const res = await fetch('http://localhost:5000/habitdata', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
          if (!res.ok) {
        const errorText = await res.text();
        console.log('Failed to fetch habits:', errorText);
        return;
      }


      const data = await res.json();
      if (data.success) {
        setHabits(data.habits);
        setHasFetched(true);
      } else {
        console.error('Failed to load habits:', data.message);
      }
    } catch (err) {
      console.error('Error fetching habits:', err);
    }
  };

  fetchHabits();
}, []);

const syncHabits = async (updatedHabits) => {
  let token = localStorage.getItem('token');
  if (!token) return;
if (!token.startsWith('Bearer ')) {
  token = `Bearer ${token}`;
}
  try {
    const res = await fetch("http://localhost:5000/habitdata", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ habits: updatedHabits }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.log("Failed to sync habits:", errorText);
    }
  } catch (e) {
    console.log("Sync error:", e);
  }
};

   useEffect(() => {
    if (!hasFetched) return; 
    let token=localStorage.getItem('token')
    console.log(habits)
    if(!token) return;
    if (!token.startsWith('Bearer ')) {
  token = `Bearer ${token}`;
}
    const addHabits=async () => {
      try {
        const res= await fetch("http://localhost:5000/habitdata", {
          method:'PUT',
          headers: {
            "Content-Type":"application/json",
            Authorization: token,
          },
          body:JSON.stringify({habits})
          
          })
          if(!res.ok) {
              const errorText = await res.text();
            console.log("failed to sync habits",errorText)
          }
      }
      catch (e)  {console.log(e)}

    }  
    addHabits(); 
  },[habits,hasFetched])
  
  
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedMood, setSelectedMood] = useState('😊');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    icon: '💡',
    duration: '',
    time: '',
    day: ''
  });
  const [editIndex, setEditIndex] = useState(null);
const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);

 useEffect(()=> {
    if (points === 0 && streak === 0 && badges.length==0) return;
   const addpointsandstreak= async()=> {
     let token=localStorage.getItem('token')
     if(!token) return;
     if (!token.startsWith('Bearer ')) {
  token = `Bearer ${token}`;
}
    try {
     let res= await fetch('http://localhost:5000/addingptstreak',{
         method:"PUT",
         headers: {
          "Content-Type":"application/json",
           Authorization: token,
         },
         body:JSON.stringify({points,streak,badges})
         })
         if(!res.ok) {
          const errtext=await res.text();
          console.log("failed to fetch (pt and streak)",errtext)
         }
    }
    catch (e) {
      console.log(e);
    }

   }
   addpointsandstreak();
   },[points,streak,badges])

useEffect(() => {
  const name = localStorage.getItem('userName');
  if (name) setUserName(name);
}, []);


   useEffect(() => {
  setBadges(prevBadges => {
    let newBadges = [...prevBadges];
    if (streak === 3 && !newBadges.includes("🥉 3-Day Streak")) {
      newBadges.push("🥉 3-Day Streak");
    }
    if (streak === 7 && !newBadges.includes("🥈 7-Day Streak")) {
      newBadges.push("🥈 7-Day Streak");
    }
    return newBadges;
  });
}, [streak]);

   useEffect(() => {
  const fetchProgress = async () => {
    let token = localStorage.getItem('token');
    if (!token) return;
if (!token.startsWith('Bearer ')) {
  token = `Bearer ${token}`;
}
    try {
      const res = await fetch('http://localhost:5000/user-progress', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        console.log("Failed to fetch user progress:", errText);
        return;
      }

      const data = await res.json();
      setPoints(data.points);
      setStreak(data.streak);
      setBadges(data.badges); 
    } catch (err) {
      console.log("Error fetching progress:", err);
    }
  };

  fetchProgress();
}, []);
  const dayToIndex = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {
    setFormData({ title: '', icon: '💡', duration: '', time: '', day: '' });
    setEditIndex(null);
    setShowModal(true);
  };

  const openEditModal = (index) => {
    const habit = habits[index];
    setFormData({
      title: habit.title || '',
      icon: habit.icon || '💡',
      duration: habit.duration || '',
      time: habit.time || '',
      day: habit.day || ''
    });
    setEditIndex(index);
    setShowModal(true);
  };

const saveHabit = () => {
  if (formData.title.trim() === '') {
    showNotification("Please add a habit title", "error");
    return;
  }

  const updatedHabits = [...habits];

  if (editIndex !== null) {

    updatedHabits[editIndex] = {
      ...formData,
      day: [formData.day],
      done: habits[editIndex].done
    };
    showNotification("Habit updated successfully! Keep going!", "success");
  } else {
    // Add new habit
    updatedHabits.push({
      ...formData,
      done: false,
      day: [formData.day]
    });
    showNotification("New habit added! You're on the path to greatness!", "success");
  }

  setHabits(updatedHabits);
  setShowModal(false);
  setFormData({ title: '', icon: '', duration: '', time: '', day: '', done: false });
  setEditIndex(null);
};

 const deleteHabit =(index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
      showNotification("Habit removed. Making room for new growth!", "info");
    setHabits(updatedHabits);
    syncHabits(updatedHabits);
  };

  const toggleHabitDone = async (index) => {
    const updatedHabits = [...habits];
    const habit = {...updatedHabits[index]};
    habit.done = !habit.done;
    if(typeof(habit.pointsEarned)!=="number" || isNaN(habit.pointsEarned))
      habit.pointsEarned=0;
   

    if (habit.done) {
      const today = new Date().getDay(); 
      console.log('habit.day:', habit.day);
      const targetDay = dayToIndex[habit.day[0]];
      if (typeof targetDay !== 'number') {
      console.error('Invalid habit day:', habit.day);
      habit.pointsEarned = 0;
    } else {
      let daysEarly = targetDay - today;
      if (daysEarly < 0) daysEarly += 7;

      const earnedPoints = daysEarly * 10;
      habit.pointsEarned=earnedPoints
      setPoints(prev => prev + earnedPoints);
        setStreak(prev => prev + 1); 
       
      };
    }
     else {
  
  const pointsToSubtract = habit.pointsEarned; 
  setPoints(prev => {
    const newPoints = prev - pointsToSubtract;
    return newPoints >= 0 ? newPoints : 0;
  });

 
  habit.pointsEarned = 0;
  setStreak(0);
   
    }
    updatedHabits[index] = habit;
     setHabits(updatedHabits);
     syncHabits(updatedHabits);

      const message = updatedHabits[index].done
    ? `Congratulations! "${updatedHabits[index].title}" completed. Keep the momentum going!`
    : `"${updatedHabits[index].title}" marked as incomplete. You can do it next time!`;
  showNotification(message, updatedHabits[index].done ? "success" : "info");

  // Check if all today's habits are done
  const today = new Date().toLocaleString('en-US', { weekday: 'long' });
  const todaysHabits = updatedHabits.filter(h => h.day.includes(today));
  const allDone = todaysHabits.length > 0 && todaysHabits.every(h => h.done);

  if (allDone) {
    let token = localStorage.getItem('token');
     if (!token.startsWith('Bearer ')) {
  token = `Bearer ${token}`;
}
    try {
      await fetch('http://localhost:5000/notify-completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
    } catch (err) {
      console.error("Error sending completion notification:", err);
    }
  }
  };
    const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    
    // Hide notification after 2 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 2000);
  };

  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  const [quote, setQuote] = useState({});

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('dark-mode') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('dark-mode', newMode.toString());
  };
console.log("userName is:", userName);
  return(     
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500 p-6 sm:p-8 font-sans">
            {/* Notification */}
            {notification.show && (
                <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg transition-all duration-300 animate-slide-down ${notification.type === 'success' ? 'bg-green-600' : notification.type === 'error' ? 'bg-red-600' : 'bg-blue-600'} text-white font-semibold`}>
                    {notification.message}
                </div>
            )}

            {/* Header */}
            <header className="flex flex-wrap justify-between items-center mb-4 bg-white dark:bg-gray-900 rounded-3xl px-6 py-4 shadow-2xl border border-purple-100 dark:border-purple-900 transition-all">
              {/* Logo + Brand */}
              <div className="flex items-center gap-4">
                <img src="/logo.png" alt="logo" className="w-14 h-14 rounded-full object-cover shadow-lg ring-2 ring-purple-500 dark:ring-purple-400" />
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-purple-700 dark:text-purple-300">HabeoPrax</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Your daily habit companion</p>
                </div>
              </div>

              {/* Profile + Mode Toggle */}
            <div className="relative flex items-center gap-4 mt-4 lg:mt-0">
  <div className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full px-5 py-2 shadow-lg hover:scale-105 transition-transform">
  <div
    className="flex items-center cursor-pointer"
    onClick={() => setShowDropdown(!showDropdown)}
  >
    <span className="text-lg">👤</span>
    <span className="ml-2 font-semibold">{userName}</span>
  </div>
</div>


  {showDropdown && (
    <div className="absolute right-0 top-14 w-32 bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2 z-50">
      <button
        onClick={handleSignOut}
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Sign Out
      </button>
    </div>
  )}

  <button
    onClick={toggleDarkMode}
    className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    title="Toggle dark mode"
  >
    {isDarkMode ? '🌞' : '🌙'}
  </button>
</div>

            </header>

            <div className="flex flex-col lg:flex-row gap-8"></div>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column: Quote + Rewards */}
              <div className="flex-1">
                
                {/* Quote Section */}
                <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold mb-3">Welcome {userName}! 🌞</h2>
                  <p className="italic text-lg">{quote.text}</p>
                  <p className="text-right mt-3 font-medium">– {quote.author}</p>
                </section>

                {/* Rewards Section */}
                <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-purple-900 mt-8">
                  <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6 text-center tracking-tight">
                    🎁 Your Rewards
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    {/* Points */}
                    <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-xl shadow-inner">
                      <div className="text-3xl mb-2">⭐</div>
                      <p className="text-gray-600 dark:text-gray-300">Total Points</p>
                      <p className="text-3xl font-extrabold text-purple-700 dark:text-purple-300">{points}</p>
                    </div>
                    {/* Streak */}
                    <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-xl shadow-inner">
                      <div className="text-3xl mb-2">🔥</div>
                      <p className="text-gray-600 dark:text-gray-300">Current Streak</p>
                      <p className="text-3xl font-extrabold text-purple-700 dark:text-purple-300">{streak} days</p>
                    </div>
                    {/* Badges */}
                    <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-xl shadow-inner">
                      <div className="text-3xl mb-2">🏅</div>
                      <p className="text-gray-600 dark:text-gray-300">Badges</p>
                      <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {badges.length === 0 && <span className="text-gray-500">No badges yet</span>}
                        {badges.map((badge, i) => (
                          <span key={i} className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-100 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Habits Section */}
                <section className="flex-1 mt-12">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Your Habits</h3>
                        <button onClick={openAddModal} className="bg-purple-600 dark:bg-purple-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
                            + Add New Habit
                        </button>
                    </div>

                    <button
                        onClick={() => addHabit({
                            title: 'New Habit',
                            icon: '🔥',
                            duration: '10 mins',
                            time: '8:00 a.m',
                            day: ['Thursday'],
                            done: false
                        })}
                        className="mb-6 bg-green-600 dark:bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    >
                        Quick Add Habit
                    </button>

                    <div className="space-y-4">
                        {habits.map((habit, index) => (
                            <div key={index} className={`rounded-2xl p-5 shadow-md flex justify-between items-center transition-all duration-300 hover:shadow-lg ${habit.done ? 'bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-200' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100'}`}>
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">{habit.icon}</span>
                                    <div>
                                        <h4 className={`text-lg font-semibold ${habit.done ? 'line-through' : ''}`}>{habit.title}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{habit.duration} | {habit.time} | {habit.day.join(', ')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <button onClick={() => openEditModal(index)} className="text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">✏️</button>
                                    <button onClick={() => deleteHabit(index)} className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">🗑️</button>
                                    <button onClick={() => toggleHabitDone(index)} className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">✔️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                            <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-6">{editIndex !== null ? 'Edit Habit' : 'Add New Habit'}</h2>
                            <input
                                type="text"
                                placeholder="Habit title"
                                name="title"
                                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 mb-4 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Duration (e.g., 15 mins)"
                                name="duration"
                                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 mb-4 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={formData.duration}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Time (e.g., 4:30 p.m)"
                                name="time"
                                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 mb-4 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={formData.time}
                                onChange={handleInputChange}
                            />
                            <select
                                name="day"
                                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 mb-6 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={formData.day}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Day of the Week</option>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
                                    <option key={i} value={day}>{day}</option>
                                ))}
                            </select>
                            <div className="flex justify-end gap-4">
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Cancel</button>
                                <button onClick={saveHabit} className="bg-purple-600 dark:bg-purple-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
                                    {editIndex !== null ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
              </div>

              {/* Right Column: Calendar and Mood */}
              <aside className="w-full lg:w-96 space-y-6">
                {/* Calendar */}
                <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl p-8 shadow-2xl border border-purple-100 dark:border-purple-900">
                  <h3 className="text-center text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6 tracking-tight">
                    {month} {year}
                  </h3>
                  <div className="grid grid-cols-7 gap-3 text-xs text-center font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i}>{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-3 text-sm font-medium">
                    {(() => {
                      const firstDayOfMonth = new Date(year, today.getMonth(), 1).getDay();
                      const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
                      return Array.from({ length: startOffset }, (_, i) => <div key={`offset-${i}`} />);
                    })()}
                    {Array.from({ length: new Date(year, today.getMonth() + 1, 0).getDate() }, (_, i) => {
                      const day = i + 1;
                      const isToday = day === today.getDate();
                      const isSelected = selectedDate === day;
                      return (
                        <div
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          className={`cursor-pointer rounded-full w-10 h-10 flex items-center justify-center mx-auto transition-all duration-300
                            ${isSelected
                              ? 'bg-purple-600 text-white font-bold shadow-lg scale-110'
                              : isToday
                                ? 'bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-200 font-semibold border border-purple-300 dark:border-purple-600'
                                : 'hover:bg-purple-100 dark:hover:bg-purple-700 text-gray-700 dark:text-gray-200'
                            }`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mood Tracker */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg text-center">
                  <h3 className="mb-4 font-semibold text-lg">How’s Your Mood Today?</h3>
                  <div className="bg-white rounded-full flex justify-between items-center px-3 py-2 shadow-inner">
                    {['😞', '😐', '😊', '😁', '🤩'].map((mood, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedMood(mood)}
                        className={`text-2xl md:text-3xl transition-all duration-300 ease-in-out transform 
                          ${selectedMood === mood
                            ? 'scale-125 bg-blue-100 text-blue-500 rounded-full shadow-md p-2'
                            : 'hover:scale-110 text-gray-600 p-2'
                          }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 font-semibold">
                    {selectedMood === '😞' && 'Sad'}
                    {selectedMood === '😐' && 'Neutral'}
                    {selectedMood === '😊' && 'Good'}
                    {selectedMood === '😁' && 'Happy'}
                    {selectedMood === '🤩' && 'Excited'}
                  </p>
                </div>

                <aside className="w-full lg:w-96 space-y-6">
                        <div className="hidden lg:block my-8  backdrop-blur-lg bg-white/80 border border-blue-100 shadow-xl rounded-2xl p-6">
                          {/* Icon + Label */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-100 p-3 rounded-full text-purple-600 text-xl">
                              <FaChrome />
                            </div>
                            <div className="text-sm font-bold uppercase text-purple-500 tracking-wide">
                              New Extension
                            </div>
                          </div>
                  
                          {/* Title */}
                          <h2 className="text-xl font-semibold text-gray-800 mb-2 leading-snug">
                            Chrome Extension Now Available!
                          </h2>
                  
                          {/* Description */}
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            Instantly access focus tools from your browser. Stay on track, get reminders, and celebrate your daily wins—all without switching tabs.
                          </p>
                  
                          {/* Buttons */}
                          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition">
                            Add to Chrome
                          </button>
                          <button className="w-full mt-2 border border-blue-300 text-purple-600 font-medium py-2.5 rounded-lg hover:bg-blue-50 transition">
                            Maybe Later
                          </button>
                  
                          {/* Footer Info */}
                          <div className="flex items-center mt-4 text-sm text-gray-500">
                            <FaCheckCircle className="mr-2 text-green-500" />
                            1,213+ users already installed
                          </div>
                        </div>
                </aside>
              </aside>
            </div>


            {/* Bottom Navigation */}
            <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-2xl rounded-full px-8 py-4 flex items-center gap-10">
                <button title="Home" onClick={() => window.location.href = "/home"} className="text-2xl hover:text-purple-600 dark:hover:text-purple-400 transition-colors">🏠</button>
                <button title="Weekly Report" onClick={() => window.location.href = `/reports/${userId}`} className="text-2xl hover:text-purple-600 dark:hover:text-purple-400 transition-colors">📈</button>
                <button title="Reminders" onClick={() => window.location.href = "/notifications"} className="text-2xl hover:text-purple-600 dark:hover:text-purple-400 transition-colors">🔔</button>
             
            </nav>
        </div>
    );
}