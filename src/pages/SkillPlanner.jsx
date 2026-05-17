import { useEffect, useState } from "react";
import { generateSkillPlan } from "../utils/skillPlanner";

const STORAGE_KEY = "planova-skill-planner";

const defaultSkillForm = {
  skillName: "",
  level: "",
  goal: "",
  weeks: "4",
  hoursPerWeek: "5",
};

function loadSavedSkillData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function SkillPlanner({ language }) {
  const isArabic = language === "ar";
  const savedData = loadSavedSkillData();

  const [skillForm, setSkillForm] = useState(
    savedData?.skillForm || defaultSkillForm
  );

  const [plan, setPlan] = useState(savedData?.plan || []);
  const [message, setMessage] = useState("");

  const completedCount = plan.filter((stage) => stage.completed).length;
  const progress =
    plan.length > 0 ? Math.round((completedCount / plan.length) * 100) : 0;

  const finalSummary = plan
    .filter((stage) => stage.notes.trim() !== "")
    .map((stage) => `${stage.title}: ${stage.notes}`)
    .join("\n\n");

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        skillForm,
        plan,
      })
    );
  }, [skillForm, plan]);

  function updateForm(field, value) {
    setSkillForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function createPlan() {
    setMessage("");

    const result = generateSkillPlan({
      ...skillForm,
      language,
    });

    if (!result) {
      setMessage(
        isArabic
          ? "أكمل بيانات المهارة قبل إنشاء الخطة."
          : "Complete the skill details before creating the plan."
      );
      return;
    }

    setPlan(result);
  }

  function toggleStage(id) {
    setPlan((prev) =>
      prev.map((stage) =>
        stage.id === id ? { ...stage, completed: !stage.completed } : stage
      )
    );
  }

  function updateNotes(id, value) {
    setPlan((prev) =>
      prev.map((stage) =>
        stage.id === id ? { ...stage, notes: value } : stage
      )
    );
  }

  function clearSkillPlan() {
    localStorage.removeItem(STORAGE_KEY);
    setSkillForm(defaultSkillForm);
    setPlan([]);
    setMessage("");
  }

  return (
    <main className="page">
      <section className="hero-section animated-card">
        <div>
          <p className="eyebrow">
            {isArabic ? "منظم تعلم المهارات" : "Skill Learning Organizer"}
          </p>

          <h1>{isArabic ? "منظم المهارات" : "Skill Planner"}</h1>

          <p className="hero-text">
            {isArabic
              ? "أنشئ خطة تعلم مهارة جديدة، تابع المراحل، واكتب ملاحظاتك لكل مرحلة."
              : "Create a skill learning plan, track stages, and write notes for each stage."}
          </p>
        </div>

        <div className="hero-badge">
          <span>{isArabic ? "التقدم" : "Progress"}</span>
          <strong>{progress}%</strong>
        </div>
      </section>

      {message && <div className="alert-box">{message}</div>}

      <section className="layout-grid">
        <div className="card interactive-card">
          <div className="card-header">
            <h2>{isArabic ? "بيانات المهارة" : "Skill Details"}</h2>
            <p>
              {isArabic
                ? "أدخل المهارة والوقت المتاح لتوليد خطة تعلم منظمة."
                : "Enter the skill and available time to generate a structured learning plan."}
            </p>
          </div>

          <form className="planner-form">
            <div className="form-group full-width">
              <label>{isArabic ? "اسم المهارة" : "Skill Name"}</label>
              <input
                type="text"
                value={skillForm.skillName}
                onChange={(e) => updateForm("skillName", e.target.value)}
                placeholder={isArabic ? "مثال: Python" : "Example: Python"}
              />
            </div>

            <div className="form-group">
              <label>{isArabic ? "مستواك الحالي" : "Current Level"}</label>
              <select
                value={skillForm.level}
                onChange={(e) => updateForm("level", e.target.value)}
              >
                <option value="" disabled>
                  {isArabic ? "اختر المستوى" : "Select level"}
                </option>
                <option>{isArabic ? "مبتدئ" : "Beginner"}</option>
                <option>{isArabic ? "متوسط" : "Intermediate"}</option>
                <option>{isArabic ? "متقدم" : "Advanced"}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{isArabic ? "عدد الأسابيع" : "Weeks"}</label>
              <input
                type="number"
                min="1"
                value={skillForm.weeks}
                onChange={(e) => updateForm("weeks", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>{isArabic ? "الساعات أسبوعيًا" : "Hours Per Week"}</label>
              <input
                type="number"
                min="1"
                value={skillForm.hoursPerWeek}
                onChange={(e) => updateForm("hoursPerWeek", e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>{isArabic ? "الهدف" : "Goal"}</label>
              <textarea
                rows="4"
                value={skillForm.goal}
                onChange={(e) => updateForm("goal", e.target.value)}
                placeholder={
                  isArabic
                    ? "مثال: أريد تعلم بايثون لبناء مشاريع بسيطة"
                    : "Example: I want to learn Python to build small projects"
                }
              />
            </div>

            <button
              type="button"
              className="primary-button full-width"
              onClick={createPlan}
            >
              {isArabic ? "إنشاء خطة المهارة" : "Create Skill Plan"}
            </button>

            <button
              type="button"
              className="secondary-button full-width"
              onClick={clearSkillPlan}
            >
              {isArabic ? "مسح الخطة" : "Clear Plan"}
            </button>
          </form>
        </div>

        <div className="card interactive-card">
          <div className="card-header">
            <h2>{isArabic ? "خطة التعلم" : "Learning Plan"}</h2>
            <p>
              {isArabic
                ? "تابع المراحل واكتب ملاحظاتك لكل مرحلة."
                : "Track stages and write notes for each stage."}
            </p>
          </div>

          {plan.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">○</div>
              <h3>{isArabic ? "لا توجد خطة بعد" : "No skill plan generated"}</h3>
              <p>
                {isArabic
                  ? "أدخل بيانات المهارة ثم أنشئ الخطة."
                  : "Enter skill details, then create the plan."}
              </p>
            </div>
          ) : (
            <div className="skill-plan">
              <div className="progress-wrap">
                <div className="progress-info">
                  <span>{isArabic ? "نسبة الإنجاز" : "Completion"}</span>
                  <strong>{progress}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="stage-list">
                {plan.map((stage) => (
                  <div
                    className={`stage-card ${
                      stage.completed ? "stage-completed" : ""
                    }`}
                    key={stage.id}
                  >
                    <label className="stage-check">
                      <input
                        type="checkbox"
                        checked={stage.completed}
                        onChange={() => toggleStage(stage.id)}
                      />
                      <span />
                    </label>

                    <div className="stage-content">
                      <h3>{stage.title}</h3>
                      <p>{stage.task}</p>

                      <div className="stage-meta">
                        <span>
                          {stage.hours} {isArabic ? "ساعة" : "hours"}
                        </span>
                      </div>

                      <textarea
                        rows="3"
                        value={stage.notes}
                        onChange={(e) => updateNotes(stage.id, e.target.value)}
                        placeholder={
                          isArabic
                            ? "اكتب ماذا تعلمت في هذه المرحلة..."
                            : "Write what you learned in this stage..."
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              {progress === 100 && (
                <div className="final-summary">
                  <h3>{isArabic ? "الملخص النهائي" : "Final Summary"}</h3>
                  <pre>
                    {finalSummary ||
                      (isArabic
                        ? "لا توجد ملاحظات مكتوبة بعد."
                        : "No notes written yet.")}
                  </pre>

                  <div className="course-box">
                    <h3>
                      {isArabic
                        ? "دورات متقدمة مقترحة"
                        : "Suggested Advanced Courses"}
                    </h3>

                    <ul>
                      <li>
                        {isArabic
                          ? `دورة متقدمة في ${skillForm.skillName}`
                          : `Advanced ${skillForm.skillName} Course`}
                      </li>
                      <li>
                        {isArabic
                          ? `مشاريع عملية في ${skillForm.skillName}`
                          : `Practical Projects in ${skillForm.skillName}`}
                      </li>
                      <li>
                        {isArabic
                          ? `تطبيقات احترافية في ${skillForm.skillName}`
                          : `Professional Applications of ${skillForm.skillName}`}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default SkillPlanner;