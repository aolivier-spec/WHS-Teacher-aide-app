/* ======================================================================================================================= */

/* the main homepage/database functions */
/* Show the homepage */

function showHomePage() {

    const homePage =
        document.getElementById(
            "homePage"
        );

    const timetablePage =
        document.getElementById(
            "timetablePage"
        );


    homePage.style.display = "flex";

    timetablePage.style.display = "none";


    /* Refresh dashboard information whenever the homepage is opened.*/

    updateDashboard();

}


/* Show the timetable */

function showTimetablePage() {

    const homePage =
        document.getElementById(
            "homePage"
        );

    const timetablePage =
        document.getElementById(
            "timetablePage"
        );


    homePage.style.display = "none";

    timetablePage.style.display = "block";

}


/* Open the search system from the homepage */

function openSearchFromHome() {

    const homePage =
        document.getElementById("homePage");

    homePage.style.display = "none";


    const timetablePage =
        document.getElementById("timetablePage");

    timetablePage.style.display = "block";


    openTeacherAideSearchModal();

}


/* the functions for the main teacher aide dictionary window*/
/* Open teacher aide directory */

function openTeacherAideDirectory() {

    const modal =
        document.getElementById(
            "teacherAideDirectoryModal"
        );


    const content =
        document.getElementById(
            "teacherAideDirectoryContent"
        );


    let directoryHTML = "";


    /* Loop through every teacher aide. */

    teacherAides.forEach(function(teacherAide) {


        /* Find all classes assigned to this teacher aide.*/

        const assignments =
            getTeacherAideAssignments(
                teacherAide
            );


        directoryHTML += `

            <div class="directory-aide">

                <div class="directory-aide-name">
                    ${teacherAide}
                </div>

        `;


        /*If the teacher aide has assignments, display them.*/

        if (assignments.length > 0) {

            directoryHTML += `

                <div class="directory-assignment-title">
                    Current Assignments:
                </div>

            `;


            assignments.forEach(function(assignment) {

                directoryHTML += `

                    <div class="directory-assignment">

                        <b>${assignment.className}</b>

                        <br>

                        ${assignment.day}

                        -

                        ${assignment.period}

                        <br>

                        Time:
                        ${assignment.time}

                    </div>

                `;

            });


        } else {


            /*  No assignments, mark them as available to be booked. */

            directoryHTML += `

                <div class="directory-available">

                    ✓ Available

                </div>

            `;

        }


        directoryHTML += `

            </div>

        `;

    });


    content.innerHTML = directoryHTML;

    modal.style.display = "block";

}


/* Close teacher aide directory */

function closeTeacherAideDirectory() {

    document.getElementById(
        "teacherAideDirectoryModal"
    ).style.display = "none";

}



/* the system information functions*/

/* Open system information */

function openSystemInformation() {

    document.getElementById(
        "systemInformationModal"
    ).style.display = "block";

}


/* Close system information */

function closeSystemInformation() {

    document.getElementById(
        "systemInformationModal"
    ).style.display = "none";

}

/* javascript to open modal window that shows information about teachers and periods when clicked on */
/* open up another window inside of the first modal that shows more detail on the class, and then opens up into another window for teacher aide scheduling */


/* the functions for the teacher aide database schedule*/


/*This is the name used to store the database inside the browser.*/

const TEACHER_AIDE_STORAGE_KEY =
    "teacherAideManagementDatabase";


/* Load previously saved assignments.
If nothing has been saved before,start with an empty object.*/

let scheduledTeacherAides =
    JSON.parse(
        localStorage.getItem(
            TEACHER_AIDE_STORAGE_KEY
        )
    ) || {};


/* Keeps track of the class currently being edited.*/

let currentClassForAide = "";

/* save the information inside the teacher aide database  */


function saveTeacherAideDatabase() {

    localStorage.setItem(

        TEACHER_AIDE_STORAGE_KEY,

        JSON.stringify(
            scheduledTeacherAides
        )

    );

}


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

