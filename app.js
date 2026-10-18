(function () {
  const STORAGE_KEY = "agrosens_telemetry_records_v1";

  const form = document.getElementById("sensor-form");
  const errorBanner = document.getElementById("error-banner");
  const logContainer = document.getElementById("log-container");
  const purgeButton = document.getElementById("btn-purge-all");

  const numberFields = [
    { id: "ph-input", name: "pH", min: 0, max: 14 },
    { id: "ec-input", name: "EC", min: 0, max: 10 },
    { id: "temp-input", name: "Temperature", min: 32, max: 120 },
    { id: "rh-input", name: "Humidity", min: 0, max: 100 },
  ];

  let records = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  function saveRecords() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }

  function getStatus(ph, ec, temp, rh) {
    const phCritical = ph < 5.0 || ph > 7.5;
    const tempCritical = temp < 55 || temp > 95;
    const ecCritical = ec < 0.2 || ec > 4.5;
    const rhCritical = rh < 30 || rh > 90;

    if (phCritical && tempCritical && ecCritical && rhCritical) {
      return "Critical Hazard";
    }

    const phOptimal = ph >= 5.5 && ph <= 6.5;
    const tempOptimal = temp >= 64.4 && temp <= 71.6;
    const ecOptimal = ec >= 1.0 && ec <= 2.0;
    const rhOptimal = rh >= 50 && rh <= 70;

    if (phOptimal && tempOptimal && ecOptimal && rhOptimal) {
      return "Optimal";
    }

    return "Warning";
  }

  function checkForm(isSubmit) {
    const errors = [];

    const allInputs = form.querySelectorAll("input");
    allInputs.forEach(function (input) {
      input.classList.remove("is-invalid");
    });

    const bayInput = document.getElementById("bay-input");
    if (bayInput.value.trim() === "" && isSubmit) {
      errors.push("Bay Identifier is required.");
      bayInput.classList.add("is-invalid");
    }

    numberFields.forEach(function (field) {
      const input = document.getElementById(field.id);
      const range = field.min + " to " + field.max;

      if (input.value === "") {
        if (isSubmit || input.validity.badInput) {
          errors.push(field.name + " must be a number from " + range + ".");
          input.classList.add("is-invalid");
        }
      } else {
        const number = Number(input.value);
        if (number < field.min || number > field.max) {
          errors.push(
            field.name +
              " must be from " +
              range +
              " (you entered " +
              number +
              ").",
          );
          input.classList.add("is-invalid");
        }
      }
    });

    if (errors.length > 0) {
      errorBanner.innerHTML = "";
      errors.forEach(function (message) {
        const p = document.createElement("p");
        p.textContent = message;
        errorBanner.appendChild(p);
      });
      errorBanner.hidden = false;
    } else {
      errorBanner.hidden = true;
    }

    return errors;
  }

  function showLogs() {
    logContainer.innerHTML = "";

    if (records.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent =
        "No readings yet. Record a bay reading above to see it here.";
      logContainer.appendChild(empty);
      purgeButton.disabled = true;
      return;
    }

    purgeButton.disabled = false;

    records.forEach(function (record) {
      const card = document.createElement("article");
      card.className = "log-card";
      card.dataset.id = record.id;

      if (record.status === "Optimal") {
        card.classList.add("status-optimal");
      } else if (record.status === "Warning") {
        card.classList.add("status-warning");
      } else {
        card.classList.add("status-critical");
      }

      const details = document.createElement("div");
      details.className = "log-details";

      const title = document.createElement("h3");
      title.textContent = record.bayName + " | " + record.status;

      const readings = document.createElement("p");
      readings.textContent =
        "pH: " +
        record.ph +
        " | EC: " +
        record.ec +
        " mS/cm" +
        " | Temp: " +
        record.temperature +
        "F" +
        " | RH: " +
        record.humidity +
        "%";

      const time = document.createElement("p");
      time.className = "log-time";
      time.textContent = record.timestamp;

      details.appendChild(title);
      details.appendChild(readings);
      details.appendChild(time);

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn-delete-log";
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";

      card.appendChild(details);
      card.appendChild(deleteButton);
      logContainer.appendChild(card);
    });
  }

  function getTimestamp() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return (
      now.getFullYear() +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }

  form.addEventListener("input", function () {
    checkForm(false);
  });

  form.addEventListener("reset", function () {
    errorBanner.hidden = true;
    form.querySelectorAll("input").forEach(function (input) {
      input.classList.remove("is-invalid");
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const errors = checkForm(true);
    if (errors.length > 0) {
      return;
    }

    const ph = Number(document.getElementById("ph-input").value);
    const ec = Number(document.getElementById("ec-input").value);
    const temp = Number(document.getElementById("temp-input").value);
    const rh = Number(document.getElementById("rh-input").value);

    const newRecord = {
      id: String(Date.now()),
      bayName: document.getElementById("bay-input").value.trim(),
      ph: ph,
      ec: ec,
      temperature: temp,
      humidity: rh,
      status: getStatus(ph, ec, temp, rh),
      timestamp: getTimestamp(),
    };

    records.unshift(newRecord);
    saveRecords();
    showLogs();
    form.reset();
  });

  logContainer.addEventListener("click", function (event) {
    if (event.target.className === "btn-delete-log") {
      const card = event.target.closest(".log-card");
      records = records.filter(function (record) {
        return record.id !== card.dataset.id;
      });
      saveRecords();
      showLogs();
    }
  });

  purgeButton.addEventListener("click", function () {
    if (confirm("Delete all readings?")) {
      records = [];
      saveRecords();
      showLogs();
    }
  });

  showLogs();
})();
