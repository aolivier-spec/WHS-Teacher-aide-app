/* ======================================================================================================================= */

/* javascript to open modal window that shows information about teachers and periods when clicked on */
/* open up another window inside of the first modal that shows more detail on the class, and then opens up into another window for teacher aide scheduling */


/* teacher aide data */

/*Each class stores its assigned teacher aide.*/

let scheduledTeacherAides = {};

let currentClassForAide = "";


/* information for class schedule */

/*This is where the day, period and time for each class is stored.
Add more classes here with making more class modals.*/

const classSchedule = {

    "12WHAU": {
        day: "Monday",
        period: "Period 1",
        time: "8:45 - 9:00"
    },

    "11WPAPA": {
        day: "Monday",
        period: "Period 1",
        time: "8:45 - 9:00"
    },

    "10WWAI": {
        day: "Monday",
        period: "Period 1",
        time: "8:45 - 9:00"
    }

};


/* whanau modal window */

function openModal() {

    document.getElementById("whanauModal").style.display = "block";

    updateClassStars();
	
	updateClassAideNames();


}

function updateClassAideNames() {

    const classes = [
        "12WHAU",
        "11WPAPA",
        "10WWAI"
    ];

    classes.forEach(function(className) {

        const aideDisplay =
            document.getElementById("aide-" + className);

        if (aideDisplay) {

            if (scheduledTeacherAides[className]) {

                aideDisplay.innerHTML =
                    `<small><b>${scheduledTeacherAides[className]}</b></small>`;

            } else {

                aideDisplay.innerHTML = "";

            }

        }

    });

}


function closeModal() {

    document.getElementById("whanauModal").style.display = "none";

}


/* class modal */

function openClassModal(className) {

    /* Get the class title */
    document.getElementById("classTitle").innerHTML = className;


    /* Get the teacher aide assigned to this class */
    let assignedAide = scheduledTeacherAides[className];


    /* Display the teacher aide underneath the class name */
    const aideDisplay =
        document.getElementById("classAideDisplay");


    if (assignedAide) {

        aideDisplay.innerHTML = `
            <div class="class-modal-aide">
                <span class="scheduled-star">★</span>
                <span class="class-modal-aide-name">
                    ${assignedAide}
                </span>
            </div>
        `;

    } else {

        aideDisplay.innerHTML = "";

    }


    let info = "";

    let aideInformation = "";


    /* If teacher aide is assigned, show their name and remove button */
    if (assignedAide) {

        aideInformation = `
            <br>

            <b>Teacher Aide:</b> ${assignedAide}

            <br><br>

            <button onclick="removeTeacherAide('${className}')">
                Remove Teacher Aide
            </button>
        `;

    } else {

        aideInformation = `
            <br>

            <b>Teacher Aide:</b> None scheduled
        `;

    }


    /* Class information */

    switch(className) {

        case "12WHAU":

            info = `
                <b>Teacher:</b> Michelle Hetherington<br>

                <b>Room:</b> Music Room<br>

                <b>Extra information:</b>
                Add anything here....

                ${aideInformation}

                <br><br>

                <button onclick="openTeacherAideModal('${className}')">
                    <b>Teacher Aide</b>
                </button>
            `;

            break;


        case "11WPAPA":

            info = `
                <b>Teacher:</b> Paolo Quilala<br>

                <b>Room:</b> Room 7<br>

                <b>Extra information:</b>
                Add anything here....

                ${aideInformation}

                <br><br>

                <button onclick="openTeacherAideModal('${className}')">
                    <b>Teacher Aide</b>
                </button>
            `;

            break;


        case "10WWAI":

            info = `
                <b>Teacher:</b> Johan Minaar<br>

                <b>Room:</b> Room 10<br>

                <b>Extra information:</b>
                Add anything here....

                ${aideInformation}

                <br><br>

                <button onclick="openTeacherAideModal('${className}')">
                    <b>Teacher Aide</b>
                </button>
            `;

            break;


        default:

            info = "No information has been added yet.";

    }


    document.getElementById("classContent").innerHTML = info;

    document.getElementById("classModal").style.display = "block";

}


function closeClassModal() {

    document.getElementById("classModal").style.display = "none";

}


/* teacher aide modal window */

function openTeacherAideModal(className) {

    /*Remember which class a teacher aide is already scheduled for*/

    currentClassForAide = className;


    /*Display the class name of the scheduled class*/

    document.getElementById(
        "teacherAideClassName"
    ).innerHTML = className;


    /*Update the schedule information for every teacher aide.*/

    updateTeacherAideScheduleDisplay();


    /*Open the modal*/

    document.getElementById(
        "teacherAideModal"
    ).style.display = "block";

}


function closeTeacherAideModal() {

    document.getElementById(
        "teacherAideModal"
    ).style.display = "none";

}


/* find assigned classes of the teacher aides */

/*This function finds every class a particular teacher aide is assigned to.*/

function getTeacherAideAssignments(teacherAideName) {

    let assignments = [];


    for (let className in scheduledTeacherAides) {

        if (
            scheduledTeacherAides[className] ===
            teacherAideName
        ) {

            assignments.push({

                className: className,

                day: classSchedule[className].day,

                period: classSchedule[className].period,

                time: classSchedule[className].time

            });

        }

    }


    return assignments;

}


/* display teacher aide schedules */

/* updates the teacher aide buttons. It will show where and when each aide is already scheduled.*/

