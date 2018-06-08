const LESSON_EXAM_URL =
    'http://localhost:8080/api/lesson/LID/exam';
// const LESSON_WIDGET_API_URL =
//     'http://localhost:8080/api/lesson/LID/widget';
const EXAM_URL =
    'http://localhost:8080/api/exam';

let _singleton = Symbol();
export default class ExamServices {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    // findAllWidgetsForLesson(lessonId) {
    //     return fetch(
    //         LESSON_WIDGET_API_URL
    //             .replace('LID', lessonId))
    //         .then(function (response) {
    //             console.log("I am in service")
    //             return response.json().then(function() {
    //                 return response.json();
    //         })}
    //         )
    // }

    createExam(lessonId,exam) {
        return fetch(LESSON_EXAM_URL
                .replace('LID', lessonId),
            {
                body: JSON.stringify(exam),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            {
                return response;
            })
    }

    deleteExam(examId) {
        return fetch(EXAM_URL + '/' + examId,
            {
                method: 'DELETE'
            })
            .then(function (response)
            {
                return response;
            })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamServices(_singleton);
        return this[_singleton]
    }
}