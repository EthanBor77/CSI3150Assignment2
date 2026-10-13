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

'''text
index.html

<header class="portal-header"> (CSS: display: flex; justify-content: space-between; align-items: center;) [STATIC]
  <h1> (Text: "AgroSense Greenhouse Telemetry Portal") [STATIC]
  <nav class="portal-nav"> (CSS: display: flex; gap: 1rem;) [STATIC]
    <a href="#input-section">Sensor Entry</a> [STATIC]
    <a href="#log-section">Telemetry Logs</a> [STATIC]
'''
  <p> (Text: "AgroSense Systems - Field Operations Unit") [STATIC]
'''