function updateClassStars() {

    const classes =
        Object.keys(
            classSchedule
        );


    classes.forEach(
        function(className) {


            const star =
                document.getElementById(
                    "star-" + className
                );


            if (!star) {

                return;

            }


            if (
                scheduledTeacherAides[
                    className
                ]
            ) {

                star.innerHTML = "★";

            }

            else {

                star.innerHTML = "";

            }

        }
    );

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



/* Teacher Aide Schedule Search  */



/* List of all teacher aides */

const teacherAides = [
    "Teacher Aide 1",
    "Teacher Aide 2",
    "Teacher Aide 3",
    "Teacher Aide 4"
];


/* Open the teacher aide search modal */

function openTeacherAideSearchModal() {

    document.getElementById("teacherAideSearchModal").style.display = "block";

}


/* Close the teacher aide search modal */

function closeTeacherAideSearchModal() {

    document.getElementById("teacherAideSearchModal").style.display = "none";

}


/* Search the teacher aide schedule */

function searchTeacherAideSchedule() {

    const selectedDay =
        document.getElementById("searchDay").value;

    const selectedPeriod =
        document.getElementById("searchPeriod").value;

    const resultsContainer =
        document.getElementById("teacherAideSearchResults");


    /* Make sure both options have been selected */

    if (selectedDay === "" || selectedPeriod === "") {

        resultsContainer.innerHTML = `
            <div class="search-warning">
                Please select both a day and a period.
            </div>
        `;

        return;
    }


    /* Store matching scheduled teacher aides */

    const scheduledResults = [];


    /*
        Go through every teacher aide that has been scheduled.
        scheduledTeacherAides uses the class name as the key.
    */

    for (const className in scheduledTeacherAides) {

        const teacherAide =
            scheduledTeacherAides[className];

        const schedule =
            classSchedule[className];


        /* Make sure the class has schedule information */

        if (!schedule) {
            continue;
        }


        /*
            Check whether the class matches
            the selected day and period.
        */

        if (
            schedule.day === selectedDay &&
            schedule.period === selectedPeriod
        ) {

            scheduledResults.push({

                teacherAide: teacherAide,

                className: className,

                time: schedule.time

            });

        }

    }


    /* Find which teacher aides are available */

    const scheduledNames =
        scheduledResults.map(
            result => result.teacherAide
        );


    const availableAides =
        teacherAides.filter(
            aide => !scheduledNames.includes(aide)
        );


    /* Start building the search results */

    let resultsHTML = `

        <h3>
            ${selectedDay} - ${selectedPeriod}
        </h3>

    `;


    
    /* Scheduled teacher aides  */
  

    if (scheduledResults.length > 0) {

        resultsHTML += `

            <h3>Scheduled Teacher Aides</h3>

        `;


        scheduledResults.forEach(result => {

            resultsHTML += `

                <div class="search-result">

                    <div class="search-result-title">
                        ${result.teacherAide}
                    </div>

                    <div>
                        <b>Class:</b>
                        ${result.className}
                    </div>

                    <div>
                        <b>Time:</b>
                        ${result.time}
                    </div>

                </div>

            `;

        });

    } else {

        resultsHTML += `

            <div class="search-result">

                <b>No teacher aides are currently scheduled
                for this period.</b>

            </div>

        `;

    }


    
    /* Available teacher aides searching code */
   

    resultsHTML += `

        <h3>Available Teacher Aides</h3>

    `;


    if (availableAides.length > 0) {

        availableAides.forEach(aide => {

            resultsHTML += `

                <div class="available-aide">

                    ✓ ${aide}

                </div>

            `;

        });

    } else {

        resultsHTML += `

            <div class="search-result">

                <b>
                    No teacher aides are available
                    for this period.
                </b>

            </div>

        `;

    }


    /* Put the results into the modal */

    resultsContainer.innerHTML = resultsHTML;

}




/* find assigned classes of the teacher aides */



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
	
	
	/* Save the assignment */

    saveTeacherAideDatabase();


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
	
	
	/* Save the updated database */

    saveTeacherAideDatabase();



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



/* automatically close the modal windows when clicking outside of them for ease instead of manually having to find close button  */


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


    const teacherAideSearchModal =
        document.getElementById(
            "teacherAideSearchModal"
        );


    const teacherAideDirectoryModal =
        document.getElementById(
            "teacherAideDirectoryModal"
        );


    const systemInformationModal =
        document.getElementById(
            "systemInformationModal"
        );


    if (event.target === whanauModal) {

        whanauModal.style.display = "none";

    }


    if (event.target === classModal) {

        classModal.style.display = "none";

    }


    if (event.target === teacherAideModal) {

        teacherAideModal.style.display = "none";

    }


    if (event.target === teacherAideSearchModal) {

        teacherAideSearchModal.style.display = "none";

    }


    if (event.target === teacherAideDirectoryModal) {

        teacherAideDirectoryModal.style.display = "none";

    }


    if (event.target === systemInformationModal) {

        systemInformationModal.style.display = "none";

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


/* the dashboard information  */


function updateDashboard() {


    
    /* Number of teacher aides in total */
   

    const aideCount =
        teacherAides.length;


    const aideCountElement =
        document.getElementById(
            "dashboardAideCount"
        );


    if (aideCountElement) {

        aideCountElement.textContent =
            aideCount;

    }


   
    /* Number of classes  */
  

    const manageableClasses =
        Object.keys(classSchedule).length;


    const classCountElement =
        document.getElementById(
            "dashboardClassCount"
        );


    if (classCountElement) {

        classCountElement.textContent =
            manageableClasses;

    }


 
    /* Number of active assignments for the teacher aides where they have already been booked */
  

    const assignedCount =
        Object.keys(
            scheduledTeacherAides
        ).length;


    const assignedCountElement =
        document.getElementById(
            "dashboardAssignedCount"
        );


    if (assignedCountElement) {

        assignedCountElement.textContent =
            assignedCount;

    }


  
    /* Number of available teacher aides that have not been scheduled yet  */


    const assignedNames =
        Object.values(
            scheduledTeacherAides
        );


    const availableCount =
        teacherAides.filter(
            function(aide) {

                return !assignedNames.includes(
                    aide
                );

            }
        ).length;


    const availableCountElement =
        document.getElementById(
            "dashboardAvailableCount"
        );


    if (availableCountElement) {

        availableCountElement.textContent =
            availableCount;

    }


   
    /* Current assignment list of assignments that are active  */
   

    updateDashboardAssignments();

}



/* the dasboard assignment list    */


function updateDashboardAssignments() {


    const container =
        document.getElementById(
            "dashboardAssignments"
        );


    if (!container) {

        return;

    }


    const assignments =
        Object.keys(
            scheduledTeacherAides
        );


    /* If there are no assignments, show a message.*/

    if (assignments.length === 0) {

        container.innerHTML = `

            <div class="dashboard-no-assignments">

                <div style="font-size:30px;">
                    📋
                </div>

                <b>
                    No teacher aides are currently assigned.
                </b>

                <br>

                <small>
                    Open the General Timetable to schedule
                    a teacher aide.
                </small>

            </div>

        `;

        return;

    }


    let html = "";


    assignments.forEach(
        function(className) {


            const teacherAide =
                scheduledTeacherAides[
                    className
                ];


            const schedule =
                classSchedule[
                    className
                ];


            if (!schedule) {

                return;

            }


            html += `

                <div class="dashboard-assignment">


                    <div class="dashboard-assignment-info">


                        <div class="dashboard-assignment-icon">
                             ★
                        </div>


                        <div>

                            <div class="dashboard-assignment-class">

                                ${className}

                            </div>


                            <div class="dashboard-assignment-aide">

                                ${teacherAide}

                            </div>

                        </div>


                    </div>


                    <div class="dashboard-assignment-time">

                        <b>
                            ${schedule.day}
                        </b>

                        <br>

                        ${schedule.period}

                        <br>

                        ${schedule.time}

                    </div>


                </div>

            `;

        }
    );


    container.innerHTML = html;

}

function showDashboardHome() {

    showHomePage();

}

function openSearchFromHome() {

    const homePage =
        document.getElementById(
            "homePage"
        );


    const timetablePage =
        document.getElementById(
            "timetablePage"
        );


    homePage.style.display = "none";

    timetablePage.style.display = "block";


    openTeacherAideSearchModal();

}


/* load the database when the page starts from where it was last saved   */


window.addEventListener(
    "DOMContentLoaded",
    function() {

        /*  Restore the saved teacher aide information.*/

        updateClassStars();


        /* Update the dashboard.*/

        updateDashboard();


        /*  Start on the homepage. */

        showHomePage();

    }
);