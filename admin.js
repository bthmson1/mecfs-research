/* =========================================================
   ME/CFS RESEARCH ADMIN DASHBOARD

   Handles:
   - Administrator login
   - Private questionnaire retrieval
   - Dashboard filters
   - Summary statistics
   - Charts
   - Individual participant responses
   - Participant group comparisons

   IMPORTANT:
   All diagnostic information in this dashboard
   represents PARTICIPANT-REPORTED status.
   The website does not diagnose ME/CFS.
========================================================= */


/* =========================================================
   PAGE ELEMENTS
========================================================= */

const adminLogin =
    document.getElementById("adminLogin");

const adminDashboard =
    document.getElementById("adminDashboard");

const adminLoginForm =
    document.getElementById("adminLoginForm");

const adminLoginButton =
    document.getElementById("adminLoginButton");

const adminStatus =
    document.getElementById("adminStatus");


const logoutButton =
    document.getElementById("adminLogout");

const refreshButton =
    document.getElementById("refreshDashboard");


const tableBody =
    document.getElementById("responsesTableBody");

const responseCount =
    document.getElementById("responseCount");

const emptyResponses =
    document.getElementById("emptyResponses");


/* =========================================================
   SUMMARY CARDS
========================================================= */

const statTotal =
    document.getElementById("statTotal");

const statDiagnosed =
    document.getElementById("statDiagnosed");

const statPots =
    document.getElementById("statPots");

const statSeverity =
    document.getElementById("statSeverity");

const statBaseline =
    document.getElementById("statBaseline");

const filterSummary =
    document.getElementById("filterSummary");


/* =========================================================
   DASHBOARD FILTERS
========================================================= */

const diagnosisFilter =
    document.getElementById("diagnosisFilter");

const pemOnsetFilter =
    document.getElementById("pemOnsetFilter");

const potsFilter =
    document.getElementById("potsFilter");

const participantSearch =
    document.getElementById("participantSearch");

const clearFiltersButton =
    document.getElementById("clearFilters");


/* =========================================================
   PARTICIPANT DIALOG
========================================================= */

const participantDialog =
    document.getElementById("participantDialog");

const closeParticipantDialog =
    document.getElementById(
        "closeParticipantDialog"
    );

const dialogParticipantCode =
    document.getElementById(
        "dialogParticipantCode"
    );

const participantDetailContent =
    document.getElementById(
        "participantDetailContent"
    );


/* =========================================================
   COMPARISON ENGINE ELEMENTS
========================================================= */

const groupAType =
    document.getElementById("groupAType");

const groupBType =
    document.getElementById("groupBType");

const comparisonOutcome =
    document.getElementById("comparisonOutcome");

const runComparisonButton =
    document.getElementById("runComparison");


const groupACount =
    document.getElementById("groupACount");

const groupBCount =
    document.getElementById("groupBCount");


const comparisonResultTitle =
    document.getElementById(
        "comparisonResultTitle"
    );

const comparisonAName =
    document.getElementById(
        "comparisonAName"
    );

const comparisonBName =
    document.getElementById(
        "comparisonBName"
    );

const comparisonATotal =
    document.getElementById(
        "comparisonATotal"
    );

const comparisonBTotal =
    document.getElementById(
        "comparisonBTotal"
    );

const comparisonASeverity =
    document.getElementById(
        "comparisonASeverity"
    );

const comparisonBSeverity =
    document.getElementById(
        "comparisonBSeverity"
    );

const comparisonAPots =
    document.getElementById(
        "comparisonAPots"
    );

const comparisonBPots =
    document.getElementById(
        "comparisonBPots"
    );


const comparisonChartHeading =
    document.getElementById(
        "comparisonChartHeading"
    );

const comparisonChartDescription =
    document.getElementById(
        "comparisonChartDescription"
    );


const comparisonTableAHeading =
    document.getElementById(
        "comparisonTableAHeading"
    );

const comparisonTableBHeading =
    document.getElementById(
        "comparisonTableBHeading"
    );

const comparisonTableBody =
    document.getElementById(
        "comparisonTableBody"
    );


/* =========================================================
   DATA STORAGE
========================================================= */

let allResponses = [];

let filteredResponses = [];


/* =========================================================
   CHART STORAGE
========================================================= */

let pemOnsetChart = null;

let severityChart = null;

let symptomChart = null;

let comparisonChart = null;



/* =========================================================
   DISPLAY LABELS
========================================================= */

const diagnosticLabels = {

    formally_diagnosed:
        "Professional ME/CFS diagnosis reported",

    suspected_professional:
        "ME/CFS suspected by healthcare professional",

    being_evaluated:
        "Currently being evaluated",

    self_suspected:
        "Self-suspected ME/CFS",

    uncertain:
        "Uncertain diagnostic status"

};


const onsetLabels = {

    during:
        "During activity",

    immediately_after:
        "Immediately afterward",

    few_hours:
        "Within a few hours",

    "6_12_hours":
        "6–12 hours later",

    "12_24_hours":
        "12–24 hours later",

    "24_48_hours":
        "24–48 hours later",

    over_48_hours:
        "More than 48 hours later",

    varies:
        "Timing varies"

};


const onsetTypeLabels = {

    sudden:
        "Sudden",

    gradual:
        "Gradual",

    uncertain:
        "Uncertain"

};


const baselineLabels = {

    yes:
        "Yes",

    usually:
        "Usually",

    sometimes:
        "Sometimes",

    no:
        "No",

    unsure:
        "Unsure"

};


const pemStatusLabels = {

    yes:
        "Yes",

    no:
        "No",

    unsure:
        "Unsure"

};


/* =========================================================
   GROUP LABELS
========================================================= */

const comparisonGroupLabels = {

    diagnosed:
        "Professional ME/CFS diagnosis reported",

    suspected_professional:
        "ME/CFS suspected by healthcare professional",

    being_evaluated:
        "Currently being evaluated",

    self_suspected:
        "Self-suspected ME/CFS",

    uncertain:
        "Uncertain diagnostic status",

    pots:
        "Professional POTS diagnosis reported",

    no_pots:
        "Professional POTS diagnosis not reported",

    pem_during:
        "PEM begins during activity",

    pem_delayed:
        "PEM begins after activity",

    physical_trigger:
        "Physical exertion reported as a trigger",

    cognitive_trigger:
        "Cognitive exertion reported as a trigger",

    gradual_onset:
        "Gradual illness onset",

    sudden_onset:
        "Sudden illness onset"

};


