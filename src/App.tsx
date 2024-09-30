import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Columns3, Grid } from "lucide-react";

interface DayProps {
  classNames: string;
  day: DayType;
}

const Day: React.FC<DayProps> = ({ classNames, day }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <motion.div
        className={`relative flex items-center justify-center py-1 ${classNames}`}
        style={{ height: "4rem", borderRadius: 16 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        id={`day-${day.day}`}
      >
        <motion.div className="flex flex-col items-center justify-center">
          {!(day.day[0] === "+" || day.day[0] === "-") && (
            <span className="text-sm text-white">{day.day}</span>
          )}
        </motion.div>
        {day.meetingInfo && (
          <motion.div
            className="absolute bottom-1 right-1 size-5 rounded-full bg-zinc-700 text-white text-[10px] font-bold p-1 flex items-center justify-center"
            layoutId={`day-${day.day}-meeting-count`}
            style={{
              borderRadius: 999,
            }}
          >
            {day.meetingInfo.length}
          </motion.div>
        )}

        <AnimatePresence>
          {day.meetingInfo && isHovered && (
            <div className="absolute inset-0 size-full flex items-center justify-center">
              <motion.div
                className="bg-zinc-700 size-10 text-white text-xs font-bold p-1 flex items-center justify-center"
                layoutId={`day-${day.day}-meeting-count`}
                style={{
                  borderRadius: 999,
                }}
              >
                {day.meetingInfo.length}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const CalendarGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {DAYS.map((day, index) => (
        <Day
          key={`${day.day}-${index}`}
          classNames={day.classNames}
          day={day}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [moreView, setMoreView] = useState(false);
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start md:justify-center px-4 py-10 bg-black">
      <div className="relative mx-auto my-10 w-full max-w-lg">
        <motion.div
          key="calendar-view"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.15 }}
          className="w-full flex-col flex gap-4"
        >
          <div className="w-full flex items-center justify-between">
            <motion.h2 className="text-4xl mb-2 font-bold tracking-wider text-zinc-300">
              LN <span className="opacity-50">2024</span>
            </motion.h2>
            <motion.button
              className="flex items-center text-[#323232] relative border rounded-lg py-1 px-1.5 border-[#323232] gap-3"
              onClick={() => setMoreView(!moreView)}
            >
              <Columns3 className=" z-[2]" />
              <Grid className=" z-[2]" />
              <div
                className="absolute top-0 left-0 w-7 h-[85%] bg-white rounded-md duration-300 transition-transform"
                style={{
                  top: "50%",
                  transform: moreView
                    ? "translateY(-50%) translateX(40px)"
                    : "translateY(-50%) translateX(4px)",
                }}
              ></div>
            </motion.button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-xs text-white text-center bg-[#323232] py-1 px-0/5 rounded-xl"
              >
                {day}
              </div>
            ))}
          </div>
          <CalendarGrid />
        </motion.div>
      </div>
    </main>
  );
};

export default App;

type DayType = {
  day: string;
  classNames: string;
  meetingInfo?: {
    date: string;
    time: string;
    title: string;
    participants: string[];
    location: string;
  }[];
};

const DAYS: DayType[] = [
  { day: "-3", classNames: "bg-zinc-700/20" },
  { day: "-2", classNames: "bg-zinc-700/20" },
  { day: "-1", classNames: "bg-zinc-700/20" },
  { day: "01", classNames: "bg-[#1e1e1e]" },
  {
    day: "02",
    classNames: "bg-[#1e1e1e] cursor-pointer",
    meetingInfo: [
      {
        date: "2024-10-02",
        time: "10:00 AM - 11:00 AM",
        title: "Design Review Meeting",
        participants: ["Alice Johnson", "Mark Lee"],
        location: "Zoom",
      },
      {
        date: "2024-10-02",
        time: "1:00 PM - 2:00 PM",
        title: "Sprint Planning",
        participants: ["Tom Hanks", "Jessica White"],
        location: "Google Meet",
      },
    ],
  },
  { day: "03", classNames: "bg-[#1e1e1e]" },
  {
    day: "04",
    classNames: "bg-zinc-700/20",
  },
  { day: "05", classNames: "bg-zinc-700/20" },
  {
    day: "06",
    classNames: "bg-[#1e1e1e] cursor-pointer",
    meetingInfo: [
      {
        date: "2024-10-06",
        time: "10:00 AM - 11:00 AM",
        title: "Brainstorming Session",
        participants: ["Sara Parker", "Kumail Nanji"],
        location: "Zoom",
      },
    ],
  },
  { day: "07", classNames: "bg-[#1e1e1e]" },
  {
    day: "08",
    classNames: "bg-[#1e1e1e] cursor-pointer",
    meetingInfo: [
      {
        date: "2024-10-08",
        time: "2:00 PM - 3:00 PM",
        title: "Strategy Meeting",
        participants: ["Robert Green", "David Lee"],
        location: "Google Meet",
      },
      {
        date: "2024-10-08",
        time: "4:00 PM - 5:00 PM",
        title: "Budget Review",
        participants: ["Jessica White", "Tom Hanks"],
        location: "Microsoft Teams",
      },
      {
        date: "2024-10-08",
        time: "5:30 PM - 6:30 PM",
        title: "Q&A Session",
        participants: ["Bob Smith", "Emma Stone"],
        location: "In-person",
      },
    ],
  },
  { day: "09", classNames: "bg-[#1e1e1e]" },
  {
    day: "10",
    classNames: "bg-[#1e1e1e]",
  },
  { day: "11", classNames: "bg-zinc-700/20" },
  {
    day: "12",
    classNames: "bg-zinc-700/20",
  },
  { day: "13", classNames: "bg-[#1e1e1e]" },
  { day: "14", classNames: "bg-[#1e1e1e]" },
  {
    day: "15",
    classNames: "bg-[#1e1e1e] cursor-pointer",
    meetingInfo: [
      {
        date: "2024-10-15",
        time: "9:00 AM - 10:00 AM",
        title: "Client Feedback Session",
        participants: ["Sarah Parker", "Kumail Nanji"],
        location: "In-person at Office",
      },
    ],
  },
  { day: "16", classNames: "bg-[#1e1e1e]" },
  {
    day: "17",
    classNames: "bg-[#1e1e1e] cursor-pointer",
    meetingInfo: [
      {
        date: "2024-10-04",
        time: "9:00 AM - 10:00 AM",
        title: "Weekly Standup",
        participants: ["David Lee", "Sophia Young"],
        location: "Microsoft Teams",
      },
      {
        date: "2024-10-04",
        time: "11:00 AM - 12:00 PM",
        title: "Client Update",
        participants: ["Sara Parker", "Kumail Nanji"],
        location: "In-person",
      },
      {
        date: "2024-10-04",
        time: "2:00 PM - 3:00 PM",
        title: "Feature Demo",
        participants: ["Bob Smith", "Emma Stone"],
        location: "Zoom",
      },
      {
        date: "2024-10-04",
        time: "4:00 PM - 5:00 PM",
        title: "Feedback Session",
        participants: ["Mark Lee", "Alice Johnson"],
        location: "Google Meet",
      },
    ],
  },
  { day: "18", classNames: "bg-zinc-700/20" },
  {
    day: "19",
    classNames: "bg-zinc-700/20",
  },
  { day: "20", classNames: "bg-[#1e1e1e]" },
  {
    day: "21",
    classNames: "bg-[#1e1e1e] cursor-pointer",
    meetingInfo: [
      {
        date: "2024-10-10",
        time: "11:00 AM - 12:00 PM",
        title: "Product Launch",
        participants: ["Alice Johnson", "Mark Lee"],
        location: "Zoom",
      },
      {
        date: "2024-10-10",
        time: "1:00 PM - 2:00 PM",
        title: "Customer Feedback",
        participants: ["Sara Parker", "Kumail Nanji"],
        location: "Google Meet",
      },
      {
        date: "2024-10-10",
        time: "3:00 PM - 4:00 PM",
        title: "Design Iteration",
        participants: ["David Lee", "Sophia Young"],
        location: "In-person",
      },
      {
        date: "2024-10-10",
        time: "5:00 PM - 6:00 PM",
        title: "Team Celebration",
        participants: ["Bob Smith", "Jessica White"],
        location: "Office Rooftop",
      },
      {
        date: "2024-10-10",
        time: "7:00 PM - 8:00 PM",
        title: "Happy Hour",
        participants: ["Tom Hanks", "Emma Stone"],
        location: "Local Bar",
      },
    ],
  },
  { day: "22", classNames: "bg-[#1e1e1e]" },
  { day: "23", classNames: "bg-[#1e1e1e]" },
  {
    day: "24",
    classNames: "bg-[#1e1e1e]",
  },
  { day: "25", classNames: "bg-zinc-700/20" },
  { day: "26", classNames: "bg-zinc-700/20" },
  {
    day: "27",
    classNames: "bg-[#1e1e1e]",
  },
  { day: "28", classNames: "bg-[#1e1e1e]" },
  {
    day: "29",
    classNames: "bg-[#1e1e1e]",
  },
  {
    day: "30",
    classNames: "bg-[#1e1e1e] cursor-pointer",
    meetingInfo: [
      {
        date: "2024-10-17",
        time: "11:00 AM - 12:00 PM",
        title: "Brainstorming Session",
        participants: ["David Lee", "Sophia Young"],
        location: "Zoom",
      },
    ],
  },
  { day: "+1", classNames: "bg-zinc-700/20" },
  { day: "+2", classNames: "bg-zinc-700/20" },
];

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
