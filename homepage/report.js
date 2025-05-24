import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const { ObjectId } = mongoose.Types;
const Habit = mongoose.model('Habit');

router.get('/reports/:userId', async (req, res) => {
  const { userId } = req.params;
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  try {
    const doc = await Habit.findOne({ userId: new ObjectId(userId) });
    if (!doc) {
      console.log('No document found for user:', userId);
      return res.status(404).json({ message: 'No habits found' });
    }

    const habits = doc.habits || [];
    console.log('Total habits found:', habits.length);

    
    const weekHabits = habits.filter(h => {
      if (!h.completedAt) return false;
      const compDate = new Date(h.completedAt);
      return compDate >= oneWeekAgo;
    });

    
    const weekCategoryCounts = {};
    weekHabits.forEach(h => {
      if (!h.title) return;
      weekCategoryCounts[h.title] = (weekCategoryCounts[h.title] || 0) + 1;
    });

 
    const dailyCounts = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      dailyCounts[date.toISOString().slice(0, 10)] = 0;
    }

    weekHabits.forEach(h => {
      const compDate = new Date(h.completedAt);
      const key = compDate.toISOString().slice(0, 10);
      if (key in dailyCounts) dailyCounts[key]++;
    });


    const monthHabits = habits.filter(h => {
      if (!h.completedAt) return false;
      const compDate = new Date(h.completedAt);
      return compDate >= oneMonthAgo;
    });

    const weeklyBuckets = [0, 0, 0, 0]; 
    monthHabits.forEach(h => {
      const daysAgo = Math.floor((now - new Date(h.completedAt)) / (1000 * 60 * 60 * 24));
      const weekIndex = Math.floor(daysAgo / 7);
      if (weekIndex < 4) {
        weeklyBuckets[3 - weekIndex]++;
      }
    });

    const monthLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

    const finalData = {
      weekCategoryCounts,
      dailyCompletion: {
        labels: Object.keys(dailyCounts).reverse(),
        counts: Object.values(dailyCounts).reverse(),
      },
      monthlyTrend: {
        labels: monthLabels,
        counts: weeklyBuckets,
      },
    };

    console.log("Final report data sent to client:", finalData);
    return res.json(finalData);
  } catch (error) {
    console.error('Error generating report:', error);
    return res.status(500).json({ message: 'Error generating report' });
  }
});

export default router;