/* =========================================================
   SYMPTOM LABELS
========================================================= */

const symptomLabels = {

    /* AUTONOMIC */

    pots:
        "Professional POTS diagnosis reported",

    dizziness:
        "Dizziness",

    heart_rate_changes:
        "Heart-rate changes",

    fainting:
        "Fainting or near-fainting",

    palpitations:
        "Palpitations",

    sweating:
        "Sweating changes",

    temperature:
        "Temperature regulation problems",


    /* PHYSICAL */

    weakness:
        "Weakness",

    muscle_heaviness:
        "Muscle or limb heaviness",

    pain:
        "Pain",

    shakiness:
        "Shakiness",

    breathlessness:
        "Breathlessness",

    walking_tolerance:
        "Limited walking tolerance",

    standing_tolerance:
        "Limited standing tolerance",


    /* COGNITIVE */

    memory:
        "Memory problems",

    concentration:
        "Concentration problems",

    processing_speed:
        "Slower processing speed",

    word_finding:
        "Word-finding difficulty",

    mental_endurance:
        "Limited mental endurance",


    /* SLEEP */

    long_sleep:
        "Long sleep duration",

    poor_quality:
        "Poor sleep quality",

    unrefreshing:
        "Unrefreshing sleep",

    changes_during_pem:
        "Sleep changes during PEM",


    /* OTHER */

    gastrointestinal:
        "GI problems",

    headaches:
        "Headaches",

    migraines:
        "Migraines",

    sensory:
        "Sensory problems"

};


/* =========================================================
   OBJECTIVE INFORMATION LABELS
========================================================= */

const objectiveLabels = {

    heart_rate:
        "Heart-rate data",

    steps:
        "Step-count data",

    sleep:
        "Sleep data",

    hrv:
        "HRV data",

    blood_pressure:
        "Blood-pressure data",

    lab_work:
        "Lab work",

    pots_testing:
        "POTS testing",

    sleep_study:
        "Sleep study",

    cpet:
        "CPET",

    other_testing:
        "Other testing"

};


/* =========================================================
   PEM TRIGGER LABELS
========================================================= */

const pemTriggerLabels = {

    physical:
        "Physical activity",

    cognitive:
        "Mental or cognitive activity",

    emotional:
        "Emotional exertion or stress",

    upright:
        "Standing or remaining upright"

};



/* =========================================================
   ADMIN LOGIN
========================================================= */

adminLoginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        adminStatus.textContent =
            "Signing in...";

        adminLoginButton.disabled = true;


        const email =
            document
                .getElementById("adminEmail")
                .value
                .trim();


        const password =
            document
                .getElementById("adminPassword")
                .value;


        const {
            data,
            error
        } =
            await window
                .supabaseClient
                .auth
                .signInWithPassword({

                    email: email,

                    password: password

                });


        if (error) {

            console.error(error);

            adminStatus.textContent =
                "Unable to sign in. Check your email and password.";

            adminLoginButton.disabled = false;

            return;

        }


        if (!data.user) {

            adminStatus.textContent =
                "Authentication failed.";

            adminLoginButton.disabled = false;

            return;

        }


        adminStatus.textContent = "";

        adminLoginButton.disabled = false;


        await showDashboard();

    }
);



/* =========================================================
   VERIFY CURRENT USER
========================================================= */

async function verifyCurrentUser() {

    const {
        data,
        error
    } =
        await window
            .supabaseClient
            .auth
            .getUser();


    if (
        error ||
        !data ||
        !data.user
    ) {

        return false;

    }


    return true;

}



/* =========================================================
   SHOW DASHBOARD
========================================================= */

async function showDashboard() {

    const authenticated =
        await verifyCurrentUser();


    if (!authenticated) {

        adminDashboard.hidden = true;

        adminLogin.hidden = false;

        return;

    }


    adminLogin.hidden = true;

    adminDashboard.hidden = false;


    await loadResponses();

}



/* =========================================================
   LOAD RESPONSES FROM SUPABASE
========================================================= */

async function loadResponses() {

    refreshButton.disabled = true;

    refreshButton.textContent =
        "Loading...";


    const {
        data,
        error
    } =
        await window
            .supabaseClient
            .from("questionnaire_responses")
            .select(`
                id,
                participant_code,
                submitted_at,
                diagnostic_status,
                onset_year,
                onset_type,
                possible_trigger,
                major_worsening_events,
                pem_status,
                pem_triggers,
                pem_onset,
                pem_severity,
                pem_duration,
                recovery_time,
                returns_to_baseline,
                autonomic_symptoms,
                physical_symptoms,
                cognitive_symptoms,
                sleep_symptoms,
                other_symptoms,
                objective_information,
                objective_notes,
                personal_description
            `)
            .order(
                "submitted_at",
                {
                    ascending: false
                }
            );


    refreshButton.disabled = false;

    refreshButton.textContent =
        "Refresh Data";


    if (error) {

        console.error(
            "Error loading responses:",
            error
        );


        responseCount.textContent =
            "Responses could not be loaded.";

        return;

    }


    allResponses =
        Array.isArray(data)
            ? data
            : [];


    applyFilters();

    updateComparisonCounts();

    runComparison();

}



/* =========================================================
   MAIN DASHBOARD FILTERS
========================================================= */

function applyFilters() {

    const diagnosis =
        diagnosisFilter.value;


    const pemOnset =
        pemOnsetFilter.value;


    const pots =
        potsFilter.value;


    const search =
        participantSearch
            .value
            .trim()
            .toUpperCase();


    filteredResponses =
        allResponses.filter(
            function (response) {


                /* DIAGNOSTIC STATUS */

                if (
                    diagnosis &&
                    response.diagnostic_status
                        !== diagnosis
                ) {

                    return false;

                }


                /* PEM ONSET */

                if (
                    pemOnset &&
                    response.pem_onset
                        !== pemOnset
                ) {

                    return false;

                }


                /* POTS */

                const hasPots =
                    participantReportsPots(
                        response
                    );


                if (
                    pots === "yes"
                    &&
                    !hasPots
                ) {

                    return false;

                }


                if (
                    pots === "no"
                    &&
                    hasPots
                ) {

                    return false;

                }


                /* PARTICIPANT CODE */

                if (
                    search &&
                    (
                        !response.participant_code
                        ||
                        !response
                            .participant_code
                            .toUpperCase()
                            .includes(search)
                    )
                ) {

                    return false;

                }


                return true;

            }
        );


    renderDashboard();

}



