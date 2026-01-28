// Простой калькулятор нормы калорий и воды

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calc-form");
  const resultBlock = document.getElementById("result");
  const caloriesEl = document.getElementById("calories");
  const bjuEl = document.getElementById("bju");
  const waterEl = document.getElementById("water");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const age = Number(document.getElementById("age").value);
    const weight = Number(document.getElementById("weight").value);
    const height = Number(document.getElementById("height").value);
    const activity = Number(document.getElementById("activity").value);
    const genderInput = form.querySelector("input[name='gender']:checked");
    const gender = genderInput ? genderInput.value : "male";

    // Простая проверка ввода
    if (!age || !weight || !height || !activity) {
      alert("Пожалуйста, заполните все поля корректно (только числа).");
      return;
    }

    // Формула Миффлина — Сан Жеора
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const totalCalories = bmr * activity;

    // Разделение калорий по БЖУ (пример: Б 15%, Ж 30%, У 55%)
    const proteinKcal = totalCalories * 0.15;
    const fatKcal = totalCalories * 0.30;
    const carbKcal = totalCalories * 0.55;

    const proteinGrams = proteinKcal / 4; // 1 г белка = 4 ккал
    const fatGrams = fatKcal / 9; // 1 г жиров = 9 ккал
    const carbGrams = carbKcal / 4; // 1 г углеводов = 4 ккал

    // Вода: 35 мл на 1 кг веса
    const waterLiters = (weight * 0.035);

    // Округляем
    const caloriesRounded = Math.round(totalCalories);
    const proteinRounded = Math.round(proteinGrams);
    const fatRounded = Math.round(fatGrams);
    const carbRounded = Math.round(carbGrams);
    const waterRounded = waterLiters.toFixed(1);

    // Вывод результата
    caloriesEl.textContent = `🔥 Калории: около ${caloriesRounded} ккал в день`;
    bjuEl.textContent =
      `🥩 Белки: ~${proteinRounded} г, 🥑 жиры: ~${fatRounded} г, 🍚 углеводы: ~${carbRounded} г в день`;
    waterEl.textContent = `💧 Вода: примерно ${waterRounded} л (около ${Math.round(waterLiters / 0.25)} стаканов по 250 мл)`;

    resultBlock.classList.remove("hidden");
    resultBlock.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

