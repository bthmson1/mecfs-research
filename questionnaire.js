const form =
    document.getElementById(
        "researchQuestionnaire"
    );

const submitButton =
    document.getElementById(
        "submitQuestionnaire"
    );

const submissionStatus =
    document.getElementById(
        "submissionStatus"
    );


/* =========================================
   HELPER:
   GET SELECTED RADIO VALUE
========================================= */

function getRadioValue(name) {

    const selected =
        document.querySelector(
            `input[name="${name}"]:checked`
        );

    return selected
        ? selected.value
        : null;
}


/* =========================================
   HELPER:
   GET CHECKED VALUES
========================================= */

function getCheckedValues(name) {

    return Array.from(
        document.querySelectorAll(
            `input[name="${name}"]:checked`
        )
    ).map(
        checkbox => checkbox.value
    );
}


/* =========================================
   CREATE ANONYMOUS PARTICIPANT CODE
========================================= */

function createParticipantCode() {

    const bytes =
        new Uint8Array(6);

    crypto.getRandomValues(bytes);

    const code =
        Array.from(bytes)
            .map(
                byte =>
                    byte
                        .toString(16)
                        .padStart(2, "0")
            )
            .join("")
            .toUpperCase();

    return `P-${code}`;
}


/* =========================================
   FORM SUBMISSION
========================================= */

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        /* ---------------------------------
           USE NORMAL HTML VALIDATION
        ---------------------------------- */

        if (!form.checkValidity()) {

            form.reportValidity();

            return;
        }


        submitButton.disabled = true;

        submitButton.textContent =
            "Submitting...";

        submissionStatus.textContent =
            "Securely submitting your response.";


        /* ---------------------------------
           GENERATE ANONYMOUS CODE
        ---------------------------------- */

        const participantCode =
            createParticipantCode();


        /* ---------------------------------
           BUILD RESPONSE OBJECT
        ---------------------------------- */

        const response = {

            participant_code:
                participantCode,

            consent_confirmed:
                document
                    .getElementById(
                        "consentConfirmed"
                    )
                    .checked,


            diagnostic_status:
                getRadioValue(
                    "diagnostic_status"
                ),


            onset_year:
                document
                    .getElementById(
                        "onsetYear"
                    )
                    .value
                    ?
                    parseInt(
                        document
                            .getElementById(
                                "onsetYear"
                            )
                            .value,
                        10
                    )
                    :
                    null,


            onset_type:
                getRadioValue(
                    "onset_type"
                ),


            possible_trigger:
                document
                    .getElementById(
                        "possibleTrigger"
                    )
                    .value
                    .trim()
                    ||
                    null,


            major_worsening_events:
                document
                    .getElementById(
                        "majorWorseningEvents"
                    )
                    .value
                    .trim()
                    ||
                    null,


            pem_status:
                getRadioValue(
                    "pem_status"
                ),


            pem_triggers:
                getCheckedValues(
                    "pem_triggers"
                ),


            pem_onset:
                document
                    .getElementById(
                        "pemOnset"
                    )
                    .value
                    ||
                    null,


            pem_severity:
                document
                    .getElementById(
                        "pemSeverity"
                    )
                    .value
                    ?
                    parseInt(
                        document
                            .getElementById(
                                "pemSeverity"
                            )
                            .value,
                        10
                    )
                    :
                    null,


            pem_duration:
                document
                    .getElementById(
                        "pemDuration"
                    )
                    .value
                    .trim()
                    ||
                    null,


            recovery_time:
                document
                    .getElementById(
                        "recoveryTime"
                    )
                    .value
                    .trim()
                    ||
                    null,


            returns_to_baseline:
                document
                    .getElementById(
                        "returnsToBaseline"
                    )
                    .value
                    ||
                    null,


            autonomic_symptoms:
                getCheckedValues(
                    "autonomic_symptoms"
                ),


            physical_symptoms:
                getCheckedValues(
                    "physical_symptoms"
                ),


            cognitive_symptoms:
                getCheckedValues(
                    "cognitive_symptoms"
                ),


            sleep_symptoms:
                getCheckedValues(
                    "sleep_symptoms"
                ),


            other_symptoms:
                getCheckedValues(
                    "other_symptoms"
                ),


            objective_information:
                getCheckedValues(
                    "objective_information"
                ),


            objective_notes:
                document
                    .getElementById(
                        "objectiveNotes"
                    )
                    .value
                    .trim()
                    ||
                    null,


            personal_description:
                document
                    .getElementById(
                        "personalDescription"
                    )
                    .value
                    .trim()
                    ||
                    null
        };


        /* ---------------------------------
           SEND TO DATABASE
        ---------------------------------- */

        const {
            error
        } =
            await window
                .supabaseClient
                .from(
                    "questionnaire_responses"
                )
                .insert(
                    response
                );


        /* ---------------------------------
           ERROR
        ---------------------------------- */

        if (error) {

            console.error(error);

            submissionStatus.textContent =
                "Your response could not be submitted. Please try again.";

            submitButton.disabled = false;

            submitButton.textContent =
                "Submit Questionnaire";

            return;
        }


        /* ---------------------------------
           SUCCESS
        ---------------------------------- */

        form.reset();


        submissionStatus.innerHTML = "";

        const heading =
            document.createElement(
                "strong"
            );

        heading.textContent =
            "Response submitted successfully.";


        const message =
            document.createElement(
                "span"
            );

        message.textContent =
            ` Your anonymous participant code is ${participantCode}.`;


        submissionStatus.append(
            heading,
            message
        );


        submitButton.disabled = false;

        submitButton.textContent =
            "Submit Another Response";


        submissionStatus.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);
