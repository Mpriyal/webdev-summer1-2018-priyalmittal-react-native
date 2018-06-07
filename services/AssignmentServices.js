const LESSON_ASSIGNMENT_API_URL =
    'http://localhost:8080/api/lesson/LID/assignment';
const ASSIGNMENT_API_URL =
    'http://localhost:8080/api/assignment';

let _singleton = Symbol();
export default class AssignmentServices {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllAssignmnetsForLesson(lessonId) {
        return fetch(
            LESSON_ASSIGNMENT_API_URL
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    updateAssignment(assignmentId, assignment) {
        return fetch(ASSIGNMENT_API_URL+'/'+ assignmentId,
            {
                body: JSON.stringify(assignment),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
            .then(function (response)
            { return response.json(); })
    }

    createAssignment(lessonId,assignment) {
        return fetch(LESSON_ASSIGNMENT_API_URL
                .replace('LID', lessonId),
            {
                body: JSON.stringify(assignment),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            { return response.json(); })
    }

    deleteAssignment(assignmentId) {
        return fetch(ASSIGNMENT_API_URL + '/' + assignmentId,
            {
                method: 'DELETE'
            })
            .then(function (response)
            { return response; })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentServices(_singleton);
        return this[_singleton]
    }
}