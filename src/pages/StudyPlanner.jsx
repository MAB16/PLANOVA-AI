import { useState } from "react";
import {
  generateStudySchedule,
  getScheduleDays,
} from "../utils/studyScheduler";

// Default Values
const defaultSubjectForm = {
  name: "",
  difficulty: "",
  interest: "",
  mood: "",
};

const defaultSettings = {
  busyDays: [],
  startTime: "",
  endTime: "",
  sessionDuration: "60",
};

function StudyPlanner({ language }) {
  const isArabic = language === "ar";

  // State Management
  const [subjectForm, setSubjectForm] = useState(defaultSubjectForm);
  const [subjects, setSubjects] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [schedule, setSchedule] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Sun");
  const [message, setMessage] = useState("");

  // Derived Data
  const days = getScheduleDays(language);

  const visibleDays = days.filter(
    (day) => !settings.busyDays.includes(day.key)
  );

  const selectedDayData =
    schedule?.days?.[selectedDay] || Object.values(schedule?.days || {})[0];

  // Form Updates
  function updateSubject(field, value) {
    setSubjectForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updateSetting(field, value) {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSchedule(null);
  }

  // Busy Days
  function toggleBusyDay(day) {
    setSettings((prev) => {
      const exists = prev.busyDays.includes(day);

      return {
        ...prev,
        busyDays: exists
          ? prev.busyDays.filter((item) => item !== day)
          : [...prev.busyDays, day],
      };
    });

    setSchedule(null);
  }

  // Subject Actions
  function addSubject() {
    if (
      !subjectForm.name ||
      !subjectForm.difficulty ||
      !subjectForm.interest ||
      !subjectForm.mood
    ) {
      setMessage(
        isArabic ? "أكمل بيانات المادة." : "Complete subject details."
      );
      return;
    }

    setSubjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...subjectForm,
      },
    ]);

    setSubjectForm(defaultSubjectForm);
    setSchedule(null);
    setMessage("");
  }

  function removeSubject(id) {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
    setSchedule(null);
  }

  // Schedule Generation
  function generateCalendar() {
    if (subjects.length === 0) {
      setMessage(
        isArabic ? "أضف مادة واحدة على الأقل." : "Add at least one subject."
      );
      return;
    }

    if (!settings.startTime || !settings.endTime) {
      setMessage(
        isArabic ? "حدد وقت البداية والنهاية." : "Select start and end time."
      );
      return;
    }

    if (settings.startTime >= settings.endTime) {
      setMessage(
        isArabic
          ? "وقت النهاية يجب أن يكون بعد وقت البداية."
          : "End time must be after start time."
      );
      return;
    }

    if (settings.busyDays.length === 7) {
      setMessage(
        isArabic
          ? "لا يمكن اختيار جميع الأيام كأيام انشغال."
          : "You cannot select all days as busy."
      );
      return;
    }

    const result = generateStudySchedule({
      subjects,
      busyDays: settings.busyDays,
      startTime: settings.startTime,
      endTime: settings.endTime,
      sessionDuration: settings.sessionDuration,
    });

    if (!result) {
      setMessage(
        isArabic ? "تعذر إنشاء التقويم." : "Failed to generate calendar."
      );
      return;
    }

    setSchedule(result);
    setSelectedDay(result.dayOrder[0]);
    setMessage("");
  }

  // UI Rendering
  return (
    <main className="page">
      <section className="hero-section animated-card">
        <div>
          <p className="eyebrow">
            {isArabic ? "منظم الدراسة اليومية" : "Daily Study Organizer"}
          </p>

          <h1>{isArabic ? "تقويم المذاكرة" : "Study Calendar"}</h1>

          <p className="hero-text">
            {isArabic
              ? "أنشئ جدول مذاكرة أسبوعي بشكل احترافي."
              : "Generate a professional weekly study calendar."}
          </p>
        </div>

        <div className="hero-badge">
          <span>{isArabic ? "عدد المواد" : "Subjects"}</span>
          <strong>{subjects.length}</strong>
        </div>
      </section>

      {message && <div className="alert-box">{message}</div>}

      <section className="layout-grid">
        <div className="card interactive-card">
          <div className="card-header">
            <h2>{isArabic ? "إضافة المواد" : "Add Subjects"}</h2>
          </div>

          <form className="planner-form">
            <div className="form-group full-width">
              <label>{isArabic ? "اسم المادة" : "Subject Name"}</label>
              <input
                type="text"
                value={subjectForm.name}
                onChange={(e) => updateSubject("name", e.target.value)}
                placeholder={
                  isArabic ? "مثال: قواعد البيانات" : "Example: Database"
                }
              />
            </div>

            <div className="form-group">
              <label>{isArabic ? "الصعوبة" : "Difficulty"}</label>
              <select
                value={subjectForm.difficulty}
                onChange={(e) => updateSubject("difficulty", e.target.value)}
              >
                <option value="">{isArabic ? "اختر" : "Select"}</option>
                <option>{isArabic ? "سهل" : "Easy"}</option>
                <option>{isArabic ? "متوسط" : "Medium"}</option>
                <option>{isArabic ? "صعب" : "Hard"}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{isArabic ? "الاهتمام" : "Interest"}</label>
              <select
                value={subjectForm.interest}
                onChange={(e) => updateSubject("interest", e.target.value)}
              >
                <option value="">{isArabic ? "اختر" : "Select"}</option>
                <option>{isArabic ? "منخفض" : "Low"}</option>
                <option>{isArabic ? "متوسط" : "Medium"}</option>
                <option>{isArabic ? "مرتفع" : "High"}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{isArabic ? "الحالة" : "Mood"}</label>
              <select
                value={subjectForm.mood}
                onChange={(e) => updateSubject("mood", e.target.value)}
              >
                <option value="">{isArabic ? "اختر" : "Select"}</option>
                <option>{isArabic ? "سيئة" : "Low"}</option>
                <option>{isArabic ? "طبيعية" : "Normal"}</option>
                <option>{isArabic ? "ممتازة" : "Good"}</option>
              </select>
            </div>

            <button
              type="button"
              className="primary-button full-width"
              onClick={addSubject}
            >
              {isArabic ? "إضافة المادة" : "Add Subject"}
            </button>
          </form>

          <div className="mini-section">
            <h3>{isArabic ? "المواد المضافة" : "Added Subjects"}</h3>

            {subjects.length === 0 ? (
              <p className="muted-text">
                {isArabic ? "لم تتم إضافة مواد بعد." : "No subjects added yet."}
              </p>
            ) : (
              <div className="subject-list">
                {subjects.map((subject) => (
                  <div className="subject-item" key={subject.id}>
                    <div className="subject-info">
                      <strong>{subject.name}</strong>

                      <div className="subject-tags">
                        <span>{subject.difficulty}</span>
                        <span>{subject.interest}</span>
                        <span>{subject.mood}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeSubject(subject.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mini-section">
            <h3>{isArabic ? "إعدادات الجدول" : "Schedule Settings"}</h3>

            <div className="planner-form">
              <div className="form-group full-width">
                <label>{isArabic ? "أيام الانشغال" : "Busy Days"}</label>

                <div className="day-list">
                  {days.map((day) => (
                    <label className="day-chip" key={day.key}>
                      <input
                        type="checkbox"
                        checked={settings.busyDays.includes(day.key)}
                        onChange={() => toggleBusyDay(day.key)}
                      />
                      <span>{day.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>{isArabic ? "وقت البداية" : "Start Time"}</label>
                <select
                  value={settings.startTime}
                  onChange={(e) => updateSetting("startTime", e.target.value)}
                >
                  <option value="">{isArabic ? "اختر" : "Select"}</option>
                  {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].map(
                    (time) => (
                      <option value={time} key={time}>
                        {time}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>{isArabic ? "وقت النهاية" : "End Time"}</label>
                <select
                  value={settings.endTime}
                  onChange={(e) => updateSetting("endTime", e.target.value)}
                >
                  <option value="">{isArabic ? "اختر" : "Select"}</option>
                  {["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map(
                    (time) => (
                      <option value={time} key={time}>
                        {time}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="form-group full-width">
                <label>{isArabic ? "مدة الجلسة" : "Session Duration"}</label>
                <select
                  value={settings.sessionDuration}
                  onChange={(e) =>
                    updateSetting("sessionDuration", e.target.value)
                  }
                >
                  <option value="30">30 {isArabic ? "دقيقة" : "min"}</option>
                  <option value="45">45 {isArabic ? "دقيقة" : "min"}</option>
                  <option value="60">60 {isArabic ? "دقيقة" : "min"}</option>
                  <option value="90">90 {isArabic ? "دقيقة" : "min"}</option>
                </select>
              </div>

              <button
                type="button"
                className="primary-button full-width"
                onClick={generateCalendar}
              >
                {isArabic ? "إنشاء التقويم" : "Generate Calendar"}
              </button>
            </div>
          </div>
        </div>

        <div className="card interactive-card calendar-card">
          <div className="card-header">
            <h2>{isArabic ? "تقويم المذاكرة" : "Study Calendar"}</h2>
          </div>

          {!schedule ? (
            <div className="empty-state">
              <div className="empty-icon">□</div>
              <h3>{isArabic ? "لا يوجد جدول" : "No calendar yet"}</h3>
            </div>
          ) : (
            <>
              <div className="calendar-days">
                {visibleDays.map((day) => (
                  <button
                    key={day.key}
                    type="button"
                    className={`calendar-day-tab ${
                      selectedDay === day.key ? "active-calendar-day" : ""
                    }`}
                    onClick={() => setSelectedDay(day.key)}
                  >
                    {day.label}
                  </button>
                ))}
              </div>

              <div className="calendar-timeline">
                {selectedDayData?.blocks?.map((block, index) => (
                  <div className="calendar-row" key={`${block.start}-${index}`}>
                    <div className="calendar-time">{block.start}</div>

                    <div
                      className={`calendar-slot ${
                        block.subject
                          ? `calendar-filled subject-color-${index % 5}`
                          : "calendar-empty"
                      }`}
                    >
                      <div className="calendar-subject">
                        {block.subject || (isArabic ? "وقت فارغ" : "Free Time")}
                      </div>

                      {block.subject && (
                        <div className="calendar-details">
                          <span>{block.time}</span>
                          <span>{block.duration}</span>
                          <span>{block.priority}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default StudyPlanner;