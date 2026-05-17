import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function Dashboard({ language }) {
  const isArabic = language === "ar";

  const studyData = readStorage("planova-study-planner", {
    subjects: [],
    schedule: null,
  });

  const skillData = readStorage("planova-skill-planner", {
    skillForm: null,
    plan: [],
  });

  const subjectsCount = studyData.subjects?.length || 0;

  const studySessions =
    studyData.schedule?.days
      ? Object.values(studyData.schedule.days).flatMap((day) =>
          day.blocks.filter((block) => block.subject)
        )
      : [];

  const skillPlan = skillData.plan || [];
  const completedStages = skillPlan.filter((stage) => stage.completed).length;

  const skillProgress =
    skillPlan.length > 0
      ? Math.round((completedStages / skillPlan.length) * 100)
      : 0;

  const currentSkill = skillData.skillForm?.skillName || "-";

  const weeklyData = [
    { day: isArabic ? "الأحد" : "Sun", hours: 2 },
    { day: isArabic ? "الإثنين" : "Mon", hours: 4 },
    { day: isArabic ? "الثلاثاء" : "Tue", hours: 3 },
    { day: isArabic ? "الأربعاء" : "Wed", hours: 5 },
    { day: isArabic ? "الخميس" : "Thu", hours: 2 },
    { day: isArabic ? "الجمعة" : "Fri", hours: 1 },
    { day: isArabic ? "السبت" : "Sat", hours: 4 },
  ];

  const stats = [
    {
      title: isArabic ? "المواد الدراسية" : "Subjects",
      value: subjectsCount,
      icon: "📚",
    },
    {
      title: isArabic ? "جلسات الدراسة" : "Study Sessions",
      value: studySessions.length,
      icon: "⏳",
    },
    {
      title: isArabic ? "المهارة الحالية" : "Current Skill",
      value: currentSkill,
      icon: "🚀",
    },
    {
      title: isArabic ? "إنجاز المهارة" : "Skill Progress",
      value: `${skillProgress}%`,
      icon: "📈",
    },
  ];

  const todayTasks = studySessions.slice(0, 4);

  return (
    <main className="page">
      <section className="dashboard-hero animated-card">
        <div>
          <p className="eyebrow">
            {isArabic ? "لوحة التحكم الذكية" : "Smart Productivity Dashboard"}
          </p>

          <h1>
            {isArabic ? "مرحبًا بك في Planova AI" : "Welcome to Planova AI"}
          </h1>

          <p className="hero-text">
            {isArabic
              ? "تابع موادك، جلساتك، مهاراتك، ونسبة إنجازك من مكان واحد."
              : "Track your subjects, study sessions, skills, and progress from one place."}
          </p>
        </div>

        <div className="dashboard-hero-badge">
          <span>{isArabic ? "الحالة الحالية" : "Current Status"}</span>
          <strong>
            {skillProgress === 100
              ? isArabic
                ? "مكتمل"
                : "Completed"
              : isArabic
              ? "قيد التقدم"
              : "In Progress"}
          </strong>
        </div>
      </section>

      <section className="dashboard-stats">
        {stats.map((item) => (
          <div className="stats-card interactive-card" key={item.title}>
            <div className="stats-icon">{item.icon}</div>

            <div>
              <h3>{item.value}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="card interactive-card">
          <div className="card-header">
            <h2>{isArabic ? "جلسات الدراسة" : "Study Sessions"}</h2>
            <p>
              {isArabic
                ? "أقرب الجلسات التي تم توليدها من جدول الدراسة."
                : "Upcoming generated sessions from your study planner."}
            </p>
          </div>

          {todayTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">□</div>
              <h3>{isArabic ? "لا توجد جلسات" : "No sessions yet"}</h3>
              <p>
                {isArabic
                  ? "أنشئ جدول دراسة أولًا ليظهر هنا."
                  : "Generate a study schedule first to show sessions here."}
              </p>
            </div>
          ) : (
            <div className="today-tasks">
              {todayTasks.map((task, index) => (
                <div className="task-item" key={`${task.time}-${index}`}>
                  <div className="task-time">{task.time}</div>

                  <div className="task-content">
                    <h3>{task.subject}</h3>
                    <p>
                      {task.duration} • {task.priority}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card interactive-card">
          <div className="card-header">
            <h2>{isArabic ? "تقدم المهارة" : "Skill Progress"}</h2>
            <p>
              {isArabic
                ? "ملخص حالة المهارة الحالية."
                : "Summary of your current skill plan."}
            </p>
          </div>

          <div className="focus-list">
            <div className="focus-item">
              <span>🚀</span>
              <div>
                <strong>{currentSkill}</strong>
                <p>{isArabic ? "المهارة الحالية" : "Current skill"}</p>
              </div>
            </div>

            <div className="focus-item">
              <span>✅</span>
              <div>
                <strong>
                  {completedStages}/{skillPlan.length}
                </strong>
                <p>{isArabic ? "المراحل المكتملة" : "Completed stages"}</p>
              </div>
            </div>

            <div className="focus-item">
              <span>📈</span>
              <div>
                <strong>{skillProgress}%</strong>
                <p>{isArabic ? "نسبة الإنجاز" : "Progress percentage"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="chart-section card interactive-card">
        <div className="card-header">
          <h2>{isArabic ? "النشاط الأسبوعي" : "Weekly Activity"}</h2>
          <p>
            {isArabic
              ? "تصور بسيط لعدد ساعات الدراسة خلال الأسبوع."
              : "A simple visualization of study hours throughout the week."}
          </p>
        </div>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" stroke="var(--muted)" />
              <YAxis stroke="var(--muted)" />
              <Tooltip />
              <Bar
                dataKey="hours"
                radius={[14, 14, 0, 0]}
                fill="#7faf8b"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;