/* =========================================================
   FILTER EVENTS
========================================================= */

diagnosisFilter.addEventListener(
    "change",
    applyFilters
);


pemOnsetFilter.addEventListener(
    "change",
    applyFilters
);


potsFilter.addEventListener(
    "change",
    applyFilters
);


participantSearch.addEventListener(
    "input",
    applyFilters
);



/* =========================================================
   CLEAR MAIN FILTERS
========================================================= */

clearFiltersButton.addEventListener(
    "click",
    function () {

        diagnosisFilter.value = "";

        pemOnsetFilter.value = "";

        potsFilter.value = "";

        participantSearch.value = "";


        applyFilters();

    }
);



/* =========================================================
   RENDER COMPLETE DASHBOARD
========================================================= */

function renderDashboard() {

    renderSummary();

    updateFilterSummary();

    renderCharts();

    renderTable();

}



/* =========================================================
   SUMMARY STATISTICS
========================================================= */

function renderSummary() {

    const total =
        filteredResponses.length;


    /* PROFESSIONAL ME/CFS DIAGNOSIS REPORTED */

    const diagnosed =
        filteredResponses.filter(
            function (response) {

                return (
                    response.diagnostic_status
                    === "formally_diagnosed"
                );

            }
        ).length;


    /* PROFESSIONAL POTS DIAGNOSIS REPORTED */

    const pots =
        filteredResponses.filter(
            participantReportsPots
        ).length;


    /* PEM SEVERITY */

    const averageSeverity =
        calculateAverageSeverity(
            filteredResponses
        );


    /* NO RETURN TO BASELINE */

    const noBaseline =
        filteredResponses.filter(
            function (response) {

                return (
                    response.returns_to_baseline
                    === "no"
                );

            }
        ).length;


    statTotal.textContent =
        total;


    statDiagnosed.textContent =
        diagnosed;


    statPots.textContent =
        pots;


    statSeverity.textContent =
        averageSeverity;


    statBaseline.textContent =
        noBaseline;

}



/* =========================================================
   AVERAGE PEM SEVERITY
========================================================= */

function calculateAverageSeverity(
    responses
) {

    const values =
        responses

            .map(
                function (response) {

                    return Number(
                        response.pem_severity
                    );

                }
            )

            .filter(
                function (severity) {

                    return (
                        Number.isFinite(severity)
                        &&
                        severity >= 1
                        &&
                        severity <= 5
                    );

                }
            );


    if (values.length === 0) {

        return "—";

    }


    const total =
        values.reduce(
            function (
                sum,
                value
            ) {

                return sum + value;

            },
            0
        );


    return (
        total / values.length
    ).toFixed(1);

}



/* =========================================================
   FILTER SUMMARY
========================================================= */

function updateFilterSummary() {

    const activeFilters = [];


    if (diagnosisFilter.value) {

        activeFilters.push(
            diagnosticLabels[
                diagnosisFilter.value
            ]
        );

    }


    if (pemOnsetFilter.value) {

        activeFilters.push(
            onsetLabels[
                pemOnsetFilter.value
            ]
        );

    }


    if (potsFilter.value === "yes") {

        activeFilters.push(
            "Professional POTS diagnosis reported"
        );

    }


    if (potsFilter.value === "no") {

        activeFilters.push(
            "Professional POTS diagnosis not reported"
        );

    }


    if (
        participantSearch
            .value
            .trim()
    ) {

        activeFilters.push(
            `Participant ${
                participantSearch
                    .value
                    .trim()
            }`
        );

    }


    if (
        activeFilters.length === 0
    ) {

        filterSummary.textContent =
            "Showing all responses";

        return;

    }


    filterSummary.textContent =
        activeFilters.join(" • ");

}



/* =========================================================
   CHECK WHETHER PARTICIPANT REPORTED POTS DIAGNOSIS
========================================================= */

function participantReportsPots(
    response
) {

    return (
        Array.isArray(
            response.autonomic_symptoms
        )
        &&
        response
            .autonomic_symptoms
            .includes("pots")
    );

}



/* =========================================================
   PEM ONSET COUNTS
========================================================= */

function getPemOnsetCounts(
    responses
) {

    const onsetOrder = [

        "during",

        "immediately_after",

        "few_hours",

        "6_12_hours",

        "12_24_hours",

        "24_48_hours",

        "over_48_hours",

        "varies"

    ];


    return onsetOrder.map(
        function (onset) {

            return responses.filter(
                function (response) {

                    return (
                        response.pem_onset
                        === onset
                    );

                }
            ).length;

        }
    );

}



/* =========================================================
   PEM ONSET CHART
========================================================= */

