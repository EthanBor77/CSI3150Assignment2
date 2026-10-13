# CSI3150Assignment2

## The User Journey Funnel

Start state: When opening the page the user will see an empty table for data entry.

Action 1 Data Entry & Constraint Check: The user types in sensor values (pH, EC, Temp, RH) and HTML/JS will force constraints on the variabls like min/max.

Action 2 Log Submission: When the user clicks the submit button the page will save the given data?

Action 3 Output Telemetry Inspection: The UI updates to show the newly added log with its status tag ("Optimal", "Warning", or "Critical Hazard").

Action 4 Output Resolution: After submitting the data the logs will reset back to being empty or be filled with their default placeholders.

Terminal State: After completing the page will return to a ready state similar to the start state.

## Don Norman Usability & Constraint Audit

Gulf of Execution: For each input field users are given placeholder texts giving example data that fits the criteria. Then after the input will be an abreviation of what unit of measurement is expected in that field.

Gulf of Evaluation: After clicking submit JavaScript will run logic checks on each of the input fields to make sure they are valid inputs. The UI will then update it's colors based on whether the input was accepted (Green = Normal, Yellow = Warning, or Red = Hazard)

System Constraint: For each input field it will be specified using HTML attributes their respective type, min, max, step, and required/optional

Visual Feedback State: Before submitting JavaScript event listeners will monitor input fields for any out of bounds inputs and will preesent a visual warning to that field by toggling and error border.

Error Recovery: Next to the submit button there will be a clear button that will clear the inputs from all the fields in the form.

## Component, DOM Tree & Event Target Architecture

```text
index.html

<header class="portal-header"> (CSS: display: flex; justify-content: space-between; align-items: center;) [STATIC]
  <h1> (Text: "AgroSense Greenhouse Telemetry Portal") [STATIC]
  <nav class="portal-nav"> (CSS: display: flex; gap: 1rem;) [STATIC]
    <a href="#input-section">Sensor Entry</a> [STATIC]
    <a href="#log-section">Telemetry Logs</a> [STATIC]

<main class="portal-main"> (CSS: display: flex; flex-direction: column; gap: 2rem;) [STATIC]
  <section id="input-section" class="input-panel"> (CSS: display: flex; flex-direction: column;) [STATIC]
    <header class="panel-header"> [STATIC]
      <h2> (Text: "Record Bay Telemetry") [STATIC]
    <form id="sensor-form"> (CSS: display: grid; grid-template-columns: 1fr 1fr;) [STATIC] (Event: submit)
      <div class="input-group"> (CSS: display: flex; flex-direction: column;) [STATIC]
        <label for="bay-input">Bay Identifier</label> [STATIC]
        <input id="bay-input" type="text" placeholder="e.g., Bay-01" required> [STATIC]
      <div class="input-group"> (CSS: display: flex; flex-direction: column;) [STATIC]
        <label for="ph-input">pH Level (0 - 14)</label> [STATIC]
        <input id="ph-input" type="number" min="0" max="14" step="0.1" required> [STATIC] (Event: input)
      <div class="input-group"> (CSS: display: flex; flex-direction: column;) [STATIC]
        <label for="ec-input">Electrical Conductivity (mS/cm)</label> [STATIC]
        <input id="ec-input" type="number" min="0" max="10" step="0.1" required> [STATIC] (Event: input)
      <div class="input-group"> (CSS: display: flex; flex-direction: column;) [STATIC]
        <label for="temp-input">Air Temperature (F)</label> [STATIC]
        <input id="temp-input" type="number" min="32" max="120" step="0.1" required> [STATIC] (Event: input)
      <div class="input-group"> (CSS: display: flex; flex-direction: column;) [STATIC]
        <label for="rh-input">Relative Humidity (%)</label> [STATIC]
        <input id="rh-input" type="number" min="0" max="100" step="1" required> [STATIC] (Event: input)
      <button id="btn-submit" type="submit">Record Reading</button> [STATIC] (Event: click)
  <section id="log-section" class="output-panel"> (CSS: display: flex; flex-direction: column;) [STATIC]
    <header class="output-header"> (CSS: display: flex; justify-content: space-between;) [STATIC]
      <h2> (Text: "Active Telemetry Logs") [STATIC]
      <button id="btn-purge-all" class="danger-btn">Purge Queue</button> [STATIC] (Event: click)
    <div id="log-container" class="log-queue"> (CSS: display: flex; flex-direction: column; gap: 1rem;) [DYNAMIC]
      <article class="log-card"> (CSS: display: flex; justify-content: space-between; border-left: 5px solid green;) [DYNAMIC]
        <div class="log-details"> [STATIC]
          <h3> (Text: "Bay-01 | Optimal") [DYNAMIC]
          <p> (Text: "pH: 6.2 | EC: 1.5 mS/cm | Temp: 68F | RH: 60%") [DYNAMIC]
        <button class="btn-delete-log">Delete</button> [DYNAMIC] (Event: click)

<footer class="portal-footer"> (CSS: display: flex; justify-content: center; padding: 1rem;) [STATIC]
  <p> (Text: "AgroSense Systems - Field Operations Unit") [STATIC]
```

## Data Schema

```text
const greenhouseLogSchema = {
  id: "String",             // Unique identifier
  bayName: "String",        // Greenhouse bay identifier (like "Bay-01")
  ph: "Number",             // Water pH (must be from 0 to 14)
  ec: "Number",             // Electrical Conductivity (mS/cm)
  temperature: "Number",    // Air Temperature (Celsius)
  humidity: "Number",       // Relative Humidity percentage (0 to 100)
  status: "String",         // Calculated environmental status: "Optimal", "Warning", or "Critical Hazard"
  timestamp: "String"       // Formatted date and time when the reading was recorded (YYYY-MM-DD HH:MM:SS)
};
```
