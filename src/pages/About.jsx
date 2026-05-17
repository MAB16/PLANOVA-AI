function About({ language }) {
  const isArabic = language === "ar";

  return (
    <main className="page">
      <section className="dashboard-hero animated-card">
        <div>
          <p className="eyebrow">
            {isArabic ? "عن المشروع" : "About The Project"}
          </p>

          <h1>{isArabic ? "Planova AI" : "Planova AI"}</h1>

          <p className="hero-text">
            {isArabic
              ? "منصة ذكية تساعد الطلاب والأشخاص على تنظيم الدراسة اليومية وتعلم المهارات بطريقة واضحة وتفاعلية."
              : "A smart platform that helps students and individuals organize daily study schedules and skill learning plans in a clear and interactive way."}
          </p>
        </div>
      </section>

      <section className="about-grid">
        <div className="about-card">
          <span>🎯</span>
          <h2>{isArabic ? "فكرة المشروع" : "Project Idea"}</h2>
          <p>
            {isArabic
              ? "الموقع ينشئ جدولًا دراسيًا بناءً على صعوبة المادة، أيام الانشغال، الحالة النفسية، ومدى الاهتمام."
              : "The website creates a study schedule based on subject difficulty, busy days, mood, and interest level."}
          </p>
        </div>

        <div className="about-card">
          <span>🧠</span>
          <h2>{isArabic ? "المنطق الذكي" : "Smart Logic"}</h2>
          <p>
            {isArabic
              ? "يستخدم الموقع منطقًا داخليًا لتوزيع الجلسات الدراسية والمهارات بطريقة منظمة ومناسبة للمدخلات."
              : "The system uses internal logic to distribute study sessions and skill stages based on user inputs."}
          </p>
        </div>

        <div className="about-card">
          <span>📚</span>
          <h2>{isArabic ? "منظم الدراسة" : "Study Planner"}</h2>
          <p>
            {isArabic
              ? "يسمح للمستخدم بإضافة أكثر من مادة وإنشاء تقويم مذاكرة أسبوعي واضح."
              : "Allows users to add multiple subjects and generate a clean weekly study calendar."}
          </p>
        </div>

        <div className="about-card">
          <span>🚀</span>
          <h2>{isArabic ? "منظم المهارات" : "Skill Planner"}</h2>
          <p>
            {isArabic
              ? "يساعد المستخدم على تعلم مهارة جديدة عبر مراحل، ملاحظات، تقدم، وملخص نهائي."
              : "Helps users learn a new skill through stages, notes, progress tracking, and a final summary."}
          </p>
        </div>

        <div className="about-card">
          <span>💻</span>
          <h2>{isArabic ? "التقنيات" : "Technologies"}</h2>
          <p>
            React, React Router, CSS, LocalStorage, JavaScript Logic.
          </p>
        </div>

        <div className="about-card">
          <span>✨</span>
          <h2>{isArabic ? "المميزات" : "Features"}</h2>
          <p>
            {isArabic
              ? "واجهة حديثة، دارك مود، دعم العربية والإنجليزية، حفظ تلقائي، وتقويم تفاعلي."
              : "Modern UI, dark mode, Arabic/English support, auto-saving, and interactive calendar."}
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;