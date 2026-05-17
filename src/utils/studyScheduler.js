// Day Labels
export function getScheduleDays(language = "en") {
  const isArabic = language === "ar";

  return [
    { key: "Sun", label: isArabic ? "الأحد" : "Sunday" },
    { key: "Mon", label: isArabic ? "الإثنين" : "Monday" },
    { key: "Tue", label: isArabic ? "الثلاثاء" : "Tuesday" },
    { key: "Wed", label: isArabic ? "الأربعاء" : "Wednesday" },
    { key: "Thu", label: isArabic ? "الخميس" : "Thursday" },
    { key: "Fri", label: isArabic ? "الجمعة" : "Friday" },
    { key: "Sat", label: isArabic ? "السبت" : "Saturday" },
  ];
}

// Time Blocks
function generateTimeBlocks(startTime, endTime, sessionDuration) {
  const blocks = [];

  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");

  const start = new Date();
  start.setHours(Number(startHour), Number(startMinute), 0, 0);

  const end = new Date();
  end.setHours(Number(endHour), Number(endMinute), 0, 0);

  while (start < end) {
    const next = new Date(start.getTime() + sessionDuration * 60000);

    blocks.push({
      start: start.toTimeString().slice(0, 5),
      end: next.toTimeString().slice(0, 5),
      time: `${start.toTimeString().slice(0, 5)} - ${next
        .toTimeString()
        .slice(0, 5)}`,
    });

    start.setMinutes(start.getMinutes() + sessionDuration);
  }

  return blocks;
}

// Schedule Generator
export function generateStudySchedule({
  subjects,
  busyDays,
  startTime,
  endTime,
  sessionDuration,
}) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const availableDays = weekDays.filter((day) => !busyDays.includes(day));

  if (!subjects?.length || availableDays.length === 0) return null;

  const blocks = generateTimeBlocks(startTime, endTime, Number(sessionDuration));

  if (blocks.length === 0) return null;

  const schedule = {};

  availableDays.forEach((day) => {
    schedule[day] = {
      blocks: blocks.map((block, index) => {
        const subject = subjects[index % subjects.length];

        return {
          ...block,
          subject: subject.name,
          duration: `${sessionDuration} min`,
          priority: subject.difficulty,
        };
      }),
    };
  });

  return {
    days: schedule,
    dayOrder: availableDays,
  };
}