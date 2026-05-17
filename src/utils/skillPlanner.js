export function generateSkillPlan({
  skillName,
  level,
  goal,
  weeks,
  hoursPerWeek,
  language = "en",
}) {
  if (!skillName || !level || !goal || !weeks || !hoursPerWeek) {
    return null;
  }

  const totalHours = Number(weeks) * Number(hoursPerWeek);

  if (totalHours <= 0) {
    return null;
  }

  const isArabic = language === "ar";

  const stages = [
    {
      title: isArabic ? "المرحلة 1: الأساسيات" : "Stage 1: Basics",
      task: isArabic
        ? `تعلم المفاهيم الأساسية في ${skillName}`
        : `Learn the basic concepts of ${skillName}`,
      hours: Math.max(1, Math.round(totalHours * 0.25)),
    },
    {
      title: isArabic ? "المرحلة 2: التطبيق العملي" : "Stage 2: Practice",
      task: isArabic
        ? `حل تمارين وتطبيقات عملية على ${skillName}`
        : `Solve practical exercises and applications in ${skillName}`,
      hours: Math.max(1, Math.round(totalHours * 0.3)),
    },
    {
      title: isArabic ? "المرحلة 3: مشروع صغير" : "Stage 3: Mini Project",
      task: isArabic
        ? `بناء مشروع صغير باستخدام ${skillName}`
        : `Build a small project using ${skillName}`,
      hours: Math.max(1, Math.round(totalHours * 0.3)),
    },
    {
      title: isArabic ? "المرحلة 4: المراجعة والتلخيص" : "Stage 4: Review",
      task: isArabic
        ? "مراجعة ما تم تعلمه وكتابة الملاحظات النهائية"
        : "Review what was learned and write final notes",
      hours: Math.max(1, Math.round(totalHours * 0.15)),
    },
  ];

  return stages.map((stage, index) => ({
    id: index + 1,
    ...stage,
    completed: false,
    notes: "",
  }));
}