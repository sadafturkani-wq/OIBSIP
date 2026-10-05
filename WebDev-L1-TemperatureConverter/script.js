/* =============================================================
   ThermoNova — Temperature Converter
   Vanilla JavaScript logic
   ============================================================= */

(function () {
  "use strict";

  /* ---------- Absolute-zero limits per unit ---------- */
  const ABSOLUTE_ZERO = {
    celsius: -273.15,
    fahrenheit: -459.67,
    kelvin: 0,
  };

  /* ---------- DOM references ---------- */
  const form = document.getElementById("converterForm");
  const tempInput = document.getElementById("tempInput");
  const unitSelect = document.getElementById("unitSelect");
  const convertBtn = document.getElementById("convertBtn");
  const clearBtn = document.getElementById("clearBtn");
  const errorArea = document.getElementById("errorArea");
  const results = document.getElementById("results");
  const resultCelsius = document.getElementById("resultCelsius");
  const resultFahrenheit = document.getElementById("resultFahrenheit");
  const resultKelvin = document.getElementById("resultKelvin");
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  /* ---------- Conversion formulas ---------- */
  // Every formula converts FROM a given unit TO Celsius first, then we
  // branch out to the other two scales from Celsius as the common base.

  // Convert a value in the chosen unit -> Celsius
  function toCelsius(value, unit) {
    if (unit === "celsius") return value;
    if (unit === "fahrenheit") return (value - 32) * (5 / 9);
    if (unit === "kelvin") return value - 273.15;
    return NaN;
  }

  // Convert Celsius -> Fahrenheit
  function celsiusToFahrenheit(c) {
    return c * (9 / 5) + 32;
  }

  // Convert Celsius -> Kelvin
  function celsiusToKelvin(c) {
    return c + 273.15;
  }

  /* ---------- Number formatting ---------- */
  // Round to 2 decimals but drop unnecessary trailing zeros.
  function formatNumber(num) {
    return parseFloat(num.toFixed(2)).toString();
  }

  /* ---------- Error handling ---------- */
  function showError(message) {
    errorArea.textContent = message;
    errorArea.classList.add("has-error");
  }

  function clearError() {
    errorArea.textContent = "";
    errorArea.classList.remove("has-error");
  }

  /* ---------- Results rendering ---------- */
  function showResults(c, f, k) {
    resultCelsius.textContent = formatNumber(c) + " °C";
    resultFahrenheit.textContent = formatNumber(f) + " °F";
    resultKelvin.textContent = formatNumber(k) + " K";

    // Mark cards as active so the pop-in animation and styling apply.
    const cards = results.querySelectorAll(".result-card");
    cards.forEach(function (card) {
      card.classList.remove("active");
      // Force reflow to restart the CSS animation on repeat conversions.
      void card.offsetWidth;
      card.classList.add("active");
    });
  }

  function clearResults() {
    resultCelsius.textContent = "—";
    resultFahrenheit.textContent = "—";
    resultKelvin.textContent = "—";
    results
      .querySelectorAll(".result-card")
      .forEach(function (card) {
        card.classList.remove("active");
      });
  }

  /* ---------- Validation ---------- */
  function validateInput(rawValue, unit) {
    // Empty input check
    if (rawValue === "" || rawValue === null) {
      return "Please enter a temperature value to convert.";
    }

    // Numeric check
    const number = Number(rawValue);
    if (Number.isNaN(number)) {
      return "That doesn't look like a valid number. Please enter a numeric value.";
    }

    // Absolute-zero check based on selected unit
    const limit = ABSOLUTE_ZERO[unit];
    const unitLabel = {
      celsius: "°C",
      fahrenheit: "°F",
      kelvin: "K",
    }[unit];

    if (number < limit) {
      return (
        "That temperature is below absolute zero (" +
        limit +
        unitLabel +
        "). Temperatures cannot go lower than this."
      );
    }

    return null;
  }

  /* ---------- Main conversion flow ---------- */
  function handleConvert(event) {
    event.preventDefault();
    clearError();

    const rawValue = tempInput.value.trim();
    const unit = unitSelect.value;

    const validationError = validateInput(rawValue, unit);
    if (validationError) {
      showError(validationError);
      clearResults();
      return;
    }

    const value = Number(rawValue);
    const celsius = toCelsius(value, unit);
    const fahrenheit = celsiusToFahrenheit(celsius);
    const kelvin = celsiusToKelvin(celsius);

    showResults(celsius, fahrenheit, kelvin);
  }

  /* ---------- Reset / clear ---------- */
  function handleClear() {
    tempInput.value = "";
    unitSelect.value = "celsius";
    clearError();
    clearResults();
    tempInput.focus();
  }

  /* ---------- Mobile navigation ---------- */
  function toggleNav() {
    const isOpen = primaryNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  // Close the mobile menu after clicking a link.
  function closeNavOnLinkClick() {
    if (primaryNav.classList.contains("open")) {
      primaryNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  }

  /* ---------- Event wiring ---------- */
  form.addEventListener("submit", handleConvert);
  clearBtn.addEventListener("click", handleClear);
  navToggle.addEventListener("click", toggleNav);
  primaryNav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      closeNavOnLinkClick();
    }
  });

  // Clear any error as soon as the user starts correcting the input.
  tempInput.addEventListener("input", function () {
    if (errorArea.classList.contains("has-error")) {
      clearError();
    }
  });
})();