function renderPemOnsetChart() {

    const canvas =
        document.getElementById(
            "pemOnsetChart"
        );


    if (!canvas) {

        return;

    }


    if (pemOnsetChart) {

        pemOnsetChart.destroy();

    }


    pemOnsetChart =
        new Chart(
            canvas,
            {

                type: "bar",


                data: {

                    labels: [

                        "During activity",

                        "Immediately after",

                        "Within a few hours",

                        "6–12 hours",

                        "12–24 hours",

                        "24–48 hours",

                        "More than 48 hours",

                        "Timing varies"

                    ],


                    datasets: [

                        {

                            label:
                                "Responses",

                            data:
                                getPemOnsetCounts(
                                    filteredResponses
                                ),

                            borderWidth: 1,

                            borderRadius: 6

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,


                    plugins: {

                        legend: {

                            display: false

                        }

                    },


                    scales: {

                        y: {

                            beginAtZero: true,

                            ticks: {

                                precision: 0

                            }

                        }

                    }

                }

            }
        );

}



/* =========================================================
   PEM SEVERITY COUNTS
========================================================= */

function getSeverityCounts(
    responses
) {

    return [1, 2, 3, 4, 5].map(
        function (severity) {

            return responses.filter(
                function (response) {

                    return (
                        Number(
                            response.pem_severity
                        )
                        === severity
                    );

                }
            ).length;

        }
    );

}



/* =========================================================
   PEM SEVERITY CHART
========================================================= */

function renderSeverityChart() {

    const canvas =
        document.getElementById(
            "severityChart"
        );


    if (!canvas) {

        return;

    }


    if (severityChart) {

        severityChart.destroy();

    }


    severityChart =
        new Chart(
            canvas,
            {

                type: "bar",


                data: {

                    labels: [

                        "1 — Mild",

                        "2",

                        "3 — Moderate",

                        "4",

                        "5 — Severe"

                    ],


                    datasets: [

                        {

                            label:
                                "Responses",

                            data:
                                getSeverityCounts(
                                    filteredResponses
                                ),

                            borderWidth: 1,

                            borderRadius: 6

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,


                    plugins: {

                        legend: {

                            display: false

                        }

                    },


                    scales: {

                        y: {

                            beginAtZero: true,

                            ticks: {

                                precision: 0

                            }

                        }

                    }

                }

            }
        );

}



/* =========================================================
   COUNT STRUCTURED SYMPTOMS
========================================================= */

function getSymptomCounts(
    responses
) {

    const counts = {};


    const symptomGroups = [

        "autonomic_symptoms",

        "physical_symptoms",

        "cognitive_symptoms",

        "sleep_symptoms",

        "other_symptoms"

    ];


    responses.forEach(
        function (response) {


            symptomGroups.forEach(
                function (group) {


                    const symptoms =
                        response[group];


                    if (
                        !Array.isArray(symptoms)
                    ) {

                        return;

                    }


                    symptoms.forEach(
                        function (symptom) {


                            if (
                                !counts[symptom]
                            ) {

                                counts[symptom] = 0;

                            }


                            counts[symptom] += 1;

                        }
                    );

                }
            );

        }
    );


    return Object
        .entries(counts)

        .sort(
            function (a, b) {

                return b[1] - a[1];

            }
        );

}



/* =========================================================
   MAIN SYMPTOM CHART
========================================================= */

function renderSymptomChart() {

    const canvas =
        document.getElementById(
            "symptomChart"
        );


    if (!canvas) {

        return;

    }


    const symptomCounts =
        getSymptomCounts(
            filteredResponses
        )
        .slice(0, 12);


    const labels =
        symptomCounts.map(
            function (item) {

                return (
                    symptomLabels[item[0]]
                    ||
                    item[0]
                );

            }
        );


    const values =
        symptomCounts.map(
            function (item) {

                return item[1];

            }
        );


    if (symptomChart) {

        symptomChart.destroy();

    }


    symptomChart =
        new Chart(
            canvas,
            {

                type: "bar",


                data: {

                    labels: labels,


                    datasets: [

                        {

                            label:
                                "Participants",

                            data:
                                values,

                            borderWidth: 1,

                            borderRadius: 5

                        }

                    ]

                },


                options: {

                    indexAxis: "y",

                    responsive: true,

                    maintainAspectRatio: false,


                    plugins: {

                        legend: {

                            display: false

                        }

                    },


                    scales: {

                        x: {

                            beginAtZero: true,

                            ticks: {

                                precision: 0

                            }

                        }

                    }

                }

            }
        );

}



/* =========================================================
   RENDER MAIN CHARTS
========================================================= */

function renderCharts() {

    renderPemOnsetChart();

    renderSeverityChart();

    renderSymptomChart();

}



/* =========================================================
   PARTICIPANT TABLE
========================================================= */

function renderTable() {

    tableBody.textContent = "";


    const total =
        filteredResponses.length;


    responseCount.textContent =
        `${total} ${
            total === 1
                ? "response"
                : "responses"
        }`;


    if (total === 0) {

        emptyResponses.hidden = false;

        return;

    }


    emptyResponses.hidden = true;


    filteredResponses.forEach(
        function (response) {


            const row =
                document.createElement("tr");


            addTableCell(
                row,
                response.participant_code
                ||
                "—"
            );


            addTableCell(
                row,
                formatDate(
                    response.submitted_at
                )
            );


            addTableCell(
                row,
                diagnosticLabels[
                    response.diagnostic_status
                ]
                ||
                "—"
            );


            addTableCell(
                row,
                onsetLabels[
                    response.pem_onset
                ]
                ||
                "—"
            );


            addTableCell(
                row,
                response.pem_severity
                ??
                "—"
            );


            addTableCell(
                row,
                participantReportsPots(
                    response
                )
                    ? "Reported"
                    : "Not reported"
            );


            const actionCell =
                document.createElement("td");


            const viewButton =
                document.createElement(
                    "button"
                );


            viewButton.type =
                "button";


            viewButton.className =
                "view-response-button";


            viewButton.textContent =
                "View";


            viewButton.setAttribute(
                "aria-label",
                `View full response for ${
                    response.participant_code
                    ||
                    "participant"
                }`
            );


            viewButton.addEventListener(
                "click",
                function () {

                    openParticipant(
                        response
                    );

                }
            );


            actionCell.appendChild(
                viewButton
            );


            row.appendChild(
                actionCell
            );


            tableBody.appendChild(
                row
            );

        }
    );

}



/* =========================================================
   TABLE CELL HELPER
========================================================= */

function addTableCell(
    row,
    value
) {

    const cell =
        document.createElement("td");


    cell.textContent =
        value ?? "—";


    row.appendChild(cell);

}



/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(value) {

    if (!value) {

        return "—";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "—";

    }


    return date.toLocaleDateString(
        undefined,
        {

            year: "numeric",

            month: "short",

            day: "numeric"

        }
    );

}



/* =========================================================
   OPEN PARTICIPANT
========================================================= */

function openParticipant(
    response
) {

    dialogParticipantCode.textContent =
        response.participant_code
        ||
        "Participant";


    participantDetailContent.textContent =
        "";


    createDetailSection(
        "Participant Information",
        [

            [
                "Participant Code",
                response.participant_code
                ||
                "Not provided"
            ],

            [
                "Submitted",
                formatDate(
                    response.submitted_at
                )
            ],

            [
                "ME/CFS diagnostic status",
                diagnosticLabels[
                    response.diagnostic_status
                ]
                ||
                "Not provided"
            ]

        ]
    );


    createDetailSection(
        "Illness History",
        [

            [
                "Approximate onset year",
                response.onset_year
                ??
                "Not provided"
            ],

            [
                "Onset type",
                onsetTypeLabels[
                    response.onset_type
                ]
                ||
                "Not provided"
            ],

            [
                "Possible trigger",
                response.possible_trigger
                ||
                "Not provided"
            ],

            [
                "Major worsening events",
                response.major_worsening_events
                ||
                "Not provided"
            ]

        ]
    );


    createDetailSection(
        "Post-Exertional Malaise",
        [

            [
                "Reports symptom worsening after exertion",
                pemStatusLabels[
                    response.pem_status
                ]
                ||
                "Not provided"
            ],

            [
                "Reported PEM triggers",
                formatLabelledArray(
                    response.pem_triggers,
                    pemTriggerLabels
                )
            ],

            [
                "Typical PEM onset",
                onsetLabels[
                    response.pem_onset
                ]
                ||
                "Not provided"
            ],

            [
                "Typical PEM severity",
                response.pem_severity
                ??
                "Not provided"
            ],

            [
                "Worst-period duration",
                response.pem_duration
                ||
                "Not provided"
            ],

            [
                "Recovery time",
                response.recovery_time
                ||
                "Not provided"
            ],

            [
                "Returns to previous baseline",
                baselineLabels[
                    response.returns_to_baseline
                ]
                ||
                "Not provided"
            ]

        ]
    );


    createDetailSection(
        "Autonomic Symptoms",
        [

            [
                "Selected symptoms",
                formatLabelledArray(
                    response.autonomic_symptoms,
                    symptomLabels
                )
            ]

        ]
    );


    createDetailSection(
        "Physical Symptoms",
        [

            [
                "Selected symptoms",
                formatLabelledArray(
                    response.physical_symptoms,
                    symptomLabels
                )
            ]

        ]
    );


    createDetailSection(
        "Cognitive Symptoms",
        [

            [
                "Selected symptoms",
                formatLabelledArray(
                    response.cognitive_symptoms,
                    symptomLabels
                )
            ]

        ]
    );


    createDetailSection(
        "Sleep",
        [

            [
                "Selected symptoms",
                formatLabelledArray(
                    response.sleep_symptoms,
                    symptomLabels
                )
            ]

        ]
    );


    createDetailSection(
        "Other Symptoms",
        [

            [
                "Selected symptoms",
                formatLabelledArray(
                    response.other_symptoms,
                    symptomLabels
                )
            ]

        ]
    );


    createDetailSection(
        "Existing Objective Information",
        [

            [
                "Types of information available",
                formatLabelledArray(
                    response.objective_information,
                    objectiveLabels
                )
            ],

            [
                "Participant notes",
                response.objective_notes
                ||
                "Not provided"
            ]

        ]
    );


    createDetailSection(
        "Participant Description",
        [

            [
                "What PEM feels like",
                response.personal_description
                ||
                "Not provided"
            ]

        ]
    );


    participantDialog.showModal();

}



/* =========================================================
   CREATE PARTICIPANT DETAIL SECTION
========================================================= */

function createDetailSection(
    title,
    items
) {

    const section =
        document.createElement(
            "section"
        );


    section.className =
        "participant-detail-section";


    const heading =
        document.createElement(
            "h3"
        );


    heading.textContent =
        title;


    section.appendChild(
        heading
    );


    items.forEach(
        function (item) {


            const label =
                item[0];


            const value =
                item[1];


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "participant-detail-row";


            const labelElement =
                document.createElement(
                    "strong"
                );


            labelElement.textContent =
                label;


            const valueElement =
                document.createElement(
                    "p"
                );


            valueElement.textContent =
                value;


            row.append(
                labelElement,
                valueElement
            );


            section.appendChild(
                row
            );

        }
    );


    participantDetailContent.appendChild(
        section
    );

}



/* =========================================================
   FORMAT ARRAYS
========================================================= */

function formatLabelledArray(
    values,
    labels
) {

    if (
        !Array.isArray(values)
        ||
        values.length === 0
    ) {

        return "None selected";

    }


    return values

        .map(
            function (value) {

                return (
                    labels[value]
                    ||
                    value
                );

            }
        )

        .join(", ");

}



/* =========================================================
   COMPARISON ENGINE
========================================================= */


/* =========================================================
   GET PARTICIPANTS BELONGING TO A GROUP
========================================================= */

function getComparisonGroup(
    groupType
) {

    return allResponses.filter(
        function (response) {


            switch (groupType) {


                case "diagnosed":

                    return (
                        response.diagnostic_status
                        === "formally_diagnosed"
                    );


                case "suspected_professional":

                    return (
                        response.diagnostic_status
                        === "suspected_professional"
                    );


                case "being_evaluated":

                    return (
                        response.diagnostic_status
                        === "being_evaluated"
                    );


                case "self_suspected":

                    return (
                        response.diagnostic_status
                        === "self_suspected"
                    );


                case "uncertain":

                    return (
                        response.diagnostic_status
                        === "uncertain"
                    );


                case "pots":

                    return participantReportsPots(
                        response
                    );


                case "no_pots":

                    return !participantReportsPots(
                        response
                    );


                case "pem_during":

                    return (
                        response.pem_onset
                        === "during"
                    );


                case "pem_delayed":

                    return [

                        "immediately_after",

                        "few_hours",

                        "6_12_hours",

                        "12_24_hours",

                        "24_48_hours",

                        "over_48_hours"

                    ].includes(
                        response.pem_onset
                    );


                case "physical_trigger":

                    return (
                        Array.isArray(
                            response.pem_triggers
                        )
                        &&
                        response
                            .pem_triggers
                            .includes("physical")
                    );


                case "cognitive_trigger":

                    return (
                        Array.isArray(
                            response.pem_triggers
                        )
                        &&
                        response
                            .pem_triggers
                            .includes("cognitive")
                    );


                case "gradual_onset":

                    return (
                        response.onset_type
                        === "gradual"
                    );


                case "sudden_onset":

                    return (
                        response.onset_type
                        === "sudden"
                    );


                default:

                    return false;

            }

        }
    );

}



/* =========================================================
   UPDATE GROUP COUNTS BEFORE RUNNING COMPARISON
========================================================= */

function updateComparisonCounts() {

    const groupA =
        getComparisonGroup(
            groupAType.value
        );


    const groupB =
        getComparisonGroup(
            groupBType.value
        );


    groupACount.textContent =
        groupA.length;


    groupBCount.textContent =
        groupB.length;

}



/* =========================================================
   PERCENT HELPER
========================================================= */

function calculatePercentage(
    count,
    total
) {

    if (total === 0) {

        return 0;

    }


    return Number(
        (
            count
            /
            total
            *
            100
        )
        .toFixed(1)
    );

}



/* =========================================================
   TEXT VALUE FOR TABLE

   Example:
   12 (42.9%)
========================================================= */

function formatCountPercentage(
    count,
    total
) {

    if (total === 0) {

        return "0 (0%)";

    }


    const percentage =
        calculatePercentage(
            count,
            total
        );


    return `${count} (${percentage}%)`;

}



/* =========================================================
   POTS PERCENTAGE FOR GROUP SUMMARY
========================================================= */

function calculatePotsPercentage(
    group
) {

    if (group.length === 0) {

        return "—";

    }


    const count =
        group.filter(
            participantReportsPots
        ).length;


    const percentage =
        calculatePercentage(
            count,
            group.length
        );


    return `${percentage}%`;

}



/* =========================================================
   RUN COMPARISON
========================================================= */

function runComparison() {

    const groupAValue =
        groupAType.value;


    const groupBValue =
        groupBType.value;


    const outcome =
        comparisonOutcome.value;


    const groupA =
        getComparisonGroup(
            groupAValue
        );


    const groupB =
        getComparisonGroup(
            groupBValue
        );


    const groupALabel =
        comparisonGroupLabels[
            groupAValue
        ];


    const groupBLabel =
        comparisonGroupLabels[
            groupBValue
        ];


    /* -----------------------------------------
       UPDATE COUNTS
    ----------------------------------------- */

    groupACount.textContent =
        groupA.length;


    groupBCount.textContent =
        groupB.length;


    /* -----------------------------------------
       RESULT TITLE
    ----------------------------------------- */

    comparisonResultTitle.textContent =
        `${groupALabel} vs. ${groupBLabel}`;


    comparisonAName.textContent =
        groupALabel;


    comparisonBName.textContent =
        groupBLabel;


    comparisonTableAHeading.textContent =
        groupALabel;


    comparisonTableBHeading.textContent =
        groupBLabel;


    /* -----------------------------------------
       GROUP SUMMARY
    ----------------------------------------- */

    comparisonATotal.textContent =
        groupA.length;


    comparisonBTotal.textContent =
        groupB.length;


    comparisonASeverity.textContent =
        calculateAverageSeverity(
            groupA
        );


    comparisonBSeverity.textContent =
        calculateAverageSeverity(
            groupB
        );


    comparisonAPots.textContent =
        calculatePotsPercentage(
            groupA
        );


    comparisonBPots.textContent =
        calculatePotsPercentage(
            groupB
        );


    /* -----------------------------------------
       OUTCOME
    ----------------------------------------- */

    switch (outcome) {


        case "pem_onset":

            renderPemOnsetComparison(
                groupA,
                groupB,
                groupALabel,
                groupBLabel
            );

            break;


        case "pem_severity":

            renderSeverityComparison(
                groupA,
                groupB,
                groupALabel,
                groupBLabel
            );

            break;


        case "symptoms":

            renderSymptomComparison(
                groupA,
                groupB,
                groupALabel,
                groupBLabel
            );

            break;


        case "baseline":

            renderBaselineComparison(
                groupA,
                groupB,
                groupALabel,
                groupBLabel
            );

            break;


        case "pem_triggers":

            renderTriggerComparison(
                groupA,
                groupB,
                groupALabel,
                groupBLabel
            );

            break;

    }

}



/* =========================================================
   GENERIC COMPARISON CHART
========================================================= */

function drawComparisonChart(
    labels,
    groupAValues,
    groupBValues,
    groupALabel,
    groupBLabel,
    horizontal = false
) {

    const canvas =
        document.getElementById(
            "comparisonChart"
        );


    if (!canvas) {

        return;

    }


    if (comparisonChart) {

        comparisonChart.destroy();

    }


    comparisonChart =
        new Chart(
            canvas,
            {

                type: "bar",


                data: {

                    labels: labels,


                    datasets: [

                        {

                            label:
                                groupALabel,

                            data:
                                groupAValues,

                            borderWidth: 1,

                            borderRadius: 5

                        },


                        {

                            label:
                                groupBLabel,

                            data:
                                groupBValues,

                            borderWidth: 1,

                            borderRadius: 5

                        }

                    ]

                },


                options: {

                    indexAxis:
                        horizontal
                            ? "y"
                            : "x",

                    responsive: true,

                    maintainAspectRatio: false,


                    scales: {

                        y:
                            horizontal
                                ? {
                                    beginAtZero: true
                                }
                                : {
                                    beginAtZero: true,

                                    max: 100,

                                    ticks: {

                                        callback:
                                            function (value) {

                                                return `${value}%`;

                                            }

                                    }

                                },


                        x:
                            horizontal
                                ? {

                                    beginAtZero: true,

                                    max: 100,

                                    ticks: {

                                        callback:
                                            function (value) {

                                                return `${value}%`;

                                            }

                                    }

                                }
                                : {}

                    }

                }

            }
        );

}



/* =========================================================
   GENERIC COMPARISON TABLE
========================================================= */

function renderComparisonTable(
    rows
) {

    comparisonTableBody.textContent =
        "";


    rows.forEach(
        function (rowData) {


            const row =
                document.createElement(
                    "tr"
                );


            const measureCell =
                document.createElement(
                    "td"
                );


            const groupACell =
                document.createElement(
                    "td"
                );


            const groupBCell =
                document.createElement(
                    "td"
                );


            measureCell.textContent =
                rowData.label;


            groupACell.textContent =
                rowData.a;


            groupBCell.textContent =
                rowData.b;


            row.append(
                measureCell,
                groupACell,
                groupBCell
            );


            comparisonTableBody.appendChild(
                row
            );

        }
    );

}



/* =========================================================
   PEM ONSET COMPARISON
========================================================= */

function renderPemOnsetComparison(
    groupA,
    groupB,
    groupALabel,
    groupBLabel
) {

    comparisonChartHeading.textContent =
        "PEM Onset Timing";


    comparisonChartDescription.textContent =
        "Percentage of each selected group reporting each PEM onset timing category.";


    const categories = [

        {
            value: "during",
            label: "During activity"
        },

        {
            value: "immediately_after",
            label: "Immediately afterward"
        },

        {
            value: "few_hours",
            label: "Within a few hours"
        },

        {
            value: "6_12_hours",
            label: "6–12 hours"
        },

        {
            value: "12_24_hours",
            label: "12–24 hours"
        },

        {
            value: "24_48_hours",
            label: "24–48 hours"
        },

        {
            value: "over_48_hours",
            label: "More than 48 hours"
        },

        {
            value: "varies",
            label: "Timing varies"
        }

    ];


    const groupAValues = [];

    const groupBValues = [];

    const rows = [];


    categories.forEach(
        function (category) {


            const aCount =
                groupA.filter(
                    response =>
                        response.pem_onset
                        === category.value
                ).length;


            const bCount =
                groupB.filter(
                    response =>
                        response.pem_onset
                        === category.value
                ).length;


            groupAValues.push(
                calculatePercentage(
                    aCount,
                    groupA.length
                )
            );


            groupBValues.push(
                calculatePercentage(
                    bCount,
                    groupB.length
                )
            );


            rows.push({

                label:
                    category.label,

                a:
                    formatCountPercentage(
                        aCount,
                        groupA.length
                    ),

                b:
                    formatCountPercentage(
                        bCount,
                        groupB.length
                    )

            });

        }
    );


    drawComparisonChart(

        categories.map(
            category =>
                category.label
        ),

        groupAValues,

        groupBValues,

        groupALabel,

        groupBLabel

    );


    renderComparisonTable(
        rows
    );

}



/* =========================================================
   PEM SEVERITY COMPARISON
========================================================= */

function renderSeverityComparison(
    groupA,
    groupB,
    groupALabel,
    groupBLabel
) {

    comparisonChartHeading.textContent =
        "Typical PEM Severity";


    comparisonChartDescription.textContent =
        "Percentage of each selected group reporting each PEM severity rating.";


    const categories = [

        {
            value: 1,
            label: "1 — Mild"
        },

        {
            value: 2,
            label: "2"
        },

        {
            value: 3,
            label: "3 — Moderate"
        },

        {
            value: 4,
            label: "4"
        },

        {
            value: 5,
            label: "5 — Severe"
        }

    ];


    const groupAValues = [];

    const groupBValues = [];

    const rows = [];


    categories.forEach(
        function (category) {


            const aCount =
                groupA.filter(
                    response =>
                        Number(
                            response.pem_severity
                        )
                        === category.value
                ).length;


            const bCount =
                groupB.filter(
                    response =>
                        Number(
                            response.pem_severity
                        )
                        === category.value
                ).length;


            groupAValues.push(
                calculatePercentage(
                    aCount,
                    groupA.length
                )
            );


            groupBValues.push(
                calculatePercentage(
                    bCount,
                    groupB.length
                )
            );


            rows.push({

                label:
                    category.label,

                a:
                    formatCountPercentage(
                        aCount,
                        groupA.length
                    ),

                b:
                    formatCountPercentage(
                        bCount,
                        groupB.length
                    )

            });

        }
    );


    drawComparisonChart(

        categories.map(
            category =>
                category.label
        ),

        groupAValues,

        groupBValues,

        groupALabel,

        groupBLabel

    );


    renderComparisonTable(
        rows
    );

}



/* =========================================================
   SYMPTOM COMPARISON
========================================================= */

function renderSymptomComparison(
    groupA,
    groupB,
    groupALabel,
    groupBLabel
) {

    comparisonChartHeading.textContent =
        "Frequently Reported Symptoms";


    comparisonChartDescription.textContent =
        "Percentage of each selected group reporting frequently selected structured symptoms.";


    const combinedResponses = [

        ...groupA,

        ...groupB

    ];


    const mostCommonSymptoms =
        getSymptomCounts(
            combinedResponses
        )
        .slice(0, 12);


    const labels = [];

    const groupAValues = [];

    const groupBValues = [];

    const rows = [];


    mostCommonSymptoms.forEach(
        function (item) {


            const symptom =
                item[0];


            const label =
                symptomLabels[symptom]
                ||
                symptom;


            const aCount =
                countSymptomInGroup(
                    groupA,
                    symptom
                );


            const bCount =
                countSymptomInGroup(
                    groupB,
                    symptom
                );


            labels.push(
                label
            );


            groupAValues.push(
                calculatePercentage(
                    aCount,
                    groupA.length
                )
            );


            groupBValues.push(
                calculatePercentage(
                    bCount,
                    groupB.length
                )
            );


            rows.push({

                label:
                    label,

                a:
                    formatCountPercentage(
                        aCount,
                        groupA.length
                    ),

                b:
                    formatCountPercentage(
                        bCount,
                        groupB.length
                    )

            });

        }
    );


    drawComparisonChart(

        labels,

        groupAValues,

        groupBValues,

        groupALabel,

        groupBLabel,

        true

    );


    renderComparisonTable(
        rows
    );

}



/* =========================================================
   COUNT A PARTICULAR SYMPTOM IN GROUP
========================================================= */

function countSymptomInGroup(
    group,
    symptom
) {

    const symptomGroups = [

        "autonomic_symptoms",

        "physical_symptoms",

        "cognitive_symptoms",

        "sleep_symptoms",

        "other_symptoms"

    ];


    return group.filter(
        function (response) {


            return symptomGroups.some(
                function (field) {


                    return (
                        Array.isArray(
                            response[field]
                        )
                        &&
                        response[field]
                            .includes(symptom)
                    );

                }
            );

        }
    ).length;

}



/* =========================================================
   BASELINE COMPARISON
========================================================= */

function renderBaselineComparison(
    groupA,
    groupB,
    groupALabel,
    groupBLabel
) {

    comparisonChartHeading.textContent =
        "Return to Previous Baseline";


    comparisonChartDescription.textContent =
        "Percentage of each group reporting whether they return to their previous baseline after PEM.";


    const categories = [

        {
            value: "yes",
            label: "Yes"
        },

        {
            value: "usually",
            label: "Usually"
        },

        {
            value: "sometimes",
            label: "Sometimes"
        },

        {
            value: "no",
            label: "No"
        },

        {
            value: "unsure",
            label: "Unsure"
        }

    ];


    const groupAValues = [];

    const groupBValues = [];

    const rows = [];


    categories.forEach(
        function (category) {


            const aCount =
                groupA.filter(
                    response =>
                        response
                            .returns_to_baseline
                        === category.value
                ).length;


            const bCount =
                groupB.filter(
                    response =>
                        response
                            .returns_to_baseline
                        === category.value
                ).length;


            groupAValues.push(
                calculatePercentage(
                    aCount,
                    groupA.length
                )
            );


            groupBValues.push(
                calculatePercentage(
                    bCount,
                    groupB.length
                )
            );


            rows.push({

                label:
                    category.label,

                a:
                    formatCountPercentage(
                        aCount,
                        groupA.length
                    ),

                b:
                    formatCountPercentage(
                        bCount,
                        groupB.length
                    )

            });

        }
    );


    drawComparisonChart(

        categories.map(
            category =>
                category.label
        ),

        groupAValues,

        groupBValues,

        groupALabel,

        groupBLabel

    );


    renderComparisonTable(
        rows
    );

}



/* =========================================================
   PEM TRIGGER COMPARISON
========================================================= */

function renderTriggerComparison(
    groupA,
    groupB,
    groupALabel,
    groupBLabel
) {

    comparisonChartHeading.textContent =
        "Reported PEM Triggers";


    comparisonChartDescription.textContent =
        "Percentage of each group selecting each type of exertion as a trigger for symptom worsening.";


    const categories = [

        {
            value: "physical",
            label: "Physical activity"
        },

        {
            value: "cognitive",
            label: "Mental / cognitive activity"
        },

        {
            value: "emotional",
            label: "Emotional exertion / stress"
        },

        {
            value: "upright",
            label: "Standing / upright activity"
        }

    ];


    const groupAValues = [];

    const groupBValues = [];

    const rows = [];


    categories.forEach(
        function (category) {


            const aCount =
                groupA.filter(
                    response =>
                        Array.isArray(
                            response.pem_triggers
                        )
                        &&
                        response
                            .pem_triggers
                            .includes(
                                category.value
                            )
                ).length;


            const bCount =
                groupB.filter(
                    response =>
                        Array.isArray(
                            response.pem_triggers
                        )
                        &&
                        response
                            .pem_triggers
                            .includes(
                                category.value
                            )
                ).length;


            groupAValues.push(
                calculatePercentage(
                    aCount,
                    groupA.length
                )
            );


            groupBValues.push(
                calculatePercentage(
                    bCount,
                    groupB.length
                )
            );


            rows.push({

                label:
                    category.label,

                a:
                    formatCountPercentage(
                        aCount,
                        groupA.length
                    ),

                b:
                    formatCountPercentage(
                        bCount,
                        groupB.length
                    )

            });

        }
    );


    drawComparisonChart(

        categories.map(
            category =>
                category.label
        ),

        groupAValues,

        groupBValues,

        groupALabel,

        groupBLabel

    );


    renderComparisonTable(
        rows
    );

}



/* =========================================================
   COMPARISON CONTROL EVENTS
========================================================= */

groupAType.addEventListener(
    "change",
    function () {

        updateComparisonCounts();

    }
);


groupBType.addEventListener(
    "change",
    function () {

        updateComparisonCounts();

    }
);


runComparisonButton.addEventListener(
    "click",
    function () {

        runComparison();

    }
);



/* =========================================================
   CLOSE PARTICIPANT DIALOG
========================================================= */

closeParticipantDialog.addEventListener(
    "click",
    function () {

        participantDialog.close();

    }
);



participantDialog.addEventListener(
    "click",
    function (event) {

        if (
            event.target
            === participantDialog
        ) {

            participantDialog.close();

        }

    }
);



/* =========================================================
   REFRESH DATABASE
========================================================= */

refreshButton.addEventListener(
    "click",
    async function () {

        await loadResponses();

    }
);



/* =========================================================
   SIGN OUT
========================================================= */

logoutButton.addEventListener(
    "click",
    async function () {


        await window
            .supabaseClient
            .auth
            .signOut();


        allResponses = [];

        filteredResponses = [];


        tableBody.textContent = "";

        comparisonTableBody.textContent = "";


        destroyAllCharts();


        adminDashboard.hidden = true;

        adminLogin.hidden = false;


        adminLoginForm.reset();


        adminStatus.textContent =
            "Signed out.";

    }
);



/* =========================================================
   DESTROY CHARTS
========================================================= */

function destroyAllCharts() {

    if (pemOnsetChart) {

        pemOnsetChart.destroy();

        pemOnsetChart = null;

    }


    if (severityChart) {

        severityChart.destroy();

        severityChart = null;

    }


    if (symptomChart) {

        symptomChart.destroy();

        symptomChart = null;

    }


    if (comparisonChart) {

        comparisonChart.destroy();

        comparisonChart = null;

    }

}



/* =========================================================
   INITIAL PAGE LOAD
========================================================= */

async function initializeAdmin() {

    const authenticated =
        await verifyCurrentUser();


    if (authenticated) {

        await showDashboard();

    }

    else {

        adminDashboard.hidden = true;

        adminLogin.hidden = false;

    }

}



/* =========================================================
   START
========================================================= */

initializeAdmin();