function updateTeacherAideScheduleDisplay() {

    const teacherAides = [

        "Teacher Aide 1",

        "Teacher Aide 2",

        "Teacher Aide 3",

        "Teacher Aide 4"

    ];


    teacherAides.forEach(function(teacherAideName) {

        let assignments =
            getTeacherAideAssignments(
                teacherAideName
            );


        let scheduleText = "";


        /*If the teacher aide has been assigned somewhere, display it.*/

        if (assignments.length > 0) {

            scheduleText =
                "<br><small><b>Currently scheduled:</b>";

            assignments.forEach(function(assignment) {

                scheduleText += `

                    <br>
                    • ${assignment.className}

                    — ${assignment.day}

                    — ${assignment.period}

                    — ${assignment.time}

                `;

            });

            scheduleText += "</small>";

        } else {

            scheduleText =
                "<br><small>Available</small>";

        }


        /*Find the schedule display area*/

        const display =
            document.getElementById(

                "schedule-" +

                teacherAideName
                    .replaceAll(" ", "-")

            );


        if (display) {

            display.innerHTML =
                scheduleText;

        }

    });

}


/* check how busy a teacher aide is */

/*This checks whether a teacher aide is already assigned to another class at the same day and period.*/

function isTeacherAideBusy(

    teacherAideName,

    className

) {

    const newClassSchedule =
        classSchedule[className];


    for (

        let scheduledClass

        in

        scheduledTeacherAides

    ) {


        if (

            scheduledTeacherAides[
                scheduledClass
            ] === teacherAideName

        ) {


            const existingSchedule =
                classSchedule[
                    scheduledClass
                ];


            /*Check if both classes happen at the same day and period.*/

            if (

                existingSchedule.day ===
                newClassSchedule.day

                &&

                existingSchedule.period ===
                newClassSchedule.period

            ) {

                return scheduledClass;

            }

        }

    }


    return null;

}


/* schedule a teacher aide */

function scheduleTeacherAide(teacherAideName) {


    if (!currentClassForAide) {

        return;

    }


    /* Check if teacher aide is already busy.*/

    const conflictingClass =
        isTeacherAideBusy(

            teacherAideName,

            currentClassForAide

        );


    /*If they are busy, show a warning.*/

    if (conflictingClass) {

        const conflict =
            classSchedule[conflictingClass];


        alert(

            teacherAideName +

            " is already scheduled for " +

            conflictingClass +

            " on " +

            conflict.day +

            ", " +

            conflict.period +

            " (" +

            conflict.time +

            ")."

        );


        return;

    }


    /*Assign the teacher aide*/

    scheduledTeacherAides[
        currentClassForAide
    ] = teacherAideName;


    /*Update star icon and teacher aide name*/

    updateClassStars();
	updateClassAideNames();


    /*Close teacher aide modal*/

    closeTeacherAideModal();


    /*Re-open/update the class modal*/

    openClassModal(
        currentClassForAide
    );

}


/* remove teacher aide */

/*This removes the teacher aide from a particular class.*/

function removeTeacherAide(className) {

    /*Check that the class actually has an aide.*/

    if (!scheduledTeacherAides[className]) {

        return;

    }


    const teacherAideName =
        scheduledTeacherAides[className];


    /*Ask for confirmation to remove the teacher aide or not.*/

    const confirmRemoval =
        confirm(

            "Remove " +

            teacherAideName +

            " from " +

            className +

            "?"

        );


    if (!confirmRemoval) {

        return;

    }


    /*Remove the assigned class*/

    delete scheduledTeacherAides[className];


    /*Update the star icon and teacher aide name next to class name*/

    updateClassStars();
	updateClassAideNames();


    /* Refresh the class modal*/

    openClassModal(className);

}


/*update star icons */

function updateClassStars() {

    const classes = [

        "12WHAU",

        "11WPAPA",

        "10WWAI"

    ];


    classes.forEach(function(className) {

        const star =
            document.getElementById(

                "star-" + className

            );


        if (star) {

            if (

                scheduledTeacherAides[className]

            ) {

                star.innerHTML = "★";

            }

            else {

                star.innerHTML = "";

            }

        }

    });

}


/*close modals when clicking outside of window area*/

window.onclick = function(event) {

    const whanauModal =
        document.getElementById(
            "whanauModal"
        );


    const classModal =
        document.getElementById(
            "classModal"
        );


    const teacherAideModal =
        document.getElementById(
            "teacherAideModal"
        );


    if (event.target === classModal) {

        classModal.style.display = "none";

    }


    if (event.target === whanauModal) {

        whanauModal.style.display = "none";

    }


    if (event.target === teacherAideModal) {

        teacherAideModal.style.display = "none";

    }

};


/* Print the main timetable */

function printTimetable() {

    const timetable =
        document.getElementById("timetable");

    timetable.classList.add("print-area");

    window.print();

    timetable.classList.remove("print-area");
}


/* Print the Whānau/classes modal */

function printWhanauModal() {

    const modalContent =
        document.querySelector("#whanauModal .modal-content");

    modalContent.classList.add("print-area");

    window.print();

    modalContent.classList.remove("print-area");
}


/* Print the currently open class modal */

function printClassModal() {

    const modalContent =
        document.querySelector("#classModal .modal-content");

    modalContent.classList.add("print-area");

    window.print();

    modalContent.classList.remove("print-area");
}


/* Print the teacher aide modal */

function printTeacherAideModal() {

    const modalContent =
        document.querySelector("#teacherAideModal .modal-content");

    modalContent.classList.add("print-area");

    window.print();

    modalContent.classList.remove("print-area");
}
