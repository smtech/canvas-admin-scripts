/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true */

var courseUsersUrl = /.*\/courses\/(\d+)\/users/;
var facultyJournalUrl = /.*\/users\/(\d+)\/user_notes\?course_id=(\d+)/;
var delay = 250;

function stmarks_addFacultyJournalButton() {
	var courseId = courseUsersUrl.exec(document.location.href)[1];
	var userId = document.getElementsByClassName('StudentEnrollment')[0].id.substr(5);
	var rightSideToolbar = document.getElementById('right-side').children[0];
	var facultyJournalLink = document.createElement('a');
	facultyJournalLink.href = '/users/' + userId + '/user_notes?course_id=' + courseId;
	facultyJournalLink.innerText = 'Faculty Journal';
	facultyJournalLink.className = 'btn button-sidebar-wide';
	rightSideToolbar.appendChild(facultyJournalLink);
}

function stmarks_addFacultyJournalMenu() {
	var userId = facultyJournalUrl.exec(document.location.href)[1];
	var courseId = facultyJournalUrl.exec(document.location.href)[2];
	var courseMenu = document.createElement('iframe');
	courseMenu.width = '100%';
	courseMenu.height = '30';
	courseMenu.frameBorder = '0';
	courseMenu.src = 'http://area51.stmarksschool.org/project/canvas/stable/api/faculty-journal/menu.php?course_id=' + courseId + '&user_id=' + userId;
	var contentDiv = document.getElementById('content');
	contentDiv.insertBefore(courseMenu, contentDiv.firstChild);
}

function stmarks_facultyJournal() {
	// FIXME: this should have some sort of authentication or hash check to prevent, um... abuse
	
	// if we're looking at a faculty journal page, insert the list of students
	if (facultyJournalUrl.test(document.location.href)) {
		window.setTimeout(stmarks_addFacultyJournalMenu, delay);
	// if we're looking at the list of students, link to the faculty journal page
	} else if (userClass == USER_CLASS_FACULTY && courseUsersUrl.test(document.location.href)) {
		window.setTimeout(stmarks_addFacultyJournalButton, delay * 4);
	}